/* grilles_synchro.js — SYNCHRO_V157 (MAITRE v157, 22/11/2026) : LES GRILLES TP NOTÉES, SYNCHRONISÉES ENTRE TES APPAREILS.
   UN SEUL FICHIER, DEUX COPIES IDENTIQUES : le site (page du téléphone `saisie_competences_mobile.html`, GitHub Pages) et le
   service (`static/grilles_synchro.js`, page « Résultats des TP », alwaysdata). banc_coffre_v157 vérifie qu'elles le sont.

   Laurent (19/11, après des niveaux perdus au téléphone) : « Ok pour une synchro auto » ; voie choisie : LA GRILLE CHIFFRÉE
   AU SERVICE, avec une clé qui n'existe que sur ses appareils.
   - LA CLÉ : 32 octets tirés au hasard sur le PC ; elle passe au téléphone par UN QR, « 📱 Relier un téléphone » (« #cle=… » :
     un fragment d'adresse ne part jamais avec la requête), une fois pour toutes. Le service ne la voit jamais.
   - De la clé, HKDF-SHA-256 tire : la clé AES-GCM qui chiffre chaque grille ; le n° du COFFRE au service (16 octets) ; le
     JETON qui ouvre ce coffre (32 octets : le service n'en garde que l'empreinte SHA-256) ; la clé HMAC qui donne à chaque
     grille un identifiant opaque. Le service ne garde que des octets (iv de 12 octets || chiffré) : ni nom, ni note, ni
     titre, ni classe.
   - CHAQUE CASE porte l'heure de sa dernière saisie (`_h`). Deux appareils qui ont noté la même grille se FUSIONNENT case
     par case : la saisie la plus récente gagne ; ce qui n'a été touché que d'un côté est gardé. Un critère ou un élève
     retiré laisse une trace datée (sans elle, l'autre appareil le ferait revenir).
   - L'heure est celle de l'appareil, jamais en arrière de la plus récente déjà vue (`horloge`) : une montre qui retarde ne
     fait pas perdre une saisie faite après.
   - Rien ne s'efface par la synchro : une grille oubliée ou supprimée sur un appareil reste sur les autres.
   API : window.PCSynchro = { VERSION, cleEleve, valeurs, horodater, fusionner, empreinte, pourCoffre, depuisCoffre, vue,
     publication, horloge, voir, nouvelleCle, nouvelId, b64u, deB64u,
     cles(cleB64) -> Promise<{coffre, jeton, chiffrer, dechiffrer, sid}>,
     Coffre(base, k) ->
     {tirer(depuis), pousser(sid, doc, base), creer(remplacer)}, magasin(base) -> {lire(k), ecrire(k, v)} (IndexedDB),
     clePC(prof, remplacer) -> Promise<{etat, cof}> (le PC : sa clé, ou le coffre ouvert une fois par professeur) }.
   Plus aucun geste (Laurent, 22/11 : « ça ne peut pas être tout simplement toujours synchronisé ? ») : le PC tire la clé et
   ouvre le coffre tout seul. Plus aucun scan par TP (Laurent, 22/11 : « c'est pas pratique d'avoir à scanner à chaque TP ») :
   la page de chaque grille (onglet Grilles TP) la PUBLIE au coffre (`publication`) — son modèle et la liste des élèves de ce
   navigateur, sans aucun niveau ; le téléphone relié la trouve dans « Mes grilles », et ses niveaux reviennent au PC. */
(function (racine) {
  "use strict";
  var VERSION = "v157";
  var BAREME = { A: 1, B: 0.75, C: 0.5, D: 0.25 };
  var NIV = { A: 1, B: 1, C: 1, D: 1 };
  var IDENTITE = ["sid", "classe", "annee", "classe_id", "cle"];

  // ------------------------------------------------------------------ outils
  function copie(x) { return x == null ? x : JSON.parse(JSON.stringify(x)); }
  function canon(x) {                     // JSON aux clés triées : deux contenus égaux s'écrivent pareil
    if (x === null || typeof x !== "object") { return JSON.stringify(x === undefined ? null : x); }
    if (Array.isArray(x)) { return "[" + x.map(canon).join(",") + "]"; }
    return "{" + Object.keys(x).sort().filter(function (k) { return x[k] !== undefined; })
      .map(function (k) { return JSON.stringify(k) + ":" + canon(x[k]); }).join(",") + "}";
  }
  function nombre(x, d) { var v = parseFloat(String(x == null ? "" : x).replace(",", ".")); return isFinite(v) ? v : d; }
  function cleEleve(e) {
    return String((e && e.nom) || "").trim().toLowerCase() + "|" + String((e && e.prenom) || "").trim().toLowerCase();
  }
  function b64u(u8) {
    var s = "";
    for (var i = 0; i < u8.length; i++) { s += String.fromCharCode(u8[i]); }
    return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }
  function deB64u(t) {
    var b = String(t || "").replace(/-/g, "+").replace(/_/g, "/");
    while (b.length % 4) { b += "="; }
    var bin = atob(b), u = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) { u[i] = bin.charCodeAt(i); }
    return u;
  }
  function hasard(n) { return racine.crypto.getRandomValues(new Uint8Array(n)); }
  function nouvelleCle() { return b64u(hasard(32)); }          // 43 caractères
  function nouvelId() { return b64u(hasard(16)); }             // 22 caractères

  // ------------------------------------------------------------------ l'horloge
  var derniere = 0;
  function horloge() { var t = Date.now(); if (t <= derniere) { t = derniere + 1; } derniere = t; return t; }
  function voir(t) { t = +t || 0; if (t > derniere) { derniere = t; } return derniere; }

  // ------------------------------------------------------------------ les valeurs d'une grille (sans les heures)
  function valeurs(g) {
    g = g || {};
    var b = g.bareme || {}, bareme = {};
    ["A", "B", "C", "D"].forEach(function (k) { bareme[k] = nombre(b[k], BAREME[k]); });
    var criteres = [], ids = {};
    (Array.isArray(g.criteres) ? g.criteres : []).forEach(function (c) {
      if (!c || typeof c !== "object" || c.id == null || ids[String(c.id)]) { return; }
      var o = { id: String(c.id), label: String(c.label == null ? "" : c.label), comp: String(c.comp || "REA"),
                coeff: nombre(c.coeff, 1) };
      if (c.bo != null && c.bo !== "") { o.bo = String(c.bo); }
      ids[o.id] = 1; criteres.push(o);
    });
    var eleves = [], vus = {};
    (Array.isArray(g.eleves) ? g.eleves : []).forEach(function (e) {
      if (!e || typeof e !== "object" || !(e.nom || e.prenom)) { return; }
      var k = cleEleve(e);
      if (vus[k]) { return; }
      vus[k] = 1;
      var niv = {}, src = (e.niv && typeof e.niv === "object") ? e.niv : {};
      Object.keys(src).forEach(function (id) { if (ids[id] && NIV[src[id]]) { niv[id] = src[id]; } });
      eleves.push({ nom: String(e.nom || ""), prenom: String(e.prenom || ""), groupe: String(e.groupe || ""), niv: niv });
    });
    return { titre: String(g.titre || ""), date: String(g.date || ""), bareme: bareme, criteres: criteres, eleves: eleves };
  }
  /* LE REGISTRE D'UNE GRILLE (`_h`) : chaque chose y garde SA DERNIÈRE VALEUR AVEC SON HEURE, rien ne s'y perd —
       f  : {titre, date, bareme, ordre, ordreE} -> [heure, valeur] (ordre / ordreE : l'ordre des critères / des élèves)
       c  : {id du critère -> [heure, {id, label, comp, coeff, bo}]}       cx : {id -> heure de son retrait}
       e  : {« nom|prénom » -> [heure, {nom, prenom, groupe}]}             ex : {« nom|prénom » -> heure de son retrait}
       n  : {« nom|prénom » -> {id du critère -> [heure, niveau]}}         (niveau "" = case vidée)
     Un critère ou un élève est PRÉSENT si sa dernière valeur est plus récente que son dernier retrait. Ce que la page
     montre (titre, critères, élèves et leurs niveaux) se déduit du registre (`vue`) ; la fusion de deux registres prend,
     chose par chose, la plus récente : elle ne dépend ni du sens ni de l'ordre des appareils. */
  function vide() { return { f: {}, c: {}, cx: {}, e: {}, ex: {}, n: {} }; }
  function reg(r) { return Array.isArray(r) && r.length === 2 ? r : null; }
  function lww(ra, rb) {
    ra = reg(ra); rb = reg(rb);
    if (!ra) { return rb ? copie(rb) : null; }
    if (!rb) { return copie(ra); }
    var ta = +ra[0] || 0, tb = +rb[0] || 0;
    if (ta !== tb) { return copie(tb > ta ? rb : ra); }
    return copie(canon(rb[1]) > canon(ra[1]) ? rb : ra);
  }
  function present(h, quoi, id) {
    var r = reg((h[quoi] || {})[id]);
    return !!r && (+r[0] || 0) > (+((h[quoi + "x"] || {})[id]) || 0);
  }
  function naturel(x, y) {                  // « e4-2 » avant « e4-10 », « dupont|léa » avant « durand|hugo »
    var a = String(x).split(/(\d+)/), b = String(y).split(/(\d+)/);
    for (var i = 0; i < Math.min(a.length, b.length); i++) {
      if (a[i] === b[i]) { continue; }
      if (i % 2) { var d = (+a[i]) - (+b[i]); if (d) { return d; } }
      return a[i] < b[i] ? -1 : 1;
    }
    return a.length - b.length;
  }
  function rangs(h, quoi, cleOrdre) {          // les ids présents, dans l'ordre retenu, puis les autres (ordre fixe)
    var r = reg((h.f || {})[cleOrdre]), base = (r && Array.isArray(r[1])) ? r[1] : [], vu = {}, out = [];
    base.forEach(function (id) { id = String(id); if (!vu[id] && present(h, quoi, id)) { vu[id] = 1; out.push(id); } });
    Object.keys(h[quoi] || {}).filter(function (id) { return !vu[id] && present(h, quoi, id); }).sort(naturel)
      .forEach(function (id) { out.push(id); });
    return out;
  }
  function vue(h) {
    h = h || vide();
    var f = h.f || {}, out = {};
    out.titre = reg(f.titre) ? String(f.titre[1] || "") : "";
    out.date = reg(f.date) ? String(f.date[1] || "") : "";
    out.bareme = valeurs({ bareme: reg(f.bareme) ? f.bareme[1] : null }).bareme;
    var ids = rangs(h, "c", "ordre"), presents = {};
    out.criteres = ids.map(function (id) { presents[id] = 1; var c = copie(h.c[id][1]) || {}; c.id = id; return valeurs({ criteres: [c] }).criteres[0]; });
    out.eleves = rangs(h, "e", "ordreE").map(function (k) {
      var p = h.e[k][1] || {}, niv = {}, n = (h.n || {})[k] || {};
      Object.keys(n).forEach(function (id) { var r = reg(n[id]); if (r && presents[id] && NIV[r[1]]) { niv[id] = r[1]; } });
      return { nom: String(p.nom || ""), prenom: String(p.prenom || ""), groupe: String(p.groupe || ""), niv: niv };
    });
    return out;
  }
  function identite(a, b) {
    var o = {};
    IDENTITE.forEach(function (k) {
      var x = (a && a[k] != null && a[k] !== "") ? a[k] : ((b && b[k] != null && b[k] !== "") ? b[k] : "");
      if (x !== "") { o[k] = String(x); }
    });
    return o;
  }
  function plusRecente(h) {
    var m = 0;
    function pr(o) {
      Object.keys(o || {}).forEach(function (k) {
        var v = o[k];
        if (Array.isArray(v)) { if (+v[0] > m) { m = +v[0]; } } else if (v && typeof v === "object") { pr(v); } else if (+v > m) { m = +v; }
      });
    }
    pr(h);
    return m;
  }
  function memeCritere(a, b) { return a.label === b.label && a.comp === b.comp && a.coeff === b.coeff && (a.bo || "") === (b.bo || ""); }
  function memeEleve(a, b) { return a.nom === b.nom && a.prenom === b.prenom && a.groupe === b.groupe; }
  function avecVue(ident, h) {
    var v = vue(h), doc = ident;
    doc.titre = v.titre; doc.date = v.date; doc.bareme = v.bareme; doc.criteres = v.criteres; doc.eleves = v.eleves;
    doc._h = h; doc.derniere = plusRecente(h);
    return doc;
  }
  function registre(doc) {                 // le registre d'une grille ; une grille d'avant la synchro est datée en bloc
    if (doc && doc._h && typeof doc._h === "object") {
      var h = copie(doc._h);
      ["f", "c", "cx", "e", "ex", "n"].forEach(function (k) { if (!h[k] || typeof h[k] !== "object" || Array.isArray(h[k])) { h[k] = {}; } });
      return h;
    }
    return null;
  }

  /* horodater(avant, apres, t, tAncien) : `apres` (ce que montre la page) devient une grille datée. Ce qui diffère du
     registre d'`avant` (la dernière grille datée de cet appareil) reçoit l'heure `t` ; le reste garde la sienne. Une grille
     d'avant la synchro (sans `_h`) est d'abord datée en bloc de `tAncien` (sa dernière modification connue) : elle ne passe
     jamais devant une saisie faite ensuite ailleurs. */
  function horodater(avant, apres, t, tAncien) {
    var h = registre(avant);
    if (avant && !h) { h = horodater(null, avant, tAncien || 1)._h; }
    if (!h) { h = vide(); }
    var m = plusRecente(h);
    t = Math.max(+t || 0, m + 1);           // une saisie passe toujours après tout ce que cette grille sait déjà
    voir(t);
    var vb = valeurs(apres), v0 = vue(h);
    ["titre", "date", "bareme"].forEach(function (f) {
      if (!reg(h.f[f]) || canon(v0[f]) !== canon(vb[f])) { h.f[f] = [t, copie(vb[f])]; }
    });
    var avantC = {};
    v0.criteres.forEach(function (c) { avantC[c.id] = c; });
    var cb = {};
    vb.criteres.forEach(function (c) {
      cb[c.id] = 1;
      if (!avantC[c.id] || !memeCritere(avantC[c.id], c)) { h.c[c.id] = [t, copie(c)]; }
    });
    v0.criteres.forEach(function (c) { if (!cb[c.id]) { h.cx[c.id] = t; } });
    var ordreB = vb.criteres.map(function (c) { return c.id; });
    if (!reg(h.f.ordre) || v0.criteres.map(function (c) { return c.id; }).join("\n") !== ordreB.join("\n")) { h.f.ordre = [t, ordreB]; }
    var avantE = {};
    v0.eleves.forEach(function (e) { avantE[cleEleve(e)] = e; });
    var eb = {};
    vb.eleves.forEach(function (e) {
      var k = cleEleve(e), o = avantE[k];
      eb[k] = 1;
      if (!o || !memeEleve(o, e)) { h.e[k] = [t, { nom: e.nom, prenom: e.prenom, groupe: e.groupe }]; }
      if (!h.n[k] || typeof h.n[k] !== "object") { h.n[k] = {}; }
      ordreB.forEach(function (id) {        // chaque case de la page contre sa valeur au registre (même d'un élève revenu)
        var r = reg(h.n[k][id]), avantV = r ? String(r[1] || "") : "", apresV = e.niv[id] || "";
        if (avantV !== apresV && (r || apresV)) { h.n[k][id] = [t, apresV]; }
      });
      if (!Object.keys(h.n[k]).length) { delete h.n[k]; }
    });
    v0.eleves.forEach(function (e) { var k = cleEleve(e); if (!eb[k]) { h.ex[k] = t; } });
    var ordreE = vb.eleves.map(cleEleve);
    if (!reg(h.f.ordreE) || v0.eleves.map(cleEleve).join("\n") !== ordreE.join("\n")) { h.f.ordreE = [t, ordreE]; }
    if (rangs(h, "c", "ordre").join("\n") !== ordreB.join("\n")) { h.f.ordre = [t, ordreB]; }      // l'ordre que montre la page
    if (rangs(h, "e", "ordreE").join("\n") !== ordreE.join("\n")) { h.f.ordreE = [t, ordreE]; }
    return avecVue(identite(apres, avant), h);
  }

  /* fusionner(a, b) : la grille qui réunit deux appareils, chose par chose la valeur la plus récente (à heure égale, un ordre
     fixe). Commutative, associative, idempotente : des appareils qui se fusionnent, dans n'importe quel ordre, finissent
     identiques. */
  function fusionner(a, b) {
    if (!a && !b) { return null; }
    var ha = a ? (registre(a) || horodater(null, a, 1)._h) : vide();
    var hb = b ? (registre(b) || horodater(null, b, 1)._h) : vide();
    var h = vide();
    ["titre", "date", "bareme", "ordre", "ordreE"].forEach(function (f) { var r = lww(ha.f[f], hb.f[f]); if (r) { h.f[f] = r; } });
    ["c", "e"].forEach(function (q) {
      var ids = {};
      Object.keys(ha[q]).concat(Object.keys(hb[q])).forEach(function (id) { ids[id] = 1; });
      Object.keys(ids).forEach(function (id) { var r = lww(ha[q][id], hb[q][id]); if (r) { h[q][id] = r; } });
      var x = {};
      Object.keys(ha[q + "x"]).concat(Object.keys(hb[q + "x"])).forEach(function (id) { x[id] = 1; });
      Object.keys(x).forEach(function (id) { h[q + "x"][id] = Math.max(+ha[q + "x"][id] || 0, +hb[q + "x"][id] || 0); });
    });
    var ks = {};
    Object.keys(ha.n).concat(Object.keys(hb.n)).forEach(function (k) { ks[k] = 1; });
    Object.keys(ks).forEach(function (k) {
      var na = ha.n[k] || {}, nb = hb.n[k] || {}, ids = {}, o = {};
      Object.keys(na).concat(Object.keys(nb)).forEach(function (id) { ids[id] = 1; });
      Object.keys(ids).forEach(function (id) { var r = lww(na[id], nb[id]); if (r) { o[id] = r; } });
      if (Object.keys(o).length) { h.n[k] = o; }
    });
    var i1 = identite(a, b), i2 = identite(b, a);
    var out = avecVue(canon(i2) > canon(i1) ? i2 : i1, h);
    voir(out.derniere);
    return out;
  }
  function empreinte(doc) {                 // deux grilles de même empreinte disent exactement la même chose
    if (!doc) { return ""; }
    var o = identite(doc, null);
    o._h = registre(doc) || horodater(null, doc, 1)._h;
    return canon(o);
  }
  function pourCoffre(doc) {                // ce qui part, chiffré : l'identité et le registre (la vue s'en déduit)
    var o = identite(doc, null);
    o.f = "grille-v157"; o._h = registre(doc) || horodater(null, doc, 1)._h;
    return o;
  }
  function depuisCoffre(x) {                // une grille reçue du coffre : sa vue refaite depuis son registre
    if (!x || typeof x !== "object") { return null; }
    var h = registre(x);
    if (!h) { return null; }
    var out = avecVue(identite(x, null), h);
    voir(out.derniere);
    return out;
  }

  /* publication(g, pub, t) — LA PAGE D'UNE GRILLE (le PC) la publie : son modèle (titre, date, barème, critères) et les
     élèves de la liste de ce navigateur, SANS AUCUN NIVEAU. Rend null si rien n'a changé depuis la dernière publication
     `pub` ({sig, ids}) ; sinon {doc, sig, ids} : ce modèle daté de `t` (il passe devant ce qui est plus ancien ailleurs) et
     les critères retirés depuis `pub`, retirés (datés de `t`). Ce que la page n'affirme pas reste à qui l'a écrit, la fusion
     au coffre le garde : les niveaux, un critère ou un élève ajouté au téléphone. Sans liste d'élèves dans ce navigateur, ni
     les élèves ni leur ordre ne sont affirmés (le téléphone garde les siens). */
  function publication(g, pub, t) {
    var v = valeurs(g);
    v.eleves.forEach(function (e) { e.niv = {}; });
    var sig = canon([v.titre, v.date, v.bareme, v.criteres, v.eleves.map(function (e) { return [e.nom, e.prenom, e.groupe]; })]);
    if (pub && pub.sig === sig) { return null; }
    var x = identite(g, null);
    x.titre = v.titre; x.date = v.date; x.bareme = v.bareme; x.criteres = v.criteres; x.eleves = v.eleves;
    var h = horodater(null, x, t)._h, ids = v.criteres.map(function (c) { return c.id; }), garde = {};
    t = h.f.titre[0];
    ids.forEach(function (id) { garde[id] = 1; });
    ((pub && Array.isArray(pub.ids)) ? pub.ids : []).forEach(function (id) { id = String(id); if (!garde[id]) { h.cx[id] = t; } });
    if (!v.eleves.length) { delete h.f.ordreE; }
    return { doc: avecVue(identite(g, null), h), sig: sig, ids: ids };
  }

  // ------------------------------------------------------------------ les clés
  function texte(s) { return new TextEncoder().encode(s); }
  var SEL = "pcmajo-coffre-v157";
  function cles(cleB64) {
    var s = racine.crypto && racine.crypto.subtle;
    if (!s) { return Promise.reject(new Error("ce navigateur ne sait pas chiffrer (page non sécurisée ?)")); }
    var brut;
    try { brut = deB64u(cleB64); } catch (e) { brut = new Uint8Array(0); }
    if (brut.length !== 32) { return Promise.reject(new Error("clé de synchronisation illisible")); }
    return s.importKey("raw", brut, "HKDF", false, ["deriveBits", "deriveKey"]).then(function (m) {
      function algo(info) { return { name: "HKDF", hash: "SHA-256", salt: texte(SEL), info: texte(info) }; }
      return Promise.all([
        s.deriveKey(algo("chiffrement"), m, { name: "AES-GCM", length: 256 }, false, ["encrypt", "decrypt"]),
        s.deriveBits(algo("coffre"), m, 128),
        s.deriveBits(algo("jeton"), m, 256),
        s.deriveKey(algo("identifiants"), m, { name: "HMAC", hash: "SHA-256", length: 256 }, false, ["sign"])
      ]).then(function (r) {
        var aes = r[0], hm = r[3];
        return {
          coffre: b64u(new Uint8Array(r[1])), jeton: b64u(new Uint8Array(r[2])),
          chiffrer: function (obj) {
            var iv = hasard(12);
            return s.encrypt({ name: "AES-GCM", iv: iv }, aes, texte(JSON.stringify(obj))).then(function (c) {
              c = new Uint8Array(c);
              var u = new Uint8Array(12 + c.length); u.set(iv, 0); u.set(c, 12);
              return b64u(u);
            });
          },
          dechiffrer: function (b) {
            var u = deB64u(b);
            if (u.length < 29) { return Promise.reject(new Error("paquet tronqué")); }
            return s.decrypt({ name: "AES-GCM", iv: u.slice(0, 12) }, aes, u.slice(12)).then(function (c) {
              return JSON.parse(new TextDecoder().decode(c));
            });
          },
          sid: function (t) {
            return s.sign("HMAC", hm, texte("grille|" + t)).then(function (x) { return b64u(new Uint8Array(x).slice(0, 16)); });
          }
        };
      });
    });
  }

  // ------------------------------------------------------------------ le coffre du service
  function erreur(r, quoi) {
    var e = new Error((r && r.json && r.json.erreur) || (quoi + " : le service répond " + (r ? r.code : "?")));
    e.code = r ? r.code : 0;
    e.json = (r && r.json) || {};
    return e;
  }
  function Coffre(base, k) {
    var url = String(base || "").replace(/\/+$/, "");
    function requete(methode, chemin, corps) {
      var entetes = { "Authorization": "Bearer " + k.jeton };
      if (corps) { entetes["Content-Type"] = "application/json"; }
      return fetch(url + chemin, { method: methode, credentials: "omit", cache: "no-store", headers: entetes,
                                   body: corps ? JSON.stringify(corps) : undefined })
        .catch(function () { var e = new Error("le service ne répond pas (réseau ?)"); e.code = 0; e.reseau = true; throw e; })
        .then(function (r) {
          return r.text().then(function (t) {
            var j;
            try { j = t ? JSON.parse(t) : {}; } catch (e) { j = { erreur: String(t).slice(0, 160) }; }
            return { code: r.status, json: j || {} };
          });
        });
    }
    return {
      creer: function (remplacer) {         // PC seulement : la session du professeur ouvre le coffre, une fois
        return fetch(url, { method: "POST", credentials: "same-origin", cache: "no-store",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ coffre: k.coffre, jeton: k.jeton, remplacer: !!remplacer }) })
          .catch(function () { var e = new Error("le service ne répond pas (réseau ?)"); e.code = 0; e.reseau = true; throw e; })
          .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) {
            if (r.status !== 200) { throw erreur({ code: r.status, json: j }, "ouvrir le coffre"); }
            return j;
          }); });
      },
      tirer: function (depuis) {            // les grilles écrites au coffre depuis la version `depuis`, déchiffrées
        return requete("GET", "/" + k.coffre + "?depuis=" + (+depuis || 0)).then(function (r) {
          if (r.code !== 200) { throw erreur(r, "lire le coffre"); }
          var out = { v: +r.json.v || 0, docs: {} }, g = r.json.grilles || {};
          return Promise.all(Object.keys(g).map(function (sid) {
            return k.dechiffrer(g[sid].donnees).then(function (doc) { doc = depuisCoffre(doc); out.docs[sid] = doc ? { v: +g[sid].v || 0, doc: doc } : { v: +g[sid].v || 0, illisible: true }; },
              function () { out.docs[sid] = { v: +g[sid].v || 0, illisible: true }; });
          })).then(function () { return out; });
        });
      },
      pousser: function (sid, doc, baseV) {  // écrit `doc` ; si le coffre a changé entre-temps (409) : fusion, puis de nouveau
        var essais = 0;
        function tour(d, b) {
          return k.chiffrer(pourCoffre(d)).then(function (donnees) {
            return requete("PUT", "/" + k.coffre + "/" + sid, { base: +b || 0, donnees: donnees });
          }).then(function (r) {
            if (r.code === 200) { return { v: +r.json.v || 0, doc: d }; }
            if (r.code === 409 && essais++ < 4) {
              var suite = r.json.donnees ? k.dechiffrer(r.json.donnees).then(function (dist) { return fusionner(d, depuisCoffre(dist)); },
                function () { return d; }) : Promise.resolve(d);
              return suite.then(function (m) { return tour(m, +r.json.v || 0); });
            }
            throw erreur(r, "écrire au coffre");
          });
        }
        return tour(doc, baseV);
      }
    };
  }

  // ------------------------------------------------------------------ un petit magasin IndexedDB (le PC)
  function magasin(nomBase) {
    var ouverte = null;
    function ouvrir() {
      if (ouverte) { return ouverte; }
      ouverte = new Promise(function (res, rej) {
        if (!racine.indexedDB) { rej(new Error("IndexedDB absent")); return; }
        var r = racine.indexedDB.open(nomBase, 1);
        r.onupgradeneeded = function () { r.result.createObjectStore("etat", { keyPath: "k" }); };
        r.onsuccess = function () { res(r.result); };
        r.onerror = function () { rej(r.error || new Error("IndexedDB refusé")); };
      });
      return ouverte;
    }
    return {
      lire: function (k) {
        return ouvrir().then(function (db) {
          return new Promise(function (res, rej) {
            var r = db.transaction("etat", "readonly").objectStore("etat").get(k);
            r.onsuccess = function () { res(r.result ? r.result.v : null); };
            r.onerror = function () { rej(r.error); };
          });
        });
      },
      ecrire: function (k, v) {
        return ouvrir().then(function (db) {
          return new Promise(function (res, rej) {
            var t = db.transaction("etat", "readwrite"), m = t.objectStore("etat");
            if (v == null) { m.delete(k); } else { m.put({ k: k, v: v }); }
            t.oncomplete = function () { res(); };
            t.onerror = function () { rej(t.error); };
          });
        });
      }
    };
  }

  /* clePC(prof, remplacer) — LE PC (pages du service) : la clé de ce navigateur ; sinon une clé neuve, et le coffre ouvert au
     service par la session du professeur — UNE fois par professeur (Laurent, 22/11 : « ça ne peut pas être tout simplement
     toujours synchronisé ? » : plus de bouton « Activer »). Si le professeur a déjà un coffre (ouvert depuis un autre de
     ses appareils), ce navigateur ne peut pas en deviner la clé : « ailleurs » (elle arrive par « 📥 Recevoir du
     téléphone », page « Résultats des TP »). Rend {etat: "ok", cof} | {etat: "ailleurs", cree} | {etat: "consultation"} | {etat: "erreur", message}. */
  function clePC(prof, remplacer) {
    var m = magasin("pcmajo-v2-coffre"), cleEtat = "coffre|" + prof;
    function lire() { return m.lire(cleEtat).then(function (x) { return (x && /^[A-Za-z0-9_-]{43}$/.test(x.cle || "")) ? x : null; }); }
    function attendre(ms) { return new Promise(function (res) { setTimeout(res, ms); }); }
    return lire().then(function (x) {
      if (x && !remplacer) { return { etat: "ok", cof: x }; }
      var cle = nouvelleCle();
      return cles(cle).then(function (k) { return Coffre("/api/coffre", k).creer(remplacer); }).then(function () {
        var cof = { cle: cle, depuis: 0, vers: {}, sales: {}, oubliees: {}, h: 0 };
        return m.ecrire(cleEtat, cof).then(function () { return { etat: "ok", cof: cof, nouveau: true }; });
      }, function (e) {
        if (e && e.code === 409 && e.json && e.json.existe) {   // un autre onglet vient peut-être de l'ouvrir : on relit
          return lire().then(function (y) { return y || attendre(800).then(lire); }).then(function (y) {
            return y ? { etat: "ok", cof: y } : { etat: "ailleurs", cree: e.json.cree || "" };
          });
        }
        if (e && e.code === 403) { return { etat: "consultation" }; }
        return { etat: "erreur", message: (e && e.message) || String(e) };
      });
    }, function (e) { return { etat: "indisponible", message: (e && e.message) || String(e) }; });
  }

  racine.PCSynchro = {
    VERSION: VERSION, cleEleve: cleEleve, valeurs: valeurs, horodater: horodater, fusionner: fusionner,
    empreinte: empreinte, pourCoffre: pourCoffre, depuisCoffre: depuisCoffre, vue: vue, publication: publication,
    horloge: horloge, voir: voir, nouvelleCle: nouvelleCle, nouvelId: nouvelId,
    b64u: b64u, deB64u: deB64u, cles: cles, Coffre: Coffre, magasin: magasin, clePC: clePC
  };
})(typeof window !== "undefined" ? window : globalThis);

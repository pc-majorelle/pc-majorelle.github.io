(function(){var b=document.getElementById('themeBtn'),p=document.getElementById('themePop');if(!b||!window.PCTheme)return;PCTheme.swatches('themePick');b.addEventListener('click',function(e){e.stopPropagation();p.classList.toggle('open');});document.addEventListener('click',function(e){if(p.classList.contains('open')&&!p.contains(e.target)&&e.target!==b)p.classList.remove('open');});})();(function(){try{var a=JSON.parse(sessionStorage.getItem("pcmajo_acces"));if(!a){a=JSON.parse(localStorage.getItem("pcmajo_acces"));}if(a&&a.role==="prof"&&a.prenom){var g=document.getElementById("gTitle");if(g)g.textContent="Gestion "+a.prenom;document.title="Gestion "+a.prenom+" \u2014 Plateforme PC";}}catch(e){}})();/*PLAN_V42*/
/* ============================================================================
   D-S4 — PUBLIER LE PLAN (MAITRE v42)
   Écrit un progression_dates.js : progression datée + calendrier de la classe
   + empreinte de version. Aucune donnée nominative. Aucun élève n'est nommé.
   La mtime d'aucun fichier ne fait foi côté élève : c'est l'empreinte qui dit
   « le plan a changé ».
   ========================================================================= */
(function(){
  "use strict";
  if (window.__PLAN_V42__) return;            /* jamais deux fois */
  window.__PLAN_V42__ = true;

  var JOURS = {dimanche:0, lundi:1, mardi:2, mercredi:3, jeudi:4, vendredi:5, samedi:6};

  /* Jeton de niveau du projet (2nde · 1spe · Tspe · 1sti · Tsti · 1ens · Tens).
     MESURÉ dans l'app, pas supposé : state.classes porte niveau="2nde"|"1ere"|"tale"
     et programme="tale|pc|sti". Une première version lisait « Seconde »/« Terminale »
     et rendait null sur 4 classes sur 6 — le banc l'a montré. */
  function jetonNiveau(c){
    var p = String(c.programme||"").toLowerCase();          /* « tale|pc|ens » */
    var n = (p.split("|")[0] || String(c.niveau||"").toLowerCase());
    var f = (p.split("|")[2] || String(c.filiere||"").toLowerCase());
    var ens = /ens/.test(f), sti = /sti/.test(f);
    if (/^2|seconde/.test(n)) return "2nde";
    if (/^1|premi/.test(n))   return ens ? "1ens" : (sti ? "1sti" : "1spe");
    if (/^t|termin/.test(n))  return ens ? "Tens" : (sti ? "Tsti" : "Tspe");
    return null;
  }

  /* La progression ACTIVE est souvent celle du B.O. — elle n'est PAS datée.
     Construire le plan dessus donnerait un fichier vide EN SILENCE (mesuré au banc :
     0 date, 0 chapitre sur les 6 classes). On prend donc la progression qui porte
     le plus de séances datées, et on écrit dans le plan LAQUELLE a servi. */
  function meilleurIndex(c){
    var best = null;
    try {
      var liste = (typeof listProgs === "function") ? listProgs(c) : [];
      liste.forEach(function(p){
        try {
          var idx = wkBuildIndex(c, p.id);
          /* MESURÉ : la progression réelle date les CHAPITRES (9 fenêtres) et pas les
             séances (0 date). Classer sur les seules séances datées jetait donc la seule
             progression utilisable. On compte les deux, les séances pesant plus lourd. */
          var nd = idx ? Object.keys(idx.byDate||{}).length : 0;
          var nw = idx ? (idx.windows||[]).length : 0;
          var score = nd * 100 + nw;
          if (!best || score > best.score)
            best = { score:score, n:nd, fenetres:nw, idx:idx, id:p.id, source:p.source||null };
        } catch(e){}
      });
    } catch(e){}
    if (!best || best.score === 0){                  /* rien de daté : on le dit, on n'invente pas */
      try { var a = activeProgId(c);
            return { score:0, n:0, fenetres:0, idx: wkBuildIndex(c, a), id:a, source:null, nonDatee:true }; }
      catch(e){ return { score:0, n:0, fenetres:0, idx:null, id:null, source:null, nonDatee:true }; }
    }
    return best;
  }

  /* empreinte stable du contenu (FNV-1a) — change si et seulement si le plan change */
  function empreinte(s){
    var h = 2166136261 >>> 0;
    for (var i=0; i<s.length; i++){ h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; }
    return ("0000000" + h.toString(16)).slice(-8);
  }

  /* les lundis des semaines SANS aucun jour de classe : le rituel les neutralise */
  function semainesSansCours(){
    var out = [], d = new Date(R0.getTime());
    d.setDate(d.getDate() - ((d.getDay()+6)%7));        /* lundi de la rentrée */
    var garde = 0;
    while (d <= R1 && garde++ < 60){
      var ecole = false, j;
      for (j=0; j<5; j++){
        var x = new Date(d.getTime()); x.setDate(x.getDate()+j);
        if (isSchoolDay(x)) { ecole = true; break; }
      }
      if (!ecole) out.push(iso(d));
      d.setDate(d.getDate()+7);
    }
    return out;
  }

  function planClasse(c){
    var jc = {}, seances = [], chapitres = [], erreur = null;
    (c.creneaux||[]).forEach(function(cr){
      var n = JOURS[(cr.jour||"").toLowerCase()];
      if (n !== undefined) jc[n] = 1;
    });
    var choix = meilleurIndex(c);
    try {
      var idx = choix.idx;
      if (idx){
        Object.keys(idx.byDate||{}).sort().forEach(function(d){
          (idx.byDate[d]||[]).forEach(function(x){
            var s = x.s || {};
            seances.push({ date: d, titre: (s.titre||"").trim(),
                           type: (s.type||"").toLowerCase() || null,
                           fiabilite: x.conf || null });
          });
        });
        (idx.windows||[]).forEach(function(w){
          var ch = w.ch || {}, caps = [];
          var i2t = (typeof progId2txt === "function") ? progId2txt(c) : {};
          /* MESURÉ dans PROGDATA : le champ s'appelle « _ids » (pas « ids »), et le
             chapitre porte AUSSI « boKeys » — la clé de jointure canonique du projet
             (FNV-1a du texte B.O. verbatim, CONTRAT v45). On emporte les trois :
             l'id local, la boKey, et le TEXTE B.O. verbatim, seul réconciliateur
             entre schémas d'identifiants qui diffèrent d'une branche à l'autre (I-139). */
          var ids = ch._ids || ch.ids || ch.capacites || [];
          var bks = ch.boKeys || [];
          ids.forEach(function(id, n){
            caps.push({ id: id, k: bks[n] || null, txt: i2t[id] || null });
          });
          /* w.start / w.end sont DÉJÀ des chaînes ISO (wkBuildIndex les produit ainsi).
             Les repasser dans iso() levait une exception avalée par le catch : le plan
             sortait avec 0 chapitre, en silence. */
          chapitres.push({ titre: (typeof chapDisplayTitle==="function" ? chapDisplayTitle(ch) : (ch.titre||"")),
                           debut: String(w.start), fin: String(w.end),
                           fiabilite: ch.confiance || null,
                           capacites: caps });
        });
      }
    } catch(e){
      /* Un catch muet a déjà masqué une erreur ici : on la fait REMONTER dans le plan,
         pour qu'un chapitre manquant ne passe jamais pour un chapitre absent. */
      console.error("plan: progression illisible pour "+c.id, e);
      erreur = String(e && e.message || e);
    }

    return {
      libelle: c.libelle || c.id,
      niveau: jetonNiveau(c),
      progression: { id: choix.id, source: choix.source, datee: !choix.nonDatee,
                     seancesDatees: choix.n, chapitresDates: choix.fenetres, erreur: erreur },
      calendrier: {
        rentree: iso(R0), fin: iso(R1),
        joursCours: Object.keys(jc).map(Number).sort(),
        vacances: semainesSansCours()
      },
      seances: seances,
      chapitres: chapitres
    };
  }

  function construirePlan(){
    var classes = {};
    (state.classes||[]).forEach(function(c){ classes[c.id] = planClasse(c); });
    var plan = { annee: ANNEE, ecrit_le: iso(new Date()), classes: classes };
    plan.version = empreinte(JSON.stringify(plan.classes));   /* l'empreinte ignore la date d'écriture */
    return plan;
  }

  function publierPlan(){
    var plan = construirePlan();
    var n = Object.keys(plan.classes).length;
    var seances = 0, sansCreneau = [], sansProg = [];
    Object.keys(plan.classes).forEach(function(k){
      seances += plan.classes[k].seances.length;
      if (!plan.classes[k].calendrier.joursCours.length) sansCreneau.push(k);
      if (!plan.classes[k].progression.datee) sansProg.push(k);
    });
    var js = "/* progression_dates.js — plan publie par gestion_v0.1.html (PLAN_V42)\n"
           + "   Annee " + plan.annee + " · ecrit le " + plan.ecrit_le + " · empreinte " + plan.version + "\n"
           + "   D-S4 : on publie LE PLAN, une fois. La page eleve calcule elle-meme la coupure.\n"
           + "   AUCUNE donnee nominative. A deposer a la racine du depot, a cote de revision.html. */\n"
           + "window.PCMAJO_PLAN=" + JSON.stringify(plan) + ";\n";
    var blob = new Blob([js], {type: "text/javascript;charset=utf-8"});
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "progression_dates.js";
    document.body.appendChild(a); a.click();
  try{ poserMarqueur("plan"); }catch(e){}
    setTimeout(function(){ URL.revokeObjectURL(a.href); a.remove(); }, 1500);

    var msg = "Plan publié — " + n + " classe(s), " + seances + " séance(s) datée(s).\n"
            + "Empreinte : " + plan.version + "\n\n"
            + "Dépose progression_dates.js à la racine du dépôt (à côté de revision.html), puis Commit/Push.";
    if (sansCreneau.length)
      msg += "\n\n⚠️ Sans aucun créneau, donc sans jour de cours : " + sansCreneau.join(", ")
           + "\nPour ces classes le rituel gardera son objectif provisoire.";
    if (sansProg.length)
      msg += "\n\n⚠️ AUCUNE progression datée (le plan ne porte que le calendrier) : "
           + sansProg.join(", ")
           + "\nLeur progression active est celle du B.O., qui n'a pas de dates.";
    alert(msg);
  }
  window.publierPlan = publierPlan;
  window.construirePlan = construirePlan;      /* exposé pour le banc */

  function poserBouton(){
    if (document.getElementById("btnPlan")) return;
    var ancre = document.getElementById("activeClass");
    if (!ancre || !ancre.parentNode) return;
    var b = document.createElement("button");
    b.id = "btnPlan"; b.className = "mini ghost";
    b.title = "Écrire progression_dates.js : la progression datée + le calendrier de la classe, "
            + "pour que l'espace élève ouvre les ressources au bon moment (D-S4)";
    b.textContent = "📅 publier le plan";
    b.onclick = publierPlan;
    ancre.parentNode.insertBefore(b, ancre.nextSibling);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", poserBouton);
  else poserBouton();
  setTimeout(poserBouton, 800);                /* si l'en-tête est re-rendu après coup */
})();
/*REDATE_V43*/
/* ============================================================================
   REDATE_V43 — MAITRE v43 (2026-08-26).
   Une progression est un GABARIT : ses dates se lisent dans l'annee AFFICHEE,
   pas dans celle ou elle a ete ecrite.

   DEFAUT MESURE — le champ `periode` d'un chapitre est ecrit de DEUX facons
   dans le meme fichier :
     - PROGDATA (2nde, 1re spe, Tale spe)       : RELATIF, « 5 sept. » + duree_sem
     - PROGDATA_STI_ENS (Tale STI2D, ens. sci.) : ABSOLU, « 2025-09-04 », duree_sem null
     - PROG_REEL_PAR_PROF (les 4 collegues)     : ABSOLU, via date_iso
   `wkBuildIndex` recale la premiere forme sur l'annee affichee (wkPeriodeISO) et
   prend la seconde VERBATIM. Consequence mesuree sur le plan publie le 26/08 pour
   2026-2027 : 12 chapitres dates en 2025 (TSTI2D 5, TENS-4/5/6 3 chacun), alors que
   la Tale spe et la Seconde, elles, tombaient juste.

   CE QU'ON FAIT : ni les donnees ni wkBuildIndex ne sont modifies ; on recale sa
   SORTIE avec EXACTEMENT la regle de wkPeriodeISO (mois >= 9 -> annee de rentree,
   sinon annee suivante). Deux calculs divergents sont la maladie du projet : il n'y
   en a donc qu'un, et il etait deja ecrit dans la page.

   IDEMPOTENT : recaler deux fois donne le meme resultat ; recaler une date deja dans
   la bonne annee ne fait rien (et n'est pas comptee comme recalage).
   ========================================================================= */
(function(){
  "use strict";
  if (window.__REDATE_V43__) return;                 /* jamais deux fois */

  if (typeof wkBuildIndex !== "function"){
    /* Lecon v42 : un catch muet transforme une ERREUR en ABSENCE. On le DIT. */
    window.__REDATE_V43__ = { greffe:false, motif:"wkBuildIndex absent" };
    try{ console.error("REDATE_V43 : wkBuildIndex introuvable — greffe inactive."); }catch(e){}
    return;
  }

  var compteur = { vus:0, recales:0 };
  window.__REDATE_V43__ = { greffe:true, compteur:compteur };

  function anneeRentree(){
    var a = (typeof ANNEE !== "undefined" && ANNEE) ? String(ANNEE) : "";
    var y = parseInt(a.slice(0,4), 10);
    return isNaN(y) ? null : y;
  }

  /* la regle de wkPeriodeISO, et rien d'autre */
  function recale(d, y0){
    if (typeof d !== "string") return d;
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(d);
    if (!m || y0 === null) return d;
    var cible = (+m[2] >= 9) ? y0 : (y0 + 1);
    compteur.vus++;
    if (cible === +m[1]) return d;
    compteur.recales++;
    return cible + "-" + m[2] + "-" + m[3];
  }

  var origine = wkBuildIndex;
  window.wkBuildIndex = function(cls, aid){
    var idx = origine.apply(this, arguments);
    try{
      var y0 = anneeRentree();
      if (y0 === null || !idx) return idx;
      /* les objets de `windows` sont fabriques a chaque appel : les modifier ne
         touche pas la progression stockee. `w.ch` est une reference : on n'y touche pas. */
      (idx.windows || []).forEach(function(w){
        w.start = recale(w.start, y0);
        w.end   = recale(w.end,   y0);
      });
      var bd = idx.byDate || {}, neuf = {}, k;
      for (k in bd){
        if (!Object.prototype.hasOwnProperty.call(bd, k)) continue;
        var nk = recale(k, y0);
        neuf[nk] = (neuf[nk] || []).concat(bd[k]);
      }
      idx.byDate = neuf;
      /* l'ordre chronologique doit survivre au recalage */
      (idx.windows || []).sort(function(a,b){ return a.start < b.start ? -1 : (a.start > b.start ? 1 : 0); });
    }catch(e){
      window.__REDATE_V43__.erreur = String((e && e.message) || e);
      try{ console.error("REDATE_V43", e); }catch(_){}
      throw e;                    /* on ne masque pas : planClasse a un champ `erreur` pour ca */
    }
    return idx;
  };

  /* le cache de l'onglet Semaine a pu etre rempli avant cette greffe */
  try{ if (typeof _WKPROG === "object" && _WKPROG){ for (var k2 in _WKPROG) delete _WKPROG[k2]; } }catch(e){}
})();

/* -------------------------------------------------------------- CLE_UNIQUE_GESTION_V48
   Reprise des etats ranges sous les anciennes cles a session. On ne supprime rien : on
   recopie le plus riche sur la cle unique, une fois, puis on recharge.                  */
(function(){
  "use strict";
  if(window.CLE_UNIQUE_GESTION_V48) return;
  window.CLE_UNIQUE_GESTION_V48 = true;
  var DRAPEAU = "pcmajo_reprise_cle_v48";
  try{
    if(sessionStorage.getItem(DRAPEAU)) return;      /* deja fait dans cette session : pas de boucle */

    var an = null;
    try{ an = localStorage.getItem("gestion_majorelle_annee"); }catch(e){}
    if(!an) an = (typeof ANNEE === "string") ? ANNEE : null;
    if(!an) return;

    var PREFIXE = "gestion_majorelle_v01", UNIQUE = PREFIXE + "__" + an;

    function richesse(brut){
      try{
        var o = JSON.parse(brut); if(!o || !o.classes) return -1;
        var n = 0;
        o.classes.forEach(function(c){ n += ((c.creneaux||[]).length) + ((c.eleves||[]).length); });
        return n;
      }catch(e){ return -1; }
    }

    var courant = localStorage.getItem(UNIQUE);
    var best = null, bestScore = richesse(courant);
    for(var i=0;i<localStorage.length;i++){
      var k = localStorage.key(i);
      if(!k || k === UNIQUE) continue;
      if(k.indexOf(PREFIXE + "__") !== 0) continue;
      if(k.slice(-("__" + an).length + 2) !== an) continue;   /* meme annee scolaire */
      var s = richesse(localStorage.getItem(k));
      if(s > bestScore){ bestScore = s; best = k; }
    }

    if(best){
      localStorage.setItem(UNIQUE, localStorage.getItem(best));   /* l'ancien tiroir reste intact */
      sessionStorage.setItem(DRAPEAU, best);
      location.reload();
    }else{
      sessionStorage.setItem(DRAPEAU, "rien");
    }
  }catch(e){}
})();

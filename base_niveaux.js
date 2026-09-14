/* base_niveaux.js — MODELE_NIVEAUX_V84 (MAITRE v84, 14/09/2026).
   ------------------------------------------------------------------------------
   LE SERVICE D'UN NIVEAU, GRAVE UNE FOIS, ET LES CLASSES REELLES QUI EN HERITENT.

   Pourquoi ce fichier existe : jusqu'ici AUCUN endroit ne disait ce que vaut une
   semaine de cours dans un niveau. Le « 1 h / 1,5 h / 2 h » etait redevine a chaque
   ecran en divisant des minutes par 55 — et le formateur abandonnait des que le
   nombre etait rond (« 90 min », « 115 min » tout nus). Le coefficient est
   desormais ECRIT.

   ★★★ LA REGLE QUI A COUTE UNE ERREUR AU MAITRE LE 14/09 (R0) :
   UNE DUREE NE SE SOMME JAMAIS SANS SON `quinzaine`. Un creneau `quinzaine:"A"`
   ou `"B"` n'a lieu qu'une semaine sur deux : il compte pour MOITIE dans un volume
   hebdomadaire. Douze creneaux sur cent en portent une, et LES DOUZE SONT EN
   SECONDE. Seconde moitie : un TP dedouble ne se compte qu'UNE fois (G1 et G2 sont
   deux fois le meme enseignement). `volumeHebdo()` ci-dessous est le SEUL endroit
   ou un volume se calcule. Aucun autre code ne somme un `duree`.

   Ce fichier ne lit rien d'autre que `BASE_HORAIRES` (la grille) et `BASE_EDT`
   (l'emploi du temps reel). Il n'ecrit RIEN, nulle part.
   ------------------------------------------------------------------------------ */
(function (root) {
  "use strict";

  /* =========================================================================
     1. LES PLACES — derivees de BASE_HORAIRES.sonneries, JAMAIS recopiees.
     Une place = une heure de cours de la grille. Les deux plages « midi » du
     carnet sont des places AUSSI : Laurent, 14/09 — « les lignes sans intitule
     peuvent contenir du cours ».
     ========================================================================= */
  function grille() {
    var g = root.BASE_HORAIRES;
    if (!g || !g.sonneries) throw new Error("MODELE_NIVEAUX_V84 : BASE_HORAIRES absent");
    return g;
  }
  function min(h) { var p = String(h).split(":"); return (+p[0]) * 60 + (+p[1]); }
  function hhmm(m) { return ("0" + Math.floor(m / 60)).slice(-2) + ":" + ("0" + (m % 60)).slice(-2); }

  /* NUMEROTATION VOULUE PAR LAURENT (14/09) : « M1 pour 8h donc M5 pour midi ».
     La journee compte NEUF places. M5 (12:05-13:00) est une place de plein droit :
     « les lignes sans intitule peuvent contenir du cours, Nicolas a du cours sur le
     creneau midi treize heure ». La SECONDE ligne de midi du carnet (12:30-13:25) est
     le DEUXIEME SERVICE de restauration, pas une place : elle chevauche M5 de 30 min
     et s'arrete 5 min avant S1. Elle est conservee en `services`, jamais posable. */
  function construirePlaces() {
    var g = grille(), out = [], nM = 0, nS = 0, services = [], rang = 0;
    ["matin", "apresmidi"].forEach(function (demi) {
      (g.sonneries[demi] || []).forEach(function (l) {
        if (l.t === "cours") {
          var code = (demi === "matin") ? ("M" + (++nM)) : ("S" + (++nS));
          out.push({ code: code, rang: ++rang, demi: demi, debut: l.deb, fin: l.fin,
                     min: min(l.fin) - min(l.deb), midi: false });
        } else if (l.t === "midi") {
          /* une plage de midi qui PROLONGE la derniere place (interclasse <= 10) est
             la place suivante ; celle qui chevauche est un second service. */
          var prec = out.length ? out[out.length - 1] : null;
          var colle = prec && (min(l.deb) - min(prec.fin)) >= 0 && (min(l.deb) - min(prec.fin)) <= 10;
          if (colle && !out.some(function (p) { return p.midi; })) {
            out.push({ code: "M" + (++nM), rang: ++rang, demi: "matin", debut: l.deb, fin: l.fin,
                       min: min(l.fin) - min(l.deb), midi: true });
          } else {
            services.push({ debut: l.deb, fin: l.fin, note: "second service de restauration — jamais une place" });
          }
        }
      });
    });
    out.SERVICES = services;
    return out;
  }
  var PLACES = null;
  function places() { return PLACES || (PLACES = construirePlaces()); }
  function servicesMidi() { return places().SERVICES || []; }
  function placeDe(debut) {
    var p = places(), i;
    for (i = 0; i < p.length; i++) if (p[i].debut === debut) return p[i];
    return null;                      /* R6 : un debut hors place est LEGITIME, on le signale */
  }
  /* R4/R5 : un debut `officiel` a 5 min pres d'une place est la RECOPIE administrative
     de cette place (la 2de GT5 porte « 12:00 / 60 min » pour M5 12:05-13:00 / 55 min).
     On le SIGNALE sans le recaler : `horsPlace` reste vrai. */
  function placeSupposee(debut) {
    var p = places(), i, d = min(debut);
    for (i = 0; i < p.length; i++) if (Math.abs(min(p[i].debut) - d) <= 5) return p[i];
    return null;
  }

  /* ★★★ LA COUPURE DE LA JOURNEE. Deux places ne se joignent que si l'ecart entre
     elles vaut au plus 10 min (un interclasse de 5, ou une recreation de 10).
     ENTRE M5 (fin 13:00) ET S1 (debut 13:30) IL Y A 30 MIN : c'est la SEULE coupure
     de la journee, et aucun bloc ne l'enjambe. */
  var ECART_MAX = 10;
  function emprise(codeDebut, nbPlaces) {
    var p = places();
    var i = p.findIndex(function (x) { return x.code === codeDebut; });
    if (i < 0 || i + nbPlaces > p.length) return null;
    var j;
    for (j = i; j < i + nbPlaces - 1; j++) {
      if (min(p[j + 1].debut) - min(p[j].fin) > ECART_MAX) return null;   /* coupure */
    }
    var a = p[i], b = p[i + nbPlaces - 1];
    return { debut: a.debut, fin: b.fin, min: min(b.fin) - min(a.debut),
             places: p.slice(i, i + nbPlaces).map(function (x) { return x.code; }) };
  }
  /* ★ Les emplacements ou un TP de 2nde dedouble PEUT se poser : il lui faut trois
     places qui valent EXACTEMENT 180 (85 + pause 10 + 85). M3+M4+M5 ne vaut que 175 —
     aucune recreation dedans — donc il est REFUSE. Mesure, pas supposition. */
  function emplacementsTP2nde() {
    return places().map(function (p) { return emprise(p.code, 3); })
                   .filter(function (e) { return e && e.min === 180; });
  }
  function emplacementsTP2h() {
    return places().map(function (p) { return emprise(p.code, 2); })
                   .filter(function (e) { return e && e.min >= 110; });
  }

  /* =========================================================================
     2. LES REGLES DE POSE — dites par Laurent le 14/09.
     • un COURS occupe UNE place, et n'oblige a rien ;
     • un TP occupe UNE place ET LA SUIVANTE, toujours ;
     • chaque seance porte l'option « groupe ou pas » ;
     • un TP de Seconde dure 1 h 30 (85), un TP ailleurs dure 2 h (110) ;
     • dedouble en Seconde, les deux groupes SE CHEVAUCHENT sur la place du
       milieu (85 + pause 10 + 85 = 180 = 3 places) ; ailleurs ils ne se
       chevauchent pas (110 + 110 = 4 places).
     ========================================================================= */
  var PAS = function () { return (+grille().pas) || 55; };

  /* minutes reelles d'un module, depuis son coefficient. R1/R2/R3. */
  function minutesDe(mod) {
    if (mod.min != null) return +mod.min;              /* valeur imposee (TP 2nde : 85) */
    return Math.round(mod.coef * PAS());               /* coef 1 -> 55 · coef 2 -> 110 */
  }

  /* R4 : `carnet` porte une DUREE de cours ; `officiel` porte une EMPRISE
     recopiee de l'administration. Une emprise ne s'ecrit jamais comme duree. */
  var CONVERSION = { 115: 110, 120: 110, 82: 85, 90: 85, 60: 55 };
  function dureeDeCours(creneau) {
    if (creneau.source === "carnet") return +creneau.duree;
    var d = +creneau.duree;
    return (CONVERSION[d] != null) ? CONVERSION[d] : d;
  }

  /* =========================================================================
     3. LE NIVEAU — abstrait. Declare le service, en coefficients. Ne connait ni
        jour, ni heure, ni professeur, ni salle.
     ========================================================================= */
  function Module(o) {
    this.role     = o.role;                       /* "Cours" | "TP" */
    this.coef     = o.coef;                       /* 1 | 1.5 | 2 — la langue de l'administration */
    this.min      = (o.min != null) ? o.min : null;
    this.places   = o.places;                     /* 1 pour un cours, 2 pour un TP */
    this.dedouble = !!o.dedouble;                 /* option « groupe ou pas » */
    this.chevauche= !!o.chevauche;                /* Seconde : les 2 groupes partagent la place du milieu */
    this.rythme   = o.rythme || "hebdo";          /* "hebdo" | "quinzaine" */
  }
  Module.prototype.minutes = function () { return minutesDe(this); };
  /* poids d'un module dans une semaine : la quinzaine compte pour moitie, et un
     module dedouble ne compte qu'UNE fois (l'eleve n'en suit qu'un). R0. */
  Module.prototype.parSemaine = function () {
    return this.minutes() * (this.rythme === "quinzaine" ? 0.5 : 1);
  };
  /* nombre de places que ce module consomme dans l'emploi du temps du PROF */
  Module.prototype.placesOccupees = function () {
    if (!this.dedouble) return this.places;
    return this.chevauche ? (2 * this.places - 1) : (2 * this.places);
  };

  function Niveau() {}
  Niveau.prototype.modules = function () { return this.constructor.modules; };
  Niveau.prototype.volumeDeclare = function () {
    var c = 0, t = 0;
    this.constructor.modules.forEach(function (m) {
      if (m.role === "TP") t += m.parSemaine(); else c += m.parSemaine();
    });
    return { cours: c, tp: t, total: c + t, pas: PAS() };
  };

  /* --- LES SEPT NIVEAUX, GRAVES. Mesures sur base_edt.js le 14/09/2026, et
         valides par Laurent (« tout ce que tu as ecrit est juste »). --------- */
  var DECLARATIONS = {
    "2nde|pc|gen": { libelle: "Seconde — Physique-chimie", modules: [
      { role: "Cours", coef: 1,   places: 1, rythme: "hebdo" },
      { role: "Cours", coef: 1,   places: 1, rythme: "quinzaine" },
      { role: "TP",    coef: 1.5, min: 85, places: 2, dedouble: true, chevauche: true }
    ]},
    "1ere|pc|gen": { libelle: "Première spé — Physique-chimie", modules: [
      { role: "Cours", coef: 2, places: 2 },
      { role: "TP",    coef: 2, places: 2 }
    ]},
    "tale|pc|gen": { libelle: "Terminale spé — Physique-chimie", modules: [
      { role: "Cours", coef: 2, places: 2 },
      { role: "Cours", coef: 2, places: 2 },
      { role: "TP",    coef: 2, places: 2 }
    ]},
    "1ere|pc|sti": { libelle: "Première STI2D — Physique-chimie", modules: [
      { role: "Cours", coef: 1, places: 1 },
      { role: "Cours", coef: 1, places: 1, dedouble: true },
      { role: "TP",    coef: 2, places: 2, dedouble: true }
    ]},
    "tale|pc|sti": { libelle: "Terminale STI2D — Physique-chimie", modules: [
      { role: "Cours", coef: 1, places: 1 },
      { role: "Cours", coef: 1, places: 1 },
      { role: "TP",    coef: 2, places: 2 }
    ]},
    "1ere|pc|ens": { libelle: "Première — Enseignement scientifique", modules: [
      { role: "Cours", coef: 1, places: 1 }
    ]},
    "tale|pc|ens": { libelle: "Terminale — Enseignement scientifique", modules: [
      { role: "Cours", coef: 1, places: 1 }
    ]}
    /* ⚠ ens. scientifique : PAS DE TP. Deduit par elimination depuis le debut
       (_BASE\enseignements.json : « TP rare — VETO possible de Laurent »).
       Son veto n'a jamais ete pose. */
  };

  var NIVEAUX = {};
  Object.keys(DECLARATIONS).forEach(function (key) {
    var d = DECLARATIONS[key];
    function N() { Niveau.call(this); }
    N.prototype = Object.create(Niveau.prototype);
    N.prototype.constructor = N;
    N.key = key; N.libelle = d.libelle;
    N.modules = d.modules.map(function (m) { return new Module(m); });
    NIVEAUX[key] = N;
  });

  /* =========================================================================
     4. LA CLASSE REELLE — elle HERITE de son niveau et gagne ses proprietes.
     ========================================================================= */
  var FILIERE = { gen: "gen", sti: "sti", ens: "ens" };
  function clefProgramme(famille, niveau) {
    var n = (niveau === "2de") ? "2nde" : (niveau === "1re" ? "1ere" : "tale");
    if (famille === "PC2de") return "2nde|pc|gen";
    if (famille === "spePC") return n + "|pc|gen";
    if (famille === "STI2D") return n + "|pc|sti";
    if (famille === "enssci") return n + "|pc|ens";
    return null;                                    /* NSI : hors physique-chimie */
  }

  function instancier(fiche) {
    var key = clefProgramme(fiche.famille, fiche.niveau);
    var Base = NIVEAUX[key];
    if (!Base) return null;
    function ClasseReelle() {                       /* elle HERITE du niveau */
      Base.call(this);
      this.nom   = fiche.nom;
      this.code  = fiche.code;
      this.prof  = fiche.prof;
      this.annee = fiche.annee;
      this.placements = fiche.creneaux.slice();     /* jour · debut · place · groupe · rythme */
    }
    ClasseReelle.prototype = Object.create(Base.prototype);
    ClasseReelle.prototype.constructor = ClasseReelle;
    ClasseReelle.modules = Base.modules;            /* herite, ne recopie pas */
    ClasseReelle.key = Base.key; ClasseReelle.libelle = Base.libelle;
    return new ClasseReelle();
  }

  /* ★ LE SEUL ENDROIT OU UN VOLUME HEBDOMADAIRE SE CALCULE (R0). ----------- */
  function volumeHebdo(classe) {
    var cours = 0, tp = 0, vus = {};
    (classe.placements || []).forEach(function (c) {
      var d = dureeDeCours(c);
      var poids = c.quinzaine ? 0.5 : 1;            /* ← R0, moitie de semaine */
      if (c.groupe) {                               /* ← R0, un dedouble compte UNE fois */
        var cle = c.role + "|" + (c.rang || "");
        if (vus[cle]) return;
        vus[cle] = true;
      }
      if (c.role === "TP") tp += d * poids; else cours += d * poids;
    });
    return { cours: cours, tp: tp, total: cours + tp };
  }

  /* lecture de BASE_EDT -> fiches de classes reelles, sans rien ecrire */
  function fichesDepuisBaseEdt(annee) {
    var b = root.BASE_EDT && root.BASE_EDT[annee];
    if (!b) return [];
    var par = {};
    Object.keys(b).forEach(function (prof) {
      b[prof].forEach(function (c) {
        var id = prof + "|" + c.nom;
        if (!par[id]) par[id] = { nom: c.nom, code: c.code, prof: prof, annee: annee,
                                  famille: c.famille, niveau: c.niveau, creneaux: [] };
        var pl = placeDe(c.debut), sup = pl ? null : placeSupposee(c.debut);
        par[id].creneaux.push({
          jour: c.jour, debut: c.debut, place: pl ? pl.code : null,
          horsPlace: !pl, placeSupposee: sup ? sup.code : null, duree: c.duree, source: c.source,
          role: (String(c.type).indexOf("TP") === 0) ? "TP" : "Cours",
          groupe: c.groupe || null, quinzaine: c.quinzaine || null,
          rang: (String(c.type).indexOf("TP") === 0) ? "tp" : null
        });
      });
    });
    return Object.keys(par).map(function (k) { return par[k]; });
  }

  /* =========================================================================
     5. VERIFICATION — le modele doit REPRODUIRE la donnee reelle, sinon il ment.
     ========================================================================= */
  function verifier(annee) {
    var rapport = { annee: annee, classes: [], ecarts: [], places: places().length };
    fichesDepuisBaseEdt(annee).forEach(function (f) {
      var cl = instancier(f);
      if (!cl) return;                              /* NSI : hors perimetre */
      var mesure = volumeHebdo(cl), declare = cl.volumeDeclare();
      var ok = Math.abs(mesure.cours - declare.cours) < 0.6 &&
               Math.abs(mesure.tp    - declare.tp)    < 0.6;
      rapport.classes.push({ nom: cl.nom, prof: cl.prof, niveau: cl.constructor.key,
                             mesure: mesure, declare: declare, ok: ok });
      if (!ok) rapport.ecarts.push(cl.prof + "/" + cl.nom + " : mesure " +
                 mesure.cours + "+" + mesure.tp + " vs declare " + declare.cours + "+" + declare.tp);
    });
    return rapport;
  }

  root.MODELE_NIVEAUX = {
    version: "MODELE_NIVEAUX_V84",
    places: places, placeDe: placeDe, placeSupposee: placeSupposee,
    servicesMidi: servicesMidi, emprise: emprise,
    emplacementsTP2nde: emplacementsTP2nde, emplacementsTP2h: emplacementsTP2h,
    NIVEAUX: NIVEAUX, DECLARATIONS: DECLARATIONS,
    instancier: instancier, volumeHebdo: volumeHebdo,
    fichesDepuisBaseEdt: fichesDepuisBaseEdt, dureeDeCours: dureeDeCours,
    verifier: verifier
  };
})(window);

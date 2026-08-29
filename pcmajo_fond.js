/* pcmajo_fond.js — FOND_REACTIF_V49
   ------------------------------------------------------------------
   Le fond de la page raconte le travail fourni.
   Au depart : une nappe calme. L'eclair apparait a mesure que l'eleve
   joue des cartes le soir, et palit s'il s'arrete.

   Les regles, arretees avec Laurent :
     +1 point par carte JOUEE  (juste ou fausse : on valorise le travail,
                                pas l'aisance)
     x2 le soir meme du cours  (faire le test le jour du cours, c'est la
                                seule chose qui vaut double)
     -7 % par jour ecoule      (l'elan retombe si on s'arrete)
     plafond 80 points         = eclair a pleine intensite

   Tout vit dans le navigateur de l'eleve. Rien n'est envoye nulle part,
   rien n'est compare a personne : il n'y a pas de classement.

   Les images portent leur propre transparence (le blanc a ete retire) :
   elles se posent aussi bien sur un theme clair que sur un theme sombre,
   sans mix-blend-mode et sans bord carre.
   ------------------------------------------------------------------ */
(function () {
  "use strict";
  var LS = "pcmajo_elan_v49";
  var PLAFOND = 80;          /* points pour l'eclair a pleine intensite */
  var GARDE = 0.93;          /* ce qui reste apres un jour sans rien faire */
  var OPACITE_NAPPES = 0.42;
  var OPACITE_ECLAIR = 0.72;

  function jour() {          /* numero de jour LOCAL ; suit la date simulee du mode test */
    var d = new Date();
    return Math.floor((d.getTime() - d.getTimezoneOffset() * 60000) / 86400000);
  }

  function brut() {
    try {
      var o = JSON.parse(localStorage.getItem(LS) || "null");
      if (o && typeof o.p === "number" && typeof o.j === "number") return o;
    } catch (e) {}
    return { p: 0, j: jour() };
  }

  function graver(o) { try { localStorage.setItem(LS, JSON.stringify(o)); } catch (e) {} }

  /* lire() applique la decroissance AVANT de repondre : l'elan d'hier n'est
     jamais celui d'aujourd'hui. */
  function lire() {
    var o = brut(), n = jour() - o.j;
    if (n > 0) { o.p = o.p * Math.pow(GARDE, n); o.j = jour(); graver(o); }
    else if (n < 0) { o.j = jour(); graver(o); }   /* date reculee : on ne punit pas */
    var p = Math.max(0, Math.min(PLAFOND, o.p));
    return { points: p, elan: p / PLAFOND };
  }

  function point(double) {
    var o = brut(), n = jour() - o.j;
    if (n !== 0) { o.p = n > 0 ? o.p * Math.pow(GARDE, n) : o.p; o.j = jour(); }
    o.p = Math.min(PLAFOND, Math.max(0, o.p) + (double ? 2 : 1));
    graver(o);
    peindre();
    return o.p;
  }

  var CSS =
    '#pcmajo-fond{position:fixed;inset:0;z-index:0;pointer-events:none;overflow:hidden}' +
    '#pcmajo-fond i{position:absolute;inset:0;display:block;background-repeat:no-repeat;' +
      'transition:opacity 1.4s ease}' +
    '#pcmajo-fond .nappes{background-image:url("fonds/nappes.webp");' +
      'background-position:center bottom;background-size:cover;opacity:' + OPACITE_NAPPES + '}' +
    '#pcmajo-fond .eclair{background-image:url("fonds/eclair.webp");' +
      'background-position:76% 34%;background-size:78vmax auto;opacity:0}' +
    '@media (max-width:640px){#pcmajo-fond .eclair{background-position:70% 40%;background-size:118vmax auto}}' +
    /* Sans ceci le fond ne sert a rien sur le test du soir : les cartes blanches
       couvrent presque tout l'ecran et il ne reste que les marges. On les rend
       legerement translucides — le texte ne bouge pas, l'atmosphere passe dessous.
       Les navigateurs qui ignorent color-mix laissent simplement les cartes opaques. */
    '.card,.pilote{background-color:color-mix(in srgb, var(--card,#fff) 82%, transparent);' +
      '-webkit-backdrop-filter:blur(3px);backdrop-filter:blur(3px)}' +
    '@media print{#pcmajo-fond{display:none}}' +
    '@media (prefers-reduced-motion:reduce){#pcmajo-fond i{transition:none}}';

  /* Le fond est en `position:fixed` : sans precaution il passerait DEVANT le
     contenu, qui lui est en flux normal. On ne pose donc pas une regle CSS
     large — une premiere version mettait `position:relative` sur tous les
     enfants de <body> et decollait le bouton de theme, qui etait `fixed`.
     On ne touche qu'aux elements reellement STATIQUES, un par un. */
  function empiler() {
    var l = document.body.children;
    for (var i = 0; i < l.length; i++) {
      var e = l[i];
      if (e.id === "pcmajo-fond" || e.tagName === "SCRIPT" || e.tagName === "STYLE") continue;
      var cs = window.getComputedStyle(e);
      if (cs.position === "static") e.style.position = "relative";
      if (cs.zIndex === "auto") e.style.zIndex = "1";
    }
  }

  function poser() {
    if (document.getElementById("pcmajo-fond")) return;
    var s = document.createElement("style"); s.textContent = CSS;
    document.head.appendChild(s);
    var d = document.createElement("div"); d.id = "pcmajo-fond";
    d.innerHTML = '<i class="nappes"></i><i class="eclair"></i>';
    document.body.insertBefore(d, document.body.firstChild);
    empiler();
  }

  function peindre() {
    poser();
    var e = document.querySelector("#pcmajo-fond .eclair");
    if (e) e.style.opacity = (lire().elan * OPACITE_ECLAIR).toFixed(3);
  }

  /* La regle doit rester lisible en permanence : personne ne doit avoir a
     deviner ce que le fond recompense. */
  var TEXTE = "Le fond s’allume avec le nombre de cartes que tu joues le soir "
            + "— pas avec tes bonnes réponses. Il pâlit si tu t’arrêtes. "
            + "Rien n’est envoyé nulle part, et il n’y a pas de classement.";

  function ligne(ou) {
    var hote = (typeof ou === "string" ? document.querySelector(ou) : ou) || document.body;
    if (!hote || document.getElementById("pcmajo-regle-fond")) return;
    var p = document.createElement("p");
    p.id = "pcmajo-regle-fond";
    p.style.cssText = "margin:16px auto 0;padding:0 18px;max-width:62ch;text-align:center;"
                    + "font-size:12px;line-height:1.5;opacity:.7";
    p.textContent = TEXTE;
    hote.appendChild(p);
  }

  /* REGLAGE_A_LA_MAIN_V49 : `?elan=0..80` pose l'elan pour voir le fond tout de
     suite, sans jouer quatre-vingts cartes. Reserve au mode test (`?test=1`), comme
     tout le reste de l'outillage : un eleve ne peut pas se peindre un fond. */
  function reglageManuel() {
    try {
      if (!window.PCTest || !PCTest.arme) return;
      var v = new URLSearchParams(location.search).get("elan");
      if (v === null) return;
      var p = Math.max(0, Math.min(PLAFOND, parseFloat(v) || 0));
      graver({ p: p, j: jour() });
    } catch (e) {}
  }

  window.PCFond = { lire: lire, point: point, peindre: peindre, ligne: ligne,
                    texte: TEXTE, PLAFOND: PLAFOND, OPACITE_ECLAIR: OPACITE_ECLAIR };

  reglageManuel();
  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", peindre);
  else peindre();
})();

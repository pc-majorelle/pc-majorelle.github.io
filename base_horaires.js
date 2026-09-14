/* base_horaires.js — GRILLE_V81, renomme par RENOMMAGE_V82 (MAITRE v82, 14/09/2026).
   LES HORAIRES DU LYCEE, A UN SEUL ENDROIT : la grille, les sonneries du carnet de
   correspondance et la regle des coefficients de Laurent. Le global est BASE_HORAIRES.
   (Ancien nom, jusqu'au 14/09/2026 : base_grille.js / window.BASE_GRILLE.)
   Pourquoi ce fichier existe : la duree d'une heure de cours etait ecrite en dur
   a une quinzaine d'endroits, avec TROIS valeurs differentes selon le fichier
   (120 dans constructeur.html, 90 dans gestion_core.js, 55 / 60 / 90 dans
   ma_semaine.html). Un creneau dont la duree manquait valait donc 55, 60, 90 ou
   120 minutes SELON L'ECRAN QUI LE REGARDAIT. Desormais tous lisent ceci.
   Valeurs reprises telles quelles de GRILLE_V50 (ma_semaine.html) : un cours dure
   55 min, l'interclasse 5, la recreation 10.
   C'EST LA SEULE TABLE A CHANGER LE JOUR OU LE LYCEE BOUGE SES HORAIRES.
   (ma_semaine.html garde pour l'instant sa propre copie de ces valeurs : ce fichier
   ne doit pas etre modifie sans le geste de Laurent. A reunir plus tard.) */
window.BASE_HORAIRES = {
  pas: 55,            /* duree d'une heure de cours, en minutes */
  interclasse: 5,     /* entre deux heures consecutives */
  recre: 10,          /* duree d'une recreation */

  /* =====================================================================
     HORAIRES DE SONNERIES — TABLE MODIFIABLE A LA MAIN.
     Recopies du carnet de correspondance du lycee (scan depose par Laurent le
     14/09/2026). C'est ICI, et nulle part ailleurs, qu'on corrige une sonnerie :
     la page « Dates de cours » du gestionnaire ne fait que lire cette table.
     `t` : "cours" | "interclasse" | "recreation" | "midi".
     ⚠ Les deux lignes `midi` sont SANS INTITULE dans le carnet. Laurent, 14/09 :
     ce ne sont PAS des services de restauration — CES PLAGES PEUVENT PORTER DU COURS
     (un collegue a cours sur le creneau de midi). Ne jamais les traiter comme du
     temps indisponible.
     ===================================================================== */
  sonneries: {
    source: "Carnet de correspondance — « Horaires de sonneries » (scan du 14/09/2026)",
    matin: [
      { t:"interclasse", deb:"07:55", fin:"08:00" },
      { t:"cours",       deb:"08:00", fin:"08:55" },
      { t:"interclasse", deb:"08:55", fin:"09:00" },
      { t:"cours",       deb:"09:00", fin:"09:55" },
      { t:"recreation",  deb:"09:55", fin:"10:05" },
      { t:"cours",       deb:"10:05", fin:"11:00" },
      { t:"interclasse", deb:"11:00", fin:"11:05" },
      { t:"cours",       deb:"11:05", fin:"12:00" },
      { t:"midi",        deb:"12:05", fin:"13:00" }
    ],
    apresmidi: [
      { t:"midi",        deb:"12:30", fin:"13:25" },
      { t:"interclasse", deb:"13:25", fin:"13:30" },
      { t:"cours",       deb:"13:30", fin:"14:25" },
      { t:"interclasse", deb:"14:25", fin:"14:30" },
      { t:"cours",       deb:"14:30", fin:"15:25" },
      { t:"recreation",  deb:"15:25", fin:"15:35" },
      { t:"cours",       deb:"15:35", fin:"16:30" },
      { t:"interclasse", deb:"16:30", fin:"16:35" },
      { t:"cours",       deb:"16:35", fin:"17:30" }
    ]
  },

  /* =====================================================================
     LA REGLE DES DUREES — dite par Laurent le 14/09/2026, mot pour mot :
     « pour des raisons pratiques l'administration parle de creneaux de 1h ou 1,5h
       ou 2h et (...) en realite il s'agit de coefficients appliques a 55 mn. »
     • coef 1   = 55 min.
     • coef 2   = « 55 mn deux fois qui commencent a l'horaire officiel »
                   (8:00-8:55 PUIS 9:00-9:55) = 110 min de cours.
                   « A charge de l'enseignant de laisser la pause entre les deux. »
                   → Les 115 de base_edt.js sont l'EMPRISE (8:00 → 9:55), pas la duree
                     de cours ; ils viennent des lignes `source:"officiel"`, tandis que
                     les lignes `source:"carnet"` de Laurent portent bien 110.
     • coef 1,5 = 55 × 1,5 = 82,5 min. La seance commence a l'horaire officiel, mais
                   la duree officielle ne s'applique pas : « ca ne tomberait pas juste
                   car les horaires officielles procedent par pas de 5 mn ».
     • SECONDE, arrangement avec la SVT : une pause de 10 min, DE h+25 A h+35.
     ===================================================================== */
  coefficient: { pas: 55, interclasse: 5, arrondiAffichage: 5 },
  pause2nde:   { debMin: 25, finMin: 35, duree: 10,
                 note: "arrangement avec la SVT — pause de 10 min, de h+25 a h+35" },
  reperes: [["M0","08:00"],["M1","09:00"],["M2","10:05"],["M3","11:05"],
            ["S1","13:30"],["S2","14:30"],["S3","15:35"],["S4","16:35"]],
  recres:  [["09:55","10:05"],["15:25","15:35"]],
  repas:   ["12:00","13:30"]
};

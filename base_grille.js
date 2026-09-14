/* base_grille.js — GRILLE_V81 (MAITRE v81, 13/09/2026).
   LA GRILLE HORAIRE DU LYCEE, A UN SEUL ENDROIT.
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
window.BASE_GRILLE = {
  pas: 55,            /* duree d'une heure de cours, en minutes */
  interclasse: 5,     /* entre deux heures consecutives */
  recre: 10,          /* duree d'une recreation */
  reperes: [["M0","08:00"],["M1","09:00"],["M2","10:05"],["M3","11:05"],
            ["S1","13:30"],["S2","14:30"],["S3","15:35"],["S4","16:35"]],
  recres:  [["09:55","10:05"],["15:25","15:35"]],
  repas:   ["12:00","13:30"]
};

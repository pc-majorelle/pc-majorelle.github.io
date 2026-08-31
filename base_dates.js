/* base_dates.js — ECRIT PAR _BASE\exporter_edt_site_v53.py. NE PAS EDITER A LA MAIN.
   Les dates cles, lues dans _BASE\dates_cles.json (ecrit a la main, jamais regenere).
   Les dates OFFICIELLES (rentree, vacances, feries) viennent des sources publiques ;
   le DEBUT et la FIN DES COURS viennent de Laurent, sont portes PAR NIVEAU, et
   changent — c'est pourquoi ils ne doivent jamais etre ecrits en dur dans une page.
   Regenere par : python exporter_edt_site_v53.py */
window.BASE_DATES = {
 "2025-2026": {
  "debut_cours": {
   "_": "2025-09-01"
  },
  "feries_en_classe": [
   "2025-11-11",
   "2026-04-06",
   "2026-05-01",
   "2026-05-08",
   "2026-05-14",
   "2026-05-25"
  ],
  "feries_hors_classe": [
   "2025-11-01",
   "2025-12-25",
   "2026-01-01"
  ],
  "fin_cours": {
   "1re": "2026-06-12",
   "2de": "2026-06-12",
   "Tale": "2026-06-12",
   "_": "2026-06-12"
  },
  "ponts": [
   "2026-05-15"
  ],
  "rentree_eleves": "2025-09-01",
  "vacances": [
   {
    "debut": "2025-10-18",
    "nom": "Toussaint",
    "reprise": "2025-11-03"
   },
   {
    "debut": "2025-12-20",
    "nom": "Noel",
    "reprise": "2026-01-05"
   },
   {
    "debut": "2026-02-14",
    "nom": "Hiver",
    "reprise": "2026-03-02"
   },
   {
    "debut": "2026-04-11",
    "nom": "Printemps",
    "reprise": "2026-04-27"
   },
   {
    "debut": "2026-07-04",
    "nom": "Ete",
    "reprise": null
   }
  ]
 },
 "2026-2027": {
  "debut_cours": {
   "_": "2026-09-01"
  },
  "feries_en_classe": [
   "2026-11-11",
   "2027-03-29",
   "2027-05-06",
   "2027-05-17"
  ],
  "feries_hors_classe": [
   "2026-11-01",
   "2026-12-25",
   "2027-01-01",
   "2027-05-01",
   "2027-05-08"
  ],
  "fin_cours": {
   "1re": "2027-06-12",
   "2de": "2027-06-12",
   "Tale": "2027-06-12",
   "_": "2027-06-12"
  },
  "ponts": [
   "2027-05-07"
  ],
  "rentree_eleves": "2026-09-01",
  "vacances": [
   {
    "debut": "2026-10-17",
    "nom": "Toussaint",
    "reprise": "2026-11-02"
   },
   {
    "debut": "2026-12-19",
    "nom": "Noel",
    "reprise": "2027-01-04"
   },
   {
    "debut": "2027-02-20",
    "nom": "Hiver",
    "reprise": "2027-03-08"
   },
   {
    "debut": "2027-04-17",
    "nom": "Printemps",
    "reprise": "2027-05-03"
   },
   {
    "debut": "2027-07-03",
    "nom": "Ete",
    "reprise": null
   }
  ]
 }
};

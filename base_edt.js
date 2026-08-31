/* base_edt.js — ECRIT PAR _BASE\exporter_edt_site_v53.py. NE PAS EDITER A LA MAIN.
   L'emploi du temps que les pages doivent lire. Priorite : le CARNET du professeur
   s'il existe, sinon l'EDT OFFICIEL de l'etablissement (PDF Index Education du
   26/08/2026) recale sur la grille du lycee. Chaque creneau porte `source` :
   "carnet" ou "officiel" — une page peut donc dire d'ou
   vient ce qu'elle montre. Regenere par : python exporter_edt_site_v53.py */
window.BASE_EDT = {
 "2026-2027": {
  "AGENOR": [
   {
    "code": "TSTI2D",
    "debut": "08:00",
    "duree": 110,
    "famille": "STI2D",
    "groupe": null,
    "jour": "jeudi",
    "niveau": "Tale",
    "nom": "Tale STI2D",
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "carnet",
    "type": "TP"
   },
   {
    "code": "TENS-6",
    "debut": "10:05",
    "duree": 55,
    "famille": "enssci",
    "groupe": null,
    "jour": "jeudi",
    "niveau": "Tale",
    "nom": "Tale ens.sci. TG7",
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "carnet",
    "type": "Cours"
   },
   {
    "code": "2NDE",
    "debut": "14:30",
    "duree": 55,
    "famille": "PC2de",
    "groupe": null,
    "jour": "jeudi",
    "niveau": "2de",
    "nom": "2de GT3",
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "carnet",
    "type": "Cours"
   },
   {
    "code": "TSPE-PHY1",
    "debut": "15:35",
    "duree": 110,
    "famille": "spePC",
    "groupe": null,
    "jour": "jeudi",
    "niveau": "Tale",
    "nom": "TPH-CHGR3",
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "carnet",
    "type": "TP"
   },
   {
    "code": "TSPE-PHY1",
    "debut": "08:00",
    "duree": 110,
    "famille": "spePC",
    "groupe": null,
    "jour": "mardi",
    "niveau": "Tale",
    "nom": "TPH-CHGR3",
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "carnet",
    "type": "Cours"
   },
   {
    "code": "TSTI2D",
    "debut": "10:05",
    "duree": 55,
    "famille": "STI2D",
    "groupe": null,
    "jour": "mardi",
    "niveau": "Tale",
    "nom": "Tale STI2D",
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "carnet",
    "type": "Cours"
   },
   {
    "code": "TSPE-PHY1",
    "debut": "10:05",
    "duree": 110,
    "famille": "spePC",
    "groupe": null,
    "jour": "mercredi",
    "niveau": "Tale",
    "nom": "TPH-CHGR3",
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "carnet",
    "type": "Cours"
   },
   {
    "code": "TENS-4",
    "debut": "08:00",
    "duree": 55,
    "famille": "enssci",
    "groupe": null,
    "jour": "vendredi",
    "niveau": "Tale",
    "nom": "Tale ens.sci. TG5",
    "pp": true,
    "quinzaine": null,
    "relais": [
     [
      "AGENOR",
      "0,5"
     ],
     [
      "HALOUM",
      "0,25"
     ],
     [
      "HAMMA",
      "0,25"
     ]
    ],
    "source": "carnet",
    "type": "Cours"
   },
   {
    "code": "TSTI2D",
    "debut": "09:00",
    "duree": 55,
    "famille": "STI2D",
    "groupe": null,
    "jour": "vendredi",
    "niveau": "Tale",
    "nom": "Tale STI2D",
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "carnet",
    "type": "Cours"
   },
   {
    "code": "TENS-5",
    "debut": "10:05",
    "duree": 55,
    "famille": "enssci",
    "groupe": null,
    "jour": "vendredi",
    "niveau": "Tale",
    "nom": "Tale ens.sci. TG6",
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "carnet",
    "type": "Cours"
   },
   {
    "code": "2NDE",
    "debut": "11:05",
    "duree": 55,
    "famille": "PC2de",
    "groupe": null,
    "jour": "vendredi",
    "niveau": "2de",
    "nom": "2de GT3",
    "pp": false,
    "quinzaine": "A",
    "relais": null,
    "source": "carnet",
    "type": "Cours"
   },
   {
    "code": "2NDE",
    "debut": "13:30",
    "duree": 82,
    "famille": "PC2de",
    "groupe": "G1",
    "jour": "vendredi",
    "niveau": "2de",
    "nom": "2de GT3",
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "carnet",
    "type": "TP"
   },
   {
    "code": "2NDE",
    "debut": "15:08",
    "duree": 82,
    "famille": "PC2de",
    "groupe": "G2",
    "jour": "vendredi",
    "niveau": "2de",
    "nom": "2de GT3",
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "carnet",
    "type": "TP"
   }
  ],
  "BASTIAN": [
   {
    "code": "TSPE-CHGR2",
    "debut": "13:30",
    "duree": 115,
    "famille": "spePC",
    "groupe": null,
    "jour": "jeudi",
    "niveau": "Tale",
    "nom": "Tale spé PC (CHGR2)",
    "officiel": {
     "classe": null,
     "debut": "13:30",
     "fin": "15:30",
     "groupe": "TPH-CHGR2",
     "type_origine": "etiquette de Laurent « Cours TSPE PHY2 » — groupe PHY2 = TPH-CHGR2, meme jour, heure decalee (15:30 dans l'etiquette)"
    },
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "officiel",
    "type": "Cours"
   },
   {
    "code": "2NDE-GT2",
    "debut": "15:35",
    "duree": 55,
    "famille": "PC2de",
    "groupe": null,
    "jour": "jeudi",
    "niveau": "2de",
    "nom": "2de GT2",
    "officiel": {
     "classe": "2NDGT2",
     "debut": "15:30",
     "fin": "16:30",
     "groupe": null,
     "type_origine": "regle : le reste est du cours"
    },
    "pp": false,
    "quinzaine": "B",
    "relais": null,
    "source": "officiel",
    "type": "Cours"
   },
   {
    "code": "1G5",
    "debut": "08:00",
    "duree": 55,
    "famille": "enssci",
    "groupe": null,
    "jour": "lundi",
    "niveau": "1re",
    "nom": "1re ens.sci. 1G5",
    "officiel": {
     "classe": "1G5",
     "debut": "08:00",
     "fin": "09:00",
     "groupe": null,
     "type_origine": "regle : ens. scientifique, 1 h/classe, cours"
    },
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "officiel",
    "type": "Cours"
   },
   {
    "code": "1G3",
    "debut": "10:05",
    "duree": 55,
    "famille": "enssci",
    "groupe": null,
    "jour": "lundi",
    "niveau": "1re",
    "nom": "1re ens.sci. 1G3",
    "officiel": {
     "classe": "1G3",
     "debut": "10:00",
     "fin": "11:00",
     "groupe": null,
     "type_origine": "regle : ens. scientifique, 1 h/classe, cours"
    },
    "pp": false,
    "quinzaine": null,
    "relais": [
     [
      "BASTIAN",
      "0,5"
     ],
     [
      "GIRSCH",
      "0,25"
     ],
     [
      "PARISE",
      "0,25"
     ]
    ],
    "source": "officiel",
    "type": "Cours"
   },
   {
    "code": "2NDE-GT2",
    "debut": "13:30",
    "duree": 82,
    "famille": "PC2de",
    "groupe": "G1",
    "jour": "lundi",
    "niveau": "2de",
    "nom": "2de GT2",
    "officiel": {
     "classe": null,
     "debut": "13:30",
     "fin": "15:00",
     "groupe": "2 2P.1",
     "type_origine": "regle : Secondes, tous les blocs de 3 h sont des TP"
    },
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "officiel",
    "type": "TP"
   },
   {
    "code": "2NDE-GT2",
    "debut": "15:00",
    "duree": 90,
    "famille": "PC2de",
    "groupe": "G2",
    "jour": "lundi",
    "niveau": "2de",
    "nom": "2de GT2",
    "officiel": {
     "classe": null,
     "debut": "15:00",
     "fin": "16:30",
     "groupe": "2 2P.2",
     "type_origine": "regle : Secondes, tous les blocs de 3 h sont des TP"
    },
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "officiel",
    "type": "TP"
   },
   {
    "code": "TSPE-CHGR2",
    "debut": "10:05",
    "duree": 115,
    "famille": "spePC",
    "groupe": null,
    "jour": "mardi",
    "niveau": "Tale",
    "nom": "Tale spé PC (CHGR2)",
    "officiel": {
     "classe": null,
     "debut": "10:00",
     "fin": "12:00",
     "groupe": "TPH-CHGR2",
     "type_origine": "etiquette de Laurent « Cours TSPE PHY2 » — groupe PHY2 = TPH-CHGR2, meme jour, heure decalee (08:00 dans l'etiquette)"
    },
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "officiel",
    "type": "Cours"
   },
   {
    "code": "2NDE-GT5",
    "debut": "13:30",
    "duree": 82,
    "famille": "PC2de",
    "groupe": "G1",
    "jour": "mardi",
    "niveau": "2de",
    "nom": "2de GT5",
    "officiel": {
     "classe": null,
     "debut": "13:30",
     "fin": "15:00",
     "groupe": "2 5P.1",
     "type_origine": "regle : Secondes, tous les blocs de 3 h sont des TP"
    },
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "officiel",
    "type": "TP"
   },
   {
    "code": "2NDE-GT5",
    "debut": "15:00",
    "duree": 90,
    "famille": "PC2de",
    "groupe": "G2",
    "jour": "mardi",
    "niveau": "2de",
    "nom": "2de GT5",
    "officiel": {
     "classe": null,
     "debut": "15:00",
     "fin": "16:30",
     "groupe": "2 5P.2",
     "type_origine": "regle : Secondes, tous les blocs de 3 h sont des TP"
    },
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "officiel",
    "type": "TP"
   },
   {
    "code": "2NDE-GT5",
    "debut": "16:35",
    "duree": 55,
    "famille": "PC2de",
    "groupe": null,
    "jour": "mardi",
    "niveau": "2de",
    "nom": "2de GT5",
    "officiel": {
     "classe": "2NDGT5",
     "debut": "16:30",
     "fin": "17:30",
     "groupe": null,
     "type_origine": "regle : le reste est du cours"
    },
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "officiel",
    "type": "Cours"
   },
   {
    "code": "TSPE-CHGR2",
    "debut": "08:00",
    "duree": 115,
    "famille": "spePC",
    "groupe": null,
    "jour": "mercredi",
    "niveau": "Tale",
    "nom": "Tale spé PC (CHGR2)",
    "officiel": {
     "classe": null,
     "debut": "08:00",
     "fin": "10:00",
     "groupe": "TPH-CHGR2",
     "type_origine": "etiquette de Laurent « TP TSPE PHY2 » — groupe PHY2 = TPH-CHGR2, meme jour, heure decalee (10:00 dans l'etiquette)"
    },
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "officiel",
    "type": "TP"
   },
   {
    "code": "1G6",
    "debut": "10:05",
    "duree": 55,
    "famille": "enssci",
    "groupe": null,
    "jour": "mercredi",
    "niveau": "1re",
    "nom": "1re ens.sci. 1G6",
    "officiel": {
     "classe": "1G6",
     "debut": "10:00",
     "fin": "11:00",
     "groupe": null,
     "type_origine": "regle : ens. scientifique, 1 h/classe, cours"
    },
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "officiel",
    "type": "Cours"
   },
   {
    "code": "2NDE-GT2",
    "debut": "11:05",
    "duree": 55,
    "famille": "PC2de",
    "groupe": null,
    "jour": "mercredi",
    "niveau": "2de",
    "nom": "2de GT2",
    "officiel": {
     "classe": "2NDGT2",
     "debut": "11:00",
     "fin": "12:00",
     "groupe": null,
     "type_origine": "regle : le reste est du cours"
    },
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "officiel",
    "type": "Cours"
   },
   {
    "code": "2NDE-GT5",
    "debut": "12:00",
    "duree": 60,
    "famille": "PC2de",
    "groupe": null,
    "jour": "mercredi",
    "niveau": "2de",
    "nom": "2de GT5",
    "officiel": {
     "classe": "2NDGT5",
     "debut": "12:00",
     "fin": "13:00",
     "groupe": null,
     "type_origine": "regle : le reste est du cours"
    },
    "pp": false,
    "quinzaine": "A",
    "relais": null,
    "source": "officiel",
    "type": "Cours"
   }
  ],
  "GIRSCH": [
   {
    "code": "1STI2D",
    "debut": "08:00",
    "duree": 55,
    "famille": "STI2D",
    "groupe": null,
    "jour": "lundi",
    "niveau": "1re",
    "nom": "1re STI2D",
    "officiel": {
     "classe": "1STI2D",
     "debut": "08:00",
     "fin": "09:00",
     "groupe": null,
     "type_origine": "regle : un seul creneau de 2 h en TP, le reste est du cours"
    },
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "officiel",
    "type": "Cours"
   },
   {
    "code": "1G3",
    "debut": "10:05",
    "duree": 55,
    "famille": "enssci",
    "groupe": null,
    "jour": "lundi",
    "niveau": "1re",
    "nom": "1re ens.sci. 1G3",
    "officiel": {
     "classe": "1G3",
     "debut": "10:00",
     "fin": "11:00",
     "groupe": null,
     "type_origine": "regle : ens. scientifique, 1 h/classe, cours"
    },
    "pp": false,
    "quinzaine": null,
    "relais": [
     [
      "BASTIAN",
      "0,5"
     ],
     [
      "GIRSCH",
      "0,25"
     ],
     [
      "PARISE",
      "0,25"
     ]
    ],
    "source": "officiel",
    "type": "Cours"
   },
   {
    "code": "1G4",
    "debut": "11:05",
    "duree": 55,
    "famille": "enssci",
    "groupe": null,
    "jour": "lundi",
    "niveau": "1re",
    "nom": "1re ens.sci. 1G4",
    "officiel": {
     "classe": "1G4",
     "debut": "11:00",
     "fin": "12:00",
     "groupe": null,
     "type_origine": "regle : ens. scientifique, 1 h/classe, cours"
    },
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "officiel",
    "type": "Cours"
   },
   {
    "code": "1STI2D",
    "debut": "08:00",
    "duree": 115,
    "famille": "STI2D",
    "groupe": "G1",
    "jour": "mardi",
    "niveau": "1re",
    "nom": "1re STI2D",
    "officiel": {
     "classe": null,
     "debut": "08:00",
     "fin": "10:00",
     "groupe": "1STI2DP.1",
     "type_origine": "etiquette de Laurent « 1STI A TP » — groupe A = 1STI2DP.1"
    },
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "officiel",
    "type": "TP"
   },
   {
    "code": "1STI2D",
    "debut": "10:05",
    "duree": 115,
    "famille": "STI2D",
    "groupe": "G2",
    "jour": "mardi",
    "niveau": "1re",
    "nom": "1re STI2D",
    "officiel": {
     "classe": null,
     "debut": "10:00",
     "fin": "12:00",
     "groupe": "1STI2DP.2",
     "type_origine": "etiquette de Laurent « 1STI B TP » — groupe B = 1STI2DP.2"
    },
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "officiel",
    "type": "TP"
   },
   {
    "code": "1STI2D",
    "debut": "08:00",
    "duree": 55,
    "famille": "STI2D",
    "groupe": "G1",
    "jour": "vendredi",
    "niveau": "1re",
    "nom": "1re STI2D",
    "officiel": {
     "classe": null,
     "debut": "08:00",
     "fin": "09:00",
     "groupe": "1STI2DP.1",
     "type_origine": "etiquette de Laurent « 1STI A Cours » — groupe A = 1STI2DP.1, meme jour, heure decalee (09:00 dans l'etiquette)"
    },
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "officiel",
    "type": "Cours"
   },
   {
    "code": "1STI2D",
    "debut": "09:00",
    "duree": 55,
    "famille": "STI2D",
    "groupe": "G2",
    "jour": "vendredi",
    "niveau": "1re",
    "nom": "1re STI2D",
    "officiel": {
     "classe": null,
     "debut": "09:00",
     "fin": "10:00",
     "groupe": "1STI2DP.2",
     "type_origine": "etiquette de Laurent « 1STI B Cours » — groupe B = 1STI2DP.2, meme jour, heure decalee (08:00 dans l'etiquette)"
    },
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "officiel",
    "type": "Cours"
   }
  ],
  "HALOUM": [
   {
    "code": "1PC-CHGR4",
    "debut": "08:00",
    "duree": 115,
    "famille": "spePC",
    "groupe": null,
    "jour": "jeudi",
    "niveau": "1re",
    "nom": "1re spé PC (CHGR4)",
    "officiel": {
     "classe": null,
     "debut": "08:00",
     "fin": "10:00",
     "groupe": "1PH-CHGR4",
     "type_origine": "regle : seul creneau de 2 h restant sans etiquette"
    },
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "officiel",
    "type": "TP"
   },
   {
    "code": "2NDE-GT10",
    "debut": "11:05",
    "duree": 55,
    "famille": "PC2de",
    "groupe": null,
    "jour": "jeudi",
    "niveau": "2de",
    "nom": "2de GT10",
    "officiel": {
     "classe": "2NDGT10",
     "debut": "11:00",
     "fin": "12:00",
     "groupe": null,
     "type_origine": "regle : le reste est du cours"
    },
    "pp": false,
    "quinzaine": "B",
    "relais": null,
    "source": "officiel",
    "type": "Cours"
   },
   {
    "code": "2NDE-GT9",
    "debut": "09:00",
    "duree": 55,
    "famille": "PC2de",
    "groupe": null,
    "jour": "lundi",
    "niveau": "2de",
    "nom": "2de GT9",
    "officiel": {
     "classe": "2NDGT9",
     "debut": "09:00",
     "fin": "10:00",
     "groupe": null,
     "type_origine": "regle : le reste est du cours"
    },
    "pp": false,
    "quinzaine": "A",
    "relais": null,
    "source": "officiel",
    "type": "Cours"
   },
   {
    "code": "1PC-CHGR3",
    "debut": "13:30",
    "duree": 115,
    "famille": "spePC",
    "groupe": null,
    "jour": "lundi",
    "niveau": "1re",
    "nom": "1re spé PC (CHGR3)",
    "officiel": {
     "classe": null,
     "debut": "13:30",
     "fin": "15:30",
     "groupe": "1PH-CHGR3",
     "type_origine": "etiquette de Laurent « TP 1er PHY-G1 » — groupe G1 = 1PH-CHGR3"
    },
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "officiel",
    "type": "TP"
   },
   {
    "code": "2NDE-GT9",
    "debut": "15:35",
    "duree": 55,
    "famille": "PC2de",
    "groupe": null,
    "jour": "lundi",
    "niveau": "2de",
    "nom": "2de GT9",
    "officiel": {
     "classe": "2NDGT9",
     "debut": "15:30",
     "fin": "16:30",
     "groupe": null,
     "type_origine": "regle : le reste est du cours"
    },
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "officiel",
    "type": "Cours"
   },
   {
    "code": "2NDE-GT10",
    "debut": "08:00",
    "duree": 55,
    "famille": "PC2de",
    "groupe": null,
    "jour": "mardi",
    "niveau": "2de",
    "nom": "2de GT10",
    "officiel": {
     "classe": "2NDGT10",
     "debut": "08:00",
     "fin": "09:00",
     "groupe": null,
     "type_origine": "regle : le reste est du cours"
    },
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "officiel",
    "type": "Cours"
   },
   {
    "code": "2NDE-GT10",
    "debut": "09:00",
    "duree": 82,
    "famille": "PC2de",
    "groupe": "G1",
    "jour": "mardi",
    "niveau": "2de",
    "nom": "2de GT10",
    "officiel": {
     "classe": null,
     "debut": "09:00",
     "fin": "10:30",
     "groupe": "2nde 10P.1",
     "type_origine": "regle : Secondes, tous les blocs de 3 h sont des TP"
    },
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "officiel",
    "type": "TP"
   },
   {
    "code": "2NDE-GT10",
    "debut": "10:30",
    "duree": 90,
    "famille": "PC2de",
    "groupe": "G2",
    "jour": "mardi",
    "niveau": "2de",
    "nom": "2de GT10",
    "officiel": {
     "classe": null,
     "debut": "10:30",
     "fin": "12:00",
     "groupe": "2nde 10P.2",
     "type_origine": "regle : Secondes, tous les blocs de 3 h sont des TP"
    },
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "officiel",
    "type": "TP"
   },
   {
    "code": "1PC-CHGR3",
    "debut": "13:30",
    "duree": 115,
    "famille": "spePC",
    "groupe": null,
    "jour": "mardi",
    "niveau": "1re",
    "nom": "1re spé PC (CHGR3)",
    "officiel": {
     "classe": null,
     "debut": "13:30",
     "fin": "15:30",
     "groupe": "1PH-CHGR3",
     "type_origine": "regle : un seul creneau de 2 h en TP, le reste est du cours"
    },
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "officiel",
    "type": "Cours"
   },
   {
    "code": "1PC-CHGR4",
    "debut": "15:35",
    "duree": 115,
    "famille": "spePC",
    "groupe": null,
    "jour": "mardi",
    "niveau": "1re",
    "nom": "1re spé PC (CHGR4)",
    "officiel": {
     "classe": null,
     "debut": "15:30",
     "fin": "17:30",
     "groupe": "1PH-CHGR4",
     "type_origine": "etiquette de Laurent « Cours 1er PHY-G3 » — groupe G3 = 1PH-CHGR4"
    },
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "officiel",
    "type": "Cours"
   },
   {
    "code": "TG5",
    "debut": "08:00",
    "duree": 55,
    "famille": "enssci",
    "groupe": null,
    "jour": "vendredi",
    "niveau": "Tale",
    "nom": "Tale ens.sci. TG5",
    "officiel": {
     "classe": "TG5",
     "debut": "08:00",
     "fin": "09:00",
     "groupe": null,
     "type_origine": "regle : ens. scientifique, 1 h/classe, cours"
    },
    "pp": false,
    "quinzaine": null,
    "relais": [
     [
      "AGENOR",
      "0,5"
     ],
     [
      "HALOUM",
      "0,25"
     ],
     [
      "HAMMA",
      "0,25"
     ]
    ],
    "source": "officiel",
    "type": "Cours"
   },
   {
    "code": "2NDE-GT9",
    "debut": "09:00",
    "duree": 82,
    "famille": "PC2de",
    "groupe": "G1",
    "jour": "vendredi",
    "niveau": "2de",
    "nom": "2de GT9",
    "officiel": {
     "classe": null,
     "debut": "09:00",
     "fin": "10:30",
     "groupe": "2 9P.1",
     "type_origine": "regle : Secondes, tous les blocs de 3 h sont des TP"
    },
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "officiel",
    "type": "TP"
   },
   {
    "code": "2NDE-GT9",
    "debut": "10:30",
    "duree": 90,
    "famille": "PC2de",
    "groupe": "G2",
    "jour": "vendredi",
    "niveau": "2de",
    "nom": "2de GT9",
    "officiel": {
     "classe": null,
     "debut": "10:30",
     "fin": "12:00",
     "groupe": "2 9P.2",
     "type_origine": "regle : Secondes, tous les blocs de 3 h sont des TP"
    },
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "officiel",
    "type": "TP"
   }
  ],
  "HAMMA": [
   {
    "code": "1PC-CHGR2",
    "debut": "10:05",
    "duree": 115,
    "famille": "spePC",
    "groupe": null,
    "jour": "jeudi",
    "niveau": "1re",
    "nom": "1re spé PC (CHGR2)",
    "officiel": {
     "classe": null,
     "debut": "10:00",
     "fin": "12:00",
     "groupe": "1PH-CHGR2",
     "type_origine": "etiquette de Laurent « TP 1er PHY-G4 » — groupe G4 = 1PH-CHGR2"
    },
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "officiel",
    "type": "TP"
   },
   {
    "code": "2NDE-GT8",
    "debut": "13:30",
    "duree": 82,
    "famille": "PC2de",
    "groupe": "G1",
    "jour": "jeudi",
    "niveau": "2de",
    "nom": "2de GT8",
    "officiel": {
     "classe": null,
     "debut": "13:30",
     "fin": "15:00",
     "groupe": "2 8P.1",
     "type_origine": "regle : Secondes, tous les blocs de 3 h sont des TP"
    },
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "officiel",
    "type": "TP"
   },
   {
    "code": "2NDE-GT8",
    "debut": "15:00",
    "duree": 90,
    "famille": "PC2de",
    "groupe": "G2",
    "jour": "jeudi",
    "niveau": "2de",
    "nom": "2de GT8",
    "officiel": {
     "classe": null,
     "debut": "15:00",
     "fin": "16:30",
     "groupe": "2 8P.2",
     "type_origine": "regle : Secondes, tous les blocs de 3 h sont des TP"
    },
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "officiel",
    "type": "TP"
   },
   {
    "code": "TG1",
    "debut": "08:00",
    "duree": 55,
    "famille": "enssci",
    "groupe": null,
    "jour": "lundi",
    "niveau": "Tale",
    "nom": "Tale ens.sci. TG1",
    "officiel": {
     "classe": "TG1",
     "debut": "08:00",
     "fin": "09:00",
     "groupe": null,
     "type_origine": "regle : ens. scientifique, 1 h/classe, cours"
    },
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "officiel",
    "type": "Cours"
   },
   {
    "code": "TG2",
    "debut": "09:00",
    "duree": 55,
    "famille": "enssci",
    "groupe": null,
    "jour": "lundi",
    "niveau": "Tale",
    "nom": "Tale ens.sci. TG2",
    "officiel": {
     "classe": "TG2",
     "debut": "09:00",
     "fin": "10:00",
     "groupe": null,
     "type_origine": "regle : ens. scientifique, 1 h/classe, cours"
    },
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "officiel",
    "type": "Cours"
   },
   {
    "code": "TG3",
    "debut": "10:05",
    "duree": 55,
    "famille": "enssci",
    "groupe": null,
    "jour": "lundi",
    "niveau": "Tale",
    "nom": "Tale ens.sci. TG3",
    "officiel": {
     "classe": "TG3",
     "debut": "10:00",
     "fin": "11:00",
     "groupe": null,
     "type_origine": "regle : ens. scientifique, 1 h/classe, cours"
    },
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "officiel",
    "type": "Cours"
   },
   {
    "code": "TG4",
    "debut": "11:05",
    "duree": 55,
    "famille": "enssci",
    "groupe": null,
    "jour": "lundi",
    "niveau": "Tale",
    "nom": "Tale ens.sci. TG4",
    "officiel": {
     "classe": "TG4",
     "debut": "11:00",
     "fin": "12:00",
     "groupe": null,
     "type_origine": "regle : ens. scientifique, 1 h/classe, cours"
    },
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "officiel",
    "type": "Cours"
   },
   {
    "code": "2NDE-GT8",
    "debut": "13:30",
    "duree": 55,
    "famille": "PC2de",
    "groupe": null,
    "jour": "lundi",
    "niveau": "2de",
    "nom": "2de GT8",
    "officiel": {
     "classe": "2NDGT8",
     "debut": "13:30",
     "fin": "14:30",
     "groupe": null,
     "type_origine": "regle : le reste est du cours"
    },
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "officiel",
    "type": "Cours"
   },
   {
    "code": "1PC-CHGR2",
    "debut": "15:35",
    "duree": 115,
    "famille": "spePC",
    "groupe": null,
    "jour": "lundi",
    "niveau": "1re",
    "nom": "1re spé PC (CHGR2)",
    "officiel": {
     "classe": null,
     "debut": "15:30",
     "fin": "17:30",
     "groupe": "1PH-CHGR2",
     "type_origine": "etiquette de Laurent « Cours 1er PHY-G4 » — groupe G4 = 1PH-CHGR2, meme jour, heure decalee (13:30 dans l'etiquette)"
    },
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "officiel",
    "type": "Cours"
   },
   {
    "code": "2NDE-GT6",
    "debut": "08:00",
    "duree": 55,
    "famille": "PC2de",
    "groupe": null,
    "jour": "mercredi",
    "niveau": "2de",
    "nom": "2de GT6",
    "officiel": {
     "classe": "2NDGT6",
     "debut": "08:00",
     "fin": "09:00",
     "groupe": null,
     "type_origine": "regle : le reste est du cours"
    },
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "officiel",
    "type": "Cours"
   },
   {
    "code": "2NDE-GT6",
    "debut": "09:00",
    "duree": 82,
    "famille": "PC2de",
    "groupe": "G1",
    "jour": "mercredi",
    "niveau": "2de",
    "nom": "2de GT6",
    "officiel": {
     "classe": null,
     "debut": "09:00",
     "fin": "10:30",
     "groupe": "2 6P.1",
     "type_origine": "regle : Secondes, tous les blocs de 3 h sont des TP"
    },
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "officiel",
    "type": "TP"
   },
   {
    "code": "2NDE-GT6",
    "debut": "10:30",
    "duree": 90,
    "famille": "PC2de",
    "groupe": "G2",
    "jour": "mercredi",
    "niveau": "2de",
    "nom": "2de GT6",
    "officiel": {
     "classe": null,
     "debut": "10:30",
     "fin": "12:00",
     "groupe": "2 6P.2",
     "type_origine": "regle : Secondes, tous les blocs de 3 h sont des TP"
    },
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "officiel",
    "type": "TP"
   },
   {
    "code": "TG5",
    "debut": "08:00",
    "duree": 55,
    "famille": "enssci",
    "groupe": null,
    "jour": "vendredi",
    "niveau": "Tale",
    "nom": "Tale ens.sci. TG5",
    "officiel": {
     "classe": "TG5",
     "debut": "08:00",
     "fin": "09:00",
     "groupe": null,
     "type_origine": "regle : ens. scientifique, 1 h/classe, cours"
    },
    "pp": false,
    "quinzaine": null,
    "relais": [
     [
      "AGENOR",
      "0,5"
     ],
     [
      "HALOUM",
      "0,25"
     ],
     [
      "HAMMA",
      "0,25"
     ]
    ],
    "source": "officiel",
    "type": "Cours"
   },
   {
    "code": "2NDE-GT8",
    "debut": "10:05",
    "duree": 55,
    "famille": "PC2de",
    "groupe": null,
    "jour": "vendredi",
    "niveau": "2de",
    "nom": "2de GT8",
    "officiel": {
     "classe": "2NDGT8",
     "debut": "10:00",
     "fin": "11:00",
     "groupe": null,
     "type_origine": "regle : le reste est du cours"
    },
    "pp": false,
    "quinzaine": "B",
    "relais": null,
    "source": "officiel",
    "type": "Cours"
   },
   {
    "code": "2NDE-GT6",
    "debut": "14:30",
    "duree": 55,
    "famille": "PC2de",
    "groupe": null,
    "jour": "vendredi",
    "niveau": "2de",
    "nom": "2de GT6",
    "officiel": {
     "classe": "2NDGT6",
     "debut": "14:30",
     "fin": "15:30",
     "groupe": null,
     "type_origine": "regle : le reste est du cours"
    },
    "pp": false,
    "quinzaine": "B",
    "relais": null,
    "source": "officiel",
    "type": "Cours"
   }
  ],
  "PARISE": [
   {
    "code": "2NDE-GT7",
    "debut": "08:00",
    "duree": 55,
    "famille": "PC2de",
    "groupe": null,
    "jour": "jeudi",
    "niveau": "2de",
    "nom": "2de GT7",
    "officiel": {
     "classe": "2NDGT7",
     "debut": "08:00",
     "fin": "09:00",
     "groupe": null,
     "type_origine": "regle : le reste est du cours"
    },
    "pp": false,
    "quinzaine": "A",
    "relais": null,
    "source": "officiel",
    "type": "Cours"
   },
   {
    "code": "2NDE-GT7",
    "debut": "09:00",
    "duree": 82,
    "famille": "PC2de",
    "groupe": "G1",
    "jour": "jeudi",
    "niveau": "2de",
    "nom": "2de GT7",
    "officiel": {
     "classe": null,
     "debut": "09:00",
     "fin": "10:30",
     "groupe": "2 7P.1",
     "type_origine": "regle : Secondes, tous les blocs de 3 h sont des TP"
    },
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "officiel",
    "type": "TP"
   },
   {
    "code": "2NDE-GT7",
    "debut": "10:30",
    "duree": 90,
    "famille": "PC2de",
    "groupe": "G2",
    "jour": "jeudi",
    "niveau": "2de",
    "nom": "2de GT7",
    "officiel": {
     "classe": null,
     "debut": "10:30",
     "fin": "12:00",
     "groupe": "2 7P.2",
     "type_origine": "regle : Secondes, tous les blocs de 3 h sont des TP"
    },
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "officiel",
    "type": "TP"
   },
   {
    "code": "TSPE-CHGR1",
    "debut": "13:30",
    "duree": 115,
    "famille": "spePC",
    "groupe": null,
    "jour": "jeudi",
    "niveau": "Tale",
    "nom": "Tale spé PC (CHGR1)",
    "officiel": {
     "classe": null,
     "debut": "13:30",
     "fin": "15:30",
     "groupe": "TPH-CHGR1",
     "type_origine": "etiquette de Laurent « Cours TSPE PHY3 » — groupe PHY3 = TPH-CHGR1"
    },
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "officiel",
    "type": "Cours"
   },
   {
    "code": "2NDE-GT4",
    "debut": "15:35",
    "duree": 55,
    "famille": "PC2de",
    "groupe": null,
    "jour": "jeudi",
    "niveau": "2de",
    "nom": "2de GT4",
    "officiel": {
     "classe": "2NDGT4",
     "debut": "15:30",
     "fin": "16:30",
     "groupe": null,
     "type_origine": "regle : le reste est du cours"
    },
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "officiel",
    "type": "Cours"
   },
   {
    "code": "1G1",
    "debut": "08:00",
    "duree": 55,
    "famille": "enssci",
    "groupe": null,
    "jour": "lundi",
    "niveau": "1re",
    "nom": "1re ens.sci. 1G1",
    "officiel": {
     "classe": "1G1",
     "debut": "08:00",
     "fin": "09:00",
     "groupe": null,
     "type_origine": "regle : ens. scientifique, 1 h/classe, cours"
    },
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "officiel",
    "type": "Cours"
   },
   {
    "code": "1G2",
    "debut": "09:00",
    "duree": 55,
    "famille": "enssci",
    "groupe": null,
    "jour": "lundi",
    "niveau": "1re",
    "nom": "1re ens.sci. 1G2",
    "officiel": {
     "classe": "1G2",
     "debut": "09:00",
     "fin": "10:00",
     "groupe": null,
     "type_origine": "regle : ens. scientifique, 1 h/classe, cours"
    },
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "officiel",
    "type": "Cours"
   },
   {
    "code": "1G3",
    "debut": "10:05",
    "duree": 55,
    "famille": "enssci",
    "groupe": null,
    "jour": "lundi",
    "niveau": "1re",
    "nom": "1re ens.sci. 1G3",
    "officiel": {
     "classe": "1G3",
     "debut": "10:00",
     "fin": "11:00",
     "groupe": null,
     "type_origine": "regle : ens. scientifique, 1 h/classe, cours"
    },
    "pp": false,
    "quinzaine": null,
    "relais": [
     [
      "BASTIAN",
      "0,5"
     ],
     [
      "GIRSCH",
      "0,25"
     ],
     [
      "PARISE",
      "0,25"
     ]
    ],
    "source": "officiel",
    "type": "Cours"
   },
   {
    "code": "TSPE-CHGR1",
    "debut": "10:05",
    "duree": 115,
    "famille": "spePC",
    "groupe": null,
    "jour": "mardi",
    "niveau": "Tale",
    "nom": "Tale spé PC (CHGR1)",
    "officiel": {
     "classe": null,
     "debut": "10:00",
     "fin": "12:00",
     "groupe": "TPH-CHGR1",
     "type_origine": "etiquette de Laurent « Cours TSPE PHY3 » — groupe PHY3 = TPH-CHGR1"
    },
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "officiel",
    "type": "Cours"
   },
   {
    "code": "2NDE-GT4",
    "debut": "13:30",
    "duree": 82,
    "famille": "PC2de",
    "groupe": "G1",
    "jour": "mardi",
    "niveau": "2de",
    "nom": "2de GT4",
    "officiel": {
     "classe": null,
     "debut": "13:30",
     "fin": "15:00",
     "groupe": "2 4P.1",
     "type_origine": "regle : Secondes, tous les blocs de 3 h sont des TP"
    },
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "officiel",
    "type": "TP"
   },
   {
    "code": "2NDE-GT4",
    "debut": "15:00",
    "duree": 90,
    "famille": "PC2de",
    "groupe": "G2",
    "jour": "mardi",
    "niveau": "2de",
    "nom": "2de GT4",
    "officiel": {
     "classe": null,
     "debut": "15:00",
     "fin": "16:30",
     "groupe": "2 4P.2",
     "type_origine": "regle : Secondes, tous les blocs de 3 h sont des TP"
    },
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "officiel",
    "type": "TP"
   },
   {
    "code": "TSPE-CHGR1",
    "debut": "08:00",
    "duree": 115,
    "famille": "spePC",
    "groupe": null,
    "jour": "mercredi",
    "niveau": "Tale",
    "nom": "Tale spé PC (CHGR1)",
    "officiel": {
     "classe": null,
     "debut": "08:00",
     "fin": "10:00",
     "groupe": "TPH-CHGR1",
     "type_origine": "etiquette de Laurent « TP TSPE PHY3 » — groupe PHY3 = TPH-CHGR1"
    },
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "officiel",
    "type": "TP"
   },
   {
    "code": "2NDE-GT7",
    "debut": "11:05",
    "duree": 55,
    "famille": "PC2de",
    "groupe": null,
    "jour": "mercredi",
    "niveau": "2de",
    "nom": "2de GT7",
    "officiel": {
     "classe": "2NDGT7",
     "debut": "11:00",
     "fin": "12:00",
     "groupe": null,
     "type_origine": "regle : le reste est du cours"
    },
    "pp": false,
    "quinzaine": "A",
    "relais": null,
    "source": "officiel",
    "type": "Cours"
   },
   {
    "code": "2NDE-GT4",
    "debut": "08:00",
    "duree": 55,
    "famille": "PC2de",
    "groupe": null,
    "jour": "vendredi",
    "niveau": "2de",
    "nom": "2de GT4",
    "officiel": {
     "classe": "2NDGT4",
     "debut": "08:00",
     "fin": "09:00",
     "groupe": null,
     "type_origine": "regle : le reste est du cours"
    },
    "pp": false,
    "quinzaine": "A",
    "relais": null,
    "source": "officiel",
    "type": "Cours"
   },
   {
    "code": "2NDE-GT7",
    "debut": "10:05",
    "duree": 55,
    "famille": "PC2de",
    "groupe": null,
    "jour": "vendredi",
    "niveau": "2de",
    "nom": "2de GT7",
    "officiel": {
     "classe": "2NDGT7",
     "debut": "10:00",
     "fin": "11:00",
     "groupe": null,
     "type_origine": "regle : le reste est du cours"
    },
    "pp": false,
    "quinzaine": "A",
    "relais": null,
    "source": "officiel",
    "type": "Cours"
   }
  ],
  "PECOUL": [
   {
    "code": "1PC-CHGR1",
    "debut": "08:00",
    "duree": 115,
    "famille": "spePC",
    "groupe": null,
    "jour": "jeudi",
    "niveau": "1re",
    "nom": "1re spé PC (CHGR1)",
    "officiel": {
     "classe": null,
     "debut": "08:00",
     "fin": "10:00",
     "groupe": "1PH-CHGR1",
     "type_origine": "etiquette de Laurent « Cours 1er PHY-G2 » — groupe G2 = 1PH-CHGR1"
    },
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "officiel",
    "type": "Cours"
   },
   {
    "code": "TNSI",
    "debut": "13:30",
    "duree": 115,
    "famille": "NSI",
    "groupe": null,
    "jour": "jeudi",
    "niveau": "Tale",
    "nom": "Tale NSI",
    "officiel": {
     "classe": null,
     "debut": "13:30",
     "fin": "15:30",
     "groupe": "TNSINFGR1",
     "type_origine": "NSI : aucune etiquette ne porte de TP, defaut cours (regle du 30/08)"
    },
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "officiel",
    "type": "Cours"
   },
   {
    "code": "2NDE-GT1",
    "debut": "16:35",
    "duree": 55,
    "famille": "PC2de",
    "groupe": null,
    "jour": "jeudi",
    "niveau": "2de",
    "nom": "2de GT1",
    "officiel": {
     "classe": "2NDGT1",
     "debut": "16:30",
     "fin": "17:30",
     "groupe": null,
     "type_origine": "regle : le reste est du cours"
    },
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "officiel",
    "type": "Cours"
   },
   {
    "code": "2NDE-GT1",
    "debut": "09:00",
    "duree": 82,
    "famille": "PC2de",
    "groupe": "G1",
    "jour": "lundi",
    "niveau": "2de",
    "nom": "2de GT1",
    "officiel": {
     "classe": null,
     "debut": "09:00",
     "fin": "10:30",
     "groupe": "2 1P.1",
     "type_origine": "regle : Secondes, tous les blocs de 3 h sont des TP"
    },
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "officiel",
    "type": "TP"
   },
   {
    "code": "2NDE-GT1",
    "debut": "10:30",
    "duree": 90,
    "famille": "PC2de",
    "groupe": "G2",
    "jour": "lundi",
    "niveau": "2de",
    "nom": "2de GT1",
    "officiel": {
     "classe": null,
     "debut": "10:30",
     "fin": "12:00",
     "groupe": "2 1P.2",
     "type_origine": "regle : Secondes, tous les blocs de 3 h sont des TP"
    },
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "officiel",
    "type": "TP"
   },
   {
    "code": "1NSI1",
    "debut": "13:30",
    "duree": 115,
    "famille": "NSI",
    "groupe": null,
    "jour": "lundi",
    "niveau": "1re",
    "nom": "1re NSI (G1)",
    "officiel": {
     "classe": null,
     "debut": "13:30",
     "fin": "15:30",
     "groupe": "1NSINFGR1",
     "type_origine": "NSI : aucune etiquette ne porte de TP, defaut cours (regle du 30/08)"
    },
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "officiel",
    "type": "Cours"
   },
   {
    "code": "TNSI",
    "debut": "10:05",
    "duree": 115,
    "famille": "NSI",
    "groupe": null,
    "jour": "mardi",
    "niveau": "Tale",
    "nom": "Tale NSI",
    "officiel": {
     "classe": null,
     "debut": "10:00",
     "fin": "12:00",
     "groupe": "TNSINFGR1",
     "type_origine": "NSI : aucune etiquette ne porte de TP, defaut cours (regle du 30/08)"
    },
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "officiel",
    "type": "Cours"
   },
   {
    "code": "1NSI1",
    "debut": "13:30",
    "duree": 115,
    "famille": "NSI",
    "groupe": null,
    "jour": "mardi",
    "niveau": "1re",
    "nom": "1re NSI (G1)",
    "officiel": {
     "classe": null,
     "debut": "13:30",
     "fin": "15:30",
     "groupe": "1NSINFGR1",
     "type_origine": "NSI : aucune etiquette ne porte de TP, defaut cours (regle du 30/08)"
    },
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "officiel",
    "type": "Cours"
   },
   {
    "code": "1PC-CHGR1",
    "debut": "15:35",
    "duree": 115,
    "famille": "spePC",
    "groupe": null,
    "jour": "mardi",
    "niveau": "1re",
    "nom": "1re spé PC (CHGR1)",
    "officiel": {
     "classe": null,
     "debut": "15:30",
     "fin": "17:30",
     "groupe": "1PH-CHGR1",
     "type_origine": "etiquette de Laurent « TP 1er PHY-G2 » — groupe G2 = 1PH-CHGR1, meme jour, heure decalee (13:30 dans l'etiquette)"
    },
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "officiel",
    "type": "TP"
   },
   {
    "code": "TNSI",
    "debut": "08:00",
    "duree": 115,
    "famille": "NSI",
    "groupe": null,
    "jour": "mercredi",
    "niveau": "Tale",
    "nom": "Tale NSI",
    "officiel": {
     "classe": null,
     "debut": "08:00",
     "fin": "10:00",
     "groupe": "TNSINFGR1",
     "type_origine": "NSI : aucune etiquette ne porte de TP, defaut cours (regle du 30/08)"
    },
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "officiel",
    "type": "Cours"
   },
   {
    "code": "2NDE-GT1",
    "debut": "11:05",
    "duree": 55,
    "famille": "PC2de",
    "groupe": null,
    "jour": "mercredi",
    "niveau": "2de",
    "nom": "2de GT1",
    "officiel": {
     "classe": "2NDGT1",
     "debut": "11:00",
     "fin": "12:00",
     "groupe": null,
     "type_origine": "regle : le reste est du cours"
    },
    "pp": false,
    "quinzaine": "A",
    "relais": null,
    "source": "officiel",
    "type": "Cours"
   }
  ]
 }
};

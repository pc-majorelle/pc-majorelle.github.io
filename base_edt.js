/* base_edt.js — ECRIT PAR _BASE\exporter_edt_site_v52.py. NE PAS EDITER A LA MAIN.
   L'emploi du temps que les pages doivent lire. Priorite : le CARNET du professeur
   s'il existe, sinon le brouillon PHY.pdf recale sur la grille du lycee. Chaque
   creneau porte `source` : "carnet" ou "brouillon" — une page peut donc dire d'ou
   vient ce qu'elle montre. Regenere par : python exporter_edt_site_v52.py */
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
    "brouillon": {
     "debut": "15:30",
     "duree": 120,
     "jour": "jeudi"
    },
    "code": "TSPE-PHY2",
    "debut": "15:35",
    "duree": 115,
    "famille": "spePC",
    "groupe": null,
    "jour": "jeudi",
    "niveau": "Tale",
    "nom": "Tale spé PC (PHY2)",
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "brouillon",
    "type": "Cours"
   },
   {
    "brouillon": {
     "debut": "08:00",
     "duree": 60,
     "jour": "lundi"
    },
    "code": "1ENS-1",
    "debut": "08:00",
    "duree": 55,
    "famille": "enssci",
    "groupe": null,
    "jour": "lundi",
    "niveau": "1re",
    "nom": "1G5",
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "brouillon",
    "type": "Cours"
   },
   {
    "brouillon": {
     "debut": "10:00",
     "duree": 60,
     "jour": "lundi"
    },
    "code": "1ENS-4",
    "debut": "10:05",
    "duree": 55,
    "famille": "enssci",
    "groupe": null,
    "jour": "lundi",
    "niveau": "1re",
    "nom": "1G3",
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
    "source": "brouillon",
    "type": "Cours"
   },
   {
    "brouillon": {
     "debut": "13:30",
     "duree": 90,
     "jour": "lundi"
    },
    "code": "2NDE-1",
    "debut": "13:30",
    "duree": 82,
    "famille": "PC2de",
    "groupe": "G1",
    "jour": "lundi",
    "niveau": "2de",
    "nom": "2de 1 — TP lundi (à préciser)",
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "brouillon",
    "type": "TP"
   },
   {
    "brouillon": {
     "debut": "15:00",
     "duree": 90,
     "jour": "lundi"
    },
    "code": "2NDE-1",
    "debut": "15:08",
    "duree": 82,
    "famille": "PC2de",
    "groupe": "G2",
    "jour": "lundi",
    "niveau": "2de",
    "nom": "2de 1 — TP lundi (à préciser)",
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "brouillon",
    "type": "TP"
   },
   {
    "brouillon": {
     "debut": "08:00",
     "duree": 120,
     "jour": "mardi"
    },
    "code": "TSPE-PHY2",
    "debut": "08:00",
    "duree": 115,
    "famille": "spePC",
    "groupe": null,
    "jour": "mardi",
    "niveau": "Tale",
    "nom": "Tale spé PC (PHY2)",
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "brouillon",
    "type": "Cours"
   },
   {
    "brouillon": {
     "debut": "13:30",
     "duree": 90,
     "jour": "mardi"
    },
    "code": "2NDE-2",
    "debut": "13:30",
    "duree": 82,
    "famille": "PC2de",
    "groupe": "G1",
    "jour": "mardi",
    "niveau": "2de",
    "nom": "2de 2 — TP mardi (à préciser)",
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "brouillon",
    "type": "TP"
   },
   {
    "brouillon": {
     "debut": "15:00",
     "duree": 90,
     "jour": "mardi"
    },
    "code": "2NDE-2",
    "debut": "15:08",
    "duree": 82,
    "famille": "PC2de",
    "groupe": "G2",
    "jour": "mardi",
    "niveau": "2de",
    "nom": "2de 2 — TP mardi (à préciser)",
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "brouillon",
    "type": "TP"
   },
   {
    "brouillon": {
     "debut": "10:00",
     "duree": 120,
     "jour": "mercredi"
    },
    "code": "TSPE-PHY2",
    "debut": "08:00",
    "duree": 115,
    "famille": "spePC",
    "groupe": null,
    "jour": "mercredi",
    "niveau": "Tale",
    "nom": "Tale spé PC (PHY2)",
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "brouillon",
    "type": "TP"
   },
   {
    "brouillon": {
     "debut": "09:00",
     "duree": 60,
     "jour": "lundi"
    },
    "code": "1ENS-2",
    "debut": "10:05",
    "duree": 55,
    "famille": "enssci",
    "groupe": null,
    "jour": "mercredi",
    "niveau": "1re",
    "nom": "1G6",
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "brouillon",
    "type": "Cours"
   }
  ],
  "GIRSCH": [
   {
    "brouillon": {
     "debut": "10:00",
     "duree": 60,
     "jour": "lundi"
    },
    "code": "1ENS-4",
    "debut": "10:05",
    "duree": 55,
    "famille": "enssci",
    "groupe": null,
    "jour": "lundi",
    "niveau": "1re",
    "nom": "1G3",
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
    "source": "brouillon",
    "type": "Cours"
   },
   {
    "brouillon": {
     "debut": "08:00",
     "duree": 120,
     "jour": "mardi"
    },
    "code": "1STI2D",
    "debut": "08:00",
    "duree": 115,
    "famille": "STI2D",
    "groupe": null,
    "jour": "mardi",
    "niveau": "1re",
    "nom": "1re STI2D",
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "brouillon",
    "type": "TP"
   },
   {
    "brouillon": {
     "debut": "10:00",
     "duree": 120,
     "jour": "mardi"
    },
    "code": "1STI2D",
    "debut": "10:05",
    "duree": 115,
    "famille": "STI2D",
    "groupe": null,
    "jour": "mardi",
    "niveau": "1re",
    "nom": "1re STI2D",
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "brouillon",
    "type": "TP"
   },
   {
    "brouillon": {
     "debut": "08:00",
     "duree": 60,
     "jour": "mercredi"
    },
    "code": "1STI2D",
    "debut": "08:00",
    "duree": 55,
    "famille": "STI2D",
    "groupe": null,
    "jour": "mercredi",
    "niveau": "1re",
    "nom": "1re STI2D",
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "brouillon",
    "type": "Cours"
   },
   {
    "brouillon": {
     "debut": "08:00",
     "duree": 60,
     "jour": "vendredi"
    },
    "code": "1STI2D",
    "debut": "08:00",
    "duree": 55,
    "famille": "STI2D",
    "groupe": null,
    "jour": "vendredi",
    "niveau": "1re",
    "nom": "1re STI2D",
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "brouillon",
    "type": "Cours"
   },
   {
    "brouillon": {
     "debut": "09:00",
     "duree": 60,
     "jour": "vendredi"
    },
    "code": "1STI2D",
    "debut": "09:00",
    "duree": 55,
    "famille": "STI2D",
    "groupe": null,
    "jour": "vendredi",
    "niveau": "1re",
    "nom": "1re STI2D",
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "brouillon",
    "type": "Cours"
   },
   {
    "brouillon": {
     "debut": "11:00",
     "duree": 60,
     "jour": "vendredi"
    },
    "code": "1ENS-6",
    "debut": "11:05",
    "duree": 55,
    "famille": "enssci",
    "groupe": null,
    "jour": "vendredi",
    "niveau": "1re",
    "nom": "1G4",
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "brouillon",
    "type": "Cours"
   }
  ],
  "HALOUM": [
   {
    "brouillon": {
     "debut": "10:00",
     "duree": 120,
     "jour": "jeudi"
    },
    "code": "1PC-G1",
    "debut": "10:05",
    "duree": 115,
    "famille": "spePC",
    "groupe": null,
    "jour": "jeudi",
    "niveau": "1re",
    "nom": "1re spé PC (G1)",
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "brouillon",
    "type": "Cours"
   },
   {
    "brouillon": {
     "debut": "13:30",
     "duree": 120,
     "jour": "lundi"
    },
    "code": "1PC-G1",
    "debut": "13:30",
    "duree": 115,
    "famille": "spePC",
    "groupe": null,
    "jour": "lundi",
    "niveau": "1re",
    "nom": "1re spé PC (G1)",
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "brouillon",
    "type": "TP"
   },
   {
    "brouillon": {
     "debut": "15:30",
     "duree": 120,
     "jour": "lundi"
    },
    "code": "1PC-G3",
    "debut": "15:35",
    "duree": 115,
    "famille": "spePC",
    "groupe": null,
    "jour": "lundi",
    "niveau": "1re",
    "nom": "1re spé PC (G3)",
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "brouillon",
    "type": "TP"
   },
   {
    "brouillon": {
     "debut": "09:00",
     "duree": 90,
     "jour": "mardi"
    },
    "code": "2NDE-1",
    "debut": "09:00",
    "duree": 82,
    "famille": "PC2de",
    "groupe": "G1",
    "jour": "mardi",
    "niveau": "2de",
    "nom": "2de 1 — TP mardi (à préciser)",
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "brouillon",
    "type": "TP"
   },
   {
    "brouillon": {
     "debut": "10:30",
     "duree": 90,
     "jour": "mardi"
    },
    "code": "2NDE-1",
    "debut": "10:38",
    "duree": 82,
    "famille": "PC2de",
    "groupe": "G2",
    "jour": "mardi",
    "niveau": "2de",
    "nom": "2de 1 — TP mardi (à préciser)",
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "brouillon",
    "type": "TP"
   },
   {
    "brouillon": {
     "debut": "15:30",
     "duree": 120,
     "jour": "mardi"
    },
    "code": "1PC-G3",
    "debut": "15:35",
    "duree": 115,
    "famille": "spePC",
    "groupe": null,
    "jour": "mardi",
    "niveau": "1re",
    "nom": "1re spé PC (G3)",
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "brouillon",
    "type": "Cours"
   },
   {
    "brouillon": {
     "debut": "08:00",
     "duree": 60,
     "jour": "vendredi"
    },
    "code": "TENS-4",
    "debut": "08:00",
    "duree": 55,
    "famille": "enssci",
    "groupe": null,
    "jour": "vendredi",
    "niveau": "Tale",
    "nom": "TG5",
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
    "source": "brouillon",
    "type": "Cours"
   },
   {
    "brouillon": {
     "debut": "09:00",
     "duree": 90,
     "jour": "vendredi"
    },
    "code": "2NDE-2",
    "debut": "09:00",
    "duree": 82,
    "famille": "PC2de",
    "groupe": "G1",
    "jour": "vendredi",
    "niveau": "2de",
    "nom": "2de 2 — TP vendredi (à préciser)",
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "brouillon",
    "type": "TP"
   },
   {
    "brouillon": {
     "debut": "10:30",
     "duree": 90,
     "jour": "vendredi"
    },
    "code": "2NDE-2",
    "debut": "10:38",
    "duree": 82,
    "famille": "PC2de",
    "groupe": "G2",
    "jour": "vendredi",
    "niveau": "2de",
    "nom": "2de 2 — TP vendredi (à préciser)",
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "brouillon",
    "type": "TP"
   }
  ],
  "HAMMA": [
   {
    "brouillon": {
     "debut": "10:00",
     "duree": 120,
     "jour": "jeudi"
    },
    "code": "1PC-G4",
    "debut": "10:05",
    "duree": 115,
    "famille": "spePC",
    "groupe": null,
    "jour": "jeudi",
    "niveau": "1re",
    "nom": "1re spé PC (G4)",
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "brouillon",
    "type": "TP"
   },
   {
    "brouillon": {
     "debut": "13:30",
     "duree": 90,
     "jour": "jeudi"
    },
    "code": "2NDE-2",
    "debut": "13:30",
    "duree": 82,
    "famille": "PC2de",
    "groupe": "G1",
    "jour": "jeudi",
    "niveau": "2de",
    "nom": "2de 2 — TP jeudi (à préciser)",
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "brouillon",
    "type": "TP"
   },
   {
    "brouillon": {
     "debut": "15:00",
     "duree": 90,
     "jour": "jeudi"
    },
    "code": "2NDE-2",
    "debut": "15:08",
    "duree": 82,
    "famille": "PC2de",
    "groupe": "G2",
    "jour": "jeudi",
    "niveau": "2de",
    "nom": "2de 2 — TP jeudi (à préciser)",
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "brouillon",
    "type": "TP"
   },
   {
    "brouillon": {
     "debut": "08:00",
     "duree": 60,
     "jour": "lundi"
    },
    "code": "TENS-1",
    "debut": "08:00",
    "duree": 55,
    "famille": "enssci",
    "groupe": null,
    "jour": "lundi",
    "niveau": "Tale",
    "nom": "TG1",
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "brouillon",
    "type": "Cours"
   },
   {
    "brouillon": {
     "debut": "09:00",
     "duree": 60,
     "jour": "lundi"
    },
    "code": "TENS-2",
    "debut": "09:00",
    "duree": 55,
    "famille": "enssci",
    "groupe": null,
    "jour": "lundi",
    "niveau": "Tale",
    "nom": "TG2",
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "brouillon",
    "type": "Cours"
   },
   {
    "brouillon": {
     "debut": "10:00",
     "duree": 60,
     "jour": "lundi"
    },
    "code": "TENS-3",
    "debut": "10:05",
    "duree": 55,
    "famille": "enssci",
    "groupe": null,
    "jour": "lundi",
    "niveau": "Tale",
    "nom": "TG3",
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
    "source": "brouillon",
    "type": "Cours"
   },
   {
    "brouillon": {
     "debut": "11:00",
     "duree": 60,
     "jour": "lundi"
    },
    "code": "TENS-4",
    "debut": "11:05",
    "duree": 55,
    "famille": "enssci",
    "groupe": null,
    "jour": "lundi",
    "niveau": "Tale",
    "nom": "TG4",
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "brouillon",
    "type": "Cours"
   },
   {
    "brouillon": {
     "debut": "13:30",
     "duree": 120,
     "jour": "lundi"
    },
    "code": "1PC-G4",
    "debut": "13:30",
    "duree": 115,
    "famille": "spePC",
    "groupe": null,
    "jour": "lundi",
    "niveau": "1re",
    "nom": "1re spé PC (G4)",
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "brouillon",
    "type": "Cours"
   },
   {
    "brouillon": {
     "debut": "09:00",
     "duree": 90,
     "jour": "mercredi"
    },
    "code": "2NDE-1",
    "debut": "09:00",
    "duree": 82,
    "famille": "PC2de",
    "groupe": "G1",
    "jour": "mercredi",
    "niveau": "2de",
    "nom": "2de 1 — TP mercredi (à préciser)",
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "brouillon",
    "type": "TP"
   },
   {
    "brouillon": {
     "debut": "10:30",
     "duree": 90,
     "jour": "mercredi"
    },
    "code": "2NDE-1",
    "debut": "10:38",
    "duree": 82,
    "famille": "PC2de",
    "groupe": "G2",
    "jour": "mercredi",
    "niveau": "2de",
    "nom": "2de 1 — TP mercredi (à préciser)",
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "brouillon",
    "type": "TP"
   },
   {
    "brouillon": {
     "debut": "08:00",
     "duree": 60,
     "jour": "vendredi"
    },
    "code": "TENS-4",
    "debut": "08:00",
    "duree": 55,
    "famille": "enssci",
    "groupe": null,
    "jour": "vendredi",
    "niveau": "Tale",
    "nom": "TG5",
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
    "source": "brouillon",
    "type": "Cours"
   }
  ],
  "PARISE": [
   {
    "brouillon": {
     "debut": "09:00",
     "duree": 90,
     "jour": "jeudi"
    },
    "code": "2NDE-2",
    "debut": "09:00",
    "duree": 82,
    "famille": "PC2de",
    "groupe": "G1",
    "jour": "jeudi",
    "niveau": "2de",
    "nom": "2de 2 — TP jeudi (à préciser)",
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "brouillon",
    "type": "TP"
   },
   {
    "brouillon": {
     "debut": "10:30",
     "duree": 90,
     "jour": "jeudi"
    },
    "code": "2NDE-2",
    "debut": "10:38",
    "duree": 82,
    "famille": "PC2de",
    "groupe": "G2",
    "jour": "jeudi",
    "niveau": "2de",
    "nom": "2de 2 — TP jeudi (à préciser)",
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "brouillon",
    "type": "TP"
   },
   {
    "brouillon": {
     "debut": "13:30",
     "duree": 120,
     "jour": "jeudi"
    },
    "code": "TSPE-PHY3",
    "debut": "13:30",
    "duree": 115,
    "famille": "spePC",
    "groupe": null,
    "jour": "jeudi",
    "niveau": "Tale",
    "nom": "Tale spé PC (PHY3)",
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "brouillon",
    "type": "Cours"
   },
   {
    "brouillon": {
     "debut": "11:00",
     "duree": 60,
     "jour": "lundi"
    },
    "code": "1ENS-5",
    "debut": "08:00",
    "duree": 55,
    "famille": "enssci",
    "groupe": null,
    "jour": "lundi",
    "niveau": "1re",
    "nom": "1G1",
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "brouillon",
    "type": "Cours"
   },
   {
    "brouillon": {
     "debut": "09:00",
     "duree": 60,
     "jour": "lundi"
    },
    "code": "1ENS-3",
    "debut": "09:00",
    "duree": 55,
    "famille": "enssci",
    "groupe": null,
    "jour": "lundi",
    "niveau": "1re",
    "nom": "1G2",
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "brouillon",
    "type": "Cours"
   },
   {
    "brouillon": {
     "debut": "10:00",
     "duree": 60,
     "jour": "lundi"
    },
    "code": "1ENS-4",
    "debut": "10:05",
    "duree": 55,
    "famille": "enssci",
    "groupe": null,
    "jour": "lundi",
    "niveau": "1re",
    "nom": "1G3",
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
    "source": "brouillon",
    "type": "Cours"
   },
   {
    "brouillon": {
     "debut": "10:00",
     "duree": 120,
     "jour": "mardi"
    },
    "code": "TSPE-PHY3",
    "debut": "10:05",
    "duree": 115,
    "famille": "spePC",
    "groupe": null,
    "jour": "mardi",
    "niveau": "Tale",
    "nom": "Tale spé PC (PHY3)",
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "brouillon",
    "type": "Cours"
   },
   {
    "brouillon": {
     "debut": "13:30",
     "duree": 90,
     "jour": "mardi"
    },
    "code": "2NDE-1",
    "debut": "13:30",
    "duree": 82,
    "famille": "PC2de",
    "groupe": "G1",
    "jour": "mardi",
    "niveau": "2de",
    "nom": "2de 1 — TP mardi (à préciser)",
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "brouillon",
    "type": "TP"
   },
   {
    "brouillon": {
     "debut": "15:00",
     "duree": 90,
     "jour": "mardi"
    },
    "code": "2NDE-1",
    "debut": "15:08",
    "duree": 82,
    "famille": "PC2de",
    "groupe": "G2",
    "jour": "mardi",
    "niveau": "2de",
    "nom": "2de 1 — TP mardi (à préciser)",
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "brouillon",
    "type": "TP"
   },
   {
    "brouillon": {
     "debut": "08:00",
     "duree": 120,
     "jour": "mercredi"
    },
    "code": "TSPE-PHY3",
    "debut": "08:00",
    "duree": 115,
    "famille": "spePC",
    "groupe": null,
    "jour": "mercredi",
    "niveau": "Tale",
    "nom": "Tale spé PC (PHY3)",
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "brouillon",
    "type": "TP"
   }
  ],
  "PECOUL": [
   {
    "brouillon": {
     "debut": "08:00",
     "duree": 120,
     "jour": "jeudi"
    },
    "code": "1PC-G2",
    "debut": "08:00",
    "duree": 115,
    "famille": "spePC",
    "groupe": null,
    "jour": "jeudi",
    "niveau": "1re",
    "nom": "1re spé PC (G2)",
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "brouillon",
    "type": "Cours"
   },
   {
    "brouillon": {
     "debut": "10:00",
     "duree": 120,
     "jour": "jeudi"
    },
    "code": "1NSI1",
    "debut": "10:05",
    "duree": 115,
    "famille": "NSI",
    "groupe": null,
    "jour": "jeudi",
    "niveau": "1re",
    "nom": "1re NSI (G1)",
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "brouillon",
    "type": "Cours"
   },
   {
    "brouillon": {
     "debut": "13:30",
     "duree": 120,
     "jour": "jeudi"
    },
    "code": "TNSI",
    "debut": "13:30",
    "duree": 115,
    "famille": "NSI",
    "groupe": null,
    "jour": "jeudi",
    "niveau": "Tale",
    "nom": "Tale NSI",
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "brouillon",
    "type": "Cours"
   },
   {
    "brouillon": {
     "debut": "09:00",
     "duree": 90,
     "jour": "lundi"
    },
    "code": "2NDE-1",
    "debut": "09:00",
    "duree": 82,
    "famille": "PC2de",
    "groupe": "G1",
    "jour": "lundi",
    "niveau": "2de",
    "nom": "2de 1 — TP lundi (à préciser)",
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "brouillon",
    "type": "TP"
   },
   {
    "brouillon": {
     "debut": "10:30",
     "duree": 90,
     "jour": "lundi"
    },
    "code": "2NDE-1",
    "debut": "10:38",
    "duree": 82,
    "famille": "PC2de",
    "groupe": "G2",
    "jour": "lundi",
    "niveau": "2de",
    "nom": "2de 1 — TP lundi (à préciser)",
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "brouillon",
    "type": "TP"
   },
   {
    "brouillon": {
     "debut": "13:30",
     "duree": 120,
     "jour": "lundi"
    },
    "code": "1NSI1",
    "debut": "13:30",
    "duree": 115,
    "famille": "NSI",
    "groupe": null,
    "jour": "lundi",
    "niveau": "1re",
    "nom": "1re NSI (G1)",
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "brouillon",
    "type": "Cours"
   },
   {
    "brouillon": {
     "debut": "10:00",
     "duree": 120,
     "jour": "mardi"
    },
    "code": "TNSI",
    "debut": "10:05",
    "duree": 115,
    "famille": "NSI",
    "groupe": null,
    "jour": "mardi",
    "niveau": "Tale",
    "nom": "Tale NSI",
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "brouillon",
    "type": "Cours"
   },
   {
    "brouillon": {
     "debut": "13:30",
     "duree": 120,
     "jour": "mardi"
    },
    "code": "1PC-G2",
    "debut": "13:30",
    "duree": 115,
    "famille": "spePC",
    "groupe": null,
    "jour": "mardi",
    "niveau": "1re",
    "nom": "1re spé PC (G2)",
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "brouillon",
    "type": "TP"
   },
   {
    "brouillon": {
     "debut": "08:00",
     "duree": 120,
     "jour": "mercredi"
    },
    "code": "TNSI",
    "debut": "08:00",
    "duree": 115,
    "famille": "NSI",
    "groupe": null,
    "jour": "mercredi",
    "niveau": "Tale",
    "nom": "Tale NSI",
    "pp": false,
    "quinzaine": null,
    "relais": null,
    "source": "brouillon",
    "type": "Cours"
   }
  ]
 }
};

/* =============================================================================
   OUTILS_TEST_V38 — outillage de TEST, temporaire, à retirer avant la mise en service.
   -----------------------------------------------------------------------------
   Demande de Laurent (2026-08-24) : « entrer selon un rôle prof ou élève-classe sans
   avoir à utiliser le QR code », et « une simulation de date du jour », en vue des
   fonctionnalités à venir qui s'appuient sur ces deux notions (porte temporelle,
   rituel du jour, séance du jour).

   CE QUE CE FICHIER FAIT
     1. Décale la date du jour vue par TOUTES les pages qui le chargent.
     2. Fabrique une session (prof ou élève) sans passer par un code d'accès.
     3. Affiche un bandeau tant qu'un de ces deux leviers est actif — pour qu'on ne
        puisse pas oublier qu'on est en test.

   TROIS PRÉCAUTIONS DE CONCEPTION
     • DORMANT PAR DÉFAUT. Sans `?test=1`, ce fichier ne touche à rien : ni la date,
       ni le DOM, ni le stockage. Le site public reste exactement ce qu'il est.
     • AUCUN CODE EN CLAIR N'EST AJOUTÉ AU SITE. Le sélecteur de rôle se construit à
       partir des empreintes DÉJÀ présentes dans `index.html` : il fabrique la session
       directement, sans jamais connaître ni afficher un code d'accès.
     • LA DATE EST DÉCALÉE, PAS FIGÉE. On ajoute un écart constant à l'horloge réelle,
       de sorte que le temps continue de s'écouler normalement (durées, minuteries,
       animations restent justes) et que seule la DATE change.

   RETRAIT, LE JOUR VENU — trois gestes, aucun autre :
     1. supprimer ce fichier ;
     2. retirer les lignes <script src="pcmajo_test.js"></script> des pages ;
     3. retirer de `index.html` le bloc encadré par OUTILS_TEST_V38.
   ============================================================================= */
(function(){
  "use strict";

  var K_ON   = "pcmajo_test_on";     // l'outillage est-il armé ?
  var K_DATE = "pcmajo_test_date";   // date simulée, au format AAAA-MM-JJ
  var LS     = "pcmajo_acces";       // clé de session, la même que index.html

  function get(k){ try{ return localStorage.getItem(k); }catch(e){ return null; } }
  function set(k,v){ try{ if(v===null) localStorage.removeItem(k); else localStorage.setItem(k,v); }catch(e){} }

  /* --- Armement -------------------------------------------------------------
     `?test=1` arme et mémorise ; `?test=0` désarme et nettoie tout derrière lui. */
  var p = null;
  try{ p = new URLSearchParams(location.search); }catch(e){}
  if(p && p.has("test")){
    if(p.get("test")==="0"){ set(K_ON,null); set(K_DATE,null); }
    else set(K_ON,"1");
  }
  var ARME = get(K_ON)==="1";

  /* --- 1. La date simulée ---------------------------------------------------
     On calcule l'écart entre minuit du jour simulé et minuit du jour réel, puis on
     l'ajoute à l'horloge. `new Date()` et `Date.now()` décalent ; toutes les autres
     formes (`new Date(iso)`, `new Date(a,m,j)`, `Date.parse`, `Date.UTC`) sont
     rendues telles quelles — sans quoi on casserait la lecture des dates stockées. */
  var RealDate = Date;
  var DELTA = 0;
  var DATE_SIM = ARME ? get(K_DATE) : null;
  if(p && p.has("testdate")){                      // pratique pour un lien direct
    DATE_SIM = p.get("testdate") || null;
    if(ARME) set(K_DATE, DATE_SIM);
  }

  function poserDate(iso){
    if(!iso || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return false;
    var m = iso.split("-");
    var cible  = new RealDate(+m[0], +m[1]-1, +m[2]);          // minuit local, jour simulé
    if(isNaN(cible.getTime())) return false;
    var maint  = new RealDate(RealDate.now());
    var minuit = new RealDate(maint.getFullYear(), maint.getMonth(), maint.getDate());
    DELTA = cible.getTime() - minuit.getTime();
    return true;
  }

  var DECALE = false;
  if(DATE_SIM && poserDate(DATE_SIM) && DELTA!==0){
    DECALE = true;
    var PCDate = class extends RealDate {
      constructor(){
        if(arguments.length===0) super(RealDate.now()+DELTA);
        else super(...arguments);
      }
      static now(){ return RealDate.now()+DELTA; }
    };
    PCDate.parse = RealDate.parse;
    PCDate.UTC   = RealDate.UTC;
    try{ window.Date = PCDate; }catch(e){ DECALE=false; }
  }

  /* --- 2. Fabriquer une session sans code ----------------------------------
     `roles(AUTH)` lit la table d'empreintes de la page de login et en tire la liste
     des rôles ouvrables. Pour un prof on réutilise son empreinte comme `pid` — c'est
     exactement ce que fait `resolve()` ; pour une classe on pose un identifiant
     d'élève factice, jamais un vrai code. */
  function roles(AUTH){
    var out=[], vues={};
    for(var h in AUTH){
      if(!Object.prototype.hasOwnProperty.call(AUTH,h)) continue;
      var r=AUTH[h];
      if(r.r==="p"){
        out.push({ kind:"prof", label:"👤 "+(r.p||"prof")+" — espace enseignant",
                   session:{ role:"prof", pid:h, prenom:(r.p||""),
                             classes:(r.classes||[]),
                             cl:(r.classes||[]).map(function(c){return c.libelle;}) } });
      } else if(r.c && !vues[r.c]){
        vues[r.c]=1;
        out.push({ kind:"eleve", label:"🎓 Élève — "+r.c,
                   session:{ role:"eleve", code:r.c, eleve:"TEST-"+r.c } });
      }
    }
    /* Les profs d'abord, puis les classes ; et Laurent en tête, c'est son poste de travail. */
    out.sort(function(a,b){
      if(a.kind!==b.kind) return a.kind==="prof"?-1:1;
      var la=/Laurent/.test(a.label), lb=/Laurent/.test(b.label);
      if(la!==lb) return la?-1:1;
      return a.label.localeCompare(b.label,"fr");
    });
    return out;
  }

  function entrer(session){
    try{ sessionStorage.setItem(LS, JSON.stringify(session)); }catch(e){}
    set(LS, JSON.stringify(session));
    location.href = session.role==="prof"
      ? "prof.html"
      : "eleve.html?classe="+encodeURIComponent(session.code);
  }

  /* --- 3. Le bandeau --------------------------------------------------------
     Discret, en bas, mais toujours là : une date simulée qu'on aurait oubliée
     ferait douter de tout ce qu'on observe ensuite. */
  var JOURS=["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"];
  var MOIS=["janvier","février","mars","avril","mai","juin","juillet","août",
            "septembre","octobre","novembre","décembre"];
  function enClair(iso){
    var m=iso.split("-"), d=new RealDate(+m[0],+m[1]-1,+m[2]);
    return JOURS[d.getDay()]+" "+d.getDate()+" "+MOIS[d.getMonth()]+" "+d.getFullYear();
  }

  function bandeau(){
    if(!ARME || document.getElementById("pcTestBar")) return;
    var b=document.createElement("div");
    b.id="pcTestBar";
    b.setAttribute("role","status");
    b.style.cssText="position:fixed;z-index:99999;right:10px;bottom:10px;max-width:min(92vw,420px);"
      +"background:#7a1f1f;color:#fff;font:600 12px/1.45 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;"
      +"padding:8px 10px;border-radius:10px;box-shadow:0 6px 20px rgba(0,0,0,.35);"
      +"display:flex;gap:10px;align-items:center;flex-wrap:wrap";
    b.innerHTML='<span style="font-size:14px">🧪</span>'
      +'<span style="flex:1;min-width:150px">MODE TEST'
      +(DECALE?' — nous sommes le <b>'+enClair(DATE_SIM)+'</b>':' — date réelle')
      +'</span>'
      +'<a href="index.html?test=1" style="color:#ffd9d9;text-decoration:underline">panneau</a>'
      +'<a href="?test=0" style="color:#ffd9d9;text-decoration:underline">arrêter</a>';
    document.body.appendChild(b);
    /* Le bandeau est flottant : sur mobile il recouvrirait le bas de la page. On rend au
       document la hauteur qu'il occupe, sans toucher au style existant si l'on peut l'éviter. */
    try{
      var h=b.getBoundingClientRect().height||44;
      var actuel=parseFloat(getComputedStyle(document.body).paddingBottom)||0;
      document.body.style.paddingBottom=(actuel+h+16)+"px";
    }catch(e){}
  }
  if(ARME){
    if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",bandeau);
    else bandeau();
  }

  window.PCTest = {
    arme: ARME,
    dateSimulee: DECALE ? DATE_SIM : null,
    decalageMs: DELTA,
    roles: roles,
    entrer: entrer,
    poser: function(iso){ set(K_DATE, iso||null); location.reload(); },
    armer: function(on){ set(K_ON, on?"1":null); if(!on) set(K_DATE,null); location.reload(); }
  };
})();

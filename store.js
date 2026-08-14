/* store.js — MAÎTRE v30 (base neuve). Store LOCAL unique, partagé par toutes les pages prof.
   Un objet par (prof × année) dans localStorage. Aucune donnée serveur (RGPD local-first).
   Schéma : { classeActive, parClasse:{ <id>:{ progression, suivi, seances, notes, materiel, groupes } } } */
window.Store = (function(){
  var BASE = "pcmajo_store_v1";
  function acces(){
    var a=null;
    try{ a=JSON.parse(sessionStorage.getItem("pcmajo_acces")); }catch(e){}
    if(!a){ try{ a=JSON.parse(localStorage.getItem("pcmajo_acces")); }catch(e){} }
    return a||null;
  }
  function pid(){ var a=acces(); return (a && (a.pid||a.prenom)) || "anon"; }
  function prenom(){ var a=acces(); return (a && a.prenom) || ""; }
  function annee(){ try{ return localStorage.getItem("gestion_majorelle_annee") || "2025-2026"; }catch(e){ return "2025-2026"; } }
  function key(){ return BASE + "__" + pid() + "__" + annee(); }

  var state = read();
  function read(){ try{ return JSON.parse(localStorage.getItem(key())) || {}; }catch(e){ return {}; } }
  function persist(){ try{ localStorage.setItem(key(), JSON.stringify(state)); }catch(e){} }
  function reload(){ state = read(); }   // à appeler si l'année change

  /* classes réelles du prof = depuis le login (AUTH), source de vérité des classes */
  function classesProf(){ var a=acces(); return (a && Array.isArray(a.classes)) ? a.classes : []; }
  function classeById(id){ return classesProf().find(function(c){return c.id===id;}) || null; }

  /* classe active (persistée) */
  function classeActive(){
    if(state.classeActive && classeById(state.classeActive)) return state.classeActive;
    var cs=classesProf(); return cs.length ? cs[0].id : null;
  }
  function setClasseActive(id){ state.classeActive=id; persist(); }

  /* données propres à une classe (créées à la demande) */
  function parClasse(id){
    if(!state.parClasse) state.parClasse={};
    if(!state.parClasse[id]) state.parClasse[id]={ progression:null, suivi:{}, seances:[], notes:{}, materiel:[], groupes:{} };
    return state.parClasse[id];
  }

  /* jeton de niveau du référentiel (socle_data) à partir de l'id de classe */
  function niveauToken(id){
    id=String(id||"").toUpperCase();
    if(/^2G/.test(id)) return "2nde";
    if(/^1PC/.test(id)) return "1spe";
    if(/^TPC/.test(id)) return "Tspe";
    if(/^1STI/.test(id)) return "1sti";
    if(/^TSTI/.test(id)||/^TSISPH/.test(id)||/^TSI/.test(id)) return "Tsti";
    return null; // ens.sci (1G/TG), NSI : hors référentiel lycée PC
  }

  return {
    acces:acces, pid:pid, prenom:prenom, annee:annee, reload:reload, persist:persist,
    raw:function(){return state;},
    classesProf:classesProf, classeById:classeById,
    classeActive:classeActive, setClasseActive:setClasseActive,
    parClasse:parClasse, niveauToken:niveauToken
  };
})();

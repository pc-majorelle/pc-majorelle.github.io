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

  /* classes du login (AUTH) = réelles pour 2025-2026 */
  function classesAuth(){ var a=acces(); return (a && Array.isArray(a.classes)) ? a.classes : []; }
  /* classes POUR UNE ANNÉE donnée. 2025-2026 = réelles (AUTH). Autres années = classes d'ESSAI
     (numéros fixés par le MAÎTRE en attendant les vraies) — visiblement distinctes pour ne pas confondre. */
  function classesForAnnee(an){
    an = an || annee();
    if(an === "2025-2026") return classesAuth();
    // Autres années : classes ATTRIBUÉES (window.CLASSES_ANNEE), clé = NOM via PRENOM2NOM.
    var nom = (window.PRENOM2NOM && prenom()) ? window.PRENOM2NOM[String(prenom()).toLowerCase()] : null;
    if(window.CLASSES_ANNEE && window.CLASSES_ANNEE[an] && nom && window.CLASSES_ANNEE[an][nom]){
      return window.CLASSES_ANNEE[an][nom];
    }
    // repli si année/prof inconnus : classes d'essai dérivées de 2025-26
    return classesAuth().map(function(c){
      return { id:c.id, libelle:c.libelle+" · essai "+an, niveau:c.niveau, creneaux:c.creneaux, essai:true };
    });
  }
  /* classes du prof pour l'année COURANTE */
  function classesProf(){ return classesForAnnee(annee()); }
  function classeById(id){ return classesProf().find(function(c){return c.id===id;}) || null; }

  /* classe active (persistée, PAR ANNÉE car la clé du store inclut l'année) */
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
    if(/NSI/.test(id)) return null;
    if(/ENS/.test(id)||/^1G/.test(id)||/^TG/.test(id)) return null; // ens. scientifique
    if(/^TSTI/.test(id)||/^TSISPH/.test(id)||/^TSI/.test(id)) return "Tsti";
    if(/^1STI/.test(id)) return "1sti";
    if(/^TPC/.test(id)||/^TSPE/.test(id)) return "Tspe";
    if(/^1PC/.test(id)) return "1spe";
    if(/^2/.test(id)) return "2nde"; // 2G3, 2G9, 2NDE…
    return null; // hors référentiel lycée PC
  }

  return {
    acces:acces, pid:pid, prenom:prenom, annee:annee, reload:reload, persist:persist,
    raw:function(){return state;},
    classesProf:classesProf, classeById:classeById,
    classeActive:classeActive, setClasseActive:setClasseActive,
    parClasse:parClasse, niveauToken:niveauToken
  };
})();

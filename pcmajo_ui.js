/* pcmajo_ui.js — kit d'interface partagé : LA palette du site, et rien d'autre.
   ---------------------------------------------------------------------------------------------
   v30 : 9 ambiances + bouton flottant 🎨, injectés sur toute page qui inclut ce script.
   v38 (THEME_CONTRASTE_V38) : trois corrections mesurées, sur signalement de Laurent
        (« l'héritage thème n'est pas terrible »). Audit de contraste WCAG mené sur 9 pages × 9
        ambiances avant d'écrire une ligne — le défaut n'était pas dans l'héritage, qui marche,
        mais dans ce que les pages FONT de la palette :

   (1) --onaccent — LE défaut principal. Les en-têtes et les boutons pleins posaient un
       `color:#fff` EN DUR sur `background:var(--accent)`. Or 4 ambiances sur 9 ont un accent
       clair : Néon #00d4ff, Feu #ff4d1a, Crépuscule #ff9e7a, Forêt #2fae52. Blanc sur cyan =
       **1,8:1**, soit un titre illisible. `--onaccent` est calculé par luminance : la page ne
       décide plus, elle demande « la couleur qui se lit sur l'accent ».

   (2) --card2 ne vaut plus `line`. Utiliser la couleur des BORDURES comme fond de carte
       secondaire donnait des surfaces trop proches du texte secondaire (3,2:1 en Blueprint).
       C'est désormais un mélange card/line, donc une vraie surface intermédiaire.

   (3) --muted est ajusté pour tenir 4,5:1 sur --card2. Plutôt que de retoucher neuf palettes à
       la main — et de recommencer à chaque nouvelle ambiance — le gris secondaire est poussé
       vers --ink juste ce qu'il faut, à l'application du thème. Ce qui se lit se lit partout.

   Les 9 ambiances elles-mêmes ne sont pas modifiées : ce sont celles des prérequis élève,
   choisies par Laurent. On ne change pas ses couleurs, on garantit qu'on peut les lire. */
window.PCTheme = (function(){
  var THEMES={atelier:{nom:"Atelier",bg:"#f6f3ec",card:"#ffffff",ink:"#2b2b2b",muted:"#6b6b63",line:"#d8d3c4",accent:"#3E6E97"},neon:{nom:"Néon",bg:"#0d0d14",card:"#171722",ink:"#e8e8f0",muted:"#9a9ab0",line:"#2c2c40",accent:"#00d4ff"},herbier:{nom:"Herbier",bg:"#f3efe2",card:"#fbf9f2",ink:"#3a4128",muted:"#5f6347",line:"#d7d0bc",accent:"#5a7a8c"},riso:{nom:"Riso",bg:"#fdf6ec",card:"#ffffff",ink:"#2a2a3a",muted:"#7a5a60",line:"#efd9d0",accent:"#2b4bdd"},blueprint:{nom:"Blueprint",bg:"#0a2540",card:"#103055",ink:"#cfe0f0",muted:"#7f9cc0",line:"#284c6e",accent:"#5b9bd5"},crepuscule:{nom:"Crépuscule",bg:"#2a1a3e",card:"#37254c",ink:"#ffd0e8",muted:"#c0a0d0",line:"#4a3560",accent:"#ff9e7a"},sumie:{nom:"Sumi-e",bg:"#faf8f4",card:"#ffffff",ink:"#1a1a1a",muted:"#555555",line:"#e2ded6",accent:"#5a6268"},feu:{nom:"Feu",bg:"#1a0a05",card:"#2a1109",ink:"#ffe3d0",muted:"#e6a988",line:"#5c2917",accent:"#ff4d1a"},foret:{nom:"Forêt",bg:"#0a1a0f",card:"#112a19",ink:"#daefdd",muted:"#93c1a0",line:"#224a31",accent:"#2fae52"}};
  var ORDER=["atelier","neon","herbier","riso","blueprint","crepuscule","sumie","feu","foret"];
  var KEY="pcmajo_theme";

  /* ---- petite trousse couleur (THEME_CONTRASTE_V38) ---- */
  function hex2rgb(h){h=String(h).replace('#','');
    if(h.length===3)h=h[0]+h[0]+h[1]+h[1]+h[2]+h[2];
    return [parseInt(h.slice(0,2),16),parseInt(h.slice(2,4),16),parseInt(h.slice(4,6),16)];}
  function rgb2hex(c){return '#'+c.map(function(v){
    return Math.max(0,Math.min(255,Math.round(v))).toString(16).padStart(2,'0');}).join('');}
  function lum(c){var f=c.map(function(v){v/=255;
    return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4);});
    return 0.2126*f[0]+0.7152*f[1]+0.0722*f[2];}
  function ratio(a,b){var L1=lum(a),L2=lum(b);
    return (Math.max(L1,L2)+0.05)/(Math.min(L1,L2)+0.05);}
  function mix(a,b,t){return [a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t,a[2]+(b[2]-a[2])*t];}
  /* la couleur lisible SUR une couleur donnée : noir ou blanc, celui des deux qui gagne */
  function surFond(c){ return ratio(c,[255,255,255]) >= ratio(c,[11,11,11]) ? '#ffffff' : '#0b0b0b'; }
  /* pousse `txt` vers `vers` jusqu'à tenir le contraste demandé sur `fond` */
  function lisible(txt,fond,vers,cible){
    if(ratio(txt,fond)>=cible) return rgb2hex(txt);
    for(var t=0.08;t<=1.001;t+=0.08){
      var c=mix(txt,vers,t);
      if(ratio(c,fond)>=cible) return rgb2hex(c);
    }
    return rgb2hex(vers);
  }

  function cur(){try{var t=localStorage.getItem(KEY);return THEMES[t]?t:null;}catch(e){return null;}}

  function apply(id){
    var th=THEMES[id]; if(!th) return;
    var bg=hex2rgb(th.bg), card=hex2rgb(th.card), line=hex2rgb(th.line),
        ink=hex2rgb(th.ink), muted=hex2rgb(th.muted), acc=hex2rgb(th.accent);
    /* (2) une vraie surface intermédiaire, pas la couleur des bordures */
    var card2=mix(card,line,0.45);
    /* (3) le gris secondaire doit se lire sur la plus exigeante des deux surfaces */
    var pire = ratio(muted,card2) < ratio(muted,card) ? card2 : card;
    var mutedOK = lisible(muted, pire, ink, 4.5);

    var r=document.documentElement.style;
    r.setProperty('--bg',th.bg);
    r.setProperty('--bg1',th.bg);            /* alias employés par gestion_v0.1.html */
    r.setProperty('--bg2',th.card);
    r.setProperty('--card',th.card);
    r.setProperty('--card2',rgb2hex(card2));
    r.setProperty('--ink',th.ink);
    r.setProperty('--muted',mutedOK);
    r.setProperty('--line',th.line);
    r.setProperty('--accent',th.accent);
    /* (1) ce qui se pose SUR l'accent — remplace les `color:#fff` codés en dur */
    r.setProperty('--onaccent',surFond(acc));
    /* (4) l'accent employé comme TEXTE sur une carte : plusieurs ambiances ont un accent trop
       pâle pour cela (Herbier #5a7a8c donnait 4,3:1). On l'assombrit juste ce qu'il faut.
       Au passage, `--accentink` était déjà appelée par revision_sti2d_tale.html — sans que
       personne ne l'ait jamais définie : elle valait donc « rien », et la couleur héritait. */
    r.setProperty('--accentink', lisible(acc, card, ink, 4.5));
    var m=document.querySelector('meta[name=theme-color]');
    if(m) m.setAttribute('content',th.accent);
    document.documentElement.setAttribute('data-theme',id);
  }

  function render(){var host=document.getElementById('themePick');if(!host)return;var c=cur();
    var n=host.querySelectorAll('[data-th]');
    for(var i=0;i<n.length;i++)n[i].setAttribute('aria-pressed',n[i].getAttribute('data-th')===c?'true':'false');}
  function set(id){if(!THEMES[id])return;try{localStorage.setItem(KEY,id);}catch(e){}apply(id);render();}
  function swatches(hostId){var host=document.getElementById(hostId);if(!host)return;
    host.innerHTML=ORDER.map(function(id){var th=THEMES[id];
      return '<button type="button" class="thsw" data-th="'+id+'" title="Thème '+th.nom+'" aria-label="Thème '+th.nom+'" onclick="PCTheme.set(\''+id+'\')"><span class="sw" style="background:'+th.accent+';border:1px solid '+th.line+'"></span>'+th.nom+'</button>';}).join('');
    render();}

  var c=cur(); if(c) apply(c);

  function inject(){
    if(document.getElementById('pcThemeBtn'))return;
    /* THEME_CONTRASTE_V38 : si la page montre DÉJÀ le sélecteur (index.html l'affiche dans la
       carte de connexion), on le remplit et on s'abstient d'ajouter le bouton flottant — deux
       « themePick » dans le document, ce serait un id en double et un doublon à l'écran. */
    var deja=document.getElementById('themePick');
    if(deja){ swatches('themePick'); return; }
    var css=document.createElement('style');css.textContent=
      ".thsw{display:inline-flex;align-items:center;gap:7px;border:1.5px solid var(--line);border-radius:10px;padding:6px 9px;margin:5px 6px 0 0;cursor:pointer;font:inherit;font-size:12px;background:var(--card);color:var(--ink);line-height:1}"+
      ".thsw span.sw{width:15px;height:15px;border-radius:50%;display:inline-block;flex:0 0 auto}"+
      ".thsw[aria-pressed=true]{outline:2px solid var(--accent);outline-offset:1px;font-weight:600}"+
      "#pcThemeBtn{position:fixed;right:14px;bottom:calc(14px + env(safe-area-inset-bottom));z-index:9000;width:46px;height:46px;border-radius:50%;border:1px solid var(--line);background:var(--card);color:var(--ink);font-size:21px;cursor:pointer;box-shadow:0 3px 12px rgba(0,0,0,.18)}"+
      "#pcThemePop{position:fixed;right:14px;bottom:calc(68px + env(safe-area-inset-bottom));z-index:9000;background:var(--card);color:var(--ink);border:1px solid var(--line);border-radius:14px;padding:12px 14px;max-width:290px;box-shadow:0 8px 28px rgba(0,0,0,.22);display:none}"+
      "#pcThemePop.open{display:block}#pcThemePop h4{margin:0 0 8px;font-size:13px;color:var(--muted);font-weight:600}";
    document.head.appendChild(css);
    var btn=document.createElement('button');btn.id='pcThemeBtn';btn.title='Thème';btn.textContent='🎨';
    var pop=document.createElement('div');pop.id='pcThemePop';
    pop.innerHTML='<h4>Thème de l\'interface</h4><div id="themePick"></div>';
    document.body.appendChild(btn);document.body.appendChild(pop);
    swatches('themePick');
    btn.addEventListener('click',function(e){e.stopPropagation();pop.classList.toggle('open');});
    document.addEventListener('click',function(e){if(pop.classList.contains('open')&&!pop.contains(e.target)&&e.target!==btn)pop.classList.remove('open');});
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",inject); else inject();

  return {THEMES:THEMES,ORDER:ORDER,cur:cur,set:set,apply:apply,swatches:swatches,
          surFond:surFond,lisible:lisible};
})();

/* =============================================================================
   PIED_VERSION_V63 — « chaque page dit son âge ». MAÎTRE v63, 08/09/2026.
   -----------------------------------------------------------------------------
   Demande de Laurent (07-08/09) : en une journée il a regardé le site en ligne, un
   plan enregistré plus vieux que le code, une page publiée plus vieille que son
   disque — trois copies, aucune qui dise son âge. Ce bloc ajoute, sur TOUTE page
   qui charge pcmajo_ui.js, un bouton ⓘ au-dessus du bouton 🎨. Il ouvre un panneau :

     · la page : son nom, sa date de publication (document.lastModified) ;
     · d'où elle vient : le site en ligne, ou une copie locale (file://) ;
     · les données qu'elle exécute : date de base_edt.js et base_dates.js, relue
       sur le serveur (en-tête Last-Modified) — donc la date de la DERNIÈRE
       version publiée, pas d'une copie de cache ;
     · qui est connecté (élève / enseignant / personne), et si c'est une session
       de test ; l'année de travail.

   Une page peut compléter le panneau (ce qu'on y modifie, où ça s'enregistre) :
       PCAide.page({ titre:"…", html:"…" })      — AIDE_PAGE_V63, à venir.
   Le bloc ne touche à aucune donnée, n'écrit rien dans le stockage.
   ============================================================================= */
window.PCAide = (function(){
  "use strict";
  var MOIS=["janv.","févr.","mars","avr.","mai","juin","juil.","août","sept.","oct.","nov.","déc."];
  function fr(d){
    if(!d || isNaN(d.getTime())) return "date inconnue";
    var h=String(d.getHours()).padStart(2,"0"), m=String(d.getMinutes()).padStart(2,"0");
    return d.getDate()+" "+MOIS[d.getMonth()]+" "+d.getFullYear()+" à "+h+":"+m;
  }
  function esc(s){ return String(s==null?"":s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];}); }
  function nomPage(){ var p=location.pathname.split("/").pop(); return p||"index.html"; }
  function datePage(){
    /* document.lastModified : en ligne = en-tête Last-Modified (le push) ; en local = le fichier. */
    var d=new Date(document.lastModified); return fr(d);
  }
  function origine(){
    if(location.protocol==="file:") return {t:"une COPIE LOCALE sur cet appareil (fichier)", local:true};
    if(/github\.io$/.test(location.hostname)) return {t:"le site en ligne ("+location.hostname+")", local:false};
    return {t:"une adresse autre que le site ("+location.host+")", local:false};
  }
  function session(){
    var a=null;
    try{ a=JSON.parse(sessionStorage.getItem("pcmajo_acces")); }catch(e){}
    if(!a){ try{ a=JSON.parse(localStorage.getItem("pcmajo_acces")); }catch(e){} }
    return a||null;
  }
  function quiEstLa(){
    var a=session(); if(!a||!a.role) return "personne n'est connecté";
    var t = a.role==="prof" ? ((a.prenom||"un enseignant")+" — espace enseignant")
                            : ("un élève de la classe "+(a.code||"?"));
    if(a.test===true) t+=" (session fabriquée par le MODE TEST, pas un vrai code)";
    return t;
  }
  function annee(){ try{ return localStorage.getItem("gestion_majorelle_annee")||"(pas encore choisie — les pages prof prennent 2025-2026 par défaut)"; }catch(e){ return "?"; } }

  var PAGE=null;            /* renseigné par PCAide.page({...}) — AIDE_PAGE_V63 */
  var DONNEES={};           /* fichier -> date lue sur le serveur */

  function ligneDonnees(nom, present){
    if(!present) return "";
    var d=DONNEES[nom];
    var txt = d===undefined ? "lecture en cours…" : (d===null ? "date non lisible ici (copie locale)" : fr(d));
    return '<li>'+esc(nom)+' : <b>'+esc(txt)+'</b></li>';
  }
  function html(){
    var o=origine();
    var s='<h4>Cette page</h4><ul>'
      +'<li>'+esc(nomPage())+' — publiée le <b>'+esc(datePage())+'</b></li>'
      +'<li>tu regardes <b>'+esc(o.t)+'</b></li></ul>';
    if(window.BASE_EDT || window.BASE_DATES){
      s+='<h4>Les données qu\'elle exécute</h4><ul>'
        +ligneDonnees("base_edt.js (emplois du temps)", !!window.BASE_EDT)
        +ligneDonnees("base_dates.js (calendrier)", !!window.BASE_DATES)
        +'</ul><p class="pcAideNote">Ces dates sont relues sur le serveur à chaque ouverture : si elles sont plus récentes que ce que tu attendais, c\'est qu\'une publication a eu lieu.</p>';
    }
    s+='<h4>Qui est connecté</h4><ul><li>'+esc(quiEstLa())+'</li>'
      +'<li>année de travail : <b>'+esc(annee())+'</b></li></ul>';
    if(PAGE && PAGE.html){ s+='<h4>'+esc(PAGE.titre||"Enregistrer sur cette page")+'</h4>'+PAGE.html; }
    return s;
  }
  function lireDates(){
    if(location.protocol==="file:"){ DONNEES["base_edt.js (emplois du temps)"]=null; DONNEES["base_dates.js (calendrier)"]=null; return; }
    [["base_edt.js","base_edt.js (emplois du temps)",!!window.BASE_EDT],
     ["base_dates.js","base_dates.js (calendrier)",!!window.BASE_DATES]].forEach(function(t){
      if(!t[2]) return;
      try{
        fetch(t[0],{method:"HEAD",cache:"no-store"}).then(function(r){
          var lm=r.headers.get("last-modified");
          DONNEES[t[1]] = lm ? new Date(lm) : null; render();
        }).catch(function(){ DONNEES[t[1]]=null; render(); });
      }catch(e){ DONNEES[t[1]]=null; }
    });
  }
  function render(){ var p=document.getElementById("pcAidePop"); if(p) p.innerHTML=html(); }

  function inject(){
    if(document.getElementById("pcAideBtn")) return;
    var css=document.createElement("style"); css.id="pcAideCss"; css.textContent=
      "#pcAideBtn{position:fixed;right:14px;bottom:calc(66px + env(safe-area-inset-bottom));z-index:9000;width:46px;height:46px;border-radius:50%;border:1px solid var(--line,#ccc);background:var(--card,#fff);color:var(--ink,#222);font:600 20px/1 system-ui,sans-serif;cursor:pointer;box-shadow:0 3px 12px rgba(0,0,0,.18)}"
      +"#pcAidePop{position:fixed;right:14px;bottom:calc(120px + env(safe-area-inset-bottom));z-index:9001;background:var(--card,#fff);color:var(--ink,#222);border:1px solid var(--line,#ccc);border-radius:14px;padding:12px 14px;width:min(92vw,360px);max-height:min(70vh,520px);overflow:auto;box-shadow:0 8px 28px rgba(0,0,0,.22);display:none;font:13px/1.45 system-ui,-apple-system,Segoe UI,Roboto,sans-serif}"
      +"#pcAidePop.open{display:block}#pcAidePop h4{margin:8px 0 4px;font-size:12px;color:var(--muted,#666);font-weight:600;text-transform:uppercase;letter-spacing:.03em}#pcAidePop h4:first-child{margin-top:0}"
      +"#pcAidePop ul{margin:0;padding-left:18px}#pcAidePop li{margin:2px 0}#pcAidePop .pcAideNote{margin:6px 0 0;color:var(--muted,#666);font-size:12px}"
      +"#pcAidePop p{margin:6px 0}#pcAidePop code{background:var(--card2,#f2f2f2);padding:0 4px;border-radius:4px}";
    document.head.appendChild(css);
    var btn=document.createElement("button"); btn.id="pcAideBtn"; btn.type="button";
    btn.title="Version de la page, données, aide"; btn.setAttribute("aria-label","Version et aide"); btn.textContent="?";
    var pop=document.createElement("div"); pop.id="pcAidePop"; pop.setAttribute("role","dialog");
    document.body.appendChild(btn); document.body.appendChild(pop);
    btn.addEventListener("click",function(e){ e.stopPropagation(); render(); pop.classList.toggle("open"); });
    document.addEventListener("click",function(e){ if(pop.classList.contains("open")&&!pop.contains(e.target)&&e.target!==btn) pop.classList.remove("open"); });
    lireDates();
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",inject); else inject();

  return { page:function(p){ PAGE=p||null; render(); }, session:session, origine:origine, datePage:datePage, rafraichir:render };
})();
/* ============================== fin PIED_VERSION_V63 ============================== */

/* =============================================================================
   AIDE_PAGE_V63 — l'aide contextuelle, par page et par rôle. MAÎTRE v63, 08/09/2026.
   -----------------------------------------------------------------------------
   Demande de Laurent (07-08/09) : « sur chaque page où on peut faire des modifications,
   un menu contextuel qui aide à la faire, et surtout à enregistrer de façon pérenne et
   claire », « que ce soit élève, prof ou admin (moi qui change le programme) », « comment
   enregistrer, ce que ça fait de le faire ici ou là ».
   Chaque texte ci-dessous vient du relevé du 08/09 (clé par clé, bouton par bouton) : il
   ne décrit que ce que la page FAIT. Le rôle vient de la session (pcmajo_acces) ; l'admin
   est l'enseignant qui change le programme, reconnu par son prénom. Le panneau s'ouvre
   par le bouton « ? » (PIED_VERSION_V63).
   ============================================================================= */
(function(){
  "use strict";
  if(!window.PCAide) return;
  var s=PCAide.session()||{};
  var role = s.role==="prof" ? "prof" : (s.role==="eleve" ? "eleve" : "aucun");
  var admin = role==="prof" && /^laurent$/i.test(String(s.prenom||""));
  var page=(location.pathname.split("/").pop()||"index.html").toLowerCase();

  var NAV = "<p class='pcAideNote'>Tout ce que tu enregistres vit dans <b>ce navigateur, sur cet appareil</b>. Un autre téléphone, un autre ordinateur, un autre navigateur, une navigation privée ou un historique vidé : il repart de zéro. Rien n'est envoyé sur un serveur.</p>";
  var ANNEE = "<li>L'<b>année de travail</b> choisie en haut de page vaut pour <b>toutes</b> les pages enseignant : la changer ici, c'est changer de carnet partout.</li>";
  var ADMIN_BASE = "<h4>Admin — faire descendre dans le site</h4><ul>"
    +"<li>Un emploi du temps ou une période corrigés dans le gestionnaire ne sont vus par les <b>autres appareils et les collègues</b> qu'après régénération de <code>base_edt.js</code> (<code>_BASE\\exporter_edt_site_v53.py</code>) puis <b>commit / push</b> du dépôt.</li>"
    +"<li>« 📅 publier le plan » écrit <code>progression_dates.js</code> : à déposer à la racine du dépôt et à pousser — c'est ce que lisent les élèves (test du soir, révision).</li>"
    +"<li>« ⬇︎ exporter les dates » écrit <code>dates_cours.json</code> : à déposer dans <code>_BASE\\</code>, puis régénérer et pousser.</li>"
    +"<li>Le panneau « ? » dit la date de la base que chaque page exécute : si elle est plus vieille que ta correction, le geste ci-dessus manque.</li></ul>";

  var AIDES = {
    "index.html": function(){
      return "<ul><li>Tape ton code (ou scanne ta carte) : la connexion vaut pour <b>cet onglet</b>.</li>"
        +"<li>Case <b>« Se souvenir de moi sur cet appareil »</b> cochée : tu restes connecté après fermeture du navigateur. Décochée : tout est oublié à la fermeture.</li>"
        +"<li><b>« Ce n'est pas moi — changer de profil »</b> efface la connexion mémorisée.</li>"
        +"<li>Rien d'autre ne s'enregistre ici.</li></ul>";
    },
    "prof.html": function(){
      return "<ul><li>L'<b>année</b>, la <b>classe active</b> et les blocs du menu ouverts/fermés s'enregistrent <b>automatiquement</b>, sans bouton.</li>"+ANNEE+"</ul>"+NAV;
    },
    "app.html": function(){ return AIDES["prof.html"](); },
    "eleve.html": function(){
      return "<ul><li>Cette page ne modifie rien : c'est ton menu.</li><li>Tes réponses se gardent dans les pages de révision (« Révision du soir », « Réviser par niveau »), automatiquement.</li></ul>"+NAV;
    },
    "classes.html": function(){
      return "<ul><li>Classe active, case « dédoublée », noms des groupes : enregistrés <b>automatiquement</b> à chaque clic, dans ce navigateur (magasin de l'enseignant, par année).</li><li>Aucun fichier n'est produit ici.</li></ul>"+NAV;
    },
    "suivi.html": function(){
      return "<ul><li>Chaque case cochée est enregistrée <b>automatiquement</b>, dans ce navigateur, pour l'enseignant connecté et l'année choisie.</li>"+ANNEE+"</ul>"+NAV;
    },
    "ma_semaine.html": function(){
      var h="<ul><li>Page en <b>lecture seule</b> : rien ne s'y enregistre, sauf l'année choisie.</li>"
        +"<li>Ce qu'elle affiche vient de <b>ton carnet</b> (celui du gestionnaire, sur cet appareil) s'il existe, sinon de la base publiée <code>base_edt.js</code>.</li>"
        +"<li>Pour corriger un créneau : <b>gestionnaire → Classes & horaires</b>, puis 💾. La semaine se met à jour sur cet appareil.</li></ul>"+NAV;
      if(admin) h+=ADMIN_BASE;
      return h;
    },
    "gestion_v0.1.html": function(){
      var h="<ul><li>Tout ce que tu modifies (classes, horaires, calendrier, suivi, prévisionnel, élèves, matériel, progressions, compétences) est enregistré <b>automatiquement</b> dans ce navigateur : c'est ton <b>carnet</b>, un par enseignant et par année.</li>"
        +"<li><b>💾 Enregistrer</b> = télécharger une <b>copie fichier</b> du carnet (<code>gestion_&lt;prénom&gt;_&lt;année&gt;_&lt;date&gt;.json</code>). Elle porte des <b>noms d'élèves</b> : garde-la hors du site et hors du dépôt (par exemple <code>de_laurent\\</code>). Elle sert à changer d'appareil ou à archiver.</li>"
        +"<li><b>📂 Importer</b> recharge une copie fichier et <b>remplace tout</b> ce qui est à l'écran.</li>"
        +"<li>Le <b>cahier de textes prévisionnel</b> (onglet Suivi) et la colonne « Séance (constructeur) » se remplissent <b>tout seuls</b> depuis le constructeur, sur le même appareil. Une affectation faite à la main (onglet Prévisionnel) prime toujours. Le bouton « 📋 copier » donne le texte d'une séance, prêt à coller dans le cahier de textes de l'ENT.</li>"
        +"<li><b>📥 Importer un relevé Skolengo</b> ajoute les élèves à la classe active. <b>⇄ mobile</b> échange une grille de compétences avec la saisie mobile.</li>"
        +ANNEE+"</ul>"+NAV;
      if(admin) h+=ADMIN_BASE;
      return h;
    },
    "constructeur.html": function(){
      var h="<ul><li>Ordre des chapitres, découpage, séances, capacités cochées, notes : enregistrés <b>automatiquement</b> dans ce navigateur (par niveau).</li>"
        +"<li>Le plan part <b>tout seul</b> vers le gestionnaire (cahier de textes, prévisionnel) sur cet appareil, à chaque enregistrement.</li>"
        +"<li><b>⬇ Exporter les boKeys datés</b> = un fichier pour porter le plan sur un <b>autre appareil</b> (gestionnaire → Prévisionnel → « Importer un fichier boKeys »).</li>"
        +"<li>Panneau EDT : <b>Enregistrer</b> garde ton emploi du temps personnalisé pour ce niveau et cette classe ; <b>Réinitialiser</b> l'efface et revient à la base.</li>"
        +"<li>⚠ <b>↻ Régénérer les séances</b> remplace tes réglages de séances du niveau.</li>"+ANNEE+"</ul>"+NAV;
      if(admin) h+="<h4>Admin</h4><ul><li>Le plan des élèves (test du soir) ne change qu'avec « 📅 publier le plan » dans le gestionnaire, puis push de <code>progression_dates.js</code>.</li></ul>";
      return h;
    },
    "revision.html": function(){
      return "<ul><li>Tes réponses et tes boîtes de révision se gardent <b>automatiquement</b>, dans ce navigateur, sur cet appareil.</li><li>Ton niveau, s'il t'a été demandé, est mémorisé de la même façon.</li><li>Rien à envoyer, pas de compte : garde le même appareil et ne vide pas l'historique du navigateur.</li></ul>"+NAV;
    },
    "revision_sti2d_tale.html": function(){ return AIDES["revision.html"](); },
    "test_du_soir_v45.html": function(){
      var h="<ul><li>Chaque réponse est enregistrée <b>automatiquement</b> dans ce navigateur : tes boîtes, ta série, ton dernier passage.</li><li>Pas de compte, rien n'est envoyé : garde le même appareil et ne vide pas l'historique du navigateur.</li></ul>"+NAV;
      if(role==="prof") h+="<h4>Enseignant</h4><ul><li>En mode test, « ⚐ signaler cette question » garde une liste dans ce navigateur ; « Voir le rapport à copier » te donne le texte à coller dans la conversation du projet.</li></ul>";
      return h;
    },
    "saisie_competences_mobile.html": function(){
      return "<ul><li>Classe, critères, barème, élèves, niveaux A/B/C/D : enregistrés <b>automatiquement</b> dans ce navigateur (une grille à la fois).</li><li><b>Exporter</b> = fichier <code>grille_&lt;classe&gt;_&lt;tp&gt;.json</code>, à réimporter dans le gestionnaire → Compétences (⇄ mobile). <b>Importer</b> recharge un tel fichier ici. <b>Effacer</b> vide la grille.</li></ul>"+NAV;
    },
    "carte_mentale.html": function(){ return "<ul><li>Consultation seule : rien ne s'enregistre ici.</li></ul>"; }
  };
  var f=AIDES[page]; if(!f) return;
  var titre = role==="eleve" ? "Enregistrer — élève" : (admin ? "Enregistrer — enseignant / admin" : (role==="prof" ? "Enregistrer — enseignant" : "Enregistrer sur cette page"));
  try{ PCAide.page({titre:titre, html:f()}); }catch(e){}
})();
/* ============================== fin AIDE_PAGE_V63 ============================== */

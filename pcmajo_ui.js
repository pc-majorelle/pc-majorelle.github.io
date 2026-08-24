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

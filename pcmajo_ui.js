/* pcmajo_ui.js — MAÎTRE v30 (base neuve). Kit d'interface partagé : thème unique (9 ambiances)
   auto-appliqué + bouton flottant 🎨, injecté sur toute page qui inclut ce script.
   → une seule palette d'un bout à l'autre du site. */
window.PCTheme = (function(){
  var THEMES={atelier:{nom:"Atelier",bg:"#f6f3ec",card:"#ffffff",ink:"#2b2b2b",muted:"#6b6b63",line:"#d8d3c4",accent:"#3E6E97"},neon:{nom:"Néon",bg:"#0d0d14",card:"#171722",ink:"#e8e8f0",muted:"#9a9ab0",line:"#2c2c40",accent:"#00d4ff"},herbier:{nom:"Herbier",bg:"#f3efe2",card:"#fbf9f2",ink:"#3a4128",muted:"#5f6347",line:"#d7d0bc",accent:"#5a7a8c"},riso:{nom:"Riso",bg:"#fdf6ec",card:"#ffffff",ink:"#2a2a3a",muted:"#7a5a60",line:"#efd9d0",accent:"#2b4bdd"},blueprint:{nom:"Blueprint",bg:"#0a2540",card:"#103055",ink:"#cfe0f0",muted:"#7f9cc0",line:"#284c6e",accent:"#5b9bd5"},crepuscule:{nom:"Crépuscule",bg:"#2a1a3e",card:"#37254c",ink:"#ffd0e8",muted:"#c0a0d0",line:"#4a3560",accent:"#ff9e7a"},sumie:{nom:"Sumi-e",bg:"#faf8f4",card:"#ffffff",ink:"#1a1a1a",muted:"#555555",line:"#e2ded6",accent:"#5a6268"},feu:{nom:"Feu",bg:"#1a0a05",card:"#2a1109",ink:"#ffe3d0",muted:"#e6a988",line:"#5c2917",accent:"#ff4d1a"},foret:{nom:"Forêt",bg:"#0a1a0f",card:"#112a19",ink:"#daefdd",muted:"#93c1a0",line:"#224a31",accent:"#2fae52"}};
  var ORDER=["atelier","neon","herbier","riso","blueprint","crepuscule","sumie","feu","foret"];var KEY="pcmajo_theme";
  function cur(){try{var t=localStorage.getItem(KEY);return THEMES[t]?t:null;}catch(e){return null;}}
  function apply(id){var th=THEMES[id];if(!th)return;var r=document.documentElement.style;r.setProperty('--bg',th.bg);r.setProperty('--card',th.card);r.setProperty('--card2',th.line);r.setProperty('--ink',th.ink);r.setProperty('--muted',th.muted);r.setProperty('--line',th.line);r.setProperty('--accent',th.accent);var m=document.querySelector('meta[name=theme-color]');if(m)m.setAttribute('content',th.accent);document.documentElement.setAttribute('data-theme',id);}
  function render(){var host=document.getElementById('themePick');if(!host)return;var c=cur();var n=host.querySelectorAll('[data-th]');for(var i=0;i<n.length;i++)n[i].setAttribute('aria-pressed',n[i].getAttribute('data-th')===c?'true':'false');}
  function set(id){if(!THEMES[id])return;try{localStorage.setItem(KEY,id);}catch(e){}apply(id);render();}
  function swatches(hostId){var host=document.getElementById(hostId);if(!host)return;host.innerHTML=ORDER.map(function(id){var th=THEMES[id];return '<button type="button" class="thsw" data-th="'+id+'" onclick="PCTheme.set(\''+id+'\')"><span class="sw" style="background:'+th.accent+';border:1px solid '+th.line+'"></span>'+th.nom+'</button>';}).join('');render();}
  var c=cur();if(c)apply(c);
  function inject(){
    if(document.getElementById('pcThemeBtn'))return;
    var css=document.createElement('style');css.textContent=
      ".thsw{display:inline-flex;align-items:center;gap:7px;border:1.5px solid var(--line);border-radius:10px;padding:6px 9px;margin:5px 6px 0 0;cursor:pointer;font:inherit;font-size:12px;background:var(--card);color:var(--ink);line-height:1}"+
      ".thsw span.sw{width:15px;height:15px;border-radius:50%;display:inline-block;flex:0 0 auto}"+
      ".thsw[aria-pressed=true]{outline:2px solid var(--accent);outline-offset:1px;font-weight:600}"+
      "#pcThemeBtn{position:fixed;right:14px;bottom:calc(14px + env(safe-area-inset-bottom));z-index:60;width:46px;height:46px;border-radius:50%;border:1px solid var(--line);background:var(--card);color:var(--ink);font-size:21px;cursor:pointer;box-shadow:0 3px 12px rgba(0,0,0,.18)}"+
      "#pcThemePop{position:fixed;right:14px;bottom:calc(68px + env(safe-area-inset-bottom));z-index:60;background:var(--card);color:var(--ink);border:1px solid var(--line);border-radius:14px;padding:12px 14px;max-width:290px;box-shadow:0 8px 28px rgba(0,0,0,.22);display:none}"+
      "#pcThemePop.open{display:block}#pcThemePop h4{margin:0 0 8px;font-size:13px;color:var(--muted);font-weight:600}";
    document.head.appendChild(css);
    var btn=document.createElement('button');btn.id='pcThemeBtn';btn.title='Thème';btn.textContent='🎨';
    var pop=document.createElement('div');pop.id='pcThemePop';pop.innerHTML='<h4>Thème de l\'interface</h4><div id="themePick"></div>';
    document.body.appendChild(btn);document.body.appendChild(pop);
    swatches('themePick');
    btn.addEventListener('click',function(e){e.stopPropagation();pop.classList.toggle('open');});
    document.addEventListener('click',function(e){if(pop.classList.contains('open')&&!pop.contains(e.target)&&e.target!==btn)pop.classList.remove('open');});
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",inject); else inject();
  return {THEMES:THEMES,ORDER:ORDER,cur:cur,set:set,apply:apply,swatches:swatches};
})();

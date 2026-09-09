/* trombi_v70.js — TROMBINOSCOPE_V70 : lecture d'un trombinoscope PDF DANS le navigateur (pdf.js, embarqué dans le dépôt),
   sans réseau, sans envoi. Renvoie pour chaque page les photos (data:image/jpeg) et le nom lu sous/sur chaque photo.
   Rien n'est écrit ici : l'appelant (gestion_core.js) décide où ranger (réserve locale IndexedDB, carnet).
   API : Trombi.lire(file, {sur:function(pct, texte)}) -> Promise<{fichier, classeFichier, pages:n, eleves:[{nom, prenom, brut, photo, page}]}>
   pdf.js : pdf.min.js + pdf.worker.min.js (3.11.174, legacy) chargés à la demande par Trombi.charger(). */
window.Trombi = (function(){
  var PDFJS_SRC = "pdfjs/pdf.min.js", WORKER_SRC = "pdfjs/pdf.worker.min.js";
  var ECHELLE_PHOTO = 160;            /* largeur cible d'une photo en px (≈ 6 Ko en JPEG 0,8) */
  var pret = null;
  function charger(){
    if(pret) return pret;
    pret = new Promise(function(res, rej){
      if(window.pdfjsLib){ res(window.pdfjsLib); return; }
      var s = document.createElement("script"); s.src = PDFJS_SRC;
      s.onload = function(){ try{ window.pdfjsLib.GlobalWorkerOptions.workerSrc = WORKER_SRC; res(window.pdfjsLib); }catch(e){ rej(e); } };
      s.onerror = function(){ rej(new Error("pdf.js introuvable (" + PDFJS_SRC + ")")); };
      document.head.appendChild(s);
    });
    return pret;
  }
  /* code de classe dans le nom du fichier Pronote : trombinoscope_10114~2ndgt3_20260909.pdf -> "2ndgt3" ;
     trombinoscope_10114~groupeoptionadhoc_2026_1phchgr1_20260909.pdf -> "1phchgr1" */
  function classeDuNom(nom){
    var m = /~(.+?)_\d{8}\.pdf$/i.exec(nom || ""); if(!m) return "";
    var c = m[1].replace(/^groupeoptionadhoc_\d{4}_/i, "");
    return c;
  }
  function mul(a, b){ return [a[0]*b[0]+a[1]*b[2], a[0]*b[1]+a[1]*b[3], a[2]*b[0]+a[3]*b[2], a[2]*b[1]+a[3]*b[3],
                               a[4]*b[0]+a[5]*b[2]+b[4], a[4]*b[1]+a[5]*b[3]+b[5]]; }
  function app(m, x, y){ return [m[0]*x + m[2]*y + m[4], m[1]*x + m[3]*y + m[5]]; }
  /* rectangles des images placées (espace utilisateur PDF, y vers le haut) */
  function rectsImages(pdfjs, opList){
    var OPS = pdfjs.OPS, ctm = [1,0,0,1,0,0], pile = [], out = [];
    for(var i = 0; i < opList.fnArray.length; i++){
      var fn = opList.fnArray[i], a = opList.argsArray[i];
      if(fn === OPS.save) pile.push(ctm.slice());
      else if(fn === OPS.restore) ctm = pile.pop() || [1,0,0,1,0,0];
      else if(fn === OPS.transform) ctm = mul(a, ctm);
      else if(fn === OPS.paintImageXObject || fn === OPS.paintJpegXObject || fn === OPS.paintInlineImageXObject || fn === OPS.paintImageMaskXObject){
        var p0 = app(ctm, 0, 0), p1 = app(ctm, 1, 0), p2 = app(ctm, 0, 1), p3 = app(ctm, 1, 1);
        var xs = [p0[0], p1[0], p2[0], p3[0]], ys = [p0[1], p1[1], p2[1], p3[1]];
        var x0 = Math.min.apply(null, xs), x1 = Math.max.apply(null, xs), y0 = Math.min.apply(null, ys), y1 = Math.max.apply(null, ys);
        if(x1 - x0 > 20 && y1 - y0 > 20) out.push({x0:x0, x1:x1, y0:y0, y1:y1, w:x1-x0, h:y1-y0});
      }
    }
    return out;
  }
  /* un logo / bandeau n'est pas une photo : on garde les images de taille "modale" (la plus fréquente, ±25 %) */
  function photosSeules(rects){
    if(rects.length < 2) return rects;
    var byW = {}; rects.forEach(function(r){ var k = Math.round(r.w / 5) * 5; byW[k] = (byW[k] || 0) + 1; });
    var best = null; Object.keys(byW).forEach(function(k){ if(best === null || byW[k] > byW[best]) best = k; });
    var wRef = +best;
    return rects.filter(function(r){ return Math.abs(r.w - wRef) <= wRef * 0.25; });
  }
  /* lignes de texte : regroupe les items par ligne (même y ± 2) */
  function lignesTexte(content){
    var items = content.items.filter(function(it){ return it.str && it.str.trim(); })
      .map(function(it){ var t = it.transform; return {x:t[4], y:t[5], w:it.width || 0, h:it.height || Math.abs(t[3]) || 8, s:it.str}; });
    items.sort(function(a, b){ return (b.y - a.y) || (a.x - b.x); });
    var lignes = [];
    items.forEach(function(it){
      var L = lignes[lignes.length - 1];
      if(L && Math.abs(L.y - it.y) <= 2.5){ L.items.push(it); L.x1 = Math.max(L.x1, it.x + it.w); }
      else lignes.push({y:it.y, x0:it.x, x1:it.x + it.w, h:it.h, items:[it]});
    });
    /* une même ligne (même y) traverse toutes les colonnes : on la coupe aux grands blancs (> 1,5 × hauteur, au moins 10 pt) */
    var out = [];
    lignes.forEach(function(L){ L.items.sort(function(a, b){ return a.x - b.x; });
      var cur = null;
      L.items.forEach(function(it){
        if(cur && it.x - cur.x1 > Math.max(10, cur.h * 1.5)){ out.push(cur); cur = null; }
        if(!cur) cur = {y:L.y, x0:it.x, x1:it.x + it.w, h:it.h, items:[it]};
        else { cur.items.push(it); cur.x1 = Math.max(cur.x1, it.x + it.w); }
      });
      if(cur) out.push(cur);
    });
    out.forEach(function(L){ L.s = L.items.map(function(i){ return i.s; }).join(" ").replace(/\s+/g, " ").trim(); L.xc = (L.x0 + L.x1) / 2; });
    return out;
  }
  /* le nom d'une photo = les lignes de texte dont le centre tombe dans la colonne de la photo, juste SOUS elle (puis, à défaut, juste DESSUS) */
  function nomPour(r, lignes, options){
    var marge = Math.max(4, r.w * 0.15), lim = options.lignesMax || 3, portee = r.h * 0.9;
    var col = lignes.filter(function(L){ return L.xc >= r.x0 - marge && L.xc <= r.x1 + marge; });
    var dessous = col.filter(function(L){ return L.y < r.y0 && L.y > r.y0 - portee; }).sort(function(a, b){ return b.y - a.y; }).slice(0, lim);
    var dessus  = col.filter(function(L){ return L.y > r.y1 && L.y < r.y1 + portee; }).sort(function(a, b){ return a.y - b.y; }).slice(0, lim);
    var pick = (options.position === "dessus") ? dessus : (dessous.length ? dessous : dessus);
    if(options.position === "dessus" && !pick.length) pick = dessous;
    if(!pick.length) return "";
    /* on s'arrête au premier bloc contigu (écart d'interligne ≤ 2 × hauteur) */
    var out = [pick[0]];
    for(var i = 1; i < pick.length; i++){ if(Math.abs(pick[i].y - pick[i-1].y) <= Math.max(pick[i].h, pick[i-1].h) * 2.2) out.push(pick[i]); else break; }
    if(options.position !== "dessus" && dessous.length === 0) out.reverse();
    return out.map(function(L){ return L.s; }).join(" ");
  }
  /* "NOM Prénom", "NOM Prénom Deuxième", "Prénom NOM" -> {nom, prenom} (le nom = les mots en majuscules) */
  function decouper(brut){
    /* Pronote ajoute le code de classe entre parenthèses sous le nom — « (2NDGT3) » — : on l'ôte (Laurent, 09/09) */
    var w = String(brut || "").replace(/\([^)]*\)/g, " ").replace(/\s+/g, " ").trim().split(" ").filter(Boolean);
    var isUp = function(t){ return t.length > 1 && t === t.toLocaleUpperCase("fr") && t !== t.toLocaleLowerCase("fr"); };
    var up = w.filter(isUp), lo = w.filter(function(t){ return !isUp(t); });
    if(up.length && lo.length) return {nom:up.join(" "), prenom:lo.join(" ")};
    if(w.length > 1) return {nom:w[0], prenom:w.slice(1).join(" ")};
    return {nom:w[0] || "", prenom:""};
  }
  function lire(file, options){
    options = options || {}; var sur = options.sur || function(){};
    return charger().then(function(pdfjs){
      return file.arrayBuffer().then(function(buf){ return pdfjs.getDocument({data:buf, isEvalSupported:false}).promise; })
      .then(function(doc){
        var res = {fichier:file.name, classeFichier:classeDuNom(file.name), pages:doc.numPages, eleves:[], images:0, sansNom:0};
        var chaine = Promise.resolve();
        for(var p = 1; p <= doc.numPages; p++)(function(p){
          chaine = chaine.then(function(){ return doc.getPage(p); }).then(function(page){
            sur(Math.round(100 * (p - 1) / doc.numPages), "page " + p + " / " + doc.numPages);
            return Promise.all([page.getOperatorList(), page.getTextContent()]).then(function(r){
              var rects = photosSeules(rectsImages(pdfjs, r[0])), lignes = lignesTexte(r[1]);
              res.images += rects.length;
              if(!rects.length) return;
              var ech = ECHELLE_PHOTO / rects[0].w, vp = page.getViewport({scale:ech});
              var cv = document.createElement("canvas"); cv.width = Math.ceil(vp.width); cv.height = Math.ceil(vp.height);
              var ctx = cv.getContext("2d");
              return page.render({canvasContext:ctx, viewport:vp}).promise.then(function(){
                /* ordre de lecture : ligne par ligne (y décroissant), puis x croissant */
                rects.sort(function(a, b){ return (Math.abs(a.y0 - b.y0) > a.h * 0.5) ? (b.y0 - a.y0) : (a.x0 - b.x0); });
                rects.forEach(function(r){
                  var a = vp.convertToViewportPoint(r.x0, r.y1), b = vp.convertToViewportPoint(r.x1, r.y0);
                  var sx = Math.max(0, Math.round(a[0])), sy = Math.max(0, Math.round(a[1])), sw = Math.round(b[0] - a[0]), sh = Math.round(b[1] - a[1]);
                  var c2 = document.createElement("canvas"); c2.width = sw; c2.height = sh;
                  c2.getContext("2d").drawImage(cv, sx, sy, sw, sh, 0, 0, sw, sh);
                  var brut = nomPour(r, lignes, options), np = decouper(brut);
                  if(!brut) res.sansNom++;
                  res.eleves.push({nom:np.nom, prenom:np.prenom, brut:brut, photo:c2.toDataURL("image/jpeg", 0.8), page:p, w:sw, h:sh});
                });
                cv.width = 1; cv.height = 1;
              });
            });
          });
        })(p);
        return chaine.then(function(){ sur(100, "terminé"); return res; });
      });
    });
  }
  return {lire:lire, charger:charger, classeDuNom:classeDuNom, decouper:decouper, _nomPour:nomPour, _lignes:lignesTexte};
})();

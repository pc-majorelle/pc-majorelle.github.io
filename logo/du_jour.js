/* LOGO_V146 : le logo du jour (même tirage que le service, app.py lettre_logo_du_jour) */
(function(){var d=new Date(),n=d.getFullYear()*10000+(d.getMonth()+1)*100+d.getDate();
var L='ABCD'.charAt(((n*7919)%104729)%4);
function nv(u){return u.replace(/logo\/(logo-barre|favicon-32|favicon-16)\.png$/,'logo/jour/'+L+'-$1.png');}
var i,e=document.querySelectorAll('img[src$="logo/logo-barre.png"],link[rel=icon]');
for(i=0;i<e.length;i++){if(e[i].tagName==='IMG')e[i].setAttribute('src',nv(e[i].getAttribute('src')));
else e[i].setAttribute('href',nv(e[i].getAttribute('href')));}})();

// Splices tools/patches/arcade.js into game/index.html (idempotent: replaces a previous copy).
const fs=require('fs'),path=require('path');
const F=path.resolve(__dirname,'..','..','game','index.html');
let s=fs.readFileSync(F,'utf8');
const code=fs.readFileSync(path.join(__dirname,'arcade.js'),'utf8').replace(/\s+$/,'');
const B='/* >>> arcade easter egg (tools/patches/arcade.js) */\n',E='\n/* <<< arcade easter egg */\n';
const one=a=>{const n=s.split(a).length-1;if(n!==1)throw new Error('anchor x'+n+': '+a);};
if(s.includes(B))s=s.slice(0,s.indexOf(B))+s.slice(s.indexOf(E)+E.length);
for(const id of ['ARC_GAMES','ARCG','arcEl','openArcade','closeArcade','bgLounge','loungeDyn','dudeBump','arcadeRows','peepShow','ARCS','CAB','ARSW','hasTok'])
 if(new RegExp('(function|const|let)\\s+'+id+'\\b').test(s))throw new Error('name taken: '+id);
const A='/* ---------- screens ---------- */';one(A);
s=s.replace(A,B+code+E+A);
const T="theater:'Theater'}[MENU.page]";
if(s.includes(T))s=s.replace(T,"theater:'Theater',arcade:'Arcade'}[MENU.page]");
else if(!s.includes("arcade:'Arcade'}[MENU.page]"))throw new Error('menu title anchor missing');
fs.writeFileSync(F,s);console.log('patched',F);
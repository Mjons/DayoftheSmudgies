// Splices tools/patches/<name>.js into game/index.html before the screens section (idempotent, one marker pair per patch).
// Usage: node tools/patches/apply-patch.js portraits cornelius
const fs=require('fs'),path=require('path');
const F=path.resolve(__dirname,'..','..','game','index.html');let s=fs.readFileSync(F,'utf8');
const A='/* ---------- screens ---------- */';
for(const name of process.argv.slice(2)){
 const code=fs.readFileSync(path.join(__dirname,name+'.js'),'utf8').replace(/\s+$/,'');
 const B='/* >>> '+name+' (tools/patches/'+name+'.js) */\n',E='\n/* <<< '+name+' */\n';
 if(s.includes(B))s=s.slice(0,s.indexOf(B))+s.slice(s.indexOf(E)+E.length);
 if(s.split(A).length!==2)throw new Error('anchor');s=s.replace(A,()=>B+code+E+A);console.log('patched',name);}
fs.writeFileSync(F,s);
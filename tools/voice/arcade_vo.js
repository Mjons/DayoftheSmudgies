// Records voice-over for the arcade easter egg lines (same cast, model and settings as smudgies-source/tools/voice/vo_gen.py)
// and packs them into game/vo10.js. Usage: node tools/voice/arcade_vo.js [--dry] [--limit N]
// Reads the ElevenLabs key from ELEVENLABS_API_KEY or ../_keys/elevenlabs.txt (never printed, never written anywhere).
const fs=require('fs'),path=require('path');
const ROOT=path.resolve(__dirname,'..','..'),GAME=path.join(ROOT,'game'),CACHE=path.join(__dirname,'vo_arcade');
const CAST={willis:['SOYHLrjzK2X1ezoPC6cr',.4,.8],verny:['AZnzlk1XvdvUeBnXmlld',.5,.8],dude:['iP95p4xoKVk53GoZ742B',.3,.8],prof:['ODq5zmih8GrVes37Dizd',.35,.8]};
const TAG={dude:'[slow, stoned drawl] '};
const fnv=s=>{let h=0x811c9dc5;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,0x01000193)>>>0;}return h.toString(16).padStart(8,'0');};
const src=fs.readFileSync(path.join(ROOT,'tools','patches','arcade.js'),'utf8');
const lit=s=>JSON.parse(s);
/* every double-quoted literal is dialogue in arcade.js (code strings use single quotes) */
const all=[...src.matchAll(/"((?:[^"\\]|\\.)*)"/g)].map(m=>({t:lit(m[0]),i:m.index}));
const fnOf=i=>{const b=src.lastIndexOf('function ',i);return (src.slice(b+9).match(/^\w+/)||[''])[0];};
const ctx=i=>src.slice(Math.max(0,i-12),i);
const P3=['willis','dude','verny'],L=new Map();
const add=(spk,t)=>{for(const s of [].concat(spk)){const k=s+'_'+fnv(t);if(!L.has(k))L.set(k,{spk:s,text:t,key:k});}};
const CAB_LOOK=[],NEWS_LOOK=[];
const NOT_SPOKEN=/^(|PULL ISSUE #1|Pixelify Sans|top|button|b|m|t|c|k|Still on coin-op\. Somebody in the lounge knows a trick\.)$/;
for(const {t,i} of all){
 if(NOT_SPOKEN.test(t))continue;
 if(/^(SMUDGE BOSS BLITZ|SMUDGE IN SUDSLAND)/.test(t)||/^ (The screen says|CREDIT 1|There's a dent)/.test(t)){CAB_LOOK.push(t);continue;}
 if(/^Tonight's headline|^ The coin return flap/.test(t)){NEWS_LOOK.push(t);continue;}
 if(t==='Hundreds of comics.')continue; // fallback, never used: the shop's comic wall look is a string
 const c=ctx(i);
 if(/say\(D,\s*$/.test(c)){add('dude',t);continue;}
 if(/say\(V,\s*$/.test(c)){add('verny',t);continue;}
 if(fnOf(i)==='peepShow'||/PENNY PEEP|bolted down. Everything Cornelius|^Bolted\. Of course/.test(t)){add('dude',t);continue;}
 if(/Dude is in 1826|^Not now, Willis/.test(t)){add('willis',t);continue;}
 add(P3,t);}
/* composed lines: cabinet looks and the newspaper box look */
const [bz,sd]=CAB_LOOK.filter(t=>/^SMUDGE/.test(t)),fr=CAB_LOOK.find(t=>/FREE PLAY/.test(t)),cr=CAB_LOOK.find(t=>/CREDIT 1/.test(t)),co=CAB_LOOK.find(t=>/INSERT COIN/.test(t)),dn=CAB_LOOK.find(t=>/dent/.test(t));
for(const b of [bz,sd])for(const t of [b+fr,b+cr,b+co,b+co+dn])add(P3,t); // one token only, so CREDIT 1 never meets the dent
add(P3,NEWS_LOOK[0]+NEWS_LOOK[1]);add(P3,NEWS_LOOK[0]);
/* other patch files with plain dialogue: every double-quoted literal is a line; say(D,...) is the Dude, the rest is the player */
for(const fn of ['act3fill.js']){const s2=fs.readFileSync(path.join(ROOT,'tools','patches',fn),'utf8');
 for(const m of s2.matchAll(/"((?:[^"\\]|\\.)*)"/g)){const t=JSON.parse(m[0]);if(t.length<3||!/[a-z]/i.test(t))continue;add(/say\(D,\s*$/.test(s2.slice(Math.max(0,m.index-12),m.index))?'dude':P3,t);}}
/* story fixes outside the lounge code (tools/voice/extra_lines.json: [{spk,text}]) */
const XF=path.join(__dirname,'extra_lines.json');if(fs.existsSync(XF))for(const o of JSON.parse(fs.readFileSync(XF,'utf8')))add(o.spk,o.text);
/* skip lines the game already has */
const html=fs.readFileSync(path.join(GAME,'index.html'),'utf8');
const have=new Set(html.slice(html.indexOf('const VO_KEYS=new Set("')+23,html.indexOf('"',html.indexOf('const VO_KEYS=new Set("')+23)).split(' '));
/* ours = recorded into tools/voice/vo_arcade (stays in vo10.js on every rerun); anything else already in VO_KEYS is the original cast's */
const lines=[...L.values()].filter(o=>!have.has(o.key)||fs.existsSync(path.join(CACHE,o.key+'.mp3')));
const ttsText=(spk,t)=>{t=t.trim().replace(/^\.\.\.\s*/,'').replace(/#1\b/g,'number one').replace(/ -R'/g,". Signed, R.'").replace(/\bR\.T\./g,'R. T.');return (TAG[spk]||'')+t;};
const args=process.argv.slice(2),dry=args.includes('--dry'),lim=args.includes('--limit')?+args[args.indexOf('--limit')+1]:1e9;
console.log('lines',lines.length,'(skipped existing',L.size-lines.length+')','chars',lines.reduce((a,o)=>a+o.text.length,0),Object.entries(lines.reduce((m,o)=>(m[o.spk]=(m[o.spk]||0)+1,m),{})).map(e=>e.join(':')).join(' '));
if(dry){for(const o of lines)console.log(o.key,'|',o.text);return;}
fs.mkdirSync(CACHE,{recursive:true});
const keyFile=path.resolve(ROOT,'..','..','_keys','elevenlabs.txt');
const KEY=(process.env.ELEVENLABS_API_KEY||(fs.existsSync(keyFile)?fs.readFileSync(keyFile,'utf8'):'')).trim();
(async()=>{
 const todo=lines.filter(o=>!fs.existsSync(path.join(CACHE,o.key+'.mp3'))).slice(0,lim);let ok=0,fail=[];
 if(todo.length&&!KEY)throw new Error('no ElevenLabs key');
 const one=async o=>{const[vid,stab,sim]=CAST[o.spk];
  for(let a=0;a<4;a++){const r=await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${vid}?output_format=mp3_22050_32`,{method:'POST',headers:{'xi-api-key':KEY,'Content-Type':'application/json'},
    body:JSON.stringify({text:ttsText(o.spk,o.text),model_id:'eleven_v4',voice_settings:{stability:stab,similarity_boost:sim}})});
   if(r.status===200){fs.writeFileSync(path.join(CACHE,o.key+'.mp3'),Buffer.from(await r.arrayBuffer()));ok++;return;}
   const e=(await r.text()).slice(0,200);if(r.status===429||r.status>=500){await new Promise(z=>setTimeout(z,3000*(a+1)));continue;}fail.push(o.key+' '+r.status+' '+e);return;}
  fail.push(o.key+' retries');};
 const q=todo.slice();await Promise.all([0,1,2,3].map(async()=>{while(q.length)await one(q.shift());}));
 console.log('recorded',ok,'failed',fail.length);fail.slice(0,5).forEach(f=>console.log(' ',f));
 /* pack every cached clip that belongs to a current line */
 const pack={};for(const o of lines){const f=path.join(CACHE,o.key+'.mp3');if(fs.existsSync(f))pack[o.key]=fs.readFileSync(f).toString('base64');}
 const n=Object.keys(pack).length;if(!n){console.log('nothing to pack');return;}
 fs.writeFileSync(path.join(GAME,'vo10.js'),'(window.DOTS_VO=window.DOTS_VO||{});Object.assign(window.DOTS_VO,'+JSON.stringify(pack)+');');
 let h=fs.readFileSync(path.join(GAME,'index.html'),'utf8');
 if(!h.includes('"vo10.js"'))h=h.replace('"vo9.js"];','"vo9.js", "vo10.js"];');
 const a0=h.indexOf('const VO_KEYS=new Set("')+23,a1=h.indexOf('"',a0),ks=new Set(h.slice(a0,a1).split(' '));for(const k of Object.keys(pack))ks.add(k);
 h=h.slice(0,a0)+[...ks].join(' ')+h.slice(a1);fs.writeFileSync(path.join(GAME,'index.html'),h);
 console.log('packed',n,'clips into game/vo10.js',(fs.statSync(path.join(GAME,'vo10.js')).size/1024|0)+'KB');})().catch(e=>{console.error(e.message);process.exit(1);});
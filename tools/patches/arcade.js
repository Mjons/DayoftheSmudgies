/* ======================= EASTER EGG: Rory's Employee Lounge (two arcade cabinets behind the comic wall) =======================
   Clue: a sticky note on the counter case ("PULL ISSUE #1"). Pull/take the comic wall and it swings open into now.lounge.
   Credits: a Tumble's token jammed in the newspaper box's coin return (one game). FREE PLAY: the Dude pushes a cabinet.
   Games live in game/arcade/ (regenerate with: node tools/sync-arcade.js) and play in a full-window iframe overlay.
   ARCG is global (menu unlock + free play survive new games); st.arc is per save. */
const ARC_GAMES={blitz:{t:'Smudge Boss Blitz',src:'arcade/blitz.html'},suds:{t:'Smudge in Sudsland',src:'arcade/sudsland.html'}};
const ARCG={found:false,free:false};
try{Object.assign(ARCG,JSON.parse(localStorage.getItem('dots-arcade')||'{}'));}catch(e){}
function arcGSave(){try{localStorage.setItem('dots-arcade',JSON.stringify(ARCG));}catch(e){}}
const ARCS=()=>st.arc||(st.arc={});
const arcFree=()=>!!ARCG.free;
const ARSW={sw:1};
const CAB={blitz:{x:104,name:'BLITZ',side:'#2e2a26',hi:'#46403a',art:['#F9C51F','#F26B1D'],mq:'#F9C51F',scr:'#5a8af0'},
 suds:{x:160,name:'SUDS',side:'#4a2e18',hi:'#6a4426',art:['#5af0ff','#ff8ad0'],mq:'#fc7c18',scr:'#ff8ad0'}};

/* ---------- art: the lounge ---------- */
function arcCabinet(c){const x=c.x;
 contact(x+18,103,24,3,'#000000',.7);
 R(x,26,36,3,c.hi);R(x,26,36,1,mix(c.hi,'#ffffff',.25));
 R(x,29,4,74,c.side);R(x+32,29,4,74,c.side);R(x,29,1,74,c.hi);R(x+35,29,1,74,mix(c.side,'#000000',.4));
 R(x+1,42,2,44,c.art[0]);R(x+1,50,2,10,c.art[1]);R(x+33,42,2,44,c.art[1]);R(x+33,56,2,10,c.art[0]);
 R(x+4,29,28,10,'#0c0a10');
 R(x+4,39,28,27,'#08060c');R(x+5,40,26,1,'#1a1622');R(x+6,41,24,20,'#000000');
 R(x+2,66,32,3,'#4a4652');R(x+2,66,32,1,'#6a6672');R(x+2,69,32,5,'#24202a');
 R(x+9,62,1,5,'#c8c8d0');disc(x+9,62,1,'#e03a3a');disc(x+20,70,1,'#ffd23a');disc(x+25,70,1,'#5af0ff');disc(x+29,70,1,'#e03a3a');
 R(x+4,74,28,28,'#1e1a24');R(x+4,74,28,1,'#2e2a36');
 R(x+11,79,14,15,'#3a3640');R(x+11,79,14,1,'#5a5662');R(x+12,90,12,2,'#14121a');R(x+13,82,2,5,'#2a1a10');R(x+21,82,2,5,'#2a1a10');
 R(x+4,98,28,4,'#0e0c12');}
const bgLounge=cacheBg(()=>{
 R(0,0,320,100,'#221832');for(let x=4;x<320;x+=8)R(x,9,1,62,'#2a1e3e');speckle(91,0,9,320,62,['#1c1428','#2e2244'],120);
 R(0,0,320,8,'#140e1e');R(0,8,320,1,'#0a0612');
 woodV(0,72,320,28,ramp('#3a2418','#6a4028',4),'#1e1008',77,9);R(0,71,320,2,'#7a4a2c');R(0,71,320,1,'#a86a40');R(0,99,320,1,'#140a06');
 /* carpet: 90s arcade squiggles */
 R(0,100,320,44,'#16102c');const cr=rng(424),cc=['#ff4fa3','#5af0ff','#ffd23a','#7a5af0'];
 for(let i=0;i<150;i++){const x=(cr()*318)|0,y=101+((cr()*42)|0),c=cc[(cr()*4)|0],k=(cr()*3)|0;
  if(k===0){R(x,y,1,1,c);R(x+1,y+1,1,1,c);R(x+2,y,1,1,c);}else if(k===1){R(x,y,3,1,c);R(x+1,y-1,1,1,c);}else R(x,y,1,1,c);}
 vveil(0,100,320,44,'#000000',.05,.4,2);
 /* doorway back to the shop: the comic wall, swung in */
 R(2,16,38,86,'#2a160c');vgrad(6,20,30,70,['#c8c0e0','#9a92ba']);
 for(let y=90;y<100;y++)for(let x=6;x<36;x++)R(x,y,1,1,((x>>2)+(y>>2))&1?'#cec4c4':'#6a587c');
 R(14,24,14,40,'#7a4a2c');for(let k=0;k<4;k++){R(14,28+k*10,14,1,'#4a2416');for(let i=0;i<3;i++)R(15+i*4,29+k*10-((i+k)%2),3,7,['#d03a3a','#3a6ad8','#ffd23a','#3aa05a'][(i+k)%4]);}
 R(36,18,6,84,'#8a6a44');R(36,18,1,84,'#b08a5a');R(41,18,1,84,'#5a4228');for(let y=26;y<96;y+=13)R(37,y,4,1,'#5a4228');
 glow(22,100,24,8,'#e8e4ff',.35);
 /* neon sign */
 R(112,8,76,20,'#120c1a');R(112,8,76,1,'#2a2238');pN_neon('EMPLOYEE LOUNGE',121,11,'#ff4fa3',1,.22);pN_neon('EMPLOYEES 1',129,19,'#5af0ff',1,.12);
 /* high score board */
 R(222,26,46,36,'#5a3418');R(223,27,44,34,'#8a5a30');speckle(12,223,27,44,34,['#7a4a24','#9a6a3a'],40);
 R(227,29,38,30,'#f0ead8');R(227,58,38,1,'#b8b2a0');pxText('HI SCORE',230,31,'#c03030');
 for(let i=0;i<4;i++){pxText('R.T.',230,38+i*5,'#2a2a34');pxText(String(9990-i*1110),248,38+i*5,'#2a2a34');}R(245,27,2,3,'#e03a3a');
 /* couch with one Rory-shaped dent */
 contact(252,114,46,4,'#000000',.7);
 R(214,80,76,20,'#7a3e1a');R(214,80,76,2,'#a85a2a');R(214,82,76,1,'#5a2a10');
 R(208,86,10,24,'#6a3412');R(286,86,10,24,'#6a3412');R(208,86,10,2,'#9a5226');R(286,86,10,2,'#9a5226');
 R(216,98,72,10,'#a85a2a');R(216,98,72,1,'#d07a40');R(240,98,1,10,'#7a3e1a');R(264,98,1,10,'#7a3e1a');ell(230,101,8,2,'#8a4620');
 R(212,110,3,4,'#2a160c');R(290,110,3,4,'#2a160c');
 /* mini fridge */
 contact(306,103,12,2,'#000000',.6);R(296,74,20,29,'#c8c4bc');R(296,74,20,1,'#f0ece4');R(315,74,1,29,'#8a867e');R(296,86,20,1,'#8a867e');R(298,78,1,6,'#6a665e');R(298,89,1,8,'#6a665e');R(305,78,6,5,'#ffe24a');
 for(const k in CAB){arcCabinet(CAB[k]);glow(CAB[k].x+18,108,22,6,CAB[k].scr,.16);}
});
function arcScreen(c,k){const x=c.x+6,y=41,free=arcFree(),a=ARCS(),t=NOW;
 if(k==='blitz'){R(x,y,24,20,'#0a0a1e');for(let i=0;i<6;i++)R(x+((i*7+(t/180|0))%24),y+((i*5)%13),1,1,'#8a8ab0');
  const bx=x+5+Math.round((Math.sin(t/700)+1)*5),by=y+9-Math.abs(Math.round(Math.sin(t/220)*3));disc(bx,by,3,'#F9C51F');R(bx-1,by-1,1,1,'#14100a');R(bx+1,by-1,1,1,'#14100a');
  disc(x+19,y+8,3,'#F26B1D');R(x+18,y+7,1,1,'#ffffff');if((t/300|0)%2)R(bx+4,by,3,1,'#ffd23a');}
 else{R(x,y,24,20,'#000000');R(x,y,24,1,'#F9C51F');R(x,y+19,24,1,'#F9C51F');R(x,y,1,20,'#F9C51F');R(x+23,y,1,20,'#F9C51F');
  for(let i=0;i<4;i++){const f=((t/2200)+i/4)%1;R(x+3+i*5,y+13-Math.round(f*11),2,2,'#5a8ae8');}
  disc(x+8,y+9,3,'#F9C51F');disc(x+17,y+9,3,'#ff8ad0');R(x+16,y+8,1,1,'#14100a');}
 const lab=free?'FREE':a.cr?'CR 1':((t/500|0)%2?'COIN':'');if(lab){R(x+3,y+13,18,7,'#000000');pxText(lab,x+5,y+14,free?'#5af06a':'#ffffff');}
 veil(x,y,24,20,'#ffffff',.06);for(let j=0;j<20;j+=2)veil(x,y+j,24,1,'#000000',.25);}
function loungeDyn(){for(const k in CAB){const c=CAB[k],x=c.x;
  const fl=k==='suds'&&((NOW%3700)<90);R(x+5,30,26,8,fl?'#3a2a10':c.mq);R(x+5,30,26,1,mix(c.mq,'#ffffff',.5));
  pxText(c.name,x+18-((c.name.length*4-1)>>1),32,fl?'#6a4a20':'#1a0e06');
  arcScreen(c,k);const on=arcFree()||((NOW/600|0)%2);R(x+13,82,2,5,on?(arcFree()?'#5af06a':'#ff8a1a'):'#4a2a10');R(x+21,82,2,5,on?(arcFree()?'#5af06a':'#ff8a1a'):'#4a2a10');}
 if(((NOW/90)|0)%61===0)R(121,11,8,5,'#2a1424');
 const a=ARCS(),gl=(x,y,ph)=>{const t=(NOW+ph)%2600;if(t<240){R(x,y,2,1,'#d8b048');if(t<120)R(x,y-1,1,1,'#fff0b0');}};
 if(!a.tk_couch)gl(247,97,0);if(!a.tk_board)gl(264,57,900);if(!a.tk_fridge)gl(312,101,1700);}

/* the comic wall in the shop: issue #1 sticks out; once pulled, a section swings in on the lounge */
function loungeDoorDyn(){const a=ARCS();
 R(167,85,7,6,'#ffe24a');R(167,85,7,1,'#fff4a0');R(168,87,5,1,'#9a8a2a');R(168,89,3,1,'#9a8a2a');
 const sw=a.ajar?ARSW.sw:0;
 if(sw<=0){R(43,23,7,10,'#d03a3a');R(43,23,7,2,'#f4f0e0');R(49,23,1,10,'#901a1a');pxText('1',45,26,'#ffd23a');return;}
 R(44,22,48,74,'#140c22');
 R(60,40,18,56,'#0a0810');R(62,41,14,3,'#F9C51F');R(62,46,14,10,((NOW/400)|0)%2?'#5af0ff':'#3ab0c0');R(80,48,12,48,'#0a0810');R(81,53,9,8,'#ff8ad0');
 R(44,88,48,8,'#1a1430');for(let i=0;i<9;i++)R(46+i*5,89+(i%3)*2,1,1,['#ff4fa3','#5af0ff','#ffd23a'][i%3]);
 const w=Math.max(5,Math.round(48*(1-sw)+5*sw));G.drawImage(bgShopNow(),44,22,48,74,44,22,w,74);veil(44,22,w,74,'#000000',sw*.55);R(44+w,22,1,74,'#0a0604');
 if(sw>.5){veil(48,96,40,6,'#ff4fa3',.1*sw);}}

/* ---------- the overlay that holds a cabinet game ---------- */
const ARC={open:false,g:null,from:null,prev:null,el:null,fr:null,done:null};
function arcEl(){if(ARC.el)return ARC.el;
 const css=document.createElement('style');css.textContent='#arcade{position:fixed;inset:0;z-index:50;background:#050308;display:flex;flex-direction:column}#arcade[hidden]{display:none}'+
  '#arcade .top{display:flex;align-items:center;gap:14px;padding:8px 14px;font-family:"Pixelify Sans",ui-monospace,monospace;color:#e9e2cf;font-size:15px;letter-spacing:.06em;background:#0d0a16;border-bottom:1px solid #2e2842}'+
  '#arcade .t{color:#ffd23a;font-weight:600}#arcade .c{color:#5af06a}#arcade .k{margin-left:auto;color:#7d768c;font-size:13px}'+
  '#arcade button{font:inherit;font-size:14px;color:#e9e2cf;background:#14111e;border:1px solid #2e2842;padding:5px 12px;cursor:pointer;box-shadow:2px 2px 0 #000}'+
  '#arcade button:hover,#arcade button:focus-visible{border-color:#ffd23a;outline:none}#arcade iframe{flex:1;width:100%;min-height:0;border:0;display:block;background:#000}';
 document.head.appendChild(css);
 const el=document.createElement('div');el.id='arcade';el.hidden=true;el.setAttribute('role','dialog');el.setAttribute('aria-label','Arcade cabinet');
 el.innerHTML='<div class="top"><button type="button" class="b">&#9664; Walk away</button><button type="button" class="m">Menu</button><span class="t"></span><span class="c"></span><span class="k">Esc pauses the game. Hold Esc to walk away.</span></div>';
 el.querySelector('.b').addEventListener('click',()=>closeArcade());
 /* Menu: step away from the cabinet and open the game's own menu (save, settings, quit to title / desktop) */
 el.querySelector('.m').addEventListener('click',()=>{const fromMenu=ARC.from==='menu';ARC.toMenu=!fromMenu;closeArcade();if(fromMenu){MENU.page='main';MENU.msg='';}else openMenu('main');});
 /* a click anywhere on the bar that isn't a button hands the keyboard back to the cabinet */
 el.querySelector('.top').addEventListener('mousedown',e=>{if(e.target.tagName!=='BUTTON'&&ARC.fr){e.preventDefault();try{ARC.fr.focus();ARC.fr.contentWindow.focus();}catch(_){}}});
 document.body.appendChild(el);ARC.el=el;return el;}
function openArcade(g,from){if(ARC.open)return Promise.resolve();const el=arcEl(),gm=ARC_GAMES[g];
 ARC.open=true;ARC.g=g;ARC.from=from;ARC.toMenu=false;stopVO();if(AU.ac&&AU.ac.state==='running')AU.ac.suspend().catch(()=>{});
 if(from==='room'){ARC.prev=st.mode;st.mode='arcade';}
 el.querySelector('.t').textContent=gm.t.toUpperCase();el.querySelector('.c').textContent=arcFree()?'FREE PLAY':'CREDIT 1';
 const fr=document.createElement('iframe');fr.src=gm.src;fr.title=gm.t;fr.setAttribute('allow','autoplay; gamepad; fullscreen; clipboard-write');
 fr.addEventListener('load',()=>{try{fr.contentWindow.focus();fr.contentWindow.postMessage({dotsArcade:'focus'},'*');}catch(e){}});
 el.appendChild(fr);ARC.fr=fr;el.hidden=false;fr.focus();
 return new Promise(r=>{ARC.done=r;});}
function closeArcade(){if(!ARC.open)return;ARC.open=false;ARC.el.hidden=true;if(ARC.fr){ARC.fr.remove();ARC.fr=null;}
 if(AU.ac&&AU.ac.state==='suspended')AU.ac.resume().catch(()=>{});
 if(ARC.from==='room')st.mode=ARC.prev||'play';
 stage.focus({preventScroll:true});const d=ARC.done;ARC.done=null;if(d)d();}
window.addEventListener('message',e=>{if(e.data&&e.data.dotsArcade==='exit'&&ARC.open&&ARC.fr&&e.source===ARC.fr.contentWindow)closeArcade();});
window.addEventListener('keydown',e=>{if(ARC.open&&e.key==='Escape')closeArcade();});
{const _o=openMenu;openMenu=function(p){if(ARC.open){closeArcade();return;}_o(p);};}
{const _b=back;back=function(){if(ARC.open){closeArcade();return;}_b();};}
{const _u=update;update=function(dt){if(ARC.open)return;_u(dt);};}
{const _r=render;render=function(){if(ARC.open)return;_r();};}

/* ---------- puzzle: sticky note, issue #1, the token ---------- */
async function readSticky(){const a=ARCS();a.note=true;
 await say(PL,"A sticky note on the display case. 'LOUNGE. PULL ISSUE #1. BACK ISSUES WALL. -R'");
 if(!a.open)await say(PL,"A lounge? He's the only employee. Who's he lounging with?");}
async function pullIssue(){const a=ARCS();
 if(a.ajar)return say(PL,"Issue number one. Best lever I've ever pulled.");
 if(a.open){snd('kachunk');sfx('KA-CHUNK!',70,14,'#ffd23a',1);a.ajar=true;ARSW.sw=0;snd('creak');await tween(ARSW,'sw',1,700);return say(PL,"Issue number one. Best lever I've ever pulled.");}
 if(!a.note)return say(PL,pick(["Not now, Willis. Focus. ...Okay, after we save Smudge.","There are hundreds of comics. I'm not yanking random ones off Rory's wall."]));
 await say(PL,"Issue number one. Top shelf, far left. It's sticking out a little...");
 snd('kachunk');st.shake=300;sfx('KA-CHUNK!',70,14,'#ffd23a',1);await wait(300);
 a.open=true;a.ajar=true;ARSW.sw=0;snd('creak');await tween(ARSW,'sw',1,900);
 if(!ARCG.found){ARCG.found=true;arcGSave();}
 await say(PL,"The comic wall is a DOOR.");
 if(V.room===st.room&&PL!==V)await say(V,"Okay. I'm filming everything in this building from now on.");
 if(D.room===st.room&&PL!==D)await say(D,"Bro. A secret room. Best night ever.");}
async function newsReturn(){const a=ARCS();
 if(a.tok)return say(PL,"The coin return's empty. I checked. Twice. Old habit.");
 a.tok=true;giveToken(347,96);
 await say(PL,"Something's jammed in the coin return. Not a quarter... a token. 'TUMBLE'S FUN ZONE. GOOD FOR ONE GAME.'");
 await say(PL,a.open?"Somebody tried to buy a newspaper with an arcade token. The box said no.":"Somebody tried to buy a newspaper with an arcade token. ...Tumble's has a FUN ZONE?");
 await allTokens();}
/* four tokens in all: the newspaper box, plus three Rory stashed in the lounge (couch, score board, fridge) */
function tokN(){const a=ARCS();if(a.tk===undefined)a.tk=Object.values(ACT).some(x=>x.inv&&x.inv.includes('token'))?1:0;return a.tk;}
function giveToken(x,y){const a=ARCS();a.tk=tokN()+1;addInv('token');snd('clink');sfx('CLINK.',x,y,'#c8d0e0',1);}
function spendToken(){const a=ARCS();a.tk=Math.max(0,tokN()-1);if(!a.tk)for(const x of Object.values(ACT))if(x.inv){const i=x.inv.indexOf('token');if(i>=0)x.inv.splice(i,1);}}
const LOUNGE_TOK=['couch','board','fridge'];const tokLeft=()=>LOUNGE_TOK.filter(k=>!ARCS()['tk_'+k]).length;
async function stashToken(k,x,y,line){const a=ARCS();if(a['tk_'+k])return false;a['tk_'+k]=true;giveToken(x,y);await say(PL,line);await allTokens();return true;}
/* the fourth token, wherever it turns up: stop looking, and a nudge toward the free-play bump */
async function allTokens(){const a=ARCS();if(!a.tok||tokLeft()||arcFree())return;
 await say(PL,"That's four. Every token in the building. ...But nobody fills a whole high score board on four tokens. Rory knows a trick.");}
INV.token={id:'token',kind:'inv',get name(){return tokN()>1?'arcade tokens ('+tokN()+')':'arcade token';},on:{look:"A brass token. 'TUMBLE'S FUN ZONE. GOOD FOR ONE GAME.' On the back, scratched in: 'NOT A QUARTER. STOP TRYING. -R'",use:"I need to use it WITH something. Something with a coin slot."}};
{const _di=drawIcon;drawIcon=function(id,cx,cy){if(id==='token'){disc(cx,cy,6,'#8a6a20');disc(cx,cy,5,'#d8b048');disc(cx,cy,3,'#b08a2a');R(cx-2,cy-4,2,1,'#fff0b0');pxText('T',cx-1,cy-2,'#fff0b0');const n=tokN();if(n>1){R(cx+4,cy+2,6,7,'#000000');pxText(String(n),cx+5,cy+3,'#ffd23a');}return;}return _di(id,cx,cy);};}

/* ---------- the cabinets ---------- */
const hasTok=()=>st.inv.includes('token')&&tokN()>0;
async function arcPlay(g){const a=ARCS();
 await say(PL,pick(["Just one game.","Okay. ONE game. For research.","Smudge would want me to do this."]));
 await openArcade(g,'room');
 const quiet=ARC.toMenu;ARC.toMenu=false;
 if(!arcFree()&&a.cr){a.cr=0;a.played=(a.played||0)+1;if(!quiet)await say(PL,tokN()?"GAME OVER. Good thing I've got another token.":"GAME OVER. And that was my last token.");}
 else if(quiet)return;
 else await say(PL,pick(["One more. ...Later. After we save the world.","My thumbs hurt. In a good way.","Okay. Back to work. Probably."]));}
async function arcToken(g){const a=ARCS(),c=CAB[g];spendToken();a.cr=1;snd('clink');sfx('CLINK!',c.x+18,78,'#c8d0e0',1);await say(PL,"Token in. CREDIT 1.");return arcPlay(g);}
async function arcUse(g){const a=ARCS();
 if(arcFree()||a.cr)return arcPlay(g);
 if(hasTok())return arcToken(g);
 if(a.played&&tokLeft())await say(PL,"Out of tokens. Rory must have more stashed in here. He seems like a stasher.");
 if(a.played){a.dent=true;return say(PL,"INSERT COIN. I'm out of tokens. ...There's a dent in the side. Hip height. Somebody's been bumping this thing for free games.");}
 await say(PL,"'INSERT TOKEN. TUMBLE'S TOKENS ONLY. NO QUARTERS. -R'");
 await say(PL,"Where do you even get one? Rory seems like a guy who'd try to buy a newspaper with an arcade token.");}
async function arcPush(g){
 if(arcFree())return say(PL,"It's on FREE PLAY. Don't push your luck. Or the cabinet.");
 if(PL===D)return dudeBump(g);
 await say(PL,"Nnngh. Nothing. Way too heavy.");
 if(st.act===2)return say(PL,"This needs a Dude-sized bump. And the Dude is in 1826.");
 if(D.room==='now.lounge'||D.room==='now.shop'||D.room==='y.shop'){await say(PL,"Dude! Can you give this thing a bump?");if(D.room!=='now.lounge')await say(D,"On my way.");return dudeBump(g);}
 return say(PL,"This needs a bump. A big, gentle, Dude-shaped bump.");}
async function dudeBump(g){const c=CAB[g],cx=c.x+18,prev=D.room!=='now.lounge'?{room:D.room,x:D.x,y:D.y,dir:D.dir}:null;
 if(prev)place(D,30,124,1,'now.lounge');
 await walkTo(D,cx+20,112);D.dir=-1;
 await say(D,"Bro. Every arcade has a sweet spot.");await wait(300);
 st.shake=500;snd('kathunk');sfx('BUMP!',cx,46,'#ff8a1a',2);await wait(450);
 ARCG.free=true;arcGSave();snd('bling');st.flash=.4;await wait(400);
 if(PL!==D){await say(PL,"FREE PLAY. Both of them. That is NOT how electronics work.");await say(D,"It is for me.");}
 else await say(D,"Free play. Both of them. They share a sweet spot.");
 toast('FREE PLAY. The arcade is in the menu now, too.');
 if(prev){await say(D,"I'll be out front.");await walkTo(D,30,124);place(D,prev.x,prev.y,prev.dir,prev.room);}}
function arcCabHot(g){const c=CAB[g];return{id:'cab_'+g,name:ARC_GAMES[g].t,rect:[c.x,26,36,77],walk:{x:c.x+18,y:112,dir:-1},
 on:{look:()=>{const a=ARCS();let s=g==='blitz'?"SMUDGE BOSS BLITZ. A sponge versus a parade of bosses. Rory made an arcade game about SMUDGE?":"SMUDGE IN SUDSLAND. A whole bubbly kingdom in a box. There's a SEQUEL?";
   s+=arcFree()?" The screen says FREE PLAY.":a.cr?" CREDIT 1. Ready to go.":" The screen says INSERT COIN.";
   if(!arcFree()&&a.played){a.dent=true;s+=" There's a dent in the side, hip height. Somebody's been bumping this for free games.";}return say(PL,s);},
  use:()=>arcUse(g),push:()=>arcPush(g),pick:"It's an arcade cabinet. It weighs about as much as the Dude.",open:"The coin door's locked. Rory keeps the key on his person. Probably in his hair.",
  talk:"'INSERT COIN.' It only knows two words, and they're both rude."},
 useWith:{token:()=>arcToken(g),quarter:"Tokens only. And that quarter's spoken for anyway."}};}

async function fridgeOpen(){await say(PL,"One can of soda labeled RORY'S. DO NOT. A second can labeled ALSO RORY'S.");await stashToken('fridge',306,84,"And behind the sodas... a token. It's cold. Rory refrigerates his tokens.");}
room('now.lounge',{bg:bgLounge,dyn:loungeDyn,music:'shop',walk:[44,300,108,138],hot:()=>[
 {id:'ldoor',name:'doorway',rect:[2,16,40,86],exit:st.act===3?'y.shop':'now.shop',arrive:{x:68,y:108,dir:1},walk:{x:46,y:116,dir:-1},on:{look:"The back of the comic wall. Back out to the shop."}},
 arcCabHot('blitz'),arcCabHot('suds'),
 {id:'lsign',name:'neon sign',rect:[112,8,76,20],walk:{x:150,y:110,dir:-1},on:{look:"'EMPLOYEE LOUNGE. EMPLOYEES 1.' He paid for a neon sign about that."}},
 {id:'hiscore',name:'high scores',rect:[222,26,46,36],walk:{x:244,y:116,dir:-1},on:{look:"HIGH SCORES. R.T., R.T., R.T., R.T. He plays alone. Every night. I'm not sad, the screens are just bright.",pick:async()=>{if(!await stashToken('board',244,40,"Behind the score sheet, taped to the cork: a token. 'FOR EMERGENCIES. -R'"))await say(PL,"It's pinned to a cork board. Taking it would be cruel.");}}},
 {id:'couch',name:'couch',rect:[208,80,88,32],walk:{x:252,y:118,dir:-1},on:{look:"A couch with one cushion dented exactly into the shape of Rory.",use:async()=>{await say(PL,"I sit. The couch sighs, like it's been waiting for someone who isn't Rory.");await stashToken('couch',250,96,"Something's poking me. ...A token, wedged between the cushions.");},
  pick:async()=>{if(!await stashToken('couch',250,96,"I dig between the cushions. Crumbs, a pen cap... and a token!"))await say(PL,"It's a couch. I already searched it. It had crumbs.");}}},
 {id:'fridge',name:'mini fridge',rect:[296,74,20,29],walk:{x:296,y:114,dir:1},on:{look:"A mini fridge with a sticky note: 'RORY'S.'",open:()=>fridgeOpen(),use:()=>fridgeOpen(),pick:"It's plugged in. And it's Rory's. It says so."}}]});
ROOMS['now.lounge'].enter=()=>{const a=ARCS();if(a.seen)return;a.seen=true;setTimeout(()=>{if(busy||speech||st.mode!=='play'||st.room!=='now.lounge')return;busy=true;say(PL,"Rory has a secret ARCADE. Two cabinets, a couch, and a neon sign about himself.").then(()=>{busy=false;});},80);};

/* Close on the open doorway swings the comic wall back into place (Pull issue #1 opens it again) */
async function shutLounge(){const a=ARCS();if(!a.ajar)return;snd('creak');await tween(ARSW,'sw',0,700);a.ajar=false;ARSW.sw=0;snd('kachunk');sfx('KA-CHUNK!',70,14,'#ffd23a',1);}
/* the secret door shuts itself: animated when you step back out of the lounge, already shut otherwise */
{const _go=go;go=function(id,k){const prev=st.room;_go(id,k);if(id!=='now.shop'&&id!=='y.shop')return;const a=ARCS();if(!a.ajar)return;
 if(prev!=='now.lounge'){a.ajar=false;ARSW.sw=0;return;}
 ARSW.sw=1;setTimeout(()=>{if(st.room!==id||!a.ajar)return;snd('creak');tween(ARSW,'sw',0,800).then(()=>{if(!a.ajar)return;a.ajar=false;ARSW.sw=0;snd('kachunk');sfx('KA-CHUNK!',70,14,'#ffd23a',1);});},700);};}
/* hook the lounge into the shop and the street */
for(const shopId of ['now.shop','y.shop']){const base=ROOMS[shopId].hot;ROOMS[shopId].hot=()=>{const a=ARCS(),l=(typeof base==='function'?base():base).filter(Boolean).map(h=>h.id==='racks'?{...h,on:{...h.on,
   look:()=>say(PL,a.ajar?"The comic wall. Well. The comic DOOR.":a.note?"Hundreds of comics. Top shelf, far left: issue number one, sticking out a little.":(typeof h.on.look==='string'?h.on.look:"Hundreds of comics.")),
   pick:async()=>{const lever=a.note||a.open;
    /* the wall's own Pick up wins when it does something (Act 2+: the Big Book), unless the Blot has eaten Pull and you know the secret */
    if(typeof h.on.pick==='function'&&!(lever&&st.inked.includes('pull')))return h.on.pick();
    if(lever)return pullIssue();return h.on.pick?say(PL,h.on.pick):pullIssue();},pull:pullIssue}}:h);
 l.push({id:'sticky',name:'sticky note',rect:[165,83,11,10],walk:{x:168,y:108,dir:-1},on:{look:readSticky,pick:readSticky}});
 if(a.ajar)l.push({id:'lounge',name:'Employee Lounge',rect:[44,22,48,74],exit:'now.lounge',arrive:{x:52,y:118,dir:1},walk:{x:68,y:104,dir:-1},on:{look:"Rory's secret Employee Lounge. I can hear arcade cabinets humming in there.",close:shutLounge}});
 return l;};}
for(const shopId of ['now.shop','y.shop']){const d0=ROOMS[shopId].dyn;ROOMS[shopId].dyn=()=>{d0();loungeDoorDyn();};}
{const base=ROOMS['now.street'].hot;ROOMS['now.street'].hot=()=>base().map(h=>h.id!=='newsbox'?h:{...h,on:{...h.on,
  look:()=>say(PL,"Tonight's headline: 'LOCAL PRINT SHOP STILL OPEN 24 HOURS.' Slow news day."+(ARCS().tok?"":" The coin return flap is stuck open. Something's wedged in there.")),
  pick:newsReturn,use:newsReturn,pull:newsReturn,push:newsReturn}});}

/* 1826: Cornelius's penny peep-show, property of the original lounge */
async function peepShow(){await say(PL,"No penny. ...Somebody jammed the coin slot with a bent nail. Free looks.");snd('creak');await wait(400);
 await say(PL,"It's a picture of a horse.");await wait(300);await say(PL,"Now it's a picture of a different horse. Bro. Best graphics I've ever seen.");
 await say(PL,"There's a label on the bottom. 'PROPERTY OF THE TUMBLE'S EMPLOYEE LOUNGE.' Huh. Even in 1826 there was a lounge.");}
{const base=ROOMS['old.shop'].hot;ROOMS['old.shop'].hot=()=>base().concat([{id:'peep',name:'peep box',rect:[142,50,25,18],walk:{x:154,y:110,dir:-1},on:{
  look:"A wooden box with a brass eyepiece. A card says 'PENNY PEEP-SHOW. WONDERS OF THE AGE.'",use:peepShow,open:peepShow,pick:"It's bolted down. Everything Cornelius owns is bolted down.",push:"Bolted. Of course."}}]);}
{const d0=ROOMS['old.shop'].dyn;ROOMS['old.shop'].dyn=()=>{d0();const x=143,y=55;
 R(x,y+11,22,1,'#2a1608');R(x+1,y,20,11,'#6a3e20');R(x+1,y,20,1,'#9a6a3a');R(x+20,y,1,11,'#3a2010');R(x+2,y+3,17,7,'#e8dcb8');pxText('PEEP',x+3,y+4,'#7a2a10');
 R(x+8,y-3,6,3,'#8a6a20');R(x+9,y-4,4,2,'#c9a23a');R(x+10,y-4,1,1,'#fff0b0');R(x+21,y+4,2,1,'#8a6a20');R(x+22,y+4,1,4,'#8a6a20');R(x+21,y+8,3,1,'#c9a23a');};}

/* ---------- menus: an Arcade page once the lounge is found ---------- */
function arcadeRows(){const L=Object.entries(ARC_GAMES).map(([g,gm])=>({lab:gm.t,sub:arcFree()?'Free play':'Insert coin',dis:!arcFree(),why:"Still on coin-op. Somebody in the lounge knows a trick.",act:()=>openArcade(g,'menu')}));L.push({lab:'Back',act:back});return L;}
{const _rows=rows;rows=function(){if(MENU.page==='arcade')return arcadeRows();const L=_rows();
 if(MENU.page==='main'&&MENU.from==='game'&&ARCG.found){const i=L.findIndex(r=>r.lab==='Settings');L.splice(i,0,{lab:'Arcade',sub:arcFree()?'Free play':'Coin-op. The lounge holds a secret.',act:()=>{MENU.page='arcade';MENU.msg='';}});}
 return L;};}
{const _tr=titleRows;titleRows=function(){const L=_tr();if(!ARCG.found)return L;const i=L.findIndex(r=>r.lab==='Settings');L.splice(i,0,{lab:'Arcade',act:()=>openMenu('arcade')});
 font(10,600);const tw=L.map(r=>tx.measureText(r.lab).width),pad=Math.max(4,Math.min(12,(312-tw.reduce((a,b)=>a+b,0))/L.length)),w=tw.map(v=>v+pad);const tot=w.reduce((a,b)=>a+b,0);let x=160-tot/2;L.forEach((r,j)=>{r.x=x;r.w=w[j];x+=w[j];});return L;};}
setTimeout(()=>{if(window.__dots){window.__dots.arc=()=>({g:ARCG,s:ARCS(),open:ARC.open});window.__dots.arcOpen=(g)=>openArcade(g,'menu');window.__dots.arcClose=closeArcade;}},0);
// ======================= CORNELIUS TUMBLE (60), HUMANS2 rig =======================
// The first Tumble, 1826: Rory's flame hair (the family hair) swept into a coif, mutton chops, a gold monocle on a chain,
// burgundy cutaway tailcoat with tails that flap on the stride, gold brocade waistcoat with a printer's ink smudge,
// high white collar + cravat, buff knee breeches, white stockings, buckled shoes. Talks with a raised finger; when idle
// and facing front he adjusts the monocle. Same rig contract as HUMANS2 (h2_state / h2_blit / h2_face).
const H2C=Object.assign({},H2P,{K:'#9a7420',k:'#e8c45a'});
const H2C_HEAD=[
 '.....j........',
 '..h..hi...h...',
 '..hhhhih.hi...',
 '.Hhihhihhihh..',
 '.Hhhihhiiihhh.',
 'HHhhhhihhiihhh',
 'HHhhhhhhhhhhhi',
 'HHhhhhhhhhhhH.',
 'HHhhhSssssssh.',
 'HHhhEssssssss.',
 'HHhhErrsKkkKs.',
 'HHhhEweskweks.',
 'HHhhESssKkkKl.',
 'HHhhhSsssssSll',
 '.Hhhhsfssssss.',
 '.HhhhssssmmmS.',
 '..HhhSsssssS..',
 '...hhDSSSSS...'];
const H2CF_HEAD=[
 '.......j.......',
 '..h...hih...h..',
 '..hh.hiiih.hh..',
 '.Hhih.hih.hihH.',
 '.HhhihhiihhihhH',
 'HHhhhhihhihhhhH',
 'HHhhhihhhhhihhH',
 'HhhhhhhhhhhhhhH',
 'HhhSssssssssShH',
 'HhEsssssssssEhH',
 'HhsrrrsssKkkKhH',
 'HhsswessskewkhH',
 'HhsssssSsKkkKhH',
 'HhhsfssSSssfhhH',
 'HhhssssssssshhH',
 '.hhsssmmmssshh.',
 '..hSsssssssSh..',
 '...DSSSSSSSD...'];
const H2C_SK=['#b88870','#d8a888','#f4d2b4','#fde4cc'],H2C_CO=['#3a1014','#5a1c1e','#7a2a28','#9a3c34'],H2C_WC=['#9a7a30','#c8a448','#e8c86a','#fff0a8'];
const H2C_CUFF='#e8e4d8',H2C_LACE='#f8f4ea',H2C_CHAIN='#c9a23a';
function h2_cornPaint(s){const P=H2C,u=s.bob,b=s.br,sk=H2C_SK,cc=H2C_CO,wc=H2C_WC;
 // back arm: coat sleeve, lace cuff, hand
 const swB=Math.round(s.S*.8);h2_arm(-3,-34+u-b,-3+swB,-22+u-b,3,0,(k,i)=>k<10?(i===0?cc[0]:cc[1]):k===10?H2C_CUFF:sk[1]);
 // coat tails hang behind the legs and flap on the stride
 const fl=s.p<0?0:[0,1,1,0,0,1,1,0][s.p];
 for(let y=-22+u;y<=-10+u;y++){const t=(y+22-u)/12,bk=-6-Math.round(t*1.5)-fl,fr=-1-Math.round(t);for(let x=bk;x<=fr;x++)h2_P(x,y,x===bk||y===-10+u?cc[0]:cc[1]);}
 // knee breeches over white stockings, buckled shoes
 const leg=back=>(d,i)=>d<=6?(back?(i?'#c8c4b8':'#b4b0a4'):(i?'#fffcf2':'#e8e4d8')):(back?(i?'#a08a5a':'#8a7448'):(i?'#d8c08a':'#c0a870'));
 const[bx,by]=h2_leg(-2,-17+u,-s.S,s.lb,2,-4,leg(1));h2_shoe(bx-1,by+3,5,['#0e0a08','#1e1612','#2e221a']);h2_P(bx+1,by+2,'#b08a2a');
 const[fx,fy]=h2_leg(0,-17+u,s.S,s.lf,2,-4,leg(0));h2_shoe(fx-1,fy+3,6,['#140e0a','#2a1e18','#3e2e22']);h2_R(fx,fy+2,2,1,'#e8c45a');
 // tailcoat body, cut away at the front to show the waistcoat (with a small, distinguished paunch)
 const y0=-37+u-b,yw=-21+u;
 for(let y=y0;y<=yw;y++){const t=(y-y0)/(yw-y0),bk=-5-Math.round(t),fr=4+(t>.4&&t<.85?1:0);
  for(let x=bk;x<=fr;x++){let c=x<=bk?cc[0]:x===bk+1?cc[1]:cc[2];
   if(x>=1&&y>=y0+4)c=((x*5+y*3)%7===0)?wc[0]:x===fr?wc[2]:wc[1];
   if(x>=1&&x<=2&&y>=y0+2&&y<y0+8)c=cc[3];
   h2_P(x,y,c);}}
 h2_R(1,yw+1,3,1,wc[0]);h2_P(3,yw+2,wc[0]);
 for(const y of[y0+9,y0+12,y0+15])h2_P(4,y,wc[3]);
 h2_P(2,y0+12,'#14141a');h2_P(1,y0+13,'#2a2440');
 // neck, cravat
 h2_R(-1,-39+u-b,3,2,sk[1]);h2_R(0,y0,4,4,H2C_LACE);h2_R(0,y0+3,4,1,H2C_CUFF);h2_P(4,y0+1,H2C_LACE);h2_P(3,y0+1,'#ffffff');
 // head
 const head=(s.tq?H2CF_HEAD:H2C_HEAD).slice();
 if(!s.tq){if(s.bl)head[11]='HHhhESSskSSks.';if(s.mo===1)head[15]='.Hhhhssssmoms.';if(s.mo===2){head[15]='.Hhhhsssmooom.';head[16]='..HhhSsssoooS.'.slice(0,14);}}
 h2_T(head,P,-7,-57+u-b);
 // high collar points up against the jaw, monocle chain down to a waistcoat button
 h2_R(2,-41+u-b,2,2,H2C_LACE);h2_P(-1,-40+u-b,H2C_LACE);
 for(const[x,y]of[[0,-38],[1,-36],[2,-34],[3,-31],[4,-28]])h2_P(x,y+u-b,H2C_CHAIN);
 // front arm: swings, or the pompous raised finger while talking
 if(s.ge){h2_seg(-2,-34+u-b,2,-29+u-b,3,(k,n,i)=>i===0?cc[1]:cc[2]);h2_seg(2,-29+u-b,7,-32+u-b,2,(k,n,i)=>k<4?(i?cc[3]:cc[2]):H2C_CUFF);
  h2_R(8,-34+u-b,2,2,sk[2]);h2_P(9,-35+u-b,sk[2]);h2_P(9,-36+u-b,sk[2]);h2_P(9,-37+u-b,sk[3]);h2_P(8,-33+u-b,sk[1]);}
 else{const sw=-Math.round(s.S*.8);h2_arm(-2,-34+u-b,-2+sw,-22+u-b,3,0,(k,i)=>k<10?(i===0?cc[1]:i===2?cc[3]:cc[2]):k===10?(i===2?'#ffffff':H2C_CUFF):(i===2?sk[3]:sk[2]));}}
function h2_cornFront(s,ex){const P=H2C,b=s.br,sk=H2C_SK,cc=H2C_CO,wc=H2C_WC;
 // tails peek out on both sides behind the legs
 h2_R(-7,-22,3,11,cc[1]);h2_R(5,-22,3,11,cc[0]);h2_R(-7,-11,3,1,cc[0]);h2_R(5,-11,3,1,cc[0]);
 // breeches, stockings, buckled shoes
 for(const[x,dk]of[[-3,0],[1,1]]){h2_R(x,-18,2,7,dk?'#c0a870':'#d8c08a');h2_R(x+(dk?1:0),-18,1,7,dk?'#a08a5a':'#c0a870');
  h2_R(x,-11,2,7,dk?'#e8e4d8':'#fffcf2');h2_R(x+(dk?1:0),-11,1,7,dk?'#c8c4b8':'#e8e4d8');
  h2_R(x-1,-4,4,3,'#2a1e18');h2_R(x-1,-4,4,1,'#3e2e22');h2_R(x,-3,2,1,'#e8c45a');h2_R(x-1,-1,4,1,'#0e0a08');}
 // coat open over the waistcoat, lapels, a paunch
 const y0=-37-b,yw=-21;
 for(let y=y0;y<=yw;y++){const t=(y-y0)/(yw-y0),hw=5+(t>.35&&t<.85?1:0),vw=2+Math.round(t*1.5);
  for(let x=-hw;x<=hw;x++){const ax=Math.abs(x);let c=x===-hw?cc[1]:x===hw?cc[0]:x<0?cc[3]:cc[2];
   if(ax<=vw&&y>=y0+3)c=((x*5+y*3)%7===0)?wc[0]:x<0?wc[2]:wc[1];
   if(ax===vw+1&&y>=y0+3&&y<y0+10)c=x<0?'#b04a3e':cc[3];
   h2_P(x,y,c);}}
 h2_R(-3,yw+1,3,1,wc[0]);h2_R(1,yw+1,3,1,wc[0]);h2_P(-2,yw+2,wc[0]);h2_P(2,yw+2,wc[0]);
 for(const y of[y0+7,y0+10,y0+13])h2_P(0,y,wc[3]);h2_P(-2,y0+11,'#14141a');h2_P(-1,y0+12,'#2a2440');
 // neck + cravat
 h2_R(-1,-38-b,3,1,sk[1]);h2_R(-2,y0,5,4,H2C_LACE);h2_R(-2,y0+3,5,1,H2C_CUFF);h2_R(-1,y0+4,3,2,H2C_LACE);h2_P(0,y0+1,'#ffffff');
 // left arm hangs; right arm hangs or goes up to fuss with the monocle
 h2_seg(-6,-35-b,-7,-23-b,2,(k,n,i)=>k<10?(i?cc[2]:cc[1]):k===10?H2C_CUFF:sk[2]);h2_P(-7,-22-b,sk[1]);
 const mono=ex==='monocle';
 if(!mono){h2_seg(6,-35-b,7,-23-b,2,(k,n,i)=>k<10?(i?cc[0]:cc[2]):k===10?H2C_CUFF:sk[2]);h2_P(7,-22-b,sk[1]);}
 const head=H2CF_HEAD.slice();
 if(s.bl)head[11]='HhssSSssskSSkhH';
 if(s.mo===1)head[15]='.hhsssmomssshh.';
 if(s.mo===2){head[15]='.hhssmooomsshh.';head[16]='..hSssooossSh..';}
 h2_T(head,P,-7,-57-b);
 // collar points, monocle chain
 h2_P(-3,-40-b,H2C_LACE);h2_P(-2,-40-b,H2C_LACE);h2_P(2,-40-b,H2C_LACE);h2_P(3,-40-b,H2C_LACE);
 for(const[x,y]of[[3,-38],[2,-36],[1,-33],[0,-31]])h2_P(x,y-b,H2C_CHAIN);
 if(mono){h2_seg(6,-35-b,8,-31-b,2,(k,n,i)=>i?cc[0]:cc[2]);h2_seg(8,-31-b,6,-44-b,2,(k,n,i)=>k<9?(i?cc[0]:cc[2]):H2C_CUFF);h2_R(5,-47-b,2,3,sk[2]);h2_P(6,-48-b,sk[3]);}}
function drawCornelius2(a){const f=h2_face(a),s=h2_state(a);
 if(f===2){s.p=-1;s.ge=0;let ex='';if(!a.talking&&h2_beat(a,5200,900))ex='monocle';
  return h2_blitF('FCT|'+s.mo+s.bl+s.br+'|'+ex,34,68,17,66,()=>h2_cornFront(s,ex));}
 if(f===1){s.p=-1;s.S=s.lf=s.lb=s.bob=0;s.ge=0;s.tq=1;}
 h2_blit(h2_key('CT',s,s.tq?'q':''),36,68,18,66,()=>h2_cornPaint(s));}
DRAW.cornelius=drawCornelius2;
// Debug: __dots.spr(id) renders an actor's poses (side idle, walk x4, talk, front, front talk) at 1x for review.
setTimeout(()=>{if(window.__dots)window.__dots.spr=(id,extra)=>{const a=ACT[id],W=8*44,H=74,c=mkC(W,H),g=c.getContext('2d'),pG=G,sv={x:a.x,y:a.y,dir:a.dir,walking:a.walking,frame:a.frame,ft:a.ft,talking:a.talking,front:a.front,_h2mv:a._h2mv,_h2fw:a._h2fw,_h2ft:a._h2ft};
 const poses=[{},{walking:1,frame:0,ft:0},{walking:1,frame:1,ft:60},{walking:1,frame:2,ft:0},{walking:1,frame:3,ft:60},{talking:1},{front:true},{front:true,talking:1}];
 G=g;try{poses.forEach((p,i)=>{Object.assign(a,{walking:false,talking:false,front:undefined,frame:0,ft:0,_h2mv:undefined,_h2fw:undefined},p,extra||{});a.dir=1;a.x=22+i*44;a.y=70;drawActor(a);});}finally{G=pG;Object.assign(a,sv);}return c.toDataURL();};},0);
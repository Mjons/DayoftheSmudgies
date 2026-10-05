// ======================= UI portraits: the party-switch buttons wear the cinematic busts =======================
// The selfie cinematic paints Willis, the Dude and Verny as busts (mvA_gW / mvA_gD / mvA_vBust, CLOSEUP-grade art).
// Each slot shows an 88x64 window on its bust, one art pixel per hi-res pixel, drawn on the text layer (4x) so the
// 22x16 button is a true miniature of the cutscene face. Under the pause menu (which repaints the text layer) a
// smoothed 1x copy on the pixel layer stands in, dimmed with everything else.
const PORT_SRC={willis:()=>mvA_gW(0,0),dude:()=>mvA_gD(0,0),verny:()=>mvA_vBust('group',0,0)};
const PORT_WIN={willis:[-12,22],dude:[-11,26],verny:[14,12]},PORT_C={};
function portCan(id){let c=PORT_C[id];if(c)return c;const s=PORT_SRC[id](),w=PORT_WIN[id];c=mkC(88,64);const g=c.getContext('2d');g.imageSmoothingEnabled=false;g.drawImage(s,-w[0],-w[1]);PORT_C[id]=c;return c;}
drawPortraits=function(){if(PLAYERS.length<2)return;PLAYERS.forEach((id,i)=>{const py=PORT_Y[i],on=PL.id===id;
 R(296,py,22,16,on?'#3a3060':'#14111e');R(296,py,22,1,on?'#ffd23a':'#2e2842');R(296,py+15,22,1,on?'#ffd23a':'#0a0812');
 if(MENU.open&&PORT_SRC[id]){const sm=gx.imageSmoothingEnabled;gx.imageSmoothingEnabled=true;gx.globalAlpha=on?1:.6;gx.drawImage(portCan(id),296,py,22,16);gx.globalAlpha=1;gx.imageSmoothingEnabled=sm;}});};
{const _r=render;render=function(){_r();
 if(ARC.open||MENU.open||PLAYERS.length<2)return;const here=!st.screen&&ROOMS[st.room];if(!(here&&(st.mode==='play'||st.mode==='dialog'||st.keepUI)))return;
 tx.save();tx.setTransform(1,0,0,1,0,0);tx.imageSmoothingEnabled=false;
 PLAYERS.forEach((id,i)=>{if(!PORT_SRC[id])return;const py=PORT_Y[i],on=PL.id===id,hv=st.hoverPort===id;
  tx.globalAlpha=on?1:hv?.85:.55;tx.drawImage(portCan(id),296*4,py*4);tx.globalAlpha=1;
  tx.fillStyle=on?'#ffd23a':'#2e2842';tx.fillRect(296*4,py*4,88,4);tx.fillStyle=on?'#ffd23a':'#0a0812';tx.fillRect(296*4,(py+15)*4,88,4);});
 // the faces sit above the pixel layer, so the crosshair gets redrawn on top of them
 if(M.in&&!M.touch&&M.x>=289&&M.y>=VH){const g=G;G=tx;tx.setTransform(4,0,0,4,0,0);try{drawCursor();}finally{G=g;}}
 tx.restore();};}
setTimeout(()=>{if(window.__dots)window.__dots.bust=id=>{const c=PORT_SRC[id]();return{ox:c.ox,oy:c.oy,w:c.width,h:c.height,url:c.toDataURL()};};},0);
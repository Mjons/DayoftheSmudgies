// ======================= END CREDITS PAYOFF: Verny's Cut =======================
// The credits roll to THE END; the click that used to go straight to the "next morning" epilogue now first plays
// Verny's finished music video (game/vernys-cut.mp4, full screen), then the epilogue follows as the post-credits
// scene. Nothing in the existing ending is edited: the video is slotted in front of epilogue4.
// Esc or Skip skips it; a missing or broken file skips itself; Theater replays of the epilogue don't play it.
const ENDVID={src:'vernys-cut.mp4',el:null,on:false,done:null,hideT:0};
function endVidEl(){if(ENDVID.el)return ENDVID.el;
 const css=document.createElement('style');css.textContent='#endvid{position:fixed;inset:0;z-index:60;background:#000;opacity:0;transition:opacity .6s}#endvid.on{opacity:1}#endvid[hidden]{display:none}'+
  '#endvid video{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;background:#000}'+
  '#endvid .sk{position:absolute;right:18px;bottom:16px;display:flex;gap:12px;align-items:center;font-family:"Pixelify Sans",ui-monospace,monospace;color:#7d768c;font-size:13px;letter-spacing:.06em;transition:opacity .4s}'+
  '#endvid .sk.idle{opacity:0}#endvid button{font:inherit;font-size:14px;color:#e9e2cf;background:#14111e;border:1px solid #2e2842;padding:5px 12px;cursor:pointer;box-shadow:2px 2px 0 #000}#endvid button:hover,#endvid button:focus-visible{border-color:#ffd23a;outline:none}';
 document.head.appendChild(css);
 const el=document.createElement('div');el.id='endvid';el.hidden=true;el.setAttribute('role','dialog');el.setAttribute('aria-label',"Verny's Cut, music video");
 el.innerHTML='<video playsinline preload="auto"></video><div class="sk"><span>Esc skips</span><button type="button">Skip &#9654;</button></div>';
 el.querySelector('button').addEventListener('click',()=>endVidFinish());
 el.addEventListener('mousemove',()=>endVidHint());document.body.appendChild(el);ENDVID.el=el;return el;}
function endVidHint(){const sk=ENDVID.el&&ENDVID.el.querySelector('.sk');if(!sk)return;sk.classList.remove('idle');clearTimeout(ENDVID.hideT);ENDVID.hideT=setTimeout(()=>sk.classList.add('idle'),2600);}
function playEndVideo(){if(ENDVID.on)return Promise.resolve();const el=endVidEl(),v=el.querySelector('video');
 ENDVID.on=true;st.endReady=false;st.mode='endvid';music(null);stopVO();
 v.volume=AU.musicOn===false?0:Math.max(0,Math.min(1,SET.mvol*1.1));v.src=ENDVID.src;v.currentTime=0;
 v.onended=()=>endVidFinish();v.onerror=()=>endVidFinish();
 el.hidden=false;requestAnimationFrame(()=>el.classList.add('on'));endVidHint();
 const p=v.play();if(p&&p.catch)p.catch(()=>endVidFinish());
 return new Promise(r=>{ENDVID.done=r;});}
function endVidFinish(){if(!ENDVID.on)return;ENDVID.on=false;const el=ENDVID.el,v=el.querySelector('video');
 try{v.pause();}catch(e){}v.onended=v.onerror=null;el.classList.remove('on');
 setTimeout(()=>{el.hidden=true;v.removeAttribute('src');try{v.load();}catch(e){}},600);
 stage.focus({preventScroll:true});const d=ENDVID.done;ENDVID.done=null;if(d)setTimeout(d,450);}
window.addEventListener('keydown',e=>{if(ENDVID.on&&e.key==='Escape'){e.preventDefault();endVidFinish();}});
{const _ep=epilogue4;epilogue4=async function(...x){if(!THEATER.on)await playEndVideo();return _ep.apply(this,x);};}
setTimeout(()=>{if(window.__dots){window.__dots.endvid=()=>({on:ENDVID.on,t:ENDVID.el?ENDVID.el.querySelector('video').currentTime:0,d:ENDVID.el?ENDVID.el.querySelector('video').duration:0,paused:ENDVID.el?ENDVID.el.querySelector('video').paused:true});window.__dots.endvidSeek=s=>{const v=ENDVID.el.querySelector('video');v.currentTime=s;};}},0);
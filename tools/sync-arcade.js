// Copies the arcade cabinet games into game/arcade/ for the Employee Lounge easter egg.
// Run after editing either game:  node tools/sync-arcade.js
// - swaps the Google Fonts links for the local copies in game/fonts (the Steam build has no network)
// - injects a tiny bridge so the game can tell the cabinet overlay "hold Esc = walk away"
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SRC_DIR = process.env.ARCADE_SRC || path.resolve(ROOT, "..");
const OUT_DIR = path.join(ROOT, "game", "arcade");
const GAMES = [
  { src: "Smudge Boss Blitz.html", out: "blitz.html" },
  { src: "smudge-in-sudsland.html", out: "sudsland.html" },
];

const FONTS = `<style>
@font-face{font-family:"Press Start 2P";src:url(../fonts/press-start-2p-latin-400-normal.woff2) format("woff2");font-weight:400}
@font-face{font-family:"VT323";src:url(../fonts/vt323-latin-400-normal.woff2) format("woff2");font-weight:400}
html.dots-cab,html.dots-cab body{overflow:hidden}
</style>`;

// Runs inside the cabinet iframe. Esc tapped = the game's own pause; Esc held = walk away.
// Also scales the page down so the whole cabinet fits the window without scrolling.
const BRIDGE = `<script>
(()=>{if(window.parent===window)return;document.documentElement.classList.add('dots-cab');
 const post=m=>{try{parent.postMessage({dotsArcade:m},'*');}catch(e){}};let held=null;
 addEventListener('keydown',e=>{if(e.key!=='Escape'||e.repeat)return;clearTimeout(held);held=setTimeout(()=>post('exit'),650);},true);
 addEventListener('keyup',e=>{if(e.key==='Escape'){clearTimeout(held);held=null;}},true);
 addEventListener('blur',()=>{clearTimeout(held);held=null;});
 addEventListener('message',e=>{if(e.data&&e.data.dotsArcade==='focus'){try{focus();document.body.focus();}catch(_){}}});
 const fit=()=>{const b=document.body;if(!b)return;b.style.zoom='';const h=Math.max(b.scrollHeight,document.documentElement.scrollHeight),w=Math.max(b.scrollWidth,document.documentElement.scrollWidth);
  const k=Math.min(1,innerHeight/h,innerWidth/w);if(k<.999)b.style.zoom=String(Math.floor(k*1000)/1000);};
 addEventListener('load',()=>{fit();setTimeout(fit,300);post('ready');});addEventListener('resize',fit);
})();
</script>`;

fs.mkdirSync(OUT_DIR, { recursive: true });
for (const g of GAMES) {
  const from = path.join(SRC_DIR, g.src);
  if (!fs.existsSync(from)) {
    console.error("missing: " + from);
    process.exitCode = 1;
    continue;
  }
  let html = fs.readFileSync(from, "utf8");
  const before = html.length;
  html = html.replace(
    /<link[^>]+fonts\.(googleapis|gstatic)\.com[^>]*>\s*/g,
    "",
  );
  if (/fonts\.(googleapis|gstatic)\.com/.test(html))
    console.warn(g.src + ": still references Google Fonts somewhere");
  // fonts first thing in <head> (or the top of the file), bridge last thing before </body>
  html = /<head[^>]*>/i.test(html)
    ? html.replace(/<head[^>]*>/i, (m) => m + FONTS)
    : FONTS + html;
  html = /<\/body>/i.test(html)
    ? html.replace(/<\/body>(?![\s\S]*<\/body>)/i, BRIDGE + "</body>")
    : html + BRIDGE;
  fs.writeFileSync(path.join(OUT_DIR, g.out), html);
  console.log(
    `${g.src} -> game/arcade/${g.out} (${before} -> ${html.length} bytes)`,
  );
}

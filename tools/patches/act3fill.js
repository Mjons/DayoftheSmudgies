// ======================= ACT 3: yesterday's rooms get their furniture back =======================
// Yesterday's shop, office, basement and landing paint the same furniture as today's, but only the puzzle objects
// were wired up, so a lot of what you could see did nothing. These are flavour hotspots for all of it (12:46, the
// night before), plus the new releases on the counter (Captain Colossal #1 if nobody has one) and a Dude bit at the
// SNAX machine. None of them touch the Act 3 puzzle chain.
function yHot(id,list){const r=ROOMS[id],base=r.hot;r.hot=()=>(typeof base==='function'?base():base).filter(Boolean).concat(list);}
async function yCounterComic(){if([W,D,V].some(p=>p.inv.includes('comic')))return say(PL,"We've already got a Captain Colossal. Rory counts these.");
 addInv('comic');snd('page');await say(PL,"Captain Colossal number one, off the top of the new releases. Every hero starts somewhere.");}
async function ySnax(){if(PL!==D)return say(PL,"Way too heavy. That's a Dude job.");
 await say(D,"Bro. I know this machine.");st.shake=500;snd('kathunk');sfx('KA-THUNK!',133,28,'#ff8a1a',2);await wait(500);
 await say(D,"Nothing. It's saving the quarter for tomorrow. For me. Respect.");}
const yBell=()=>say(PL,"Not ringing it. Yesterday-Rory is asleep upstairs, and he wakes up with opinions.");
yHot('y.shop',[
 {id:'vent',name:'floor vent',rect:[132,104,30,12],walk:{x:150,y:122,dir:-1},on:{look:"The floor vent. Yesterday, nobody's yelling up through it yet."}},
 {id:'bell',name:'counter bell',rect:[124,68,14,12],walk:{x:132,y:108,dir:-1},on:{look:"The counter bell. RING FOR SERVICE.",use:yBell,push:yBell,pick:yBell}},
 {id:'figure',name:'Smudge figure',rect:[136,60,12,18],walk:{x:142,y:108,dir:-1},on:{look:"The limited edition Smudge figure. Same glass case. Batteries still not included.",open:"Locked. Limited edition means limited access. Even yesterday.",pick:"It's in a locked case. Yesterday's case is just as locked."}},
 {id:'register',name:'register',rect:[150,60,24,18],walk:{x:162,y:108,dir:-1},on:{look:"The register says NO SALE. It's been saying that since before we got here.",open:"Locked. Yesterday's money stays in yesterday."}},
 {id:'counter',name:'counter',rect:[116,78,60,26],walk:{x:146,y:108,dir:-1},on:{look:"New releases on the counter. Captain Colossal number one, right on top.",pick:yCounterComic}},
 {id:'poster',name:'poster',rect:[116,28,64,32],walk:{x:146,y:108,dir:-1},on:{look:"The SMUDGE AND THE SMUDGIES poster. Yesterday's version. Same Smudge. Slightly less famous."}}]);
yHot('y.office',[
 {id:'detector',name:'smoke detector',rect:[121,4,17,12],walk:{x:129,y:112,dir:-1},on:{look:"The smoke detector. Battery still in it. Yesterday's fire safety is excellent.",pick:"Tomorrow somebody borrows that battery. Let's not borrow it twice."}},
 {id:'keypad',name:'keypad',rect:[190,52,14,20],walk:{x:186,y:108,dir:1},on:{look:"The keypad. Lit up and happy. Tomorrow it loses its battery and its dignity.",use:"The basement door's already open. Yesterday nobody had locked it yet."}},
 {id:'crt',name:'computer',rect:[32,58,22,20],walk:{x:44,y:110,dir:-1},on:{look:"Rory's computer. The screensaver says MEGAPRESS: NOTHING SCHEDULED. That changes tonight.",use:"It wants a password. It's still not password."}},
 {id:'photo',name:'photo',rect:[60,22,22,24],walk:{x:70,y:110,dir:-1},on:{look:"EMPLOYEE OF THE MONTH: RORY TUMBLE. Forty-six frames. Tomorrow there are forty-seven."}},
 {id:'safe',name:'safe',rect:[92,70,24,30],walk:{x:104,y:110,dir:-1},on:{look:"Cornelius's old safe. Shut tight. It's kept its secrets for two hundred years.",open:"Locked. And I'm not stealing the same lens twice."}},
 {id:'vending',name:'SNAX machine',rect:[120,36,26,64],walk:{x:140,y:110,dir:-1},on:{look:"The SNAX machine. One day younger. Already hungry for quarters.",push:ySnax,use:"It wants a quarter. It always wants a quarter. Even yesterday.",open:"Locked. The snacks are in snack jail. They've been in there a while.",talk:"INSERT 25 CENTS. It was rude yesterday too."}}]);
yHot('y.basement',[
 {id:'coinbox',name:'coin box',rect:[254,48,14,28],walk:{x:250,y:110,dir:1},on:{look:"The coin box. INSERT 25 CENTS. Nobody's locked in the MegaPress yet. Let's keep it that way.",use:"Not putting money in that. I know what it does."}},
 {id:'pipe',name:'overflow pipe',rect:[268,22,52,16],walk:{x:290,y:112,dir:1},on:{look:"The overflow pipe. TO ALLEY. Every drop that leaks out of here ends up in that puddle."}}]);
yHot('y.landing',[
 {id:'portraits',name:'Hall of Tumbles',rect:[160,18,54,30],walk:{x:186,y:108,dir:-1},on:{look:"The Hall of Tumbles. Two hundred years of the same hair. Yesterday, too."}}]);
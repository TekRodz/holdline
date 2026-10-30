const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:500,height:900}});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+require('path').resolve(__dirname,'../index.html'));await p.waitForTimeout(300);
const N=+process.argv[2]||6;
const res=await p.evaluate((N)=>{
  function bot(){for(const side of['L','R']){let on=false;for(const f of flippers.filter(f=>f.side===side))for(const bl of balls){const dx=bl.x-f.px,dy=bl.y-f.py;if(Math.abs(dy)<40&&(side==='L'?dx>-5&&dx<f.len+15:dx<5&&dx>-f.len-15)&&bl.vy>-200)on=true}setFlip(side,on)}
    if(state==='ready'&&ballInLane()){plunger.charging=true;if(plunger.charge>.6)launch()}
    if(state==='levelup'){lu.t=1;choose(Math.floor(Math.random()*3))}
    if(state==='atelier'){atl.t=1;if(atl.step==='pick')atlPick(Math.floor(Math.random()*3));else{atl.t=1;atl.sock=Math.floor(Math.random()*SOCKETS.length);atlPlace()}}}
  const out=[];
  for(let g=0;g<N;g++){newGame();P.sound=0;let t=0,bossInfo=[];let cur=null;
    while(t<3000){bot();update(1/60);t+=1/60;if(boss&&cur!==boss){cur=boss;bossInfo.push(boss.d.name)}
      if(state==='over'||state==='victory')break}
    out.push(`partie ${g+1}: ${state} vague ${wave} t=${Math.round(t)}s boss vus=${bossInfo.join(',')} bossHP=${boss?Math.round(boss.hp)+'/'+boss.max:'-'}`)}
  // chemin victoire forcé
  newGame();P.sound=0;started=true;state='play';wave=14;phase='idle';for(let i=0;i<120;i++)update(1/60);
  const B=boss;hurt(B,99999,false,true);enemies.forEach(e=>e.dead=true);enemies=[];packs=[];phase='fighting';
  for(let i=0;i<400&&state!=='victory';i++){update(1/60);if(state==='levelup'){lu.t=1;choose(0)}}
  out.push('forcé: state='+state+' wave='+wave+' wins='+wins);render(1);
  vic.t=1;vicKey('Enter');out.push('après Entrée: state='+state+' endless='+endless+' step='+atl.step);atl.t=1;atlKey('Escape');
  for(let i=0;i<200;i++)update(1/60);out.push('infini: wave='+wave+' phase='+phase);render(1);
  return out},N);
console.log(res.join('\n'));console.log('errors:',errs.slice(0,5));
await b.close()})();

const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:500,height:900}});
const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.goto('file://'+require('path').resolve(__dirname,'../index.html'));await p.waitForTimeout(500);
const r=await p.evaluate(async(startWave)=>{
  function bot(){for(const side of['L','R']){let on=false;for(const f of flippers.filter(f=>f.side===side))for(const bl of balls){const dx=bl.x-f.px,dy=bl.y-f.py;if(Math.abs(dy)<40&&(side==='L'?dx>-5&&dx<f.len+15:dx<5&&dx>-f.len-15)&&bl.vy>-200)on=true}setFlip(side,on)}
    if(state==='ready'&&ballInLane()){plunger.charging=true;if(plunger.charge>.6)launch()}
    if(state==='levelup'){lu.t=1;choose(Math.floor(Math.random()*3))}
    if(state==='atelier'){atl.t=1;if(atl.step==='pick')atlPick(Math.floor(Math.random()*3));else{atl.t=1;atl.sock=Math.floor(Math.random()*SOCKETS.length);atlPlace()}}}
  newGame();P.sound=0;started=true;state='ready';wave=startWave;phase='idle';
  const log=[];let sawBoss=null,t=0,abil=0,hitLine=0;const hpStart={};
  while(t<400){bot();update(1/60);t+=1/60;
    if(boss&&!sawBoss){sawBoss=boss.d.name;hpStart.v=boss.max;log.push('spawn '+boss.d.name+' hp '+boss.max+' t='+t.toFixed(1)+' DANGER '+DANGER.toFixed(0))}
    if(state==='over'){log.push('over at wave '+wave+' t='+t.toFixed(1)+' bossHp '+(boss?boss.hp:'-'));break}
    if(state==='victory'){log.push('VICTORY t='+t.toFixed(1));break}
    if(sawBoss&&!boss&&wave===startWave+1&&!log.some(l=>l.startsWith('killed'))){log.push('killed '+sawBoss+' t='+t.toFixed(1)+' DANGER '+DANGER.toFixed(0)+' hp '+hp)}
    if(wave>startWave+1&&state==='play')break;
  }
  log.push('end wave '+wave+' state '+state+' hp '+hp+' boss '+(boss?Math.round(boss.hp)+'/'+boss.max+' y'+Math.round(boss.y):'none')+' jam '+SOCKETS.filter(s=>s.p&&s.p.jam>0).length);
  return log},+process.argv[2]);
console.log(r.join('\n'));
// render frames in each state for errors
await p.evaluate(()=>{render(1)});
console.log('errors:',errs.slice(0,5));await b.close()})();

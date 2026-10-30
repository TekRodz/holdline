const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:500,height:900}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+require('path').resolve(__dirname,'../index.html'));await p.waitForTimeout(500);
await p.click('#gear');await p.$eval('#jump',el=>{el.value=10;el.oninput()});
await p.click('#jumpBtn');
const r=await p.evaluate(()=>{const a='U='+JSON.stringify(U)+' lvl='+level+' hp='+hp+'/'+maxHp()+' pieces='+SOCKETS.filter(s=>s.p).map(s=>s.p.type+s.p.lvl).join(',')+' wave='+wave+' state='+state;
  P.sound=0;for(let i=0;i<600;i++){update(1/60);if(state==='ready'&&ballInLane()){plunger.charging=true;if(plunger.charge>.6)launch()}}
  return a+' | après lancement: wave='+wave+' boss='+(boss?boss.d.name:'-')+' endless='+endless});
console.log(r);await p.evaluate(()=>{jumpTo(18)});console.log(await p.evaluate(()=>'18: endless='+endless+' wave='+wave+' lvl='+level));
console.log('errors',errs);await b.close()})();

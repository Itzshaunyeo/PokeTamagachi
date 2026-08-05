(function(root){
  const MAX=100, HOUR=3600000;
  const clamp=n=>Math.max(0,Math.min(MAX,Math.round(n)));
  function newPet(id,name,now=Date.now()){return{id,name:name||'',bornAt:now,lastUpdated:now,lastAction:now,stage:'Hatchling',alive:true,stats:{hunger:88,happiness:82,energy:76,hygiene:90,health:100},journal:[{at:now,text:'A new friendship began.'}]};}
  function advance(pet,now=Date.now()){
    if(!pet||!pet.alive)return pet;
    const hours=Math.max(0,(now-pet.lastUpdated)/HOUR); if(!hours)return pet;
    const p=JSON.parse(JSON.stringify(pet)),s=p.stats;
    s.hunger=clamp(s.hunger-hours*4);s.happiness=clamp(s.happiness-hours*2.4);s.energy=clamp(s.energy-hours*2);s.hygiene=clamp(s.hygiene-hours*1.8);
    const critical=[s.hunger,s.happiness,s.energy,s.hygiene].filter(v=>v<15).length;
    s.health=clamp(s.health-hours*critical*5+(critical===0&&s.health<100?hours:0.5*hours));
    const ageDays=(now-p.bornAt)/86400000;p.stage=ageDays>=7?'Best Buddy':ageDays>=2?'Growing':'Hatchling';
    p.lastUpdated=now;if(s.health<=0){p.alive=false;p.journal.unshift({at:now,text:`${p.name||'Your companion'} passed on. Your memories remain.`});}return p;
  }
  const effects={feed:{hunger:28,happiness:3,energy:-2},play:{happiness:24,energy:-12,hunger:-6,hygiene:-4},rest:{energy:36,health:5,hunger:-8},clean:{hygiene:40,happiness:3},heal:{health:30,energy:8,happiness:-3}};
  function act(pet,action,now=Date.now()){
    const p=advance(pet,now);if(!p?.alive||!effects[action])return p;const out=JSON.parse(JSON.stringify(p));
    for(const [key,value] of Object.entries(effects[action]))out.stats[key]=clamp(out.stats[key]+value);
    const labels={feed:'Shared a tasty berry.',play:'Played a lively little game.',rest:'Curled up for a good rest.',clean:'Freshened up the habitat.',heal:'Took some medicine.'};
    out.lastAction=now;out.journal.unshift({at:now,text:labels[action]});out.journal=out.journal.slice(0,30);return out;
  }
  const api={newPet,advance,act,clamp};root.PokeState=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);

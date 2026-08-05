(function(root){
  const MAX=100, HOUR=3600000, DAY=86400000;
  const clamp=n=>Math.max(0,Math.min(MAX,Math.round(n)));
  function newPet(id,name,now=Date.now(),forms=[],profile={}){const learnset=profile.learnset||[],starting=learnset.filter(x=>x.level<=1).map(x=>x.move).slice(0,4),stats=['hp','attack','defense','spAttack','spDefense','speed'],ivs={},evs={};for(const stat of stats){ivs[stat]=Math.floor(Math.random()*32);evs[stat]=0}return{id,name:name||'',bornAt:now,hatchedAt:null,lastUpdated:now,lastAction:now,stage:'Egg',isHatched:false,carePoints:0,formIndex:0,forms,evolutionRules:profile.evolutionRules||[],level:1,exp:0,learnset,moves:starting,moveArchive:[...starting],pendingMoves:[],ivs,evs,items:[],trades:0,wins:0,losses:0,alive:true,stats:{hunger:88,happiness:82,energy:76,hygiene:90,health:100},journal:[{at:now,text:'A mysterious egg arrived. Care for it every day!'}]};}
  function updateGrowth(p,now){
    if(!p.isHatched&&now-p.bornAt>=DAY&&(p.carePoints||0)>=3){p.isHatched=true;p.hatchedAt=now;p.stage='Hatchling';p.journal.unshift({at:now,text:`The egg hatched into ${p.forms?.[0]?.name||p.name}!`});}
    if(!p.isHatched){p.stage='Egg';return p;}
    p.stage=p.level>=36?'Veteran':p.level>=16?'Growing':'Hatchling';return p;
  }
  const expForNext=level=>level*50;
  function checkEvolution(p,rng=Math.random){if(!p.isHatched)return p;const current=p.formIndex||0,rule=p.evolutionRules?.[current];if(!rule)return p;let desired=current+1,met=false;if(rule.type==='level')met=p.level>=rule.value;if(rule.type==='random'&&p.level>=rule.value){desired=1+Math.floor(rng()*Math.max(1,p.forms.length-1));met=true}if(rule.type==='friendship')met=p.stats.happiness>=90;if(rule.type==='friendship-day')met=p.stats.happiness>=90&&new Date().getHours()>=6&&new Date().getHours()<18;if(rule.type==='trade')met=(p.trades||0)>0;if(rule.type==='item'){const index=(p.items||[]).indexOf(rule.value);if(index>=0){p.items.splice(index,1);met=true}}if(met){const before=p.forms[current]?.name||p.name,after=p.forms[desired]?.name||p.name;p.formIndex=desired;p.journal.unshift({at:Date.now(),text:`${before} evolved into ${after}!`});return checkEvolution(p,rng)}return p;}
  function gainExp(pet,amount,rng=Math.random){const p=JSON.parse(JSON.stringify(pet));if(!p.isHatched||!p.alive)return p;p.exp=(p.exp||0)+Math.max(0,amount);while(p.level<100&&p.exp>=expForNext(p.level)){p.exp-=expForNext(p.level);p.level++;p.journal.unshift({at:Date.now(),text:`Reached level ${p.level}!`});for(const lesson of p.learnset||[]){if(lesson.level===p.level&&!p.moveArchive.includes(lesson.move)){p.moveArchive.push(lesson.move);if(p.moves.length<4)p.moves.push(lesson.move);else p.pendingMoves.push(lesson.move);}}}checkEvolution(p,rng);return p;}
  function learnMove(pet,move,replaceIndex=null){const p=JSON.parse(JSON.stringify(pet));if(!p.moveArchive.includes(move))return p;if(p.moves.includes(move))return p;if(p.moves.length<4)p.moves.push(move);else if(Number.isInteger(replaceIndex)&&replaceIndex>=0&&replaceIndex<4)p.moves[replaceIndex]=move;return p;}
  function awardBattle(pet,result){let p=gainExp(pet,result.exp||0);const stat=result.won?'attack':'defense';p.evs[stat]=Math.min(252,(p.evs[stat]||0)+(result.won?2:1));p[result.won?'wins':'losses']=(p[result.won?'wins':'losses']||0)+1;if(result.item&&!p.items.includes(result.item))p.items.push(result.item);return p;}
  function useItem(pet,item){const p=JSON.parse(JSON.stringify(pet));if(!p.items.includes(item))return p;return checkEvolution(p)}
  function advance(pet,now=Date.now()){
    if(!pet||!pet.alive)return pet;
    const hours=Math.max(0,(now-pet.lastUpdated)/HOUR);const p=JSON.parse(JSON.stringify(pet)),s=p.stats;
    if(hours){if(p.isHatched){s.hunger=clamp(s.hunger-hours*1.5);s.energy=clamp(s.energy-hours)}s.happiness=clamp(s.happiness-hours*.8);s.hygiene=clamp(s.hygiene-hours*.6);const watched=p.isHatched?[s.hunger,s.happiness,s.energy,s.hygiene]:[s.happiness,s.hygiene],critical=watched.filter(v=>v<15).length;s.health=clamp(s.health-hours*critical*5+(critical===0&&s.health<100?hours:0.5*hours));}
    updateGrowth(p,now);
    p.lastUpdated=now;if(s.health<=0){p.alive=false;p.journal.unshift({at:now,text:`${p.name||'Your companion'} passed on. Your memories remain.`});}return p;
  }
  const effects={feed:{hunger:28,happiness:3,energy:-2},play:{happiness:24,energy:-12,hunger:-6,hygiene:-4},rest:{energy:36,health:5,hunger:-8},clean:{hygiene:40,happiness:3},heal:{health:30,energy:8,happiness:-3}};
  function act(pet,action,now=Date.now()){
    const p=advance(pet,now);if(!p?.alive||!effects[action])return p;const out=JSON.parse(JSON.stringify(p));
    const eggNeeds=new Set(['happiness','hygiene','health']);for(const [key,value] of Object.entries(effects[action]))if(out.isHatched||eggNeeds.has(key))out.stats[key]=clamp(out.stats[key]+value);
    if(!out.isHatched)out.carePoints=(out.carePoints||0)+1;updateGrowth(out,now);
    const labels={feed:'Shared a tasty berry.',play:'Played a lively little game.',rest:'Curled up for a good rest.',clean:'Freshened up the habitat.',heal:'Took some medicine.'};
    out.lastAction=now;out.journal.unshift({at:now,text:labels[action]});out.journal=out.journal.slice(0,30);return out;
  }
  const api={newPet,advance,act,clamp,gainExp,learnMove,expForNext,checkEvolution,awardBattle,useItem};root.PokeState=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);

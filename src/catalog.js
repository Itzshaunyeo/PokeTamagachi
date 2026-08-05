(function (root) {
  const rows = [
    [1,'Bulbasaur','grass','Calm'],[4,'Charmander','fire','Brave'],[7,'Squirtle','water','Playful'],[25,'Pikachu','electric','Curious'],
    [39,'Jigglypuff','fairy','Sleepy'],[52,'Meowth','normal','Mischievous'],[54,'Psyduck','water','Dreamy'],[58,'Growlithe','fire','Loyal'],
    [74,'Geodude','rock','Sturdy'],[92,'Gastly','ghost','Shy'],[133,'Eevee','normal','Adaptable'],[143,'Snorlax','normal','Relaxed'],
    [152,'Chikorita','grass','Gentle'],[155,'Cyndaquil','fire','Timid'],[158,'Totodile','water','Energetic'],[172,'Pichu','electric','Bubbly'],
    [175,'Togepi','fairy','Lucky'],[194,'Wooper','water','Carefree'],[252,'Treecko','grass','Cool'],[255,'Torchic','fire','Warm'],
    [258,'Mudkip','water','Cheerful'],[280,'Ralts','psychic','Sensitive'],[300,'Skitty','normal','Affectionate'],[447,'Riolu','fighting','Focused'],
    [495,'Snivy','grass','Proud'],[498,'Tepig','fire','Jolly'],[501,'Oshawott','water','Bold'],[570,'Zorua','dark','Clever'],
    [925,'Maushold','normal','Family-oriented']
  ];
  const descriptions={grass:'Loves sunshine and quiet naps.',fire:'Warm-hearted and always ready to play.',water:'Feels happiest after a refreshing wash.',electric:'Needs activity to burn off extra energy.',fairy:'Thrives on affection and gentle care.',normal:'An easygoing friend with simple needs.',rock:'Patient, sturdy, and fond of training.',ghost:'Most active after the lights go down.',psychic:'Sensitive to mood and daily routines.',fighting:'Grows happier through regular training.',dark:'Clever, independent, and playful.'};
  const catalog=rows.map(([id,name,type,nature])=>({id,name,type,nature,description:descriptions[type],sprite:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`,fallback:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}));
  root.POKE_CATALOG=catalog;
  if(typeof module!=='undefined') module.exports={catalog};
})(typeof window!=='undefined'?window:globalThis);

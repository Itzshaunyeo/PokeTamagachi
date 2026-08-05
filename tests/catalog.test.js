const test = require('node:test');
const assert = require('node:assert/strict');
const { catalog } = require('../src/catalog.js');

test('roster contains only evolving Kanto starters, with Eevee branches retained', () => {
  const names = new Set(catalog.map(entry => entry.name));
  assert.equal(catalog.length, 60);
  assert.equal(names.has('Pichu'), true);
  assert.equal(names.has('Munchlax'), true);
  assert.equal(names.has('Dratini'), true);
  for (const removed of ['Kabuto','Minccino','Maushold','Tauros','Lapras','Ditto','Snorlax','Pinsir']) {
    assert.equal(names.has(removed), false);
  }
  for (const entry of catalog) {
    assert.equal(entry.forms[0].id, entry.id);
    assert.ok(entry.forms.length >= 2);
    assert.ok(entry.forms.some(form=>form.id<=151));
    assert.equal(entry.evolutionRules.length,[133,236].includes(entry.id)?1:entry.forms.length-1);
    for (const form of entry.forms) assert.ok(form.types.length>=1&&form.types.length<=2);
  }
});

test('Kanto Pokémon with later baby forms remain as complete families',()=>{
  const munchlax=catalog.find(entry=>entry.id===446);
  assert.deepEqual(munchlax.forms.map(form=>form.name),['Munchlax','Snorlax']);
  const elekid=catalog.find(entry=>entry.id===239);
  assert.deepEqual(elekid.forms.map(form=>form.name),['Elekid','Electabuzz','Electivire']);
});

test('evolved forms carry their real form-specific typing',()=>{
  const charmander=catalog.find(entry=>entry.id===4);
  assert.deepEqual(charmander.forms[2].types,['fire','flying']);
  const magikarp=catalog.find(entry=>entry.id===129);
  assert.deepEqual(magikarp.forms[1].types,['water','flying']);
  const eevee=catalog.find(entry=>entry.id===133);
  assert.deepEqual(eevee.forms.find(form=>form.name==='Glaceon').types,['ice']);
});

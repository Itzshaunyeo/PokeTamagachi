const test = require('node:test');
const assert = require('node:assert/strict');
const { catalog } = require('../src/catalog.js');

test('roster contains only evolving basic-stage companions from generations one to five', () => {
  const names = new Set(catalog.map(entry => entry.name));
  assert.equal(catalog.length, 29);
  assert.equal(names.has('Minccino'), true);
  for (const removed of ['Maushold', 'Pikachu', 'Jigglypuff', 'Snorlax', 'Chespin', 'Fennekin', 'Froakie', 'Sylveon']) {
    assert.equal(names.has(removed), false);
  }
  for (const entry of catalog) {
    assert.equal(entry.forms[0].id, entry.id);
    assert.ok(entry.forms.length >= 2);
    assert.ok(entry.id <= 649);
    assert.equal(entry.evolutionRules.length, entry.id===133?1:entry.forms.length-1);
    for (const form of entry.forms) assert.ok(form.types.length>=1&&form.types.length<=2);
  }
});

test('evolved forms carry their real form-specific typing',()=>{
  const charmander=catalog.find(entry=>entry.id===4);
  assert.deepEqual(charmander.forms[2].types,['fire','flying']);
  const mudkip=catalog.find(entry=>entry.id===258);
  assert.deepEqual(mudkip.forms[1].types,['water','ground']);
  const eevee=catalog.find(entry=>entry.id===133);
  assert.deepEqual(eevee.forms.find(form=>form.name==='Glaceon').types,['ice']);
});

const test=require('node:test');const assert=require('node:assert/strict');const {newPet,advance,act}=require('../src/game-state.js');
test('elapsed time decays needs',()=>{const p=newPet(25,'Sparky',0);const later=advance(p,3600000);assert.equal(later.stats.hunger,84);assert.equal(later.stats.energy,74)});
test('care actions are clamped and journaled',()=>{const p=newPet(7,'Bubbles',100);const fed=act(p,'feed',100);assert.equal(fed.stats.hunger,100);assert.match(fed.journal[0].text,/berry/)});
test('sustained neglect can end a lifecycle',()=>{const p=newPet(4,'Ember',0);const late=advance(p,72*3600000);assert.equal(late.alive,false);assert.equal(late.stats.health,0)});

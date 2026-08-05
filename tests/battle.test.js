const test=require('node:test');const assert=require('node:assert/strict');const {resolveBattle}=require('../lan-battle.cjs');
test('LAN battle resolution returns EXP and deterministic damage',()=>{const result=resolveBattle({name:'Host',level:5},{name:'Guest',level:8,move:{power:60}});assert.equal(result.won,true);assert.ok(result.exp>0);assert.ok(result.attack>result.counter)});

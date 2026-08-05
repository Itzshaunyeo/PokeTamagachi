const test = require('node:test');
const assert = require('node:assert/strict');
const { catalog } = require('../src/catalog.js');

test('roster includes Maushold and excludes removed companions', () => {
  const names = new Set(catalog.map(entry => entry.name));
  assert.equal(catalog.length, 29);
  assert.equal(names.has('Maushold'), true);
  for (const removed of ['Chespin', 'Fennekin', 'Froakie', 'Sylveon']) {
    assert.equal(names.has(removed), false);
  }
});

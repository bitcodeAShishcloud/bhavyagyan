import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const assets = [
  ['favicon-32.png', 32],
  ['favicon-192.png', 192],
  ['apple-touch-icon.png', 180],
];
for (const [name, size] of assets) {
  test(`${name} has the expected PNG dimensions`, () => {
    const image = readFileSync(new URL(`../public/${name}`, import.meta.url));
    assert.equal(image.subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
    assert.equal(image.readUInt32BE(16), size);
    assert.equal(image.readUInt32BE(20), size);
  });
}
test('document references the round icons', () => {
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  for (const [name] of assets) assert.ok(html.includes(`/${name}`));
  assert.ok(html.includes('/favicon.ico'));
});

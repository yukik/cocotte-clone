var assert = require('assert');
var compare = require('cocotte-compare');
var clone = require('..');

assert.deepEqual(clone(void 0), void 0);
assert.deepEqual(clone(null), null);
assert.deepEqual(clone(true), true);
assert.deepEqual(clone(1), 1);
assert.deepEqual(clone('foo'), 'foo');
assert.deepEqual(clone(/^abc$/ig), /^abc$/ig);
assert.deepEqual(clone([]), []);
assert.deepEqual(clone({}), {});

var d1 = new Date();
var d2 = clone(d1);
assert(d1 !== d2);
assert.deepEqual(d1, d2);

var d3 = {d: d1};
var d4 = clone(d3);
assert(d3 !== d4);
assert.deepEqual(d3, d4);

var a1 = [1,2,3];
var a2 = clone(a1);
assert(a1 !== a2);
assert.deepEqual(a1, a2);

var a3 = [1,2,3];
a3.push(a3);
var a4 = clone(a3);
assert(compare(a3, a4));    // deepEqual RangeError: Maximum call stack size exceeded

var o3 = {a:1, b:2, c:3};
o3.d = o3;
var o4 = clone(o3);
assert(compare(o3, o4));    // deepEqual RangeError: Maximum call stack size exceeded

var original = {
  a: void 0,
  b: null,
  c: 1,
  d: 'foo',
  e: true,
  f: /^abc$/ig,
  g: new Date(),
  h: [1, 2, {x: 1}]
};

assert(compare(clone(original), original));

console.log('test ok');
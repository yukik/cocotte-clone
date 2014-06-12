var test = require('./test-helper');

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

var expected = {
  a: void 0,
  b: null,
  c: 1,
  d: 'foo',
  e: true,
  f: /^abc$/ig,
  g: new Date(),
  h: [1, 2, {x: 1}]
};

test.eq(original, expected);
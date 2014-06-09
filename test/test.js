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

// 配列連結
assert(compare(clone([1, 2, 3], 4, 5), [1, 2, 3, 4, 5]));

// オブジェクト上書き
var m1 = {a: 1};
var m2 = {b: 1};
var m3 = {a: 2};
var m4 = {a: 2, b: 1};
assert.deepEqual(clone(m1,m2,m3), m4);

// オブジェクト上書き２
var m5 = {a: {b: 1}};
var m6 = {a: {c: 2}};
var m7 = {a: {b: 3}};
var m8 = {a: {b: 3, c: 2}};
assert.deepEqual(clone(m5,m6,m7), m8);

// オブジェクト上書き(自己参照)
var m9  = {a: 1};
var m10 = {a: 2};
m10.b = m10;
var m11 = {a: 2};
m11.b = m11;
assert(compare(clone(m9,m10), m11));

var ob1 = {
  a: 1,
  b: [1, 2, [3, 4, 5]],
  c: {
    d: new Date('2014-7-7'),
    e: {
      f: true,
      g: /^abc$/i
    }
  }
};

var ob2 = {
  b: null,
  c: {
    e: {
      f: false,
    }
  }
};

var ob3 = {
  a: 1,
  b: null,
  c: {
    d: new Date('2014-7-7'),
    e: {
      f: false,
      g: /^abc$/i
    }
  }
};

assert.deepEqual(clone(ob1, ob2), ob3);



var obj1 = {
  a: 1,
  b: {
    c: 2,
    d: 3
  }
};
var obj2 = {
  a: 4,
  b: {
    c: 5
  }
};
var obj3 = {
  a: 4,
  b: {
    c: 5,
    d: 3
  }
};
assert.deepEqual(clone(obj1, obj2), obj3); // pass





console.log('test ok');

var test = require('./test-helper');
var d1;


// simple
d1 = {};
Object.defineProperty(d1, 'a', {
  value: 1
});
test.eq(d1);

// loop
d1 = {};
Object.defineProperty(d1, 'a', {
  enumerable: true,
  value: d1
});
test.eq(d1);

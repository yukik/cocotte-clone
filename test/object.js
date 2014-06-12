var test = require('./test-helper');
var d1;

d1 = {d: new Date()};
test.eq(d1);

d1 = {a:1, b:2, c:3};
d1.d = d1;
test.eq(d1);


var test = require('./test-helper');
var d1;
var d2;

d1 = new Date('2014-7-7');
test.eq(d1);

d1 = new Date('2014-7-7');
d2 = new Date('2014-7-7');
test.eq(d1, d2);

d1 = new Date('2014-7-7');
d2 = new Date('2014-7-8');
test.diff(d1, d2);

d1 = new Date('abc');
d2 = new Date('efg');
test.eq(d1, d2);


var test = require('./test-helper');
var r1;
var r2;

r1 = /^abc$/;
test.eq(r1);

r1 = /^abc$/;
r2 = /^abc$/;
test.eq(r1, r2);

r1 = /^abc$/i;
r2 = /^abc$/;
test.diff(r1, r2);


r1 = /^abc$/ig;
r2 = /^abc$/gi;
test.eq(r1, r2);
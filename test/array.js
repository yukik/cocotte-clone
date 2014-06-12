var test = require('./test-helper');

var a1 = [1, 2, 3];
var a2 = [1, 2, 3];
test.eq(a1);
test.eq(a1, a2);

a1 = [1, 2, 3];
a1.push(a1);
a2 = [1, 2, 3];
a2.push(a2);
test.eq(a1, a2);
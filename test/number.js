var test = require('./test-helper');

// Number
test.eq(0);
test.eq(1);
test.diff(1, 2);
test.eq(new Number(1), new Number(1));
test.diff(new Number(1), Number(1));
test.eq(Infinity);
test.nan(NaN);

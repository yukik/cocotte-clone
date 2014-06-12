var test = require('./test-helper');

// Boolean
test.eq(true);
test.eq(false);
test.eq(Boolean(0), false);
test.diff(new Boolean(0), false);
test.eq(new Boolean(0));
test.eq(new Boolean(0), new Boolean(0));
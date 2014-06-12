var test = require('./test-helper');

// null,undefined
test.eq(void 0);
test.eq(null);
test.diff(null, void 0);

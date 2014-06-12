var test = require('./test-helper');

// String
test.eq('', '');
test.eq('foo', 'foo');
test.eq(String('foo'), String('foo'));
test.eq(new String('foo'), new String('foo'));

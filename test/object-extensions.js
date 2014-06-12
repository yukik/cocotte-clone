var test = require('./test-helper');
var d1;
var d2;


// 拡張不可
d1 = {a: {}};
d2 = {a: {}};
Object.preventExtensions(d1);
test.diff(d1, d2);

// 拡張不可・削除不可
d1 = {a: {}};
d2 = {a: {}};
Object.seal(d1);
test.diff(d1, d2);

// 凍結
d1 = {a: {}};
d2 = {a: {}};
Object.freeze(d1);
test.diff(d1, d2);


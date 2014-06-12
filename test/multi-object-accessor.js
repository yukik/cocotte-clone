var test = require('./test-helper');
var ob1;
var ob2;
var ob3;

// 書込み可能
ob1 = {};
Object.defineProperty(ob1, 'a', {value: 1, writable: true});
ob2 = {a: 2};
ob3 = {};
Object.defineProperty(ob3, 'a', {value: 2, writable: true});
test.multi(ob1, ob2, ob3);

// 書込み不可
ob1 = {};
Object.defineProperty(ob1, 'a', {value: 1});
ob2 = {a: 2};
ob3 = {};
Object.defineProperty(ob3, 'a', {value: 1});
test.multi(ob1, ob2, ob3);

// オブジェクト書込み可能
ob1 = {};
Object.defineProperty(ob1, 'a', {value: {}});
ob2 = {a: {b: 1}};
ob3 = {};
Object.defineProperty(ob3, 'a', {value: {b: 1}});
test.multi(ob1, ob2, ob3);

// 列挙可能な値ではない場合はマージされない
ob1 = {};
ob2 = {};
Object.defineProperty(ob2, 'a', {value: 1});
ob3 = {};
test.multi(ob1, ob2, ob3);

// 列挙可能な値をマージする
ob1 = {};
ob2 = {};
Object.defineProperty(ob2, 'a', {value: 1, enumerable: true});
ob3 = {a: 1};
test.multi(ob1, ob2, ob3);
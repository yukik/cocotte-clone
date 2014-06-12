var test = require('./test-helper');

var ob1;
var ob2;
var ob3;
var ob4;

// オブジェクト上書き
ob1 = {a: 1};
ob2 = {b: 1};
ob3 = {a: 2};
ob4 = {a: 2, b: 1};
test.multi(ob1, ob2, ob3, ob4);

// オブジェクト上書き２
ob1 = {a: {b: 1}};
ob2 = {a: {c: 2}};
ob3 = {a: {b: 3}};
ob4 = {a: {b: 3, c: 2}};
test.multi(ob1, ob2, ob3, ob4);

// オブジェクト上書き(自己参照)
ob1 = {a: 1};
ob2 = {};
ob2.b = ob2;
var ob3 = {a: 1};
ob3.b = ob3;
test.multi(ob1, ob2, ob3);


ob1 = {
  a: 1,
  b: {c: 2, d: 3}
};
ob2 = {
  a: 4,
  b: {c: 5, e: 9}
};
ob3 = {
  a: 4,
  b: {c: 5, d: 3, e: 9}
};
test.multi(ob1, ob2, ob3);

ob1 = {a:{b:{c:{d:{e:1}}}}};
ob2 = {a:{b:{c:{d:{f:2}}}}};
ob3 = {a:{b:{c:{d:{e:1,f:2}}}}};
test.multi(ob1, ob2, ob3);



// オブジェクト上書き mixed
ob1 = {
  a: 1,
  b: [1, 2, [3, 4, 5]],
  c: {
    d: new Date('2014-7-7'),
    e: {
      f: true,
      g: /^abc$/i
    }
  }
};

ob2 = {
  b: null,
  c: {
    e: {
      f: false,
    }
  }
};

ob3 = {
  a: 1,
  b: null,
  c: {
    d: new Date('2014-7-7'),
    e: {
      f: false,
      g: /^abc$/i
    }
  }
};
test.multi(ob1, ob2, ob3);


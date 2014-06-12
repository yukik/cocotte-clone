var test = require('./test-helper');


// コンストラクタから作成
function Fn () {
  this.a = 1;
  this.b = [1,2,3];
}
Fn.prototype.c = {d: 1};
var f1 = new Fn();
var f2 = new Fn();

test.eq(f1, f2);

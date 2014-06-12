var clone = require('..');
var compare = require('cocotte-compare');
var assert = require('assert');

// 複製したものとオリジナルを比較し一致するかを確認する
// 第二引数が存在する場合はそれとの一致も確認する
exports.eq = function (target1, target2) {
  var cloned = clone(target1);
  if (typeof cloned === 'object' && cloned !== null) {
    assert(cloned !== target1);
  }
  assert(compare(cloned, target1));
  if (2 <= arguments.length) {
    assert(compare(cloned, target2));
  }
  return cloned;
};

// 複製したものとtarget2を比較し一致しない事を確認する
exports.diff = function (target1, target2) {
  var cloned = clone(target1);
  if (typeof cloned === 'object' && cloned !== null) {
    assert(cloned !== target1);
  }
  assert(!compare(cloned, target2));
  return cloned;
};

// 複製したものとNaNを比較し一致するかを確認する
exports.nan = function (target1) {
  assert(Number.isNaN(clone(target1)));
};

// 複製をせず比較した結果をresultと一致するかを確認する
exports.compare = function (target1, target2, result) {
  result = typeof result === 'boolean' ? result : true;
  assert(compare(target1, target2) === result);
};

// 複数の引数のテスト、最後の引数がマージされた値とする
exports.multi = function () {
  var p = [].slice.call(arguments);
  var excepted = p.pop();
  var merged = clone.apply(null, p);
  assert(compare(merged, excepted));
};


cocotte-clone
=============

値をディープコピーします。
複製が可能な要素は、以下のとおり

  + undefined
  + null
  + 数字
  + 文字列
  + 真偽値
  + 日付
  + 正規表現
  + 配列
  + プロトタイプを持たないオブジェクト
  + 関数

オブジェクトや配列の要素も上記の要素を含む事ができます  
関数は、参照がコピーされます  
循環参照にも対応しています

# 使用方法

```
var clone = require('cocotte-clone');
var original = {
  a: 1,
  b: 'foo',
  c: new Date(),
  d: [1, 2, {x: 1}]
};
var cloned = clone(original);
```

# 複数の値を渡した場合

## 全ての引数がオブジェクトの場合

オブジェクトをマージします  
マージされた配列やオブジェクトの要素も全てディープコピーされています

```
var obj1 = {
  a: 1,
  b: {
    c: 2,
    d: 3
  }
};
var obj2 = {
  a: 4,
  b: {
    c: 5
  }
};
var obj3 = {
  a: 4,
  b: {
    c: 5,
    d: 3
  }
};
assert.deepEqual(clone(obj1, obj2), obj3); // pass
```

## その他

ディープコピー後に配列として返します  
連結の際はArray.concatと同じ動作をします

```
var cloned = clone(1, [2, 3], [4, 5]); // [1, 2, 3, 4, 5]
```





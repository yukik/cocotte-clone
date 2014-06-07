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
関数は、参照がコピーされ複製されません  
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
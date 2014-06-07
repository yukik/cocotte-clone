/*grunt-m2r*/

/**
 * 値のディープコピーを行う
 * 
 * 日付以外にコンストラクタを使用したオブジェクトを含む事はできません
 * 
 * @method cp
 * @param  {Mixed} val
 * @return {Mixed}
 */
function cp (val) {
  if (val === null ||
      val === void 0 ||
      typeof val === 'string' ||
      typeof val === 'number' ||
      typeof val === 'boolean' ||
      typeof val === 'function') {
    return val;
  }

  var constructor = Object.getPrototypeOf(val).constructor;

  if (constructor === RegExp) {
    var att = String(val).slice(val.source.length + 2);
    return new RegExp(val.source, att);
  }

  if (constructor === Date) {
    return new Date(val.getTime());
  }

  var self = this;

  // 循環参照対策
  var idx = self.obj1.indexOf(val);
  if (~idx) {
    return self.obj2[idx];
  }

  var rtn = constructor === Array ? [] : {};
  this.obj1.push(val);
  this.obj2.push(rtn);

  if (constructor === Array) {
    val.forEach(function(x) {
      rtn.push(self.cp(x));
    });

  } else {
    Object.keys(val).forEach(function(x){
      rtn[x] = self.cp(val[x]);
    });

  }
  return rtn;
}

function clone (val) {
  var self = {
    cp: cp,
    obj1: [], // 自己参照対策
    obj2: []
  };
  return self.cp(val);
}

module.exports = exports = clone;
/*grunt-m2r*/
/*
 * Copyright(c) 2014 Yuki Kurata <yuki.kurata@gmail.com>
 * MIT Licensed
 */

/**
 * 値のディープコピーを行う
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

/**
 * それぞれのディープコピー
 * @method single
 * @param  {Mixed} val
 * @return {Mixed}
 */
function single (val) {
  var self = {
    cp: cp,
    obj1: [], // 自己参照対策
    obj2: []
  };
  return self.cp(val);
}

/**
 * 純粋なオブジェクトかどうか
 * @method isPureObject
 * @param  {Mixed}     value
 * @return {Boolean}
 */
function isPureObject (value) {
  return typeof value === 'object' &&
    value !== null &&
    Object.getPrototypeOf(value).constructor === Object;
}

/**
 * オブジェクトのマージ
 * @method merge
 * @param  {Object} target
 * @param  {String} key
 * @param  {Mixed} value
 * @param  {Array} obj1
 * @param  {Array} obj2
 * @return {Object}
 */
function merge (target, key, value, obj1, obj2) {
  var idx = obj2.indexOf(value);
  if (~idx) {
    target[key] = obj1[idx];
    return target;
  }
  var purepure = isPureObject(target[key]) && isPureObject(value);
  if (!purepure) {
    target[key] = value;
    return target;
  }
  obj1.push(target[key]);
  obj2.push(value);
  Object.keys(value).forEach(function(k){
    if(k in target[key]) {
      merge (target[key], k, value[k], obj1, obj2);
    } else {
      target[key][k] = value[k];
    }
  });
  return target;
}

/**
 * 配列の連結
 * @method cloneArray
 * @param  {Array} params
 * @return {Array}
 */
function cloneArray (params) {
  var rtn = [];
  var len = params.length;
  for(var i = 0; i < len; i++) {
    rtn = rtn.concat(single(params[i]));
  }
  return rtn;
}

/**
 * オブジェクトのマージ
 * @method cloneObject
 * @param  {Array}    params
 * @return {Object}
 */
function cloneObject (params) {
  var rtn = single(params[0]);
  var len = params.length;
  var tmp;
  var obj1;
  var obj2;
  for(var i = 1; i < len; i++) {
    tmp = single(params[i]);
    obj1 = [rtn];
    obj2 = [tmp];
    var keys = Object.keys(tmp);
    for(var j = 0; j< keys.length; j++) {
      var key = keys[j];
      merge(rtn, key, tmp[key], obj1, obj2);
    }
  }
  return rtn;
}

/**
 * (exports)
 * すべての引数をディープコピー
 * @method clone
 * @return {Mixed}
 */
function clone () {
  var len = arguments.length;

  // 引数無し
  if (len === 0) {
    return void 0;
  }

  // 単数の複製
  if (len === 1) {
    return single(arguments[0]);
  }

  var params = [].slice.call(arguments);

  // 全てオブジェクトの場合はマージする
  var allObject = params.every(function (p) {return isPureObject(p);});
  return allObject ? cloneObject(params) : cloneArray(params);
}

module.exports = exports = clone;

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
  var self = this;
  var rtn;
  var Ctor = Object.getPrototypeOf(val).constructor;

  // 循環参照対策
  var idx = self.obj1.indexOf(val);
  if (~idx) {
    return self.obj2[idx];
  }

  if (Ctor === Boolean || Ctor === Number || Ctor === String) {
    rtn = new Ctor(val.valueOf());
  } else if (Ctor === RegExp || Ctor === Date) {
    rtn = new Ctor(val);
  } else if (val instanceof Error) {
    rtn = new Ctor(val.message);
  }

  if (rtn) {
    self.obj2.push(rtn);
    self.obj1.push(val);
    return rtn;
  }

  rtn = Ctor === Array ? [] : {};

  self.obj2.push(rtn);
  self.obj1.push(val);

  if (Ctor === Array) {
    val.forEach(function(x) {
      rtn.push(self.cp(x));
    });

  } else {
    self.cp2 (val, rtn);

  }
  return rtn;
}

function cp2 (val, rtn) {
  var self = this;
  var proto = Object.getPrototypeOf(val);
  var names = Object.getOwnPropertyNames(val);
  
  if (Object.setPrototypeOf) {
    Object.setPrototypeOf(rtn, proto);
  } else {
    rtn.__proto__ = proto;
  }
  names.forEach(function(name){
    var pd = Object.getOwnPropertyDescriptor(val, name);
    if ('value' in pd) {
      var idx = self.obj1.indexOf(pd.value); // 循環参照対策
      pd.value = ~idx ? self.obj2[idx] : self.cp(pd.value);
    }
    Object.defineProperty(rtn, name, pd);
  });

  if (!Object.isExtensible(val)) {
    Object.preventExtensions(rtn);
  }
}

/**
 * それぞれのディープコピー
 * @method single
 * @param  {Mixed} val
 * @return {Mixed}
 */
function single (val) {
  var self = {
    cp : cp,
    cp2: cp2,
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
 * @param  {Mixed}  value
 * @param  {Array}  obj1
 * @param  {Array}  obj2
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
    var len2 = keys.length;
    for(var j = 0; j < len2; j++) {
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
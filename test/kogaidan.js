(function(global){
"use strict";
if (Object.clone) return;
if (!Object.create || 'valueOf' in Object.create(null)){
    return new Error('ECMAScript 5 needed');
}


var slice                       = Array.prototype.slice,
    isArray                     = Array.isArray,
    defineProperty              = Object.defineProperty,
    getPrototypeOf              = Object.getPrototypeOf,
    getOwnPropertyNames         = Object.getOwnPropertyNames,
    getOwnPropertyDescriptor    = Object.getOwnPropertyDescriptor,
    hasOwnProperty              = Object.prototype.hasOwnProperty,
    toString                    = Object.prototype.toString;
/* descriptor factory */
var noEnum = function(v){   
    return {
        value:v,
        enumerable:false,
        writable:true,
        configurable:true
    };
};
var isPrimitive = (function(types){
    return function isPrimitive(o){ 
        return typeof(o) in types || o === null
    }
})({
    'null':1, 'undefined':1, 'boolean':1, 'number':1, 'string':1
});
var isFunction = function isFunction(o){
    return typeof(o) === 'function';
        /* toString.call(o) === '[object Function]'; */
};

/* return as is, shallow or deep -- primitives + function */
[Boolean, Number, String, Function].forEach(function (cf){
    defineProperty(cf.prototype, 'clone', noEnum(function clone(deep){
        return this.valueOf();
    }));
});

/* deep copy by new */
[Date, RegExp].forEach(function (cf){
    defineProperty(cf.prototype, 'clone', noEnum(function clone(deep){
        return deep ? new this.constructor(this) : this
    }));
});




/* general-purpose clone */
var cloneObject = function clone(src, deep, noProto){
    if (isPrimitive(src)) return src;
    if (isArray(src) || isFunction(src)) return src.clone(deep, noProto);
    var proto = getPrototypeOf(src);
    if (proto){
        if (typeof(proto.cloneNode) === 'function')
            return src.cloneNode(deep);
        if (!noProto && hasOwnProperty.call(proto, 'clone')) 
            return proto.clone.call(src, deep, noProto);
    }
    /* faithfully copy each property */
    var dst = Object.create(proto);
    getOwnPropertyNames(src).forEach(function(k){
        var desc = getOwnPropertyDescriptor(src, k);
        if (desc){ /* maybe undefined on Android :( */
            /* getters and setters are not deep-copied */
            if (deep && 'value' in desc)
                desc.value = clone(src[k], deep, noProto);
            defineProperty(dst, k, desc);
        }else{
            dst[k] = clone(src[k], deep, noProto);
        }
    });
    return dst;
};
/* install methods */
defineProperty(Array.prototype, 'clone', noEnum(function clone(deep, noProto){
    return !deep ? slice.call(this)
        : this.map(function(elem){
            return cloneObject(elem, deep, noProto);
        });
}));
defineProperty(Object.prototype, 'clone', noEnum(function clone(deep){ 
    return cloneObject(this, deep, true);
}));
defineProperty(Object, 'isPrimitive', noEnum(isPrimitive));
defineProperty(Object, 'clone', noEnum(cloneObject));
/* if you want to 'deep-copy' the function, it would be like... */
/*
defineProperty(Function.prototype, 'clone', noEnum(function clone(deep){
    if (!deep) return this;
    var that   = this,
        cloned = function cloned(){ return that.apply(this, arguments) };
    if (that.prototype) cloned.prototype = cloneObject(that.prototype, false);
    return cloned;
}));
*/
})(this);
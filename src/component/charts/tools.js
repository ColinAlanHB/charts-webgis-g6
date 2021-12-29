
// 深拷贝
export function deepCopy(target) {
  // 缓存数组
  var _cache = [];

  function _deepCopy(_target) {
    // 过滤非对象类型和null
    if (typeof _target !== "object" || !_target) return _target;
    // 检查缓存，处理循环引用和相同引用
    for (var _i = 0, _len = _cache.length; _i < _len; _i++) {
      if (_target === _cache[_i].target) {
        return _cache[_i].copyTarget;
      }
    }
    // 分类处理
    var _res = null;
    switch (Object.prototype.toString.call(_target)) {
      case "[object Array]":
        // 数组
        _res = [];
        _addCache(_target, _res);
        _target.forEach(function (_v) {
          _res.push(_deepCopy(_v));
        });
        break;
      case "[object Object]":
        // 对象
        _res = {};
        _addCache(_target, _res);
        Object.keys(_target).forEach(function (_k) {
          _res[_k] = _deepCopy(_target[_k]);
        });
        break;
      case "[object Date]":
        // 日期
        _res = new Date(_target.valueOf());
        _addCache(_target, _res);
        break;
      case "[object RegExp]":
        // 正则
        var _pattern = _target.valueOf(),
          _attributes = "";
        _attributes += _pattern.global ? "g" : "";
        _attributes += _pattern.ignoreCase ? "i" : "";
        _attributes += _pattern.multiline ? "m" : "";
        _res = new RegExp(_pattern.source, _attributes);
        _addCache(_target, _res);
        break;
      case "[object Error]":
        // 报错
        _res = _target;
        _addCache(_target, _res);
        break;
      case "[object Map]":
        // Map
        _res = new Map();
        _addCache(_target, _res);
        _target.forEach(function (_v, _k) {
          _res.set(_deepCopy(_k), _deepCopy(_v));
        });
        break;
    }
    return _res;
  }

  function _addCache(_target, _copyTarget) {
    _cache.push({ target: _target, copyTarget: _copyTarget });
  }

  return _deepCopy(target);
}

// 对象合并
export function mergeObject(srcObj, distObj) {
  const toSting = Object.prototype.toString;

  if (toSting.call(srcObj) !== "[object Object]" || toSting.call(distObj) !== "[object Object]") {
    throw new Error("mergeObject: Arguments must be of type object");
  }

  let obj = deepCopy(srcObj);

  function merge(obj, target) {
    if (target !== null) {
      for (let key in target) {
        if (Object.prototype.hasOwnProperty.call(target, key)) {
          if (obj[key] && toSting.call(obj[key]) === toSting.call(target[key]) && typeof obj[key] === "object") {
            merge(obj[key], target[key]);
          } else {
            obj[key] = deepCopy(target[key]);
          }
        }
      }
    }
    return obj;
  }

  return merge(obj, distObj);
}



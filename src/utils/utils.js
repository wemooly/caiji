export function sSet(k, v) {
  try {
    sessionStorage.setItem(k, JSON.stringify(v));
  } catch (e) {}
}
export function sGet(k, v) {
  try {
    var v = sessionStorage.getItem(k);
    return v == null ? null : JSON.parse(v);
  } catch (e) {}
}

// 格式化事件  配合过滤器使用
export function formatTime(val) {
  var date = new Date(val);
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

export function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

export function getSplitString(str) {
  let arr = str.split(",");
  let resources = [];
  for (var i = 0; i < arr.length; i++) {
    let arr1 = arr[i].split(/\s+/);
    for (var j = 0; j < arr1.length; j++) {
      if (jQuery.trim(arr1[j]) != "") {
        resources.push(jQuery.trim(arr1[j]));
      }
    }
  }
  return resources;
}

// 图片转base64完成后返回reader对象
export function uploadImgToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {
      resolve(reader)
    }
    reader.onerror = reject
  })
}

//  项目拖拽
// export function x (file) {
//   return new Promise((resolve, reject) => {
//    const reader = new FileReader()
//    reader.readAsDataURL(file)
//    reader.onload = function () { 
//     resolve(reader)
//    }
//    reader.onerror = reject
//   })
//  }

//对象深拷贝 原生方法
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

// 合并对象
export function objectMerge(target, source) {
  /* Merges two  objects,
     giving the last one precedence */

  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach(property => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}

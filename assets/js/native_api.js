
/*判断客户端*/
function judgeClient() {
  let client = '';
  if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {  //判断iPhone|iPad|iPod|iOS
    client = 'iOS';
  } else if (/(Android)/i.test(navigator.userAgent)) {  //判断Android
    client = 'Android';
  } else {
    client = 'PC';
  }
  return client;
}

function callNativeFunction(method, param) {
  setTitle();
  // var url = 'jsbridge://edu/setCenterTitle?p=%7B%22text%22%3A%22%E9%B1%BC%E9%A5%BC%22%7D#2?title=aaa&desc=bbb&link=http%3A%2F%2Fwww.baidu.com';
  var url = 'jsbridge://edu/openAppPage?p=%7B%22url%22%3A%22tencentk12%3A%2F%2Fopenpage%2Fwebview%3F%26url%3Dhttps%253A%252F%252Ffudao.qq.com%252Fteacher.html%253F_bid%253D2379%2526_wv%253D1025%2526overlay%253D1%2526tid%253D1910715105%2526startTime%253D1571737878221%22%7D#14';

  var jsbridgeNode = document.createElement('iframe');
  var removeTimeStamp;
  jsbridgeNode.style.cssText = 'display:none;width:0px;height:0px;';
  jsbridgeNode.onerror = function(e) {
    //在 android 4.0-4.3 中,script节点的src赋值成jsbridge://ui/showDialog的形式会报错
    e.stopPropagation(); 
  }     

  if (judgeClient() == 'iOS') {
    /*
    ios 必须先赋值, 然后 append, 否者连续的 api调用会间隔着失败
    也就是 api1(); api2(); api3(); api4(); 的连续调用,
    只有 api1 和 api3 会真正调用到客户端
    */
    //jsbridgeNode.onload = failCallback;
    jsbridgeNode.src = url;
  }

  //201707有时候根元素没有appendChild
  var root = document.body || document.documentElement;
  root.appendChild && root.appendChild(jsbridgeNode);

  if (judgeClient() == 'Android') {
    /*
    android 这里必须先添加到页面, 然后再绑定 onload 和设置 src
    1. 先设置 src 再 append 到页面, 会导致在接口回调(callback)中嵌套调用 api会失败,
    iframe会直接当成普通url来解析
    2. 先设置onload 在 append , 会导致 iframe 先触发一次 about:blank 的 onload 事件

    */
    // jsbridgeNode.onload = failCallback;
    jsbridgeNode.src = url;
  }

  if (url.indexOf('mqqapi://') > -1 && judgeClient() == 'Android') {
    removeTimeStamp = 0;
  } else {
    removeTimeStamp = 500;
  }
  // android 捕获了iframe的url之后, 也是中断 js 进程的, 所以这里可以用个 setTimeout 0 来删除 iframe
  setTimeout(function() {
    jsbridgeNode &&
      jsbridgeNode.parentNode &&
      jsbridgeNode.parentNode.removeChild(jsbridgeNode);
  }, removeTimeStamp);

  //return method;
}

function setTitle() {  
  window.mqq.invoke('edu', "setCenterTitle",{text:"[四期]新高三数学秋季考前突击系统班(人教版)你好发件方房间爱咖啡",font:12,bold:0,color:0xFFC0CB});
}

function getCookie() {  
  return document.cookie;
}

function putValue(key, value) {
  localStorage.setItem(key, value);
}

function getValue(key) {
  return localStorage.getItem(key);
}

function clear() {
  localStorage.clear();
}

function removeValue(key) {
  localStorage.removeItem(key);
}

function addNumbers(a, b) {
  return a;
}

function callNativeFunction(currentCount) {
  var url = 'jsbridge://edu/setCenterTitle?p=%7B%22text%22%3A%22%E9%B1%BC%E9%A5%BC%22%7D#2?title=aaa&desc=bbb&link=http%3A%2F%2Fwww.baidu.com';
  // var iframe = document.createElement('iframe');
  // iframe.style.width = '1px';
  // iframe.style.height = '1px';
  // iframe.style.display = 'none';
  // iframe.src = url;
  // document.body.appendChild(iframe);
  // setTimeout(function() {
  //     iframe.remove();
  // }, 100);

  var jsbridgeNode = document.createElement('iframe');
  var removeTimeStamp;
  jsbridgeNode.style.cssText = 'display:none;width:0px;height:0px;';
  jsbridgeNode.onerror = function(e) {
    //在 android 4.0-4.3 中,script节点的src赋值成jsbridge://ui/showDialog的形式会报错
    e.stopPropagation(); 
  }     
  /*
  ios 必须先赋值, 然后 append, 否者连续的 api调用会间隔着失败
  也就是 api1(); api2(); api3(); api4(); 的连续调用,
  只有 api1 和 api3 会真正调用到客户端
  */
  //jsbridgeNode.onload = failCallback;
  jsbridgeNode.src = url;

  //201707有时候根元素没有appendChild
  var root = document.body || document.documentElement;
  root.appendChild && root.appendChild(jsbridgeNode);

  setTimeout(function() {
    jsbridgeNode &&
      jsbridgeNode.parentNode &&
      jsbridgeNode.parentNode.removeChild(jsbridgeNode);
  }, 500);

  return currentCount;
}

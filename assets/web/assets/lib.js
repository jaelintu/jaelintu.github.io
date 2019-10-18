function addNumbers(a, b) {
  return a + b;
}

function getFromJS() {
  var url = 'jsbridge://doAction?title=aaa&desc=bbb&link=http%3A%2F%2Fwww.baidu.com';
  var iframe = document.createElement('iframe');
  iframe.style.width = '1px';
  iframe.style.height = '1px';
  iframe.style.display = 'none';
  iframe.src = url;
  document.body.appendChild(iframe);
  setTimeout(function() {
      iframe.remove();
  }, 100);

  return '我是从js来的字符串';
}

function ajax(url, callback) {
  var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP")
  xhr.open("get", url, true);
  xhr.send();
  console.log(xhr)
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        var data = xhr.response;
        callback && callback(JSON.parse(data))
      }
    }
  }
}

; (function () {
  // 无new 实例化； $('content')  链式调用  $('.con').swiper().
  var jQuery = function (el) {
    return new jQuery.fn.init(el);
  }
  jQuery.fn = jQuery.prototype = {
    // $('')
    init: function (el) {
      if (!el) return this;
      if (typeof el === 'string') {
        var dom = document.querySelectorAll(el);
        for (var i = 0; i < dom.length; i++) {
          this.push(dom[i])
        }
      }
      return this; // 链式调用
    },
    push: [].push,
    swipe: function (fn) {
      for (var i = 0; i < this.length; i++) {
        // touches;  changedTouches
        this[i].addEventListener('touchstart', touchFn);
        this[i].addEventListener('touchend', touchFn);
      }
      var startx, starty, endx, endy;
      function touchFn(e) {
        var firstTouch = e.changedTouches[0];
        switch (e.type) {
          case 'touchstart':
            startx = firstTouch.pageX;
            starty = firstTouch.pageY;
            break;

          case 'touchend':
            endx = firstTouch.pageX;
            endy = firstTouch.pageY;

            if (Math.abs(endx - startx) > Math.abs(endy - starty) && startx - endx >= 25) {
              let dir = 'left'
              fn.call(this, e, dir)
            } else {
              let dir = 'right'
              fn.call(this, e, dir)
            }
            break;
        }
      }
      return this;
    },
    tap: function (fn) {
      for (var i = 0; i < this.length; i++) {
        this[i].addEventListener('touchstart', touchFn);
        this[i].addEventListener('touchend', touchFn);
      }
      var startTime, endTime;
      function touchFn(e) {
        var firstTouch = e.changedTouches[0];
        switch (e.type) {
          case 'touchstart':
            startTime = new Date() * 1;
            break;
          case 'touchend':
            endTime = new Date() * 1;
            if (endTime - startTime < 500) {
              fn.call(this, e)
            }
            break;
        }
      }
      return this;
    },
    longTap: function (handler) {
      for(var i = 0; i < this.length; i++) {
        this[i].addEventListener("touchstart", touchFn);
        this[i].addEventListener("touchmove", touchFn);
        this[i].addEventListener("touchend", touchFn);
      }
      var timerId;
      function touchFn(e) {
        switch (e.type) {
          case "touchstart":  //500ms之后执行
            timerId = setTimeout(function () {
              handler.call(this, e);
            }, 500)
            break;
          case "touchmove":
            //如果中间有移动也清除定时器
            clearTimeout(timerId)
            break;
          case "touchend":
            //如果在500ms之内抬起了手指，则需要清除定时器
            clearTimeout(timerId);
            break;
        }
      }
    },
  }

  // 打通作用域：
  jQuery.fn.init.prototype = jQuery.fn;
  window.$ = window.jQuery = jQuery;
})()
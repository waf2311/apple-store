(function() {
  function resize() {
    var baseFontSize = 100;
    var designWidth = 750; //设计稿的宽度
    var maxWidth = 540; //屏幕内容最大宽度，如果小于540px则全屏，大于则最大显示540居中
    var width = window.innerWidth <= maxWidth ? window.innerWidth : maxWidth;
    var currentFontSize = (width / designWidth) * baseFontSize;
    document.querySelector("html").style.fontSize = currentFontSize + "px";
    document.querySelector("html").style.maxWidth = maxWidth + "px";
    document.querySelector("html").style.margin = "0 auto";
    document.querySelector("html").style.minHeight = "100vh";
    document.querySelector("html").style.opacity = "1";
  }
  window.addEventListener("resize",resize)
  document.addEventListener("DOMContentLoaded", resize);
})();
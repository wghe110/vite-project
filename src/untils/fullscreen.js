// 全屏组件
export default {
  fullscreen(ele) {
    if (ele.requestFullscreen) {
      ele.requestFullscreen();
    } else if (ele.mozRequestFullScreen) {
      ele.mozRequestFullScreen();
    } else if (ele.webkitRequestFullscreen) {
      ele.webkitRequestFullscreen();
    } else if (ele.msRequestFullscreen) {
      ele.msRequestFullscreen();
    }
  },
  exitFullscreen() {
    if (document.exitFullScreen) {
      document.exitFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  },
  getFullscreenElement() {
    return (
      document.fullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullScreenElement ||
      document.webkitFullscreenElement || null
    );
  },
  isFullScreen() {
    return !!(
      document.fullscreenElement ||
      document.mozFullScreen ||
      document.webkitIsFullScreen ||
      document.webkitFullScreen ||
      document.msFullScreen
    )
  }
}
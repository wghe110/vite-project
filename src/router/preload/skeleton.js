export default {
  show() {
    const eleSkeleton = document.getElementById("skeleton");
    if (eleSkeleton) {
      const dis = window.getComputedStyle(eleSkeleton, null).getPropertyValue('display')
      if (dis === 'none') { eleSkeleton.style.display = "flex" }
    }
  },
  hide() {
    const eleSkeleton = document.getElementById("skeleton");
    if (eleSkeleton) {
      const dis = window.getComputedStyle(eleSkeleton, null).getPropertyValue('display')
      if (dis === 'flex') { eleSkeleton.style.display = "none" }
    }
  }
}
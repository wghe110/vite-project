export const formatLockedTime = (time) => {
  let str = "";
  const d = parseInt(time / (3600 * 24));
  let h = parseInt((time % (3600 * 24)) / 3600);
  let m = parseInt((time % 3600) / 60);
  let s = (time % 3600) % 60;
  if (d > 0) {
    str = `${str}${d}天`;
  }
  if (h > 0) {
    str = `${str}${h}小时`;
  }
  if (m > 0) {
    str = `${str}${m}分钟`;
  }
  if (s > 0) {
    str = `${str}${s}秒`;
  }
  return str;
}
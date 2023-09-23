import createLoading from "./loading";
import loadUserInfo from "./load-user-info";
import loadDicts from "./dict";
import initHeaderAndAside from "./init-header-aside";
import initToken from "./init-token";
import loadMenus from "./init-menus";

export default (to, from, next) => {
  // 判断是否隐藏头部和左侧菜单
  initHeaderAndAside(to);
  // 判断是否携带token
  initToken(to);

  // 加载必须资源(菜单/必须字典/用户信息...)，阻塞资源
  const loading = createLoading();
  loading.show();

  Promise.all([loadUserInfo(), loadDicts(), loadMenus()])
    .then(next)
    .finally(() => {
      loading.hide();
      console.log('=====preload')
    });
} 
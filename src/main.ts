import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Nav from '@/components/Nav.vue';
import Layout from '@/components/Layout.vue';
import Icon from '@/components/Icon.vue';

Vue.config.productionTip = false;

Vue.component('Nav', Nav);
Vue.component('Layout', Layout);
Vue.component('Icon', Icon);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

window.onload = function () {
  setTimeout(function () {
    window.scrollTo(0, 200);
  }, 0);
}
let lastTouchEnd = 0  //更新手指弹起的时间
document.documentElement.addEventListener("touchstart", function (event) {
  //多根手指同时按下屏幕，禁止默认行为
  if (event.touches.length > 1) {
    event.preventDefault();
  }
});
document.documentElement.addEventListener("touchend", function (event) {
  const now = (new Date()).getTime();
  if (now - lastTouchEnd <= 300) {
    //当两次手指弹起的时间小于300毫秒，认为双击屏幕行为
    event.preventDefault();
  }else{ // 否则重新手指弹起的时间
    lastTouchEnd = now;
  }
}, false);
//阻止双指放大页面
document.documentElement.addEventListener("gesturestart", function (event) {
  event.preventDefault();
});
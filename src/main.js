import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from '@/router/router.js';
Vue.use(ElementUI);

//1.导入路由管理器
import VueRouter from 'vue-router';
// * 特殊处理： 为 路由管理器 的 push 方法 做一次改造，加入 catch 异常处理
let oldPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (url) {
  return oldPush.call(this, url).catch(err => err);
}

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#abb')

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import '@/theme/theme-ff5940/index.css'
import api from './http/index'
import i18n from './i18n'
import store from './store'
import global from '@/utils/global'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
import '@/assets/iconfont/iconfont.css'

//Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(api)

Vue.prototype.global = global

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  // 采用render方式渲染
  render: h => h(App)
  /*components: { App },
  template: '<App/>'*/
})

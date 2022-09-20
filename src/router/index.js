import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import NotFound from '@/views/Error/404'
import Home from '@/views/Home'
import Intro from '@/views/Intro/Intro'
import Cookies from "js-cookie"
import api from '@/http/api'
import store from '@/store'
import { getIFramePath, getIFrameUrl } from '@/utils/iframe'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: Home,
      children: [
        { 
          path: '', 
          component: Intro, 
          name: '系统介绍',
          meta: {
            icon: 'fa fa-home fa-lg',
            index: 0
          }
        }
      ]
    },
    {
      path: '/login',
      name: '登录',
      component: Login
    },
    {
      path: '/404',
      name: 'notFound',
      component: NotFound
    }
  ]
})

//导航守卫
router.beforeEach((to, from, next) => {
  //在登录界面成功登录后，会把用户信息保存在session中
  //存在时间为会话生命周期，页面关闭即失效
  let token = Cookies.get('token')
  let userName = sessionStorage.getItem('user');
  if (to.path === '/login') {
    //如果访问的是登录界面，且用户会话信息存在，代表已登录过，则跳转到主页
    if(token) {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    if(!token) {
      next({ path: '/login' })
    } else {
      addDynamicMenuAndRoutes(userName, to, from)
      next()
    }
  }
})

/**
 * 加载动态菜单和路由
 */
function addDynamicMenuAndRoutes(userName, to, from) {
  //处理IFrame嵌套页面
  handleIFrameUrl(to.path)
  if(store.state.app.menuRouteLoaded) {
    console.log('动态菜单和路由已经存在.')
    return
  }
  api.menu.findNavTree({'userName':userName})
  .then(res => {
    //添加动态路由
    let dynamicRoutes = addDynamicRoutes(res.data)
    //处理静态组件绑定路由
    handleStaticComponent(router, dynamicRoutes)
    router.addRoute(router.options.routes)
    //保存加载状态
    store.commit('menuRouteLoaded', true)
    //保存菜单树
    store.commit('setNavTree', res.data)
  }).then(res => {
    api.user.findPermissions({'name':userName}).then(res => {
      //保存用户权限标识集合
      store.commit('setPerms', res.data)
    })
  })
  .catch(function(res) {

  })
}

/**
 * 处理路由到本地直接指定页面组件的情况
 */

/**
 * 处理IFrame嵌套页面
 */
function handleIFrameUrl(path) {
  //嵌套页面，保存iframeUrl到store，供IFrame组件读取展示
  let url = path
  let length = store.state.iframe.iframeUrls.length
  for(let i=0; i<length; i++) {
    let iframe = store.state.iframe.iframeUrls[i]
    if(path != null && path.endsWith(iframe.path)) {
      url = iframe.url
      store.commit('setIFrameUrl', url)
      break
    }
  }
}

/**
 * 添加动态路由
 * @param {*} menuList 
 * @param {*} routes 
 */
function addDynamicRoutes (menuList = [], routes = []) {
  var temp = []
  for (var i = 0; i < menuList.length; i++) {
    if (menuList[i].children && menuList[i].children.length >= 1) {
      temp = temp.concat(menuList[i].children)
    } else if (menuList[i].url && /\S/.test(menuList[i].url)) {
       menuList[i].url = menuList[i].url.replace(/^\//, '')
       // 创建路由配置
       var route = {
         path: menuList[i].url,
         component: null,
         name: menuList[i].name,
         meta: {
           icon: menuList[i].icon,
           index: menuList[i].id
         }
       }
      let path = getIFramePath(menuList[i].url)
      if (path) {
        // 如果是嵌套页面, 通过iframe展示
        route['path'] = path
        route['component'] = resolve => require([`@/views/IFrame/IFrame`], resolve)
        // 存储嵌套页面路由路径和访问URL
        let url = getIFrameUrl(menuList[i].url)
        let iFrameUrl = {'path':path, 'url':url}
        store.commit('addIFrameUrl', iFrameUrl)
      } else {
      try {
        // 根据菜单URL动态加载vue组件，这里要求vue组件须按照url路径存储
        // 如url="sys/user"，则组件路径应是"@/views/sys/user.vue",否则组件加载不到
        let array = menuList[i].url.split('/')
        let url = ''
        for(let i=0; i<array.length; i++) {
            url += array[i].substring(0,1).toUpperCase() + array[i].substring(1) + '/'
        }
        url = url.substring(0, url.length - 1)
        route['component'] = resolve => require([`@/views/${url}`], resolve)
      } catch (e) {}
    }
    routes.push(route)
  }
}
if (temp.length >= 1) {
  addDynamicRoutes(temp, routes)
} else {
  console.log('动态路由加载...')
  console.log(routes)
  console.log('动态路由加载完成.')
}
return routes
}

export default router
import Vue from 'vue' //引入vue模块
import App from './App.vue' //引入App顶级组件
import router from './router' //引入路由

import './assets/css/reset.css' // 引入重置样式
import './assets/css/common.css' //引入公用样式

import ElementUI from 'element-ui'; //引入element JS文件
import 'element-ui/lib/theme-chalk/index.css'; //引入css样式文件



import echarts from 'echarts'  //引入Echarts，



Vue.prototype.$echarts = echarts  //定义为全局变量


Vue.use(ElementUI)//注册element组件

//路由拦截
router.beforeEach((to,from,next)=>{
  //获取令牌
  const token = window.localStorage.getItem('ls-token:',token)
  //如果有令牌放行
  if(token){
    next()
  }else{//没有令牌
    //如果去的是登录 直接放行
    if(to.path==='/login'){
      next()
    }else{
      next({path:'/login'})//如果去的是其他页面，直接跳转到登录页面。
    }
  }
})

Vue.config.productionTip = false // 阻止生产提示
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

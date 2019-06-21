import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [

    { path: '/', redirect: '/login' },//根目录重定向到/login
    { path: '/login', component: () => import('./views/Login/Login.vue') },//登录页面
    {
      path: '/home',
      component: () => import('./views/Home/Home.vue'),//父组件
      redirect: '/home/systeminfo',//默认为系统信息页面
      children: [
        //系统
        {
          path: '/home/systeminfo',
          component: () => import('./views/SystemInfo/SystemInfo.vue'),
        },
        //账号管理
        {
          path: '/home/accountmanage',
          component: () => import('./views/AccountManage/AccountManage.vue'),
        },
        //添加账号
        {
          path: '/home/accountadd',
          component: () => import('./views/AccountAdd/AccountAdd.vue'),
        },
        //密码修改
        {
          path: '/home/PasswordModify',
          component: () => import('./views/PasswordModify/PasswordModify.vue'),
        },
        //商品管理
        {
          path: '/home/goodsmanage',
          component: () => import('./views/GoodsManage/GoodsManage.vue'),
        },
        //添加商品
        {
          path: '/home/goodsadd',
          component: () => import('./views/GoodsAdd/GoodsAdd.vue'),
        },
        //销售统计
        {
          path: '/home/selltotal',
          component: () => import('./views/SellTotal/SellTotal.vue'),
        },
        //进货统计
        {
          path: '/home/stocktotal',
          component: () => import('./views/StockTotal/StockTotal.vue'),
        },
        //库存管理
        {
          path: '/home/inventoryManagement',
          component: () => import('./views/InventoryManagement/InventoryManagement.vue'),
        },
        //添加库存
        {
          path: '/home/inventoryAdd',
          component: () => import('./views/InventoryAdd/InventoryAdd.vue'),
        },
        //销售列表
        {
          path: '/home/saleslist',
          component: () => import('./views/SalesList/SalesList.vue'),
        },
        //商品出库
        {
          path: '/home/outboundGoods',
          component: () => import('./views/OutboundGoods/OutboundGoods.vue'),
        },
        //商品退货
        {
          path: '/home/goodsreturn',
          component: () => import('./views/GoodsReturn/GoodsReturn.vue'),
        },
        //个人中心
        {
          path:'/home/personal',
          component:()=>import('./views/Personal/Personal.vue')
        }
      ]
    }
  ]
})

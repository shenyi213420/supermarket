<template>
  <div class="leftnav">
    <h3 class="title">
      <i class="el-icon-bangzhu"></i>
      玄甲超市管理系统
    </h3>

    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      unique-opened
      background-color="#272f2f"
      router
      active-text-color="#fff"
    >
      <!-- 商品管理 -->
      <el-submenu :index="(i+1) + ''" v-for="(nav,i) in LeftNav" :key="i">
        <template slot="title">
          <i class="el-icon-star-on"></i>
          <span>{{nav.navTitle}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            :index="nvaTitle.path"
            v-for="(nvaTitle,i) in nav.children"
            :key="i"
          >{{nvaTitle.navSubTitle}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
//引入请求
import { getRole } from "@/api/account";
export default {
  data() {
    return {
      LeftNav: []
    };
  },
  created() {
    getRole()
      .then(res => {
        //接收参数
        let { role } = res;
        //定义导航数据
        let nav = [
          {
            iconCls: "el-icon-bangzhu",
            navTitle: "商品管理",
            role: ["超级管理员", "普通员工"],
            children: [
              { path: "/home/goodsmanage", navSubTitle: "商品管理" },
              { path: "/home/goodsadd", navSubTitle: "添加商品" }
            ]
          },
          {
            iconCls: "el-icon-price-tag",
            navTitle: "进货管理",
            role: ["超级管理员"],
            children: [
              { path: "/home/inventoryManagement", navSubTitle: "库存管理" },
              { path: "/home/inventoryAdd", navSubTitle: "添加库存" }
            ]
          },
          {
            iconCls: "el-icon-edit-outline",
            navTitle: "出货管理",
            role: ["超级管理员"],
            children: [
              { path: "/home/saleslist", navSubTitle: "销售列表" },
              { path: "/home/outboundGoods", navSubTitle: "商品出库" },
              { path: "/home/goodsreturn", navSubTitle: "商品退货" }
            ]
          },
          {
            iconCls: "el-icon-s-claim",
            navTitle: "统计管理",
            role: ["超级管理员"],
            children: [
              { path: "/home/selltotal", navSubTitle: "销售统计" },
              { path: "/home/stocktotal", navSubTitle: "进货统计" }
            ]
          },
          {
            iconCls: "el-icon-key",
            navTitle: "账号管理",
            role: ["超级管理员"],
            children: [
              { path: "/home/accountmanage", navSubTitle: "账号管理" },
              { path: "/home/accountadd", navSubTitle: "添加账号" },
              { path: "/home/PasswordModify", navSubTitle: "密码修改" }
            ]
          },
          {
            iconCls: "el-icon-setting",
            navTitle: "系统管理",
            role: ["超级管理员", "普通员工"],
            children: [{ path: "/home/systeminfo", navSubTitle: "系统信息" }]
          }
        ]
        //过滤导航
        this.LeftNav = nav.filter(v=>v.role.includes(role))
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style lang="less">
.leftnav {
  .title {
    color: #fff;
    font-size: 16px;
    margin: 20px;
    text-align: center;
  }
  .el-menu {
    border-right: none;
    .el-submenu {
      color: #6d7692;
      .el-submenu__title {
        color: #a6acc0;
        & > i {
          color: #6d7692;
        }
      }
      .el-menu-item {
        color: #6d7692;
      }
    }
  }
}
</style>

<template>
  <div class="home">
    <el-container>
      <el-aside width="200px">
        <LeftNav></LeftNav>
      </el-aside>
      <el-container>
        <el-header>
            <RigthHeader></RigthHeader>
        </el-header>
        <el-main>
          <!-- 出口 -->
          <router-view></router-view>
        </el-main>
        <el-footer>
            <RightFooter></RightFooter>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
//引入自定义组件
//左侧菜单栏
import LeftNav from "@/components/LeftNav/LeftNav.vue";
//右侧头部
import RigthHeader from "@/components/RigthHeader/RigthHeader.vue"
//右侧也叫
import RightFooter  from "@/components/RightFooter/RightFooter.vue"
export default {
  //   注册组件
  components: {
    LeftNav,
    RigthHeader,
    RightFooter
  }
};
</script>

<style lang="less">
.home {
  height: 100%;
  // 整个容器
  .el-container {
    height: 100%;
    //左侧
    .el-aside {
      background-color: #272f2f;
    }
    //右侧
    .el-container {
      // 上
      .el-header {
        background-color:#323738;
        color: green;
        line-height: 60px;
        padding: 0;
      }
      // 中
      .el-main {
        background-color: #fff;
      }
      // 下
      .el-footer {
        background-color: #fff;
        color: red;
        line-height: 60px;
      }
    }
  }
}
</style>

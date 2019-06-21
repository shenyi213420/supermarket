<template>
  <div class="personal">
    <el-card class="box-card">
      <!-- 标题 -->
      <div slot="header" class="clearfix">
        <h2>个人中心</h2>
      </div>
      <div class="content">
        <p>用户ID：{{userInfo.id}}</p>
        <p>账号：{{userInfo.account}}</p>
        <p>密码：{{userInfo.password}}</p>
        <p>用户组：{{userInfo.userGroup}}</p>
        <p>创建时间：{{userInfo.ctime | filterCtime}}</p>
      </div>
    </el-card>
  </div>
</template>

<script>
// 引入时间处理模块
import moment from "moment";
//引入axios
import axios from "axios";
//引入get请求函数
import { getInfo } from "@/api/account";
export default {
  data() {
    return {
      userInfo: []
    };
  },
  methods: {
    getUserInfo(){
      getInfo()
        .then(res=>{
          //接收后端相应数据
          let {data} = res;
          this.userInfo = data[0]
        })
        .catch(err=>{
          console.log(err);
          
        })
    }
  },
  created() {
    this.getUserInfo();
  },
  filters: {
    filterCtime(ctime) {
      return moment(ctime).format('YYYY-MM-DD HH:mm:ss');
    }
  }
};
</script>

<style lang="less">
.personal {
  .el-card {
    .el-card__header {
      background: #f3f3f3;
    }
    .content{
      font-size: 20px;
      line-height: 60px;
    }
  }
}
</style>


<template>
  <div class="right-header">
    <el-row>
      <el-col :span="12">
        <!-- 左侧 -->
        <h1 class="title">
          <i class="el-icon-bangzhu"></i>玄甲超市管理系统
        </h1>
      </el-col>
      <!-- 右侧 -->
      <el-col :span="12">
        <el-row>
          <el-col :span="18">
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                {{userName}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="personal">个人中心</el-dropdown-item>
                <el-dropdown-item command="logout">退出系统</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
          <el-col :span="6">
            <div class="avatar">
              <img src="../../assets/images/avatar.jpg" alt>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getInfo } from "@/api/account";
export default {
  data(){
    return{
      userName:''
    }
  },
  methods: {
    handleCommand(command) {
      if (command === "logout") {
        //退出系统
        //清除token
        window.localStorage.removeItem("ls-token:");
        //弹出提示信息
        this.$message({
          type: "success",
          message: "退出系统成功"
        });
        //调到登录界面
        setTimeout(() => {
          this.$router.push("/login");
        }, 1500);
      } else if (command === "personal") {
        //个人中心
        this.$router.push('/home/personal')
      }
    },
    getUserInfo() {
      //发送请求
      getInfo()
        .then(res => {
          //接收数据
          let {data} = res;
          //获取账号
          let {account} = data[0];
          this.userName = account;//渲染
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.getUserInfo()
  }
};
</script>

<style lang="less">
.right-header {
  & > .el-row {
    .el-col {
      .title {
        color: #fff;
        text-indent: 10px;
        letter-spacing: 1px;
        font-size: 18px;
      }
    }
    .el-col:last-child {
      .el-row {
        .el-col:first-child {
          text-align: right;
          .el-dropdown-link {
            color: #fff;
          }
        }
        .el-col:last-child {
          .avatar {
            width: 50px;
            height: 50px;
            background: green;
            margin-left: 20px;
            margin-top: 5px;
            border-radius: 50%;
            img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
        }
      }
    }
  }
}
</style>

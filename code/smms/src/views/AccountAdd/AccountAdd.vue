<template>
  <div class="acount-add">
    <el-card class="box-card">
      <!-- 标题 -->
      <div slot="header" class="clearfix">
        <h2>添加账号</h2>
      </div>
      <!-- 表单验证 -->
      <el-form
        :model="accountForm"
        status-icon
        :rules="rules"
        ref="accountForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="account">
          <el-input type="text" v-model="accountForm.account" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="accountForm.password" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="accountForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="活动区域" prop="userGroup">
          <el-select v-model="accountForm.userGroup" placeholder="请选择用户组">
            <el-option label="超级管理员" value="超级管理员"></el-option>
            <el-option label="普通员工" value="普通员工"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm()">添加</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 引入工具函数
import { pwdReg } from "@/utils/reg"
import {accountAdd} from '@/api/account'
export default {
  data() {
    //自定义验证表单
    const checkPwd = (rule, value, callback) => {
      //获取输入值的长度
      let len = value.length;
      if (value === "") {
        callback(new Error("请输入密码")); //非空
      } else if (len < 3 || len > 6) {
        callback(new Error("长度为3~6位")); //长度判断
      } else if (!pwdReg(value)) {
        callback(new Error("密码只能为数字或字母")); //正则判断
      } else {
        //一致性判断
        if (this.accountForm.checkPass !== "") {
          this.$refs.accountForm.validateField("checkPass");
        }
        callback();
      }
    };
    const confirmPwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码")); //非空
      } else if (value !== this.accountForm.password) {
        callback(new Error("两次密码输入不一致"));
      } else {
        callback();
      }
    };
    return {
      //双向绑定表单
      accountForm: {
        account: "",
        password: "",
        checkPass: "",
        userGroup: ""
      },
      //表单验证
      rules: {
        //账号
        account: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        //密码
        password: [{ required: true, validator: checkPwd, trigger: "blur" }],
        //确认密码
        checkPass: [{ required: true, validator: confirmPwd, trigger: "blur" }],
        //用户组
        userGroup: [
          { required: true, message: "请选择用户组", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    submitForm() {
      //获取整个表单调用方法
      this.$refs.accountForm.validate(valid => {
        // 所有前端验证通过 valid:true, 否则valid: false
        if (valid) {
          //获取参数
          let params = {
            account: this.accountForm.account,
            password: this.accountForm.password,
            userGroup: this.accountForm.userGroup
          };
          //发送给后端
          accountAdd(params)
            .then(res => {
              
              //获取数据
              let {code,msg} = res;
              //判断
              if(code===0){
                this.$message({
                  type:'success',
                  message:msg
                })
                //跳转到账号管理
                this.$router.push('/home/accountmanage')
              }else if(code===1){
                this.$message.error(msg)
              }
      
            })
            .catch(err => {
              console.log(err);
              
            });
        }
      });
    }
  }
};
</script>

<style lang="less">
.acount-add {
  .el-card {
    .el-card__header {
      background: #f3f3f3;
    }
    .el-card__body {
      .el-form {
        .el-form-item {
          .el-form-item__content {
            .el-input {
              width: 340px;
            }
          }
        }
      }
    }
  }
}
</style>

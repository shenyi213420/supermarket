<template>
  <div class="login">
    <!-- 登录表单容器 -->
    <div class="login-wrap">
      <h3 class="title">
        <i class="el-icon-user-solid"></i>
        玄甲超市管理系统用户登陆
      </h3>
      <el-form
        :model="loginForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="account">
          <el-input type="text" v-model="loginForm.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="loginForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { pwdReg } from "@/utils/reg.js";
import {checkLogin} from '@/api/login'
export default {
  //数据
  data() {
    //自定义验证方式
    const checkPwd = (rule, value, callback) => {
      //获取value的长度
      let len = value.length;
      if (value === "") {
        callback(new Error("密码不能为空")); //非空验证
      } else if (len < 3 || len > 6) {
        callback(new Error("密码长度为3~6位")); //长度验证
      } else if (!pwdReg(value)) {
        callback(new Error("只可以输入字母数字")); //正则验证
      } else {
          //确认密码不为空，触发一致性验证
          if(this.loginForm.checkPass !== ''){
              this.$refs.loginForm.validateField('checkPass')//触发确认密码一致性验证
          }
        callback();
      }
    };
    const confirmPwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码")); //非空验证
      }else if(value !== this.loginForm.password){
          callback(new Error('两次密码不一致'))//密码一致性验证
      }else{
          
          callback()
      }
    };
    return {
      //登陆表单数据
      loginForm: {
        account: "", //账号
        password: "", //密码
        checkPass: "" //再次确认密码
      },
      //表单验证规则
      rules: {
        account: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, validator: checkPwd, trigger: "blur" } //自定义验证
        ],
        checkPass: [
          { required: true, validator: confirmPwd, trigger: "blur" } //自定义验证
        ]
      }
    };
  },
  //方法
  methods: {
    submitForm() {
      // 页面中使用ref属性声明的标签dom，可以使用 this.$refs.ref属性的值 获取
      // element内置了验证方法 validate 传入一个函数 函数中的变量如果是true就验证通过 否则验证不通过
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          //接收参数
          let params = {
              account:this.loginForm.account,
              password:this.loginForm.password
          }
          //把数据发送给后端
         checkLogin(params)
          .then(res=>{
            //接收参数
            let {code,msg,token} = res;
            if(code===0){
              //  console.log('令牌:', token)
                //存入本地存储
                window.localStorage.setItem('ls-token:',token)
              this.$message({
                type:'success',
                message:msg
              })
              //跳转到页面
              this.$router.push('/home')
            }else if(code===1){
              this.$message.error(msg)
            }
            
          })
          .catch(err=>{
            console.log(err);
            
          })
        } else {
          console.log("验证不通过");
          return false;
        }
      });
    },
    resetForm() {
        // 获取el-form表单 调用内置重置方法
      this.$refs.loginForm.resetFields();
    }
  }
};
</script>

<style lang="less">
@import "./Login.less";
</style>

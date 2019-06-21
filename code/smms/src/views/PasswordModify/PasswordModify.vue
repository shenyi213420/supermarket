<template>
  <div class="password-modify">
    <el-card class="box-card">
      <!-- 标题 -->
      <div slot="header" class="clearfix">
        <h2>修改账号密码</h2>
      </div>
      <!-- 表单 -->
      <el-form
        :model="revampData"
        status-icon
        :rules="rules"
        ref="revampData"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="原密码" prop="pass">
          <el-input type="password" v-model="revampData.pass" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="新密码" prop="checkPass">
          <el-input type="password" v-model="revampData.checkPass" autocomplete="off"></el-input>
        </el-form-item>

          <el-form-item label="新密码" prop="checkPwd">
          <el-input type="password" v-model="revampData.checkPwd" autocomplete="off"></el-input>
        </el-form-item>
       
        <el-form-item>
          <el-button type="primary" @click="submitForm()">修改</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
//引入工具hanshu
import {pwdReg} from '@/utils/reg'
import local from '@/utils/local'
import {oldPassword, revampPass} from '@/api/account'
export default {
    data(){
        //自定义验证表单
        const password = (rule,value,callback)=>{
          if(value===''){
            console.log(value);
            
            callback(new Error('密码不能为空'))
          }else{
            //发送请求给后端
            oldPassword({oldPass:value})
            .then(res=>{
              //接收参数
              let {code,msg} = res;
              if(code===1){
               callback(new Error(msg))
              }else if(code===0){
                callback()
              }
              
            })
            .catch(err=>{
              console.log(err);
              
            })
          }
        }

        const checkPaasword = (rule, value, callback)=>{
          let len = value.length
            if(value ===''){
                callback(new Error('密码不能为空'))
            }else if(value===this.revampData.pass){
              callback(new Error('新密码不能与旧密码一致'))
            }else if(!pwdReg(value)){
              callback(new Error('密码只能是数字或字母'))
            }else if(len<3 || len>6){
              callback(new Error('密码长度为3~6'))
            }else{
                // 一致性验证
                if(this.revampData.checkPwd !== ''){
                    this.$refs.revampData.validateField("checkPwd")
                }
                callback()
            }
        }
        const checkPsd = (rule, value, callback)=>{
            if(value === ''){
                callback(new Error('密码不能为空'))
            }else if(value !== this.revampData.checkPass){
                callback(new Error('两次密码输入不一致'))
            }else{
                callback()
            }
        }
        return {
            //双向表单数据
            revampData:{
                pass:'',
                checkPass:'',
                checkPwd:''
            },
            //r自定义验证
            rules:{
                pass:[
                    { required: true, validator: password, trigger: 'change' },
                ],
                checkPass:[
                    { required: true, validator: checkPaasword, trigger: 'change' }
                ],
                checkPwd:[
                    { required: true, validator: checkPsd, trigger: 'change' }
                ]
            }
        }
    },
    methods:{
        submitForm(){
            //获取整个表单，调用验证方法
            this.$refs.revampData.validate((valid) => {
          if (valid) {
            //发送密码修改请求
            revampPass({rawPass:this.revampData.checkPass})
              .then(res=>{
                //接收后端相应数据
                let {code,msg} = res;
                if(code===0){
                  this.$message({
                    type:'success',
                    message:msg
                  })
                  //清楚token
                  local.remove('ls_token')
                  //跳转到登陆页面
                  this.$router.push('/login')
                }else if(code===1){
                  this.$message.error(msg)
                }
                
              })
              .catch(err=>{
                console.log(err);
                
              })
          } else {
            console.log('前端验证不通过');
            return false;
          }
        });
        }
    }
};
</script>

<style lang="less">
.password-modify {
  .el-card {
    .el-card__header {
      background: #f3f3f3;
    }
     .el-card__body{
      .el-form{
        .el-form-item{
          .el-form-item__content{
            .el-input{
              width: 340px;
            }
          }
        }
      }
    }
  }
}
</style>

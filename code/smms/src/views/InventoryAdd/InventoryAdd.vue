<template>
  <div class="inventory-add">
    <el-card class="box-card">
      <!-- 标题 -->
      <div slot="header" class="clearfix">
        <h2>商品入库</h2>
      </div>

      <!-- 表单 -->
      <el-form
        :model="goodsForm"
        :rules="rules"
        ref="goodsForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="商品条形码" prop="barCode">
          <el-input v-model="goodsForm.barCode"></el-input>
        </el-form-item>

        <el-form-item label="数量" prop="name">
          <el-input v-model="goodsForm.name"></el-input>
          <p>计重商品单位为千克</p>
        </el-form-item>

        <el-form-item label="进价" prop="price">
          <el-input v-model="goodsForm.price"></el-input>
          <span style="margin-left: 10px;font-size: 14px;color:#838181">元</span>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">入库</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //数据
      goodsForm: {
          barCode:'',
          name:'',
          price:''

      },
      //自定义验证
      rules: {}
    };
  },
  methods: {
    submitForm() {}
  }
};
</script>

<style lang="less">
.inventory-add {
  .el-card {
    .el-card__header {
      background: #f3f3f3;
    }
    .el-card__body {
      .el-form {
        .el-form-item {
          .el-input {
            width: 260px;
          }
          p {
            font-size: 14px;
            color: #838181;
          }
        }
      }
    }
  }
}
</style>

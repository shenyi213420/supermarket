<template>
  <div class="goods-return">
    <el-card class="box-card">
      <!-- 标题 -->
      <div slot="header" class="clearfix">
        <h2>销售数据统计</h2>
      </div>

      <!-- 商品查询 -->
      <div class="goodsinquire">
        <span>订单号：</span>
        <el-input v-model="input"></el-input>
        <el-button type="success">查询</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
    data(){
        return{
            input:''
        }
    }
};
</script>

<style lang="less">
.goods-return {
  .el-card {
    .el-card__header {
      background: #f3f3f3;
    }
    .el-card__body{
        .goodsinquire{
            .el-input{
                width: 240px;
            }
            .el-button{
                margin-left:10px;
                padding:10px;
            }
        }
    }
  }
}
</style>

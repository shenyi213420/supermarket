<template>
  <div class="outbound-goods">
    <el-card class="box-card">
      <!-- 标题 -->
      <div slot="header" class="clearfix">
        <h2>商品销售</h2>
      </div>

      <!-- 表单 -->
      <el-form :model="goodsForm" :rules="rules" ref="goodsForm" label-width="100px">
        <el-form-item label="商品条形码" prop="barCode">
          <el-input v-model="goodsForm.barCode"></el-input>
        </el-form-item>

        <el-form-item label="数量" prop="num">
          <el-input v-model="goodsForm.num"></el-input>
          <span style="margin-left:10px;color:#818385">计重商品单位为千克</span>
        </el-form-item>

        <el-button type="success">加入订单</el-button>
        <span style="font-size:16px;color:#67C23A">重新出库</span>
      </el-form>

      <!-- 表格 -->
      <el-table :data="tableData" stripe>
        <el-table-column prop="goodsName" label="商品名称"></el-table-column>

        <el-table-column prop="goodsNum" label="数量"></el-table-column>

        <el-table-column prop="unitprice" label="单价(元)"></el-table-column>

        <el-table-column prop="totalprice" label="总价(元)"></el-table-column>

        <el-table-column prop="saleprice" label="优惠总价(元)"></el-table-column>
      </el-table>
      <p>
        总价：
        <span>0元</span>
        <span>优惠：0元</span>
        <span>小计：0元</span>
      </p>

      <!-- 会员卡 -->
      <div class="clubcard">
        <p>会员卡号</p>
        <el-input v-model="input"></el-input>
      </div>

      <el-button type="success">确认提交</el-button>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
      goodsForm: {
        barCode: "",
        num: ""
      },
      rules: {},
      tableData: [
        {
          goodsName: "11", //商品名称
          goodsNum: "11", //数量
          unitprice: "11", //单价(元)
          totalprice: "11", //总价(元)
          saleprice: "11" //优惠总价(元)
        }
      ]
    };
  }
};
</script>

<style lang="less">
.outbound-goods {
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
        .el-button {
          margin-left: 100px;
          margin-right: 10px;
        }
      }
      p {
        font-size: 14px;
        color: #818385;
        margin-top: 20px;
        padding-bottom: 10px;
        border-bottom: 1px solid #ccc;
      }
      .clubcard {
        margin: 10px 0;
        p {
          color: #606266;
          font-size: 14px;
          border: none;
        }
        .el-input {
          width: 240px;
        }
      }
    }
  }
}
</style>

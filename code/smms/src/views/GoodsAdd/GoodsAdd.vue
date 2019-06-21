<template>
  <div class="goods-add">
    <el-card class="box-card">
      <!-- 标题 -->
      <div slot="header" class="clearfix">
        <h2>添加商品</h2>
      </div>
      <!-- 表单 -->
      <el-form :model="goodsAdd" :rules="rules" ref="goodsAdd" label-width="100px">
        <!-- 所属分类 -->
        <el-form-item label="所属分类" prop="categoryThe">
          <el-select v-model="goodsAdd.categoryThe" placeholder="----   选择分类   ----">
            <el-option label="全部分类" value="全部分类"></el-option>
            <el-option label="电子类" value="电子类"></el-option>
            <el-option label="食品类" value="食品类"></el-option>
            <el-option label="烟酒类" value="烟酒类"></el-option>
            <el-option label="服装类" value="服装类"></el-option>
            <el-option label="蔬菜类" value="蔬菜类"></el-option>
          </el-select>
        </el-form-item>

        <!-- 商品条形码 -->
        <div class="shape">
          <el-form-item label="商品条形码" prop="barCode">
            <el-input v-model="goodsAdd.barCode"></el-input>
            <el-button type="success">生成条形码</el-button>
          </el-form-item>
        </div>

        <!-- 商品名称 -->
        <el-form-item label="商品名称" prop="goodsName">
          <el-input v-model="goodsAdd.goodsName"></el-input>
        </el-form-item>

        <!-- 商品进价 -->
        <el-form-item label="商品进价" prop="goodsPurchasing">
          <el-input v-model="goodsAdd.goodsPurchasing" @blur="autoPrice"></el-input>
        </el-form-item>

        <!-- 商品售价 -->
        <el-form-item label="商品售价" prop="goodsNum">
          <el-input v-model="goodsAdd.goodsNum"></el-input>
        </el-form-item>

        <!-- 市场价 -->
        <el-form-item label="市场价" prop="marketPrice">
          <el-input v-model="goodsAdd.marketPrice"></el-input>
          <p>默认市场价为售价的1.2倍</p>
        </el-form-item>

        <!-- 入库数量 -->
        <el-form-item label="入库数量" prop="storageNum">
          <el-input v-model="goodsAdd.storageNum"></el-input>
          <p>计重商品单位为千克</p>
        </el-form-item>

        <!-- 商品重量 -->
        <el-form-item label="商品重量" prop="goodsWeight">
          <el-input v-model="goodsAdd.goodsWeight"></el-input>
        </el-form-item>

        <!-- 商品单位 -->
        <el-form-item label="商品单位" prop="goodsUnit">
          <el-input v-model="goodsAdd.goodsUnit"></el-input>
        </el-form-item>

        <!-- 会员优惠 -->
        <el-form-item label="会员优惠" prop="discounts">
          <el-radio-group v-model="goodsAdd.discounts">
            <el-radio label="享受"></el-radio>
            <el-radio label="不享受"></el-radio>
          </el-radio-group>
        </el-form-item>

        <!-- 是否促销 -->
        <el-form-item label="是否促销" prop="promotion">
          <el-radio-group v-model="goodsAdd.promotion">
            <el-radio label="启用"></el-radio>
            <el-radio label="禁用"></el-radio>
          </el-radio-group>
        </el-form-item>

        <!-- 商品简介 -->
        <el-form-item label="商品简介" prop="goodsBrief">
          <el-input type="textarea" v-model="goodsAdd.goodsBrief"></el-input>
        </el-form-item>
        <!-- 提交按钮 -->
        <el-form-item>
          <el-button type="primary" @click="submitForm()">添加</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { goodsAdd } from "@/api/goods";
export default {
  data() {
    return {
      //表单数据
      goodsAdd: {
        categoryThe: "", //所属分类
        barCode: "", //条形码
        goodsName: "", //商品名称
        goodsPurchasing: "", //商品进价
        goodsNum: "", //商品售价
        marketPrice: "", //市场价
        storageNum: "", //入库数量
        goodsWeight: "", //商品重量
        goodsUnit: "", //商品单位
        discounts: "", //会员优惠
        promotion: "", //是否促销
        goodsBrief: "" //商品简介
      },
      //表单验证
      rules: {
        categoryThe: [
          { required: true, message: "内容不能为空", trigger: "change" }
        ], //所属分类
        barCode: [{ required: true, message: "内容不能为空", trigger: "blur" }], //条形码
        goodsName: [
          { required: true, message: "内容不能为空", trigger: "blur" }
        ], //商品名称
        goodsNum: [
          { required: true, message: "内容不能为空", trigger: "blur" }
        ], //商品售价
        marketPrice: [
          { required: true, message: "内容不能为空", trigger: "blur" }
        ], //市场价
        goodsPurchasing: [
          { required: true, message: "内容不能为空", trigger: "blur" }
        ], //商品进价
        storageNum: [
          { required: true, message: "内容不能为空", trigger: "blur" }
        ], //入库数量
        goodsWeight: [
          { required: true, message: "内容不能为空", trigger: "blur" }
        ], //商品重量
        goodsUnit: [
          { required: true, message: "内容不能为空", trigger: "blur" }
        ], //商品单位
        discounts: [
          { required: true, message: "内容不能为空", trigger: "change" }
        ], //会员优惠
        promotion: [
          { required: true, message: "内容不能为空", trigger: "change" }
        ], //是否促销
        goodsBrief: [
          { required: true, message: "内容不能为空", trigger: "blur" }
        ] //商品简介
      }
    };
  },
  methods: {
    //自动补全售价和市场价
    autoPrice() {
      this.goodsAdd.goodsNum = (
        parseFloat(this.goodsAdd.goodsPurchasing) * 1.2
      ).toFixed(2);
      this.goodsAdd.marketPrice = (
        parseFloat(this.goodsAdd.goodsPurchasing) * 1.5
      ).toFixed(2);
    },
    submitForm() {
      //获取整个表单，调用验证方法
      this.$refs.goodsAdd.validate(valid => {
        if (valid) {
          //收集参数
          let params = {
            categoryThe: this.goodsAdd.categoryThe, //所属分类
            barCode: this.goodsAdd.barCode, //条形码
            goodsName: this.goodsAdd.goodsName, //商品名称
            goodsPurchasing: this.goodsAdd.goodsPurchasing, //商品进价
            goodsNum: this.goodsAdd.goodsNum, //商品售价
            marketPrice: this.goodsAdd.marketPrice, //市场价
            storageNum: this.goodsAdd.storageNum, //入库数量
            goodsWeight: this.goodsAdd.goodsWeight, //商品重量
            goodsUnit: this.goodsAdd.goodsUnit, //商品单位
            discounts: this.goodsAdd.discounts, //会员优惠
            promotion: this.goodsAdd.promotion, //是否促销
            goodsBrief: this.goodsAdd.goodsBrief //商品简介
          };
          //发送请求给后台
          goodsAdd(params)
            .then(res => {
              //接收参数
              let { code, msg } = res;
              if (code === 0) {
                this.$message({
                  type: "success",
                  message: msg
                });
                //跳转到商品管理
                this.$router.push("/home/goodsmanage");
              } else if (code === 1) {
                this.$message.error(msg);
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less">
.goods-add {
  .el-card {
    .el-card__header {
      background: #f3f3f3;
    }
    .el-card__body {
      .el-form {
        .el-form-item {
          p {
            font-size: 14px;
            color: rgb(148, 144, 144);
          }
          .el-form-item__content {
            .el-input {
              width: 260px;
              margin-right: 20px;
            }
            .el-textarea {
              .el-textarea__inner {
                resize: none;
                width: 400px;
              }
            }
          }
        }
      }
    }
  }
}
</style>

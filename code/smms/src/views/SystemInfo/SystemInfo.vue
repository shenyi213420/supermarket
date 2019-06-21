<template>
  <div class="system-info">
    <el-card class="box-card">
      <!-- 标题 -->
      <div slot="header" class="clearfix">
        <h2>卡片名称</h2>
      </div>
      <!-- 警告提示 -->
      <div class="warning">
        <el-alert title="商品总数：5。已经销售得总金额:890.00。库存商品总价：1235.82" type="success" show-icon></el-alert>
        <el-alert title="导入数据" type="info" show-icon></el-alert>
      </div>
      <!-- 表格 -->
      <el-row :gutter="30">
        <!-- 左侧表格 -->
        <el-col :span="12">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <h3>销售排行</h3>
            </div>
            <el-table :data="sellData" style="width: 100%">
              <el-table-column prop="goodsName" label="商品名称" width="460"></el-table-column>
              <el-table-column prop="goodsNum" label="销量" width="80"></el-table-column>
            </el-table>
          </el-card>
        </el-col>
        <!-- 右侧表格 -->
        <el-col :span="12">
            <el-card class="box-card">
            <div slot="header" class="clearfix">
              <h3>缺货商品</h3>
            </div>
            <el-table :data="lackData" style="width: 100%">
              <el-table-column prop="goodsNema" label="商品名称" width="460"></el-table-column>
              <el-table-column prop="lackNum" label="销量" width="80"></el-table-column>
            </el-table>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sellData: [
        {
          goodsName: "霸王洗发露",
          goodsNum: "100"
        },
        {
          goodsName: "哇哈哈",
          goodsNum: "20"
        },
        {
          goodsName: "爽歪歪",
          goodsNum: "50"
        }
      ],
      lackData:[
          {
              goodsNema:'遗失的记忆',
              lackNum:'2'
          },
           {
              goodsNema:'沈一',
              lackNum:'3'
          }
      ]
    };
  }
};
</script>

<style lang="less">
.system-info {
  .el-card {
    .el-card__header {
      background: #f3f3f3;
    }
    .warning {
      .el-alert {
        margin: 20px auto;
      }
    }
  }
}
</style>

<template>
  <div class="sales-list">
    <el-card class="box-card">
      <!-- 标题 -->
      <div slot="header" class="clearfix">
        <h2>销售明细</h2>
      </div>

      <div class="time">
        <span>开始时间：</span>
        <el-input v-model="input"></el-input>

        <span>结束时间：</span>
        <el-input v-model="input"></el-input>

         <span>(格式：2012-01-01)</span>

      </div>

      <!-- 分类 -->
      <div class="search">
        <!-- 关键字 -->
        <span>关键字：</span>
        <el-input v-model="input"></el-input>

        <!-- 按钮 -->
        <span>商品名称，订单号，客户名字，会员卡号</span>
        <el-button type="success" size="mini">查询</el-button>

       
      </div>

      <!-- 表格 -->
      <el-table :data="goodsData" stripe>
        <el-table-column prop="orderNum" label="订单号"></el-table-column>

        <el-table-column prop="goodsName" label="商品名称"></el-table-column>


        <el-table-column prop="goodsNum" label="数量"></el-table-column>

        <el-table-column prop="actualPrice" label="实际售价"></el-table-column>

        <el-table-column prop="promotion" label="优惠(促销/会员)"></el-table-column>

        <el-table-column prop="refund" label="退款"></el-table-column>

        <el-table-column prop="sellTime" label="销售时间"></el-table-column>


      </el-table>

      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[1, 3, 5, 7,10]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "", //关键字
      value: "", //下拉框
      options: [
        {
          value: "1",
          label: "黄金糕"
        },
        {
          value: "2",
          label: "黄金糕"
        }
      ],
      //表格数据
      goodsData: [
        {
          orderNum: "12156465", //订单号
          goodsName: "海之言", //商品名称
          goodsNum: "2.00", //数量
          actualPrice: "300", //实际售价
          promotion: "2.40元/无", //优惠
          refund: "无退款", //退款
          sellTime: "2019-06-17", //销售时间
        },
        {
          orderNum: "156798754561", //订单号
          goodsName: "小茗同学", //商品名称
          goodsNum: "2.00", //数量
          actualPrice: "300", //实际售价
          promotion: "2.40元/无", //优惠
          refund: "无退款", //退款
          sellTime: "2019-06-17", //销售时间
        },
        {
          orderNum: "18798321546" ,//订单号
          goodsName: "青柠薯片", //商品名称
          goodsNum: "2.00", //数量
          actualPrice: "300", //实际售价
          promotion: "2.40元/无", //优惠
          refund: "无退款", //退款
          sellTime: "2019-06-17", //销售时间
        }
      ],
      //   分页
      currentPage: 1, //当前页
      total: 40, //总条目数
      pageSize: 3 //每页条数
    };
  },
  methods: {
    //编辑
    handleEdit() {},
    //删除
    handleDelete() {},
    //每页条数改变
    handleSizeChange() {},
    //当前页条数改变
    handleCurrentChange() {}
  }
};
</script>

<style lang="less">
.sales-list {
  .el-card {
    .el-card__header {
      background: #f3f3f3;
    }
    .el-card__body {
      .search {
        padding-bottom: 20px;
        border-bottom: 2px solid #ccc;
        .el-input {
          width: auto;
        }
        span {
          font-size: 14px;
          margin-left: 10px;
        }
        .el-button {
          margin-left: 10px;
          padding: 7px 10px 5px;

          span {
            margin: auto;
            vertical-align: middle;
          }
        }
      }
      .el-table {
        .el-table__body-wrapper {
          .el-table__row {
            .el-table_1_column_10 {
              .cell {
                .el-button {
                  padding: 5px;
                }
              }
            }
          }
        }
      }
      .el-pagination {
        text-align: center;
        margin-top: 15px;
      }
      .time {
          margin-bottom:20px;
        .el-input {
          width: auto;
        }
        span {
          font-size: 14px;
          margin-left: 10px;
        }
      }
    }
  }
}
</style>

<template>
    <div class="inventory-management">
           <el-card class="box-card">
      <!-- 标题 -->
      <div slot="header" class="clearfix">
        <h2>库存管理</h2>
      </div>

      <!-- 分类 -->
      <div class="search">
        <!-- 分类 -->
        <span>分类：</span>
        <el-select v-model="value" placeholder="--- 选择分类 ---">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>

        <!-- 关键字 -->
        <span>关键字：</span>
        <el-input v-model="input"></el-input>

        <!-- 按钮 -->
        <span>商品名称，条形码</span>
        <el-button type="success" size="mini">查询</el-button>
      </div>

      <!-- 表格 -->
      <el-table :data="goodsData" stripe>
        <el-table-column prop="barCode" label="商品条形码"></el-table-column>

        <el-table-column prop="goodsName" label="商品名称"></el-table-column>

        <el-table-column prop="price" label="进价"></el-table-column>

        <el-table-column prop="storage" label="入库"></el-table-column>

        <el-table-column prop="repertory" label="库存"></el-table-column>

        <el-table-column prop="sold" label="已售"></el-table-column>

        <!-- 操作 -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">
              <i class="el-icon-edit"></i>
            </el-button>

            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">
              <i class="el-icon-delete"></i>
            </el-button>
          </template>
        </el-table-column>
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
          barCode: "12156465", //商品条形码
          goodsName: "海之言", //商品名称
          price: "7", //进价
          storage: "10", //入库
          repertory: "5", //库存
          sold: "3", //已售
        },
         {
          barCode: "422", //商品条形码
          goodsName: "爽歪歪", //商品名称
          price: "12", //进价
          storage: "100", //入库
          repertory: "50", //库存
          sold: "30", //已售
        },
        {
          barCode: "422", //商品条形码
          goodsName: "爽歪歪", //商品名称
          price: "12", //进价
          storage: "100", //入库
          repertory: "50", //库存
          sold: "30", //已售
        },
        {
          barCode: "422", //商品条形码
          goodsName: "爽歪歪", //商品名称
          price: "12", //进价
          storage: "100", //入库
          repertory: "50", //库存
          sold: "30", //已售
        },
      ],
      //   分页
      currentPage: 1, //当前页
      total: 40 ,//总条目数
      pageSize:3,//每页条数
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
.inventory-management {
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
      .el-pagination{
          text-align: center;
          margin-top:15px;
      }
    }
  }
}
</style>


<template>
  <div class="goods-manage">
    <el-card class="box-card">
      <!-- 标题 -->
      <div slot="header" class="clearfix">
        <h2>商品管理</h2>
      </div>

      <!-- 分类 -->
      <div class="search">
        <el-form size="small" :inline="true" :model="searchForm" class="demo-form-inline">
          <el-form-item label="所属分类" prop="category">
            <el-select v-model="searchForm.categoryThe" placeholder="请选择分类">
              <el-option label="全部分类" value="全部分类"></el-option>
              <el-option label="电子类" value="电子类"></el-option>
              <el-option label="食品类" value="食品类"></el-option>
              <el-option label="烟酒类" value="烟酒类"></el-option>
              <el-option label="服装类" value="服装类"></el-option>
              <el-option label="蔬菜类" value="蔬菜类"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="关键字">
            <el-input v-model="searchForm.bacCode" placeholder="商品名称或条形码"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- 表格 -->
      <el-table :data="goodsData" stripe @selection-change="selectChange" ref="goodsData">
        <el-table-column type="selection" width="55"></el-table-column>

        <el-table-column prop="barCode" label="商品条形码"></el-table-column>

        <el-table-column prop="goodsName" label="商品名称"></el-table-column>

        <el-table-column prop="categoryThe" label="所属分类"></el-table-column>

        <el-table-column prop="goodsNum" label="售价(元)"></el-table-column>

        <el-table-column prop="promotion" label="是否促销"></el-table-column>

        <el-table-column label="日期">
          <template slot-scope="scope">{{ scope.row.ctime | filterCtime }}</template>
        </el-table-column>

        <!-- 操作 -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.row.id)">
              <i class="el-icon-edit"></i>
            </el-button>

            <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">
              <i class="el-icon-delete"></i>
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 批量删除 -->
      <div style="margin-top: 20px">
        <el-button @click="batches()" type="danger" size="small">批量删除</el-button>
        <el-button @click="deselect()" type="primary" size="small">取消选择</el-button>
      </div>

      <!-- 回填表单 -->
      <el-dialog title="商品管理" :visible.sync="visible" width="420px">
        <el-form :model="EditorFrom" style="width:316px" :rules="rules" ref="EditorFrom">
          <el-form-item label="商品条形码" label-width="120px" prop="barCode">
            <el-input v-model="EditorFrom.barCode" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="商品名称" label-width="120px" prop="goodsName">
            <el-input v-model="EditorFrom.goodsName" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="所属分类" prop="categoryThe" label-width="120px">
            <el-select v-model="EditorFrom.categoryThe" placeholder="请选择分类">
              <el-option label="全部分类" value="全部分类"></el-option>
              <el-option label="电子类" value="电子类"></el-option>
              <el-option label="食品类" value="食品类"></el-option>
              <el-option label="烟酒类" value="烟酒类"></el-option>
              <el-option label="服装类" value="服装类"></el-option>
              <el-option label="蔬菜类" value="蔬菜类"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="售价(元)" label-width="120px" prop="goodsNum">
            <el-input v-model="EditorFrom.goodsNum" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="是否促销" prop="promotion" label-width="120px">
            <el-radio-group v-model="EditorFrom.promotion">
              <el-radio label="促销"></el-radio>
              <el-radio label="不促销"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="visible = false">取 消</el-button>
          <el-button type="primary" @click="saveEdit">确 定</el-button>
        </div>
      </el-dialog>

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
//引入时间模块
import moment from "moment";
import {fuzzySearch} from '@/api/goods'
//引入封装的请求函数
import {
  goodsList,
  goodsDel,
  goodsBatchDel,
  goodsEditor,
  goodsEdit
} from "@/api/goods";
export default {
  data() {
    return {
      //表格数据
      goodsData: [],
      searchForm: {
        categoryThe:'',//所属分类
        bacCode:''//商品条形码
      }, //查询表单
      //   分页
      currentPage: 1, //当前页
      total: 0, //总条目数
      pageSize: 3, //每页条数
      idArr: [], //定义空数组保存批量删除
      visible: false, //模块框
      editId: "",
      EditorFrom: {
        barCode: "",
        goodsName: "",
        categoryThe: "",
        goodsNum: "",
        promotion: ""
      }, //编辑
      rules: {
        barCode: [{ required: true, message: "内容不能为空", trigger: "blur" }],
        goodsName: [
          { required: true, message: "内容不能为空", trigger: "blur" }
        ],
        categoryThe: [
          { required: true, message: "内容不能为空", trigger: "change" }
        ],
        goodsNum: [
          { required: true, message: "内容不能为空", trigger: "blur" }
        ],
        promotion: [
          { required: true, message: "内容不能为空", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    //查询
    search(){

        //调用分页函数
        this.goodsListAdd()
        // //获取参数
        // let params = {
        //   categoryThe :this.searchForm.categoryThe,
        //   bacCode :this.searchForm.bacCode
        // }

        // //发送请求给后端
        // fuzzySearch(params)
        //   .then(res=>{
            
        //     let {data} = res;

        //     //渲染到页面
        //     this.goodsData = data;
            
            
        //   })
        //   .catch(err=>{
        //     console.log(err);
            
        //   })
        
    },
    //编辑
    handleEdit(id) {
      this.visible = true;
      //保留id
      this.editId = id;
      goodsEditor({ id })
        .then(res => {
          let { data } = res;
          //回填表单
          (this.EditorFrom.barCode = data[0].barCode),
            (this.EditorFrom.goodsName = data[0].goodsName),
            (this.EditorFrom.categoryThe = data[0].categoryThe),
            (this.EditorFrom.goodsNum = data[0].goodsNum),
            (this.EditorFrom.promotion = data[0].promotion);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //保存编辑
    saveEdit() {
      //调用表单验证
      this.$refs.EditorFrom.validate(valid => {
        if (valid) {
          //隐藏模态框
          this.visible = false;
              //收集参数
              let params = {
                barCode: this.EditorFrom.barCode,
                goodsName: this.EditorFrom.goodsName,
                categoryThe: this.EditorFrom.categoryThe,
                goodsNum: this.EditorFrom.goodsNum,
                promotion: this.EditorFrom.promotion,
                id: this.editId
              };
              goodsEdit(params)
                .then(res => {

                  //接收参数
                  let { code, msg } = res;
                  if (code === 0) {
                    this.$message({
                      type: "success",
                      message: msg
                    });
                    this.goodsListAdd();
                  } else if (code === 1) {
                    this.$message.error(msg);
                  }
                })
                .catch(err => {
                  console.log(err);
                });
        } else {
          return false;
        }
      });
    },
    //删除
    handleDelete(id) {
      this.$confirm("确定删除此条数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          goodsDel({ id })
            .then(res => {
              //获取数据
              let { code, msg } = res;
              if (code === 0) {
                this.$message({
                  type: "success",
                  message: msg
                });
                this.goodsListAdd();
              } else if (code === 1) {
                this.$message.error(msg);
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //批量删除
    batches() {
      console.log(this.idArr.length);
      
      if (!this.idArr.length) {
        this.$message.error("请选择以后再操作！你是不是傻?");
        return;
      }
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //收集参数
          let params = { id: this.idArr };
          goodsBatchDel(params)
            .then(res => {
              //接收参数
              let { code, msg } = res;
              if (code === 0) {
                this.$message({
                  type: "success",
                  message: msg
                });
                this.goodsListAdd();
              } else if (code === 1) {
                this.$message.error(msg);
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //表格选中状态改变事件
    selectChange(selectData) {
      this.idArr = selectData.map(v => v.id); //循环选中的数据，吧每一项的id取出来放入一个数组
    },
    //取消选择
    deselect() {
      this.$refs.goodsData.clearSelection();
    },
    //每页条数改变
    handleSizeChange(pageSize) {
      (this.pageSize = pageSize), this.goodsListAdd();
    },
    //当前页条数改变
    handleCurrentChange(currentPage) {
      (this.currentPage = currentPage), this.goodsListAdd();
    },
    //封装分页
    goodsListAdd() {
      //获取参数
      let params = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
         categoryThe :this.searchForm.categoryThe,
          bacCode :this.searchForm.bacCode
      };

      goodsList(params)
        .then(res => {
          let { data, total } = res;
          //渲染到页面
          this.goodsData = data;
          this.total = total;
          //边界判断
          if (!data.length && this.currentPage !== 1) {
            this.currentPage--;
            this.goodsListAdd();
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  filters: {
    filterCtime(ctime) {
      return moment(ctime).format("YYYY-MM-DD");
    }
  },
  created() {
    this.goodsListAdd();
  }
};
</script>

<style lang="less">
.goods-manage {
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
    }
  }
}
</style>

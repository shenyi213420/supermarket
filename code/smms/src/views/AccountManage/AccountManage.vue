<template>
  <div class="acount-manage">
    <el-card class="box-card">
      <!-- 标题 -->
      <div slot="header" class="clearfix">
        <h2>账号管理</h2>
      </div>
      <!-- 表格 -->
      <el-table
        ref="accountTable"
        :data="accountTable"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="selectChange"
      >
        >
        <!-- 选择框 -->
        <el-table-column type="selection" width="55"></el-table-column>

        <el-table-column prop="account" label="用户名称"></el-table-column>

        <el-table-column prop="userGroup" label="用户组" show-overflow-tooltip></el-table-column>

        <el-table-column label="日期">
          <template slot-scope="scope">{{ scope.row.ctime | filterCtime }}</template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.row.id)">
              <i class="el-icon-edit"></i>
              编辑
            </el-button>

            <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">
              <i class="el-icon-delete"></i>
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 批量删除和取消 -->

      <div style="margin-top: 20px">
        <el-button @click="batches()" size="small" type="danger">批量删除</el-button>
        <el-button @click="deselect()" type="primary" size="small">取消选择</el-button>
      </div>

      <!-- 分页 -->
      <div class="page">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[1, 3, 5, 10]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>

      <!-- 回填表单 -->
      <el-dialog title="修改账号" :visible.sync="visible" width="420px">
        <el-form :model="editForm" style="width:316px" :rules="rules" ref="editForm">
          
          <el-form-item label="账号" prop="account" label-width="120px">
            <el-input v-model="editForm.account" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="用户组" prop="userGroup" label-width="120px">
            <el-select v-model="editForm.userGroup" placeholder="请选择用户组">
              <el-option label="超级管理员" value="超级管理员"></el-option>
              <el-option label="普通员工" value="普通员工"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="visible = false">取 消</el-button>
          <el-button type="primary" @click="saveEdit">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
//引入时间处理格式
import moment from "moment"
import {accounteditor, accounteditm, accountdel, accountedit, batchdelete, accountpage} from '@/api/account'
export default {
  data() {
    return {
      accountTable: [],
      currentPage: 1, //当前页
      total: 0, //数据总条数
      pageSize: 3, //每页条数
      editForm: {
        //修改表单
        account: "",
        userGroup: ""
      },
      visible: false, //修改模态框的显示和隐藏状态
      editId: "",
      delIdArr: [], //批量删除ID数组
      rules: {
        //验证规则
        account: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //编辑
    handleEdit(id) {
      this.visible = true;
      //保留ID 这个id就是修改数据的id
      this.editId = id;
      accounteditor({id})
        .then(res => {
          //接收参数
          let { data } = res;
          //回填表单
          (this.editForm.account = data[0].account),
            (this.editForm.userGroup = data[0].userGroup);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //保存编辑
    saveEdit() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          //隐藏模态框
          this.visible = false;
          //收集参数发送给后端
          let params = {
            account: this.editForm.account,
            userGroup: this.editForm.userGroup,
            id: this.editId
          };
          //发送请求给后台
          accountedit(params)
            .then(res => {

              //接收后端相应数据
              let { code, msg } = res;
              if (code === 0) {
                this.$message({
                  type: "success",
                  message: msg
                });
                //刷新列表
                this.getAccountsByPage();
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
      this.$confirm("确定删除此账号吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          accountdel({id})
            .then(res => {
              //接收后端相应数据
              let { code, msg } = res;
              //判断
              if (code === 0) {
                this.$message({
                  type: "success",
                  message: msg
                });
                this.getAccountsByPage();
              } else if (code === 1) {
                this.$message.error(msg);
              }
              //刷新列表
              this.getAccountsByPage();
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
      // 如果没选中
      if (!this.delIdArr.length) {
        this.$message.error("请选择以后再操作！你是不是傻?");
        return;
      }
      this.$confirm("确定批量删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
         batchdelete({idArr: this.delIdArr})
            .then(res => {
              //接收参数
              let { code, msg} = res;

              if (code === 0) {
               
                this.$message({
                  type: "success",
                  message: msg
                });
                this.getAccountsByPage();
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
            message: "已取消批量删除"
          });
        });
    },
    //分页
    getAccountsByPage() {
      //收集参数
      let params = {
        pageSize: this.pageSize,
        currentPage: this.currentPage
      };
     accountpage(params)
        .then(res => {
          //接收参数
          let { total, data } = res;
          //渲染到页面
          this.total = total;
          this.accountTable = data;
          //边界判断
          if (!data.length && this.currentPage !== 1) {
            this.currentPage--;
            this.getAccountsByPage();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //取消选择
    deselect() {
      this.$refs.accountTable.clearSelection();
    },
    //表格选中状态改变事件
    selectChange(selectData) {
      this.delIdArr = selectData.map(v => v.id); //循环选中的数据，吧每一项的id取出来放入一个数组
    },
    //每页条数改变
    handleSizeChange(pageSize) {
      this.pageSize = pageSize; //把用户选择的每页条数获取，赋值给data中的pageSize
      this.getAccountsByPage();
    },
    //当前页改变
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage; //把用户选择的当前页获取，赋值给data中的currentPage
      this.getAccountsByPage();
    }
    //请求所有账号数据
    // getAccount() {
    //   this.axios
    //     .get("http://127.0.0.1:4399/account/accountlist")
    //     .then(response => {
    //       //获取数据
    //       let { data } = response.data;

    //       //将数据渲染到表格
    //       this.accountTable = data;
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // }
  },
  //生命周期发送请求
  created() {
    this.getAccountsByPage(); //调用账号数据函数
  },
  //过滤器
  filters: {
    filterCtime(ctime) {
      return moment(ctime).format("YYYY-MM-DD hh:mm:ss");
    }
  }
};
</script>

<style lang="less">
.acount-manage {
  .el-card {
    .el-card__header {
      background: #f3f3f3;
    }
    .page {
      margin-top: 20px;
      text-align: center;
    }
  }
}
</style>

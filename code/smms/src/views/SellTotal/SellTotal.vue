<template>
  <div class="sell-total">
    <el-card class="box-card">
      <!-- 标题 -->
      <div slot="header" class="clearfix">
        <h2>销售数据统计</h2>
      </div>
      <!-- 分类 -->
      <div class="search">
        <!-- 分类 -->

        <div class="block">
          <span>时间：</span>
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </div>

        <!-- 关键字 -->
        <el-select v-model="value" placeholder="销售情况统计" style="margin-left:10px;">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>

        <!-- 按钮 -->
        <el-button type="success" size="mini">提交</el-button>
      </div>

      <!-- 报表 -->
      <div id="reportForm"></div>
    </el-card>
  </div>
</template>

<script>
//引入请求数据
import { getSellData } from "@/api/goods";
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
      //x轴
      xData: [],
      codeData: [], //核心数据
      pickerOptions: {
        shortcuts: [
          {
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      value1: "",
      value2: ""
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      getSellData()
        .then(res => {
        
          //接收数据
          let { category, value } = res;
          //渲染到页面
          this.xData = category
           this.codeData = value
        // 1. 初始化报表
                let reportForm = this.$echarts.init( document.getElementById('reportForm') )
          //初始化报表
          var option = {
            // x轴
            xAxis: {
              type: "category",
              data: this.xData
            },
            // y轴
            yAxis: {
              type: "value"
            },
            // 核心数据
            series: [
              {
                data: this.codeData,
                type: "line"
              }
            ]
          };
          // 3. 使用配置生成报表
                reportForm.setOption( option )
        })
        .catch(err => {
          console.log(err);
        });
    },
  },
  mounted() {
     
            let option = {
                // x轴
                xAxis: {
                        type: 'category',
                        data: this.xData
                },
                // y轴
                yAxis: {
                    type: 'value'
                },
                // 核心数据
                series: [{
                    data: this.seriesData,
                    type: 'bar'
                }]
            }
        }
};
</script>

<style lang="less">
.sell-total {
  .el-card {
    .el-card__header {
      background: #f3f3f3;
    }
    .el-card__body {
      .search {
        padding-bottom: 20px;
        display: flex;
        .el-input {
          width: auto;
        }
        span {
          font-size: 14px;
          margin-left: 10px;
        }
        .el-button {
          margin-top: 3px;
          margin-left: 10px;
          padding: 0 10px;
          height: 36px;

          span {
            margin: auto;
            vertical-align: middle;
          }
        }
      }
    }
    #reportForm {
      width: 800px;
      height: 400px;
      margin: 0 auto;
    }
  }
}
</style>

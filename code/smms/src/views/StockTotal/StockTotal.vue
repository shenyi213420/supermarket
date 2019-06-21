<template>
  <div class="stock-total">
    <el-card class="box-card">
      <!-- 标题 -->
      <div slot="header" class="clearfix">
        <h2>进货数据统计</h2>
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

        <!-- 按钮 -->
        <el-button type="success" size="mini">查询</el-button>
      </div>

      <!-- 报表 -->
      <div class="reportForm"></div>
    </el-card>
  </div>
</template>


<script>
export default {
  data() {
    return {
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
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.querySelector(".reportForm"));
      // 绘制图表
      myChart.setOption({
        title: { text: "进货统计", x: "center" },
        tooltip: {},
        xAxis: {
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "bar"
          }
        ]
      });
    }
  }
};
</script>

<style lang="less">
.stock-total {
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
    .reportForm {
      width: 800px;
      height: 400px;
      margin: 0 auto;
    }
  }
}
</style>


<template>
  <div class="salary-container">
    <div class="title">
      <i class="iconfont icon-shouru-copy"></i>近7天收入走势
    </div>
    <div id="sevenLine"></div>
  </div>
</template>

<script>
import formatTime from "../utils/formatTime";
let echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/line");
require("echarts/lib/chart/pie");
require("echarts/lib/chart/radar");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
export default {
  data() {
    return {
      sevenDays: "",
      afterDate: "",
      timeParse: [],
      salary: [],
    };
  },
  mounted() {
    let time = formatTime.getYesDate(-7);
    let afterDate = formatTime.getYesDate(1);
    this.sevenDays = time;
    this.afterDate = afterDate;
    console.log(this.sevenDays, this.afterDate);
    this.getList();
  },
  methods: {
    getList() {
      this.$http
        .getRangeStatistics({
          afterDate: this.afterDate,
          startDate: this.sevenDays,
        })
        .then((res) => {
          console.log(res);
          res = JSON.parse(res).data;
          let data = res.list;
          this.salary = data;
          this.timeParse = [];
          // 时间数组
          for (let i = 0; i < 8; i++) {
            this.timeParse[i] = formatTime.getYesDate(-6 + i);
          }
          this.timeParse.pop();
          console.log(this.timeParse);

          // 绘制
          this.drawLine();
        });
    },
    drawLine() {
      let myChart = echarts.init(document.getElementById("sevenLine"));
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{b} {a} : {c} 元",
        },
        xAxis: {
          data: this.timeParse,
        },
        yAxis: {},
        series: [
          {
            name: "收入",
            type: "line",
            center: ["50%", "50%"],
            data: this.salary,
            itemStyle: {
              color: "#37A2DA",
            },
          },
        ],
      });
    },
  },
};
</script>

<style lang="less" scoped>
.salary-container {
  padding: 10px 15px;
}

#sevenLine {
  width: 100%;
  height: 480px;
}

.title {
  font-size: 18px;
  font-weight: bold;
  color: rgb(241, 55, 170);
  font-family: "楷体";
}

.iconfont {
  margin-right: 5px;
}
</style>
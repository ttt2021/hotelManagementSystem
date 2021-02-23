<template>
  <div class="week-statics">
    <div class="tab-wrapper">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="今日统计" name="first">
          <div class="today-wrapper">
            <div class="title">
              <i class="iconfont icon-shouru-copy"></i>收入走势
            </div>
            <div id="todayLine"></div>
          </div>
          <div class="today-container">
            <div class="wrapper">
              <div class="title">
                <i class="iconfont icon-shouru-copy"></i>收入占比
              </div>
              <div id="todayPie"></div>
            </div>
            <div class="wrapper">
              <div class="title">
                <i class="iconfont icon-shouru-copy"></i>售出房间类型情况
              </div>
              <div id="todayRadar"></div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="昨日统计" name="second">
          <div class="today-wrapper">
            <div class="title">
              <i class="iconfont icon-shouru-copy"></i>昨日收入走势
            </div>
            <div id="yesterdayLine"></div>
          </div>
          <div class="today-container">
            <div class="wrapper">
              <div class="title">
                <i class="iconfont icon-shouru-copy"></i>收入占比
              </div>
              <div id="yesterdayPie"></div>
            </div>
            <div class="wrapper">
              <div class="title">
                <i class="iconfont icon-shouru-copy"></i>售出房间类型情况
              </div>
              <div id="yesterdayRadar"></div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="近7天" name="third">
          <div class="today-wrapper">
            <div class="title">
              <i class="iconfont icon-shouru-copy"></i>收入走势
            </div>
            <div id="sevenLine"></div>
          </div>
          <div class="today-container">
            <div class="wrapper">
              <div class="title">
                <i class="iconfont icon-shouru-copy"></i>收入占比
              </div>
              <div id="sevenPie"></div>
            </div>
            <div class="wrapper">
              <div class="title">
                <i class="iconfont icon-shouru-copy"></i>售出房间类型情况
              </div>
              <div id="sevenRadar"></div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="近30天" name="fourth">
          <div class="today-wrapper">
            <div class="title">
              <i class="iconfont icon-shouru-copy"></i>收入走势
            </div>
            <div id="thirtyLine"></div>
          </div>
          <div class="today-container">
            <div class="wrapper">
              <div class="title">
                <i class="iconfont icon-shouru-copy"></i>收入占比
              </div>
              <div id="thirtyPie"></div>
            </div>
            <div class="wrapper">
              <div class="title">
                <i class="iconfont icon-shouru-copy"></i>售出房间类型情况
              </div>
              <div id="thirtyRadar"></div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="本月" name="fifth">
          <div class="today-wrapper">
            <div class="title">
              <i class="iconfont icon-shouru-copy"></i>收入走势
            </div>
            <div id="monthLine"></div>
          </div>
          <div class="today-container">
            <div class="wrapper">
              <div class="title">
                <i class="iconfont icon-shouru-copy"></i>收入占比
              </div>
              <div id="monthPie"></div>
            </div>
            <div class="wrapper">
              <div class="title">
                <i class="iconfont icon-shouru-copy"></i>售出房间类型情况
              </div>
              <div id="monthRadar"></div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="上个月" name="sixth">
          <div class="today-wrapper">
            <div class="title">
              <i class="iconfont icon-shouru-copy"></i>收入走势
            </div>
            <div id="lastMonthLine"></div>
          </div>
          <div class="today-container">
            <div class="wrapper">
              <div class="title">
                <i class="iconfont icon-shouru-copy"></i>收入占比
              </div>
              <div id="lastMonthPie"></div>
            </div>
            <div class="wrapper">
              <div class="title">
                <i class="iconfont icon-shouru-copy"></i>售出房间类型情况
              </div>
              <div id="lastMonthRadar"></div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="本年" name="seventh">
          <div class="today-wrapper">
            <div class="title">
              <i class="iconfont icon-shouru-copy"></i>收入走势
            </div>
            <div id="yearLine"></div>
          </div>
          <div class="today-container">
            <div class="wrapper">
              <div class="title">
                <i class="iconfont icon-shouru-copy"></i>收入占比
              </div>
              <div id="yearPie"></div>
            </div>
            <div class="wrapper">
              <div class="title">
                <i class="iconfont icon-shouru-copy"></i>售出房间类型情况
              </div>
              <div id="yearRadar"></div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="去年" name="eighth">
          <div class="today-wrapper">
            <div class="title">
              <i class="iconfont icon-shouru-copy"></i>收入走势
            </div>
            <div id="lastYearLine"></div>
          </div>
          <div class="today-container">
            <div class="wrapper">
              <div class="title">
                <i class="iconfont icon-shouru-copy"></i>收入占比
              </div>
              <div id="lastYearPie"></div>
            </div>
            <div class="wrapper">
              <div class="title">
                <i class="iconfont icon-shouru-copy"></i>售出房间类型情况
              </div>
              <div id="lastYearRadar"></div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import formatTime from "../../utils/formatTime";
let echarts = require("echarts/lib/echarts");
require("echarts/lib/chart/line");
require("echarts/lib/chart/pie");
require("echarts/lib/chart/radar");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
export default {
  data() {
    return {
      activeName: "first",
      time: "",
      salary: [],
      currentDate: "",
      yesterday: "",
      currentSalary: [],
      rooms: [],
      sevenDays: "",
      afterDate: "",
      dayCount: 0,
      year: "",
    };
  },
  mounted() {
    console.log(this.activeName);
    let currentDate = formatTime.getTime();
    this.currentDate = currentDate;
    this.getDayList();
  },
  methods: {
    handleClick() {
      console.log(this.activeName);
      if (this.activeName == "second") {
        let time = formatTime.getYesDate(-1);
        console.log(time);
        this.yesterday = time;
        this.getDayList();
      } else if (this.activeName == "third") {
        let time = formatTime.getYesDate(-7);
        console.log(time, this.currentDate);
        let afterDate = formatTime.getYesDate(1);
        this.sevenDays = time;
        this.afterDate = afterDate;
        this.getList();
      } else if (this.activeName == "fourth") {
        let time = formatTime.getYesDate(-30);
        console.log(time, this.currentDate);
        let afterDate = formatTime.getYesDate(1);
        this.sevenDays = time;
        this.afterDate = afterDate;
        this.getList();
      } else if (this.activeName == "fifth") {
        console.log(this.activeName);
        let time = formatTime.getCurrentMonth();
        console.log(time);
        this.sevenDays = time[0];
        this.afterDate = time[1];
        let dayCount = formatTime.getDayCount(new Date());
        console.log(dayCount);
        this.dayCount = dayCount;
        this.getList();
      } else if (this.activeName == "sixth") {
        console.log(this.activeName);
        this.afterDate = formatTime.getMonthFirstDay();
        this.sevenDays = formatTime.getLastDay(-1);
        console.log(this.sevenDays, this.afterDate);
        let time = formatTime.getCurrentMonth();
        let dayCount = formatTime.getDayCount(time[0]);
        console.log(dayCount);
        this.dayCount = dayCount;
        this.getList();
      } else if (this.activeName == "seventh") {
        this.year = formatTime.getTime().slice(0, 4);
        console.log(this.year);
        this.getYearList();
      } else if (this.activeName == 'eighth') {
        this.year = (Number(formatTime.getTime().slice(0, 4)) - 1).toString();
        console.log(this.year);
        this.getYearList();
      }
    },
    getYearList() {
      this.$http
        .getYearStatistics({
          year: this.year,
        })
        .then((res) => {
          console.log(res);
          res = JSON.parse(res).data;
          let data = res.list;
          this.rooms = res.rooms;
          this.salary = data;
          this.timeParse = [];
          this.currentSalary = [];

          for (let i = 0; i < 12; i++) {
            if (i < 9) {
              this.timeParse[i] = `${Number(this.year)}年0${i + 1}月`;
            } else {
              this.timeParse[i] = `${Number(this.year)}年${i + 1}月`;
            }
          }
          console.log(this.timeParse);

          this.currentSalary[0] = {
            name: this.timeParse[0],
            value: data[0],
          };
          for (let i = 1; i < data.length; i++) {
            this.currentSalary[i] = {
              name: this.timeParse[i],
              value: data[i],
            };
          }
          console.log(this.currentSalary, this.salary);

          // 绘制
          this.drawLine();
          this.drawPie();
          this.drawRadar();
        });
    },
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
          this.rooms = res.rooms;
          this.salary = data;
          this.timeParse = [];
          this.currentSalary = [];

          if (this.activeName == "third") {
            // 时间数组
            for (let i = 0; i < 8; i++) {
              this.timeParse[i] = formatTime.getYesDate(-6 + i);
            }
            this.timeParse.pop();
          } else if (this.activeName == "fourth") {
            for (let i = 0; i < 31; i++) {
              this.timeParse[i] = formatTime.getYesDate(-29 + i);
            }
            this.timeParse.pop();
          } else if (this.activeName == "fifth") {
            let time = formatTime.getMonthFirstDay();
            this.timeParse[0] = time;
            time = time.slice(0, 8);
            console.log(time);
            for (let i = 1; i < this.dayCount; i++) {
              if (i < 9) {
                this.timeParse[i] = `${time}0${i + 1}`;
              } else {
                this.timeParse[i] = `${time}${i + 1}`;
              }
            }
          } else if (this.activeName == "sixth") {
            let time = formatTime.getLastMonth();
            console.log(time);
            for (let i = 0; i < this.dayCount; i++) {
              if (i < 9) {
                this.timeParse[i] = `${time}-0${i + 1}`;
              } else {
                this.timeParse[i] = `${time}-${i + 1}`;
              }
            }
          }
          console.log(this.timeParse);

          this.currentSalary[0] = {
            name: this.timeParse[0],
            value: data[0],
          };
          for (let i = 1; i < data.length; i++) {
            this.currentSalary[i] = {
              name: this.timeParse[i],
              value: data[i],
            };
          }
          console.log(this.currentSalary, this.salary);

          // 绘制
          this.drawLine();
          this.drawPie();
          this.drawRadar();
        });
    },
    getDayList() {
      let currentDate =
        this.activeName === "first" ? this.currentDate : this.yesterday;
      this.$http
        .getDayStatistics({
          currentDate: currentDate,
        })
        .then((res) => {
          console.log(res);
          res = JSON.parse(res).data;
          let data = res.list;
          this.rooms = res.rooms;
          this.timeParse = [
            `${currentDate} 03: 00`,
            `${currentDate} 06: 00`,
            `${currentDate} 09: 00`,
            `${currentDate} 12: 00`,
            `${currentDate} 15: 00`,
            `${currentDate} 18: 00`,
            `${currentDate} 21: 00`,
            `${currentDate} 24: 00`,
          ];
          console.log(this.timeParse);

          let timeList = [
            `${currentDate} 00: 00 - 03: 00`,
            `${currentDate} 03: 00 - 06: 00`,
            `${currentDate} 06: 00 - 09: 00`,
            `${currentDate} 09: 00 - 12: 00`,
            `${currentDate} 12: 00 - 15: 00`,
            `${currentDate} 15: 00 - 18: 00`,
            `${currentDate} 18: 00 - 21: 00`,
            `${currentDate} 21: 00 - 24: 00`,
          ];

          this.currentSalary[0] = {
            name: timeList[0],
            value: data[0],
          };
          this.salary[0] = data[0];
          for (let i = 1; i < data.length; i++) {
            this.currentSalary[i] = {
              name: timeList[i],
              value: data[i],
            };
            this.salary[i] = this.salary[i - 1] + data[i];
          }
          console.log(this.currentSalary, this.salary);

          // 绘制
          this.drawLine();
          this.drawPie();
          this.drawRadar();
        });
    },
    drawLine() {
      let myChart = null;
      if (this.activeName === "first") {
        myChart = echarts.init(document.getElementById("todayLine"));
      } else if (this.activeName == "second") {
        myChart = echarts.init(document.getElementById("yesterdayLine"));
      } else if (this.activeName == "third") {
        myChart = echarts.init(document.getElementById("sevenLine"));
      } else if (this.activeName == "fourth") {
        myChart = echarts.init(document.getElementById("thirtyLine"));
      } else if (this.activeName == "fifth") {
        myChart = echarts.init(document.getElementById("monthLine"));
      } else if (this.activeName == "sixth") {
        myChart = echarts.init(document.getElementById("lastMonthLine"));
      } else if (this.activeName == "seventh") {
        myChart = echarts.init(document.getElementById("yearLine"));
      } else if (this.activeName == "eighth") {
        myChart = echarts.init(document.getElementById("lastYearLine"));
      }
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
    drawPie() {
      let myPie = null;
      if (this.activeName === "first") {
        myPie = echarts.init(document.getElementById("todayPie"));
      } else if (this.activeName == "second") {
        myPie = echarts.init(document.getElementById("yesterdayPie"));
      } else if (this.activeName == "third") {
        myPie = echarts.init(document.getElementById("sevenPie"));
      } else if (this.activeName == "fourth") {
        myPie = echarts.init(document.getElementById("thirtyPie"));
      } else if (this.activeName == "fifth") {
        myPie = echarts.init(document.getElementById("monthPie"));
      } else if (this.activeName == "sixth") {
        myPie = echarts.init(document.getElementById("lastMonthPie"));
      } else if (this.activeName == "seventh") {
        myPie = echarts.init(document.getElementById("yearPie"));
      } else if (this.activeName == "eighth") {
        myPie = echarts.init(document.getElementById("lastYearPie"));
      }
      myPie.setOption({
        tooltip: {
          trigger: "item",
          formatter: "收入{a}: {c} ({d}%)",
        },
        series: [
          {
            name: "占比",
            type: "pie",
            radius: [30, 110],
            center: ["50%", "50%"],
            data: this.currentSalary,
            roseType: "area",
            label: {
              normal: {
                textStyle: {
                  color: "rgba(0, 0, 0, 0.7)",
                },
              },
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: "rgba(0, 0, 0, 0.7)",
                },
                smooth: 0.2,
                length: 10,
                length2: 20,
              },
            },
            itemStyle: {
              normal: {
                color: function (params) {
                  let colorList = [
                    "#37A2DA",
                    "#32C5E9",
                    "#FB7293",
                    "#FFDB5C",
                    "#FF9F7F",
                    "#32C5E9",
                    "#E7BCF3",
                    "#8378EA",
                    "#FFCC33",
                    "#FF66FF",
                    "#CCCCFF",
                    "#9966FF",
                    "#6666FF",
                    "#66CCCC",
                    "#33CCFF",
                    "#FFFFCC",
                    "#3300FF",
                    "#00CC33",
                    "#FF99FF",
                    "#FF9966",
                    "#FF3366",
                    "#FF33FF",
                    "#CC99FF",
                    "#9999FF",
                    "#9933FF",
                    "#0000DD",
                    "#990099",
                    "#FFFF00",
                    "#008800",
                    "#00FF00",
                    "#999966",
                  ];
                  return colorList[params.dataIndex];
                },
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      });
    },
    drawRadar() {
      let myRadar = null;
      if (this.activeName === "first") {
        myRadar = echarts.init(document.getElementById("todayRadar"));
      } else if (this.activeName == "second") {
        myRadar = echarts.init(document.getElementById("yesterdayRadar"));
      } else if (this.activeName == "third") {
        myRadar = echarts.init(document.getElementById("sevenRadar"));
      } else if (this.activeName == "fourth") {
        myRadar = echarts.init(document.getElementById("thirtyRadar"));
      } else if (this.activeName == "fifth") {
        myRadar = echarts.init(document.getElementById("monthRadar"));
      } else if (this.activeName == "sixth") {
        myRadar = echarts.init(document.getElementById("lastMonthRadar"));
      } else if (this.activeName == "seventh") {
        myRadar = echarts.init(document.getElementById("yearRadar"));
      } else if (this.activeName == "eighth") {
        myRadar = echarts.init(document.getElementById("lastYearRadar"));
      }
      myRadar.setOption({
        tooltip: {},
        series: [
          {
            name: "房间类型",
            type: "pie",
            radius: "55%",
            center: ["40%", "50%"],
            data: this.rooms,
            itemStyle: {
              normal: {
                color: function (params) {
                  let colorList = [
                    "#37A2DA",
                    "#32C5E9",
                    "#FB7293",
                    "#FFDB5C",
                    "#FF9F7F",
                    "#32C5E9",
                    "#E7BCF3",
                    "#8378EA",
                    "#FFCC33",
                    "#FF66FF",
                    "#CCCCFF",
                    "#9966FF",
                    "#6666FF",
                    "#66CCCC",
                    "#33CCFF",
                    "#FFFFCC",
                    "#3300FF",
                    "#00CC33",
                    "#FF99FF",
                    "#FF9966",
                    "#FF3366",
                    "#FF33FF",
                    "#CC99FF",
                    "#9999FF",
                    "#9933FF",
                    "#0000DD",
                    "#990099",
                    "#FFFF00",
                    "#008800",
                    "#00FF00",
                    "#999966",
                  ];
                  return colorList[params.dataIndex];
                },
              },
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      });
    },
  },
};
</script>

<style lang="less" scoped>
#todayLine,
#yesterdayLine,
#todayPie,
#yesterdayPie,
#todayRadar,
#yesterdayRadar,
#sevenLine,
#sevenPie,
#sevenRadar,
#thirtyLine,
#thirtyPie,
#thirtyRadar,
#monthLine,
#monthPie,
#monthRadar,
#lastMonthLine,
#lastMonthPie,
#lastMonthRadar,
#yearLine,
#yearPie,
#yearRadar,
#lastYearLine,
#lastYearPie,
#lastYearRadar {
  width: 100%;
  height: 280px;
}

.title {
  font-size: 18px;
  color: rgb(241, 55, 170);
  font-family: "楷体";
}

.iconfont {
  margin-right: 5px;
}

.today-container {
  display: flex;
  justify-content: space-between;
}

.wrapper {
  flex: 1;
  height: 300px;
  width: 100%;
}
</style>
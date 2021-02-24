<template>
  <div class="restRoom-wrapper">
    <div class="title">
      <i class="iconfont icon-shouru-copy"></i>各类型房间剩余
    </div>
    <div class="style-container" v-for="(roomList, idx) in restRoomList">
      <div class="style-wrapper" v-for="(item, roomIndex) in roomList">
        <el-progress
          :width="120"
          type="circle"
          :percentage="item.per"
          :color="colorList[idx * num + roomIndex]"
          :show-text="false"
        ></el-progress>
        <div class="style-title">{{ item.name }} {{item.restCount}} 间</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      restRoomList: [],
      colorList: [
        "#37A2DA",
        "#FB7293",
        "#FFDB5C",
        "#FF9F7F",
        "#E7BCF3",
        "#8378EA",
        "#FFCC33",
        "#FF66FF",
        "#CCCCFF",
        "#9966FF",
        "#6666FF",
        "#66CCCC",
        "#33CCFF",
        "#FF33FF",
        "#CC99FF",
      ],
      num: null
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.$http.getRestRoom().then((res) => {
        console.log(res);
        res = JSON.parse(res);
        let list = [],
          temp = [];
        let num = Math.ceil(res.data.length / 3)
        this.num = num
        console.log(num)
        for (let i = 0; i < res.data.length; i++) {
          res.data[i].per =
            (res.data[i].restCount / res.data[i].totalCount) * 100;
          if ((i + 1) % num == 0) {
            temp.push(res.data[i]);
            list.push(temp);
            temp = [];
          } else {
            temp.push(res.data[i]);
          }
        }
        if (temp.length != 0) {
          list.push(temp);
        }
        console.log(list);
        this.restRoomList = list;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.restRoom-wrapper {
  padding: 10px 15px;
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

.style-container {
  display: flex;
  align-items: center;
  margin: 30px 0;
}

.style-wrapper {
  flex: 1;
  display: flex;
  justify-content: center;
  position: relative;
}

.style-title {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
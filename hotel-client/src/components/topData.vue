<template>
  <div class="topData-container">
    <el-row :gutter="20" v-if="auth == 1">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <div class="data-wrapper">
            <div class="icon-wrapper people">
              <div class="info-icon">
                <i class="iconfont icon-renyuan"></i>
              </div>
              <div class="info-title">酒店员工</div>
            </div>
            <div class="infos-wrapper">
              <div class="totalInfo-wrapper">
                <div class="count">{{ totalUser }}</div>
                <div class="title">员工总数</div>
              </div>
              <div class="totalInfo-wrapper">
                <div class="count">{{ addUser }}</div>
                <div class="title">今日新增</div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <div class="data-wrapper">
            <div class="icon-wrapper room">
              <div class="info-icon">
                <i class="iconfont icon-roomIcon"></i>
              </div>
              <div class="info-title">客房数量</div>
            </div>
            <div class="infos-wrapper">
              <div class="totalInfo-wrapper">
                <div class="count">{{ totalRoom }}</div>
                <div class="title">客房总数</div>
              </div>
              <div class="totalInfo-wrapper">
                <div class="count">{{ addRoom }}</div>
                <div class="title">今日新增</div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <div class="data-wrapper">
            <div class="icon-wrapper order">
              <div class="info-icon">
                <i class="iconfont icon-dingdan"></i>
              </div>
              <div class="info-title">订单统计</div>
            </div>
            <div class="infos-wrapper">
              <div class="totalInfo-wrapper">
                <div class="count">{{ totalOrder }}</div>
                <div class="title">订单总数</div>
              </div>
              <div class="totalInfo-wrapper">
                <div class="count">{{ addOrder }}</div>
                <div class="title">今日订单</div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <div class="data-wrapper">
            <div class="icon-wrapper salary">
              <div class="info-icon">
                <i class="iconfont icon-yingli"></i>
              </div>
              <div class="info-title">收入盈利</div>
            </div>
            <div class="infos-wrapper">
              <div class="totalInfo-wrapper">
                <div class="count">{{ totalPrice }}</div>
                <div class="title">总盈利</div>
              </div>
              <div class="totalInfo-wrapper">
                <div class="count">{{ addPrice }}</div>
                <div class="title">今日盈利</div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" v-if="auth != 1">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <div class="data-wrapper">
            <div class="icon-wrapper people sign">
              <i class="iconfont icon-renyuan"></i>
            </div>
            <div class="infos-wrapper">
              <div class="totalInfo-wrapper">
                <div class="count login">{{ lastLogin }}</div>
                <div class="title">最新登录</div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="6" v-if="auth == 5 || auth == 6 || auth == 2">
        <div class="grid-content bg-purple">
          <div class="data-wrapper">
            <div class="icon-wrapper room sign">
              <i class="iconfont icon-roomIcon"></i>
            </div>
            <div class="infos-wrapper">
              <div class="totalInfo-wrapper">
                <div class="count">{{ restRoom }}</div>
                <div class="title">剩余房间</div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="6" v-if="auth == 3">
        <div class="grid-content bg-purple">
          <div class="data-wrapper">
            <div class="icon-wrapper room sign">
              <i class="iconfont icon-roomIcon"></i>
            </div>
            <div class="infos-wrapper">
              <div class="totalInfo-wrapper">
                <div class="count">{{ loginCount }}</div>
                <div class="title">登录次数</div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="6" v-if="auth == 5 || auth == 6 || auth == 2">
        <div class="grid-content bg-purple">
          <div class="data-wrapper">
            <div class="icon-wrapper order sign">
              <i class="iconfont icon-dingdan"></i>
            </div>
            <div class="infos-wrapper">
              <div class="totalInfo-wrapper">
                <div class="count">{{ addOrder }}</div>
                <div class="title">今日订单</div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="6" v-if="auth == 5">
        <div class="grid-content bg-purple">
          <div class="data-wrapper">
            <div class="icon-wrapper salary sign">
              <i class="iconfont icon-yingli"></i>
            </div>
            <div class="infos-wrapper">
              <div class="totalInfo-wrapper">
                <div class="count">{{ todayPrice }}</div>
                <div class="title">今日收入</div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="6" v-if="auth == 6">
        <div class="grid-content bg-purple">
          <div class="data-wrapper">
            <div class="icon-wrapper salary sign">
              <i class="iconfont icon-yingli"></i>
            </div>
            <div class="infos-wrapper">
              <div class="totalInfo-wrapper">
                <div class="count">{{ addPrice }}</div>
                <div class="title">今日收益</div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="6" v-if="auth == 2">
        <div class="grid-content bg-purple">
          <div class="data-wrapper">
            <div class="icon-wrapper salary sign">
              <i class="iconfont icon-jiedaiwaibin"></i>
            </div>
            <div class="infos-wrapper">
              <div class="totalInfo-wrapper">
                <div class="count">{{ totalPeople }}</div>
                <div class="title">入住人数</div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="6" v-if="auth == 3">
        <div class="grid-content bg-purple">
          <div class="data-wrapper">
            <div class="icon-wrapper order sign">
              <i class="iconfont icon-user-cog"></i>
            </div>
            <div class="infos-wrapper">
              <div class="totalInfo-wrapper">
                <div class="count">{{ addUser }}</div>
                <div class="title">新增员工</div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="6" v-if="auth == 3">
        <div class="grid-content bg-purple">
          <div class="data-wrapper">
            <div class="icon-wrapper salary sign">
              <i class="iconfont icon-jiedaiwaibin"></i>
            </div>
            <div class="infos-wrapper">
              <div class="totalInfo-wrapper">
                <div class="count">{{ totalUser }}</div>
                <div class="title">员工总数</div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
       <el-col :span="6" v-if="auth == 4 || auth == 8">
        <div class="grid-content bg-purple">
          <div class="data-wrapper">
            <div class="icon-wrapper room sign">
              <i class="iconfont icon-pinglun"></i>
            </div>
            <div class="infos-wrapper">
              <div class="totalInfo-wrapper">
                <div class="count">{{ commentCount }}</div>
                <div class="title">评论次数</div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <!-- 资讯篇数 -->
      <el-col :span="6" v-if="auth == 4 || auth == 8">
        <div class="grid-content bg-purple">
          <div class="data-wrapper">
            <div class="icon-wrapper order sign">
              <i class="iconfont icon-jianjie"></i>
            </div>
            <div class="infos-wrapper">
              <div class="totalInfo-wrapper">
                <div class="count">{{ totalArticle }}</div>
                <div class="title">资讯篇数</div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <!-- 浏览总数 -->
      <el-col :span="6" v-if="auth == 4 || auth == 8">
        <div class="grid-content bg-purple">
          <div class="data-wrapper">
            <div class="icon-wrapper salary sign">
              <i class="iconfont icon-updatedBook"></i>
            </div>
            <div class="infos-wrapper">
              <div class="totalInfo-wrapper">
                <div class="count">{{ totalViews }}</div>
                <div class="title">浏览总数</div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import bus from "../utils/bus.js"; // 总线机制，非父子组件之间通信
export default {
  data() {
    return {
      auth: null,
      totalUser: 0,
      addUser: 0,
      totalRoom: 0,
      addRoom: 0,
      totalOrder: 0,
      addOrder: 0,
      totalPrice: 0,
      addPrice: 0,
      restRoom: 0,
      lastLogin: "",
      todayPrice: 0,
      totalPeople: 0,
      loginCount: 0,
      totalViews: 0,
      totalArticle: 0,
      commentCount: 0
    };
  },
  mounted() {
    bus.$on("auth", (data) => {
      this.auth = data;
    });
    this.getInfo();
  },
  methods: {
    getInfo() {
      let username = JSON.parse(localStorage.getItem("token")).username;
      console.log(username);
      this.$http
        .getDataInfo({
          username: username,
        })
        .then((res) => {
          res = JSON.parse(res).data;
          console.log(res);
          this.totalUser = res.totalUser;
          this.addUser = res.addUser;
          this.totalRoom = res.totalRoom;
          this.addRoom = res.addRoom;
          this.totalOrder = res.totalOrder;
          this.addOrder = res.addOrder;
          this.totalPrice = res.totalPrice;
          this.addPrice = res.addPrice;
          this.todayPrice = res.todayPrice;
          this.restRoom = res.restRoom;
          this.lastLogin = res.lastLogin;
          this.totalPeople = res.totalPeople;
          this.loginCount = res.loginCount;
          this.totalViews = res.totalViews;
          this.totalArticle = res.totalArticle;
          this.commentCount = res.commentCount
        });
    },
  },
};
</script>

<style lang="less" scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}

.data-wrapper {
  display: flex;
  align-items: center;
  background: #fff;
}

.icon-wrapper {
  flex: 1;
  text-align: center;
  padding: 20px;
  color: #fff;
}

.infos-wrapper {
  flex: 2;
  text-align: center;
  display: flex;
  padding: 20px;
}

.info-title {
  font-size: 16px;
  font-family: "楷体";
  font-weight: bold;
}

.totalInfo-wrapper {
  font-size: 16px;
  font-family: "楷体";
  font-weight: bold;
  color: #8d8d8d;
  flex: 1;
}

.login {
  font-size: 14px;
}

.iconfont {
  font-size: 30px;
}

.count {
  margin-bottom: 10px;
}

.people {
  background: rgb(6, 228, 180);
}

.room {
  background: rgb(58, 123, 207);
}

.order {
  background: rgb(245, 139, 18);
}

.salary {
  background: rgb(224, 10, 196);
}

.sign {
  height: 48.8px;
  line-height: 48.8px;
}

.grid-content {
  border-radius: 4px;
}
</style>
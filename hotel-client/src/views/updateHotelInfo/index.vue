<template>
  <div class="update-wrapper">
    <div class="profile-wrapper">
      <div class="title-wrapper">
        <i class="iconfont icon-jianjie"></i>
        <div class="title">酒店简介</div>
      </div>
      <el-input
        type="textarea"
        v-model="profile"
        maxlength="500"
        show-word-limit
      >
      </el-input>
    </div>
    <div class="baseInfo-wrapper">
      <div class="title-wrapper">
        <i class="el-icon-edit"></i>
        <div class="title">基本信息</div>
      </div>
      <div class="hotel-name baseInfo">
        <span class="info-title">酒店名称：</span>
        <el-input v-model="name" readonly> </el-input>
      </div>
      <div class="hotel-tel baseInfo">
        <span class="info-title">酒店电话：</span>
        <el-input v-model="tel"> </el-input>
      </div>
      <div class="hotel-address baseInfo">
        <span class="info-title">酒店地址：</span>
        <el-input v-model="address" readonly> </el-input>
      </div>
    </div>
    <div class="baseInfo-wrapper">
      <div class="title-wrapper">
        <i class="el-icon-dish"></i>
        <div class="title">餐饮服务</div>
      </div>
      <div class="hotel-name baseInfo">
        <el-input v-model="catering"></el-input>
      </div>
    </div>
    <div class="baseInfo-wrapper">
      <div class="title-wrapper">
        <i class="el-icon-place"></i>
        <div class="title">交通服务</div>
      </div>
      <div class="hotel-name baseInfo">
        <el-input v-model="transport"></el-input>
      </div>
    </div>
    <div class="baseInfo-wrapper">
      <div class="title-wrapper">
        <i class="iconfont icon-shangwu"></i>
        <div class="title">商务服务</div>
      </div>
      <div class="hotel-name baseInfo">
        <el-input v-model="business"></el-input>
      </div>
    </div>
    <div class="profile-wrapper">
      <div class="title-wrapper">
        <i class="iconfont icon-qiantai"></i>
        <div class="title">前台服务</div>
      </div>
      <el-input
        type="textarea"
        v-model="frontDesk"
        maxlength="300"
        show-word-limit
      >
      </el-input>
    </div>
    <div class="baseInfo-wrapper">
      <div class="title-wrapper">
        <i class="iconfont icon-tongyong"></i>
        <div class="title">通用服务</div>
      </div>
      <div class="hotel-name baseInfo">
        <el-input v-model="base"></el-input>
      </div>
    </div>
    <div class="baseInfo-wrapper">
      <div class="title-wrapper">
        <i class="iconfont icon-fangjian"></i>
        <div class="title">房间服务</div>
      </div>
      <div class="hotel-name baseInfo">
        <el-input v-model="room"></el-input>
      </div>
    </div>
    <div class="profile-wrapper">
      <div class="title-wrapper">
        <i class="iconfont icon-roomsetting"></i>
        <div class="title">房间设施</div>
      </div>
      <el-input
        type="textarea"
        v-model="roomSetting"
        maxlength="300"
        show-word-limit
      >
      </el-input>
    </div>
    <div class="baseInfo-wrapper">
      <div class="title-wrapper">
        <i class="iconfont icon-yule"></i>
        <div class="title">娱乐设施</div>
      </div>
      <div class="hotel-name baseInfo">
        <el-input v-model="entertainment"></el-input>
      </div>
    </div>
    <div class="hotel-img">
      <div class="title-wrapper">
        <i class="el-icon-picture-outline"></i>
        <div class="title">酒店图片</div>
      </div>
      <van-uploader :after-read="afterRead" />
      <template v-for="(item, imgIndex) in fileList">
        <img :src="item" alt="" />
      </template>
    </div>
    <div class="baseInfo-wrapper settingInfo">
      <div class="title-wrapper">
        <i class="el-icon-setting"></i>
        <div class="title">配套设施</div>
      </div>
      <div class="setting-wrapper">
        <div class="setting">
          <i class="iconfont icon-reshui"></i>
          <div class="setting-title">24小时热水</div>
        </div>
        <div class="setting">
          <i class="iconfont icon-breakfast"></i>
          <div class="setting-title">早餐</div>
        </div>
        <div class="setting">
          <i class="iconfont icon-tingchechang"></i>
          <div class="setting-title">停车场</div>
        </div>
        <div class="setting">
          <i class="iconfont icon-xiyi"></i>
          <div class="setting-title">自助洗衣</div>
        </div>
        <div class="setting">
          <i class="iconfont icon-huiyishi"></i>
          <div class="setting-title">会议室</div>
        </div>
        <div class="setting">
          <i class="iconfont icon-youyongchi"></i>
          <div class="setting-title">游泳池</div>
        </div>
        <div class="setting">
          <i class="iconfont icon-jianshen"></i>
          <div class="setting-title">健身房</div>
        </div>
        <div class="setting">
          <i class="iconfont icon-canyin"></i>
          <div class="setting-title">餐饮</div>
        </div>
      </div>
    </div>
    <div class="baseInfo-wrapper">
      <div class="title-wrapper">
        <i class="el-icon-edit"></i>
        <div class="title">酒店政策</div>
      </div>
      <div class="hotel-name baseInfo kind">
        <i class="iconfont icon-zhengjian"></i>
        <span class="info-title">证件类型：</span>
        <el-input v-model="certificate"> </el-input>
      </div>
      <div class="hotel-tel baseInfo kind">
        <i class="iconfont icon-chongwu"></i>
        <span class="info-title">宠物：</span>
        <el-input v-model="pet"> </el-input>
      </div>
      <div class="hotel-address baseInfo kind">
        <i class="iconfont icon-web-icon-"></i>
        <span class="info-title">支付方式：</span>
        <el-input v-model="payment"></el-input>
      </div>
      <div class="hotel-address baseInfo kind">
        <i class="iconfont icon-jiedaiwaibin"></i>
        <span class="info-title">接待外宾：</span>
        <el-input v-model="receive"></el-input>
      </div>
    </div>
    <div class="update-btn">
      <el-button>取消</el-button>
      <el-button type="primary" @click="updateHotelInfo">确定修改</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      profile: "",
      name: "暖心居家酒店",
      tel: "0791-86230888",
      address: "江西省南昌市红谷滩169号",
      catering: "",
      transport: "",
      business: "",
      base: "",
      room: "",
      frontDesk: "",
      roomSetting: "",
      entertainment: "",
      certificate: "",
      pet: "",
      payment: "",
      receive: "",
      fileList: [],
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    afterRead(file) {
      console.log(file.content)
      if (this.fileList == null) {
        let imgUrl = [].concat(file.content)
        this.fileList = imgUrl
      } else {
        this.fileList.push(file.content)
      }
    },
    getInfo() {
      this.$http.getHotelInfo({}).then((res) => {
        console.log(res);
        res = JSON.parse(res);
        if (res.code == 0) {
          this.$message({
            showClose: true,
            message: "获取失败，请检查网路",
            type: "error",
          });
          return;
        }
        if (res.data.length !== 0) {
          this.profile = res.data[0].profile;
          this.tel = res.data[0].tel;
          this.catering = res.data[0].catering;
          this.transport = res.data[0].transport;
          this.business = res.data[0].business;
          this.base = res.data[0].base;
          this.room = res.data[0].room;
          this.frontDesk = res.data[0].frontDesk;
          this.roomSetting = res.data[0].roomSetting;
          this.entertainment = res.data[0].entertainment;
          this.certificate = res.data[0].certificate;
          this.pet = res.data[0].pet;
          this.payment = res.data[0].payment;
          this.receive = res.data[0].receive;
          this.fileList = res.data[0].fileList;
        }
      });
    },
    updateHotelInfo() {
      console.log(this.fileList);
      if (
        this.profile === "" ||
        this.tel === "" ||
        this.catering === "" ||
        this.transport === "" ||
        this.business === "" ||
        this.base === "" ||
        this.room === "" ||
        this.frontDesk === "" ||
        this.roomSetting === "" ||
        this.entertainment === "" ||
        this.certificate === "" ||
        this.pet === "" ||
        this.payment === "" ||
        this.receive === "" ||
        this.fileList.length === 0
      ) {
        this.$message({
          showClose: true,
          message: "内容不能为空",
          type: "error",
        });
        return;
      }
      let fileList = [];
      for (let i = 0; i < this.fileList.length; i++) {
        fileList[i] = this.fileList[i].content;
      }
      let username = JSON.parse(localStorage.getItem("token")).username;
      console.log(username);
      console.log(fileList);
      this.$http
        .updateHotelInfos({
          username: username,
          profile: this.profile,
          tel: this.tel,
          catering: this.catering,
          transport: this.transport,
          business: this.business,
          base: this.base,
          room: this.room,
          frontDesk: this.frontDesk,
          roomSetting: this.roomSetting,
          entertainment: this.entertainment,
          certificate: this.certificate,
          pet: this.pet,
          payment: this.payment,
          receive: this.receive,
          fileList: fileList,
          name: this.name,
          address: this.address,
        })
        .then((res) => {
          console.log(res);
          res = JSON.parse(res);
          if (res.code == 0) {
            this.$message({
              showClose: true,
              message: res.msg,
              type: "error",
            });
            return;
          } else {
            this.getInfo();
            this.$message({
              showClose: true,
              message: res.msg,
              type: "success",
            });
          }
        });
    },
  },
};
</script>

<style lang="less" scoped>
.display() {
  display: flex;
  align-items: center;
}

.update-wrapper {
  height: 650px;
}

.title-wrapper {
  .display();
  margin-bottom: 10px;
  color: #8d8d8d;
  font-family: "楷体";
  font-weight: bold;
  font-size: 18px;
}

.title {
  margin-left: 5px;
}

.hotel-img {
  margin-top: 20px;
  margin-bottom: 10px;
  text-align: center;
}

.baseInfo-wrapper {
  margin-top: 20px;
}

.baseInfo {
  .display();
  margin-bottom: 15px;
}

.info-title {
  width: 100px;
  color: #8d8d8d;
  font-family: "楷体";
  font-weight: bold;
}

.setting-wrapper {
  .display();
  justify-content: center;
}

.setting {
  font-size: 14px;
  font-family: "楷体";
  color: #8d8d8d;
  font-weight: bold;
  text-align: center;
  margin-right: 15px;
}

.setting .iconfont {
  font-size: 60px;
  color: rgb(70, 130, 180);
}

.settingInfo {
  margin-bottom: 20px;
}

.kind .iconfont {
  font-size: 24px;
  margin-right: 10px;
}

.update-btn {
  text-align: center;
  margin-bottom: 20px;
}

/deep/.el-button {
  margin-right: 30px;
}
</style>
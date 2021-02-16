<template>
  <div class="hotelInfo-wrapper">
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="(item, imgIndex) in hotelInfos.fileList">
        <img :src="item" alt="" />
      </el-carousel-item>
    </el-carousel>
    <div class="infos-wrapper">
      <div class="title-wrapper">
        <div class="title">酒店简介</div>
      </div>
      <div class="content">{{hotelInfos.profile}}</div>
    </div>
    <div class="infos-wrapper">
      <div class="title-wrapper">
        <div class="title">酒店服务与设施</div>
      </div>
      <div class="content">
        <span class="server-title">餐饮服务：</span>{{hotelInfos.catering}}
      </div>
      <div class="content">
        <span class="server-title">交通服务：</span>{{hotelInfos.transport}}
      </div>
      <div class="content">
        <span class="server-title">商务服务：</span>{{hotelInfos.business}}
      </div>
      <div class="content">
        <span class="server-title">前台服务：</span>{{hotelInfos.frontDesk}}
      </div>
      <div class="content">
        <span class="server-title">通用服务：</span>{{hotelInfos.base}}
      </div>
      <div class="content">
        <span class="server-title">房间服务：</span>{{hotelInfos.room}}
      </div>
      <div class="content">
        <span class="server-title">房间设施：</span>{{hotelInfos.roomSetting}}
      </div>
       <div class="content">
        <span class="server-title">娱乐设施：</span>{{hotelInfos.entertainment}}
      </div>
    </div>
    <div class="infos-wrapper">
      <div class="title-wrapper">
        <div class="title">酒店政策</div>
      </div>
      <div class="content">
        <div class="hotel-name baseInfo kind">
        <i class="iconfont icon-zhengjian"></i>
        <span class="info-title">证件类型：</span>{{hotelInfos.certificate}}
      </div>
      <div class="hotel-tel baseInfo kind">
        <i class="iconfont icon-chongwu"></i>
        <span class="info-title">宠物：</span>{{hotelInfos.pet}}
      </div>
      <div class="hotel-address baseInfo kind">
        <i class="iconfont icon-web-icon-"></i>
        <span class="info-title">支付方式：</span>{{hotelInfos.payment}}
      </div>
      <div class="hotel-address baseInfo kind">
        <i class="iconfont icon-jiedaiwaibin"></i>
        <span class="info-title">接待外宾：</span>{{hotelInfos.receive}}
      </div>
      </div>
    </div>
    <div class="infos-wrapper">
      <div class="title-wrapper">
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
      <div class="base-info"><span class="info">酒店名称：</span>{{hotelInfos.name}}</div>
      <div class="base-info"><span class="info">酒店电话：</span>{{hotelInfos.tel}}</div>
      <div class="base-info"><span class="info">酒店地址：</span>{{hotelInfos.address}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hotelInfos: {}
    };
  },
  mounted() {
    this.$http.getHotelInfo({}).then((res) => {
      console.log(res);
      res = JSON.parse(res);
      if (res.code == 0) {
        this.$message({
          showClose: true,
          message: res.msg,
          type: "error",
        });
        return
      }
      this.hotelInfos = res.data[0]
    });
  },
};
</script>

<style lang="less" scoped>
.display() {
  display: flex;
  align-items: center;
}

.hotelInfo-wrapper {
  height: 650px;
}

img {
  height: 200px;
  width: 650px;
  background-size: cover;
  opacity: 0.75;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.title-wrapper {
  .display();
  margin: 10px 0;
  justify-content: center;
  background: #c0c0c0;
  color: #fff;
  padding: 5px 0;
}

.title {
  margin-left: 5px;
}

.content {
  text-indent: 2em;
  line-height: 25px;
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
  color: rgb(200, 231, 21);
}

.settingInfo {
  margin-bottom: 20px;
}

.info-title {
  margin-left: 5px;
}

.baseInfo-wrapper {
  .display();
  margin: 30px 0 10px 0;
}

.base-info {
  flex: 1;
  color: #8d8d8d;
  font-family: '楷体';
  font-weight: bold;
}
</style>
<template>
  <div class="wrapper">
    <!-- 轮播 图片懒加载 Lazyload -->
    <div class="lunbo-wrapper">
      <van-swipe :autoplay="3000" class="swipe" :show-indicators="false">
        <van-swipe-item
          v-for="(image, idx) in images"
          :key="idx"
          @click="preview(images, idx)"
        >
          <img v-lazy="image" class="swipe-img" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="hotel-name">暖心居家酒店</div>

    <!-- 评分 地址 介绍 -->
    <div class="baseInfo-wrapper">
      <div class="rate-wrapper">
        <div class="rate-icon">
          <van-rate
            v-model="rate"
            allow-half
            void-icon="star"
            color="#ffaa33"
            void-color="#ddd"
            :size="15"
            readonly
          />
          <div class="rate-grade">3.5分</div>
          <div class="comment-count">(235条评论)</div>
        </div>
        <div class="arrow-right"><van-icon name="arrow" color="#aaa" /></div>
      </div>

      <div class="address-wrapper">
        <div class="address-icon">
          <van-icon name="location" />
          <div class="address">南昌市心语路128号</div>
        </div>
        <div class="arrow-right"><van-icon name="arrow" color="#aaa" /></div>
      </div>

      <div class="info-wrapper">
        <div class="base-info-icon">
          <div class="infoIcon">
            <i class="iconfont icon-reshui"></i>
            <div class="info-name">24小时热水</div>
          </div>
          <div class="infoIcon">
            <i class="iconfont icon-xiyi"></i>
            <div class="info-name">自助洗衣</div>
          </div>
          <div class="infoIcon">
            <i class="iconfont icon-tingchechang"></i>
            <div class="info-name">停车场</div>
          </div>
          <div class="infoIcon">
            <i class="iconfont icon-jianshen"></i>
            <div class="info-name">健身房</div>
          </div>
          <div class="infoIcon">
            <i class="iconfont icon-youyongchi"></i>
            <div class="info-name">游泳池</div>
          </div>
          <div class="infoIcon">
            <i class="iconfont icon-huiyishi"></i>
            <div class="info-name">会议室</div>
          </div>
          <div class="infoIcon">
            <i class="iconfont icon-breakfast"></i>
            <div class="info-name">早餐</div>
          </div>
          <div class="infoIcon">
            <i class="iconfont icon-canyin"></i>
            <div class="info-name">餐饮</div>
          </div>
        </div>
        <div class="arrow-right"><van-icon name="arrow" color="#aaa" /></div>
      </div>
    </div>

    <!-- 预订 -->
    <div class="reservation-wrapper">
      <div class="live-info-wrapper">
        <div class="live-info">
          <div class="live-day">3天</div>
          <div class="live-time">
            <div class="live-startTime time">
              <div class="live-time">入住时间</div>
              <div class="live-date">01月15日</div>
            </div>
            <div class="live-leaveTime time">
              <div class="live-time">离店时间</div>
              <div class="live-date">01月17日</div>
            </div>
          </div>
        </div>
        <div class="reservation-btn">
          <van-button
            type="primary"
            color="linear-gradient(to right, #ffdd55, #ffbb00)"
            >立即预订</van-button
          >
        </div>
      </div>
      <div class="safeguard-wrapper">
        <i class="iconfont icon-diji-copy"></i>
        <div class="safe-title">官方渠道低价保障</div>
      </div>
    </div>

    <!-- 房间类型 -->
    <div class="rooms-wrapper">
      <div class="roomInfo-wrapper">
        <div class="room-info">
          <div class="room-pic">
            <img
              src="https://img01.yzcdn.cn/vant/apple-1.jpg"
              class="roomImg"
            />
          </div>
          <div class="room-kindInfo">
            <div class="room-title">
              <div class="room-kind-title">商务双床房</div>
              <div class="show-roomInfo">
                <van-icon name="arrow" />
              </div>
            </div>
            <div class="room-desc">1.2米双床，有窗</div>
          </div>
        </div>
        <div class="show-kind-room">
          <div class="room-price">
            <div class="price-wrapper">
              <div class="price">￥158</div>
              <div class="over">起</div>
            </div>
            <div class="shop-price">
              <div class="shop-sign">门市价</div>
              <div class="shopPrice">￥210</div>
            </div>
          </div>
          <div class="arrow-right">
            <van-icon name="arrow-up" />
          </div>
        </div>
      </div>
    </div>

    <nav-bar></nav-bar>
  </div>
</template>

<script>
import { ImagePreview } from "vant";
import navBar from "@/components/navBar";
export default {
  components: { 
    navBar 
  },
  data() {
    return {
      images: [
        "https://img01.yzcdn.cn/vant/apple-1.jpg",
        "https://img01.yzcdn.cn/vant/apple-2.jpg",
      ],
      rate: 3.5,
      activeNames: ["1"],
    };
  },
  methods: {
    preview(images, idx) {
      ImagePreview({
        images: images,
        startPosition: idx,
      });
    },
  },
};
</script>

<style lang="less">
.wrapper {
  width: 100%;
  height: calc(100vh - 50px);
  overflow-y: scroll;
  background: #f2f3f5;
}
.lunbo-wrapper,
.swipe,
.swipe-img {
  width: 100%;
  height: 200px;
  position: relative;
}

.hotel-name {
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  position: absolute;
  margin-top: -40px;
  color: #ffffff;
  font-family: "楷体";
  font-weight: bold;
  background: #aaa;
  font-size: 20px;
  opacity: 0.4;
}

.baseInfo-wrapper {
  background: #ffffff;
  padding: 10px;
}

.rate-wrapper,
.rate-icon,
.address-wrapper,
.address-icon,
.info-wrapper,
.base-info-icon,
.safeguard-wrapper,
.live-info-wrapper,
.live-info,
.time,
.roomInfo-wrapper,
.room-info,
.show-kind-room,
.room-title,
.price-wrapper,
.show-price {
  display: flex;
  align-items: center;
}

.rate-wrapper,
.address-wrapper,
.live-info-wrapper,
.info-wrapper,
.time,
.roomInfo-wrapper {
  justify-content: space-between;
}

.rate-grade {
  color: #ffaa33;
  margin-left: 5px;
  font-size: 14px;
}

.comment-count {
  font-size: 16px;
  margin-left: 12px;
  color: #8d8d8d;
}

.address-wrapper,
.info-wrapper {
  margin-top: 10px;
  border-top: 1px solid #aaa;
  padding-top: 10px;
}

.address {
  margin-left: 5px;
  font-size: 12rpx;
  color: #aaa;
}

.baseInfo-wrapper .iconfont {
  width: 30px;
  height: 30px;
}

.infoIcon {
  text-align: center;
  font-size: 10px;
  color: #aaa;
  margin-left: 8px;
}

.info-name {
  margin-top: 5px;
}

.reservation-wrapper {
  margin: 10px;
  background: #ffffff;
  padding: 15px;
  border-radius: 5px;
}

.live-info {
  flex: 1;
}

.live-day {
  color: #ffffff;
  padding: 12px;
  border-radius: 50%;
  background: #ff8c00;
}

.live-time {
  flex: 1;
  color: #ffd700;
}

.live-startTime {
  padding-bottom: 10px;
  border-bottom: 1px solid #888;
}

.live-leaveTime {
  padding-top: 10px;
}

.live-date {
  font-weight: bold;
}

.reservation-btn {
  margin-left: 10px;
}

.safeguard-wrapper {
  width: 100%;
  color: #e0620d;
  text-align: center;
  justify-content: center;
  font-size: 12px;
  margin-top: 10px;
}

.safe-title {
  margin-left: 5px;
}

.rooms-wrapper {
  background: #ffffff;
  padding: 15px;
}

.roomInfo-wrapper {
  border-bottom: 1px solid #000;
}

.roomInfo-wrapper:last-child {
  border-bottom: none;
}

.room-kindInfo {
  margin-left: 5px;
}

.room-title {
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 16px;
  font-family: '楷体';
}

.room-desc {
  color: #aaa;
  font-size: 12px;
}

.room-price {
  margin-right: 10px;
}

.price {
  font-weight: bold;
  color: #e0620d;
  font-size: 24px;
}

.over {
  font-size: 10px;
  margin-left: 2px;
  color: #aaa;
}

.shop-price {
  font-size: 12px;
  margin-top: 10px;
  color: #aaa;
}

.roomImg {
  width: 80px;
  height: 100px;
}

.shopPrice {
  margin-right: 5px;
  text-decoration: line-through;
}

.shop-sign, .shopPrice {
  display: inline-block;
}
</style>
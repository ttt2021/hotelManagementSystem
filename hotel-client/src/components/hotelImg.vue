<template>
  <div class="imgs-wrapper">
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, idx) in imagesList">
        <img :src="image">
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imagesList: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      this.$http.getImgList().then(res => {
        console.log(res)
        res = JSON.parse(res)
        this.imagesList = res.data
      })
    }
  },
};
</script>

<style lang="less" scoped>
img {
  width: 100%;
  height: 521px;
}
</style>
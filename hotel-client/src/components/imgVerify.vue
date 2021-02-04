<template>
  <!-- 验证码校验 -->
  <div class="img-verify">
    <canvas ref="verify" :width="width" :height="height" @click="handleDraw"></canvas>
  </div>
</template>

<script>
export default {
  data () {
    return {
      identifyCode: '',
      verify: null
      // identifyCodes: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890',
      // width: 120,
      // height: 40
    }
  },
  props: {
    identifyCodes: {
      type: String,
      default: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
    },
    width: {
      type: Number,
      default: 120
    },
    height: {
      type: Number,
      default: 40
    },
    watch: {
      identifyCode() {
        this.draw()
      }
    }
  },
  mounted() {
    this.identifyCode = this.draw()
  },
  methods: {
    // 生成一个随机整数
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    // 生成一个随机颜色
    randomColor(min, max) {
      let r = this.randomNum(min, max)
      let g = this.randomNum(min, max)
      let b = this.randomNum(min, max)
      return `rgb(${r}, ${g}, ${b})`
    },
    // 绘制图片
    draw() {
      // 拿到画布
      let ctx = this.$refs.verify.getContext("2d");
      // 填充背景色
      ctx.fillStyle = this.randomColor(180, 230)
      // 填充的位置
      ctx.fillRect(0, 0, this.width, this.height)
      // 绘制内容
      let identifyCode = ''
      // 随机生成长度为4的字符串
      for (let i = 0; i < 4; i++) {
        // 随机生成单个字符
        const text = this.identifyCodes[this.randomNum(0, this.identifyCodes.length)]
        identifyCode += text
        // 随机字体大小
        const fontSize = this.randomNum(18, 40)
        // 字体随机旋转角度
        const deg = this.randomNum(-30, 30)
        ctx.font = fontSize +  'px Simhei'
        ctx.textBaseline = 'top'
        ctx.fillStyle = this.randomColor(80, 150)
        ctx.save() // 保存，入栈
        ctx.translate(30 * i + 15, 15)
        ctx.rotate((deg * Math.PI) / 180)
        // 文字绘制到画布上
        ctx.fillText(text, -10, -15)
        ctx.restore() // 恢复原来的值，出栈
      }
      // 随机生成5条干扰线条
      for (let i = 0; i < 5; i++) {
        ctx.beginPath()
        ctx.moveTo(this.randomNum(0, this.width), this.randomNum(0, this.height))
        ctx.lineTo(this.randomNum(0, this.width), this.randomNum(0, this.height))
        ctx.strokeStyle = this.randomColor(180, 230)
        ctx.closePath()
        ctx.stroke()
      }
      // 随机产生40个干扰的小点
      for (let i = 0; i < 40; i++) {
        ctx.beginPath()
        ctx.arc(this.randomNum(0, this.width), this.randomNum(0, this.height), 1, 0, 2 * Math.PI)
        ctx.closePath()
        ctx.fillStyle = this.randomColor(150, 200)
        ctx.fill()
      }
      return identifyCode
    },
    handleDraw() {
      this.identifyCode = this.draw()
      console.log(this.identifyCode)
    }
  }
}
</script>

<style>

</style>
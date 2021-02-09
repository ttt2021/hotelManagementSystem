<template>
  <div class="wrapper">
    <div class="title-wrapper">
      <i class="el-icon-edit-outline"></i>
      <div class="title">设置头像</div>
    </div>
    <div class="cropper-container">
      <div class="cropper-operation">
        <div class="cropper-wrapper">
          <el-upload
            class="upload-demo"
            action=""
            drag
            :auto-upload="false"
            :show-file-list="false"
            :on-change="changeUpload"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">点击上传</div>
            <div class="el-upload__tip">支持绝大多数图片格式</div>
            <div class="el-upload__tip">单张图片最大支持5MB</div>
          </el-upload>
        </div>
        <div class="upload-btn" v-if="show">
          <el-button @click="show = false">取消</el-button>
          <el-button type="primary" @click="finish" :loading="loading"
            >确认</el-button
          >
        </div>
      </div>
      <div class="cropper-content" v-if="show">
        <div class="cropper" style="text-align: center">
          <vueCropper
            ref="cropper"
            :img="option.img"
            :outputSize="option.size"
            :outputType="option.outputType"
            :info="true"
            :canScale="option.canScale"
            :autoCrop="option.autoCrop"
            :autoCropWidth="option.autoCropWidth"
            :autoCropHeight="option.autoCropHeight"
            :fixedBox="option.fixedBox"
            :fixed="option.fixed"
            :fixedNumber="option.fixedNumber"
            :canMove="option.canMove"
            :canMoveBox="option.canMoveBox"
            :original="option.original"
            :centerBox="option.centerBox"
            :infoTrue="option.infoTrue"
            :full="option.full"
            :enlarge="option.enlarge"
            :mode="option.mode"
            @realTime="realTime"
          >
          </vueCropper>
        </div>
      </div>
      <div class="file-image" v-if="show">
        <img :src="fileImg" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import { VueCropper } from "vue-cropper";
export default {
  components: {
    VueCropper,
  },
  data() {
    return {
      fileImg: "",
      // 裁剪组件的基础配置option
      option: {
        img: "", // 裁剪图片的地址
        outputSize: 1, // 裁剪生成图片的质量
        outputType: "jpeg", // 裁剪生成图片的格式
        info: true, // 裁剪框的大小信息
        canScale: true, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 120, // 默认生成截图框宽度
        autoCropHeight: 120, // 默认生成截图框高度
        fixedBox: false, // 固定截图框大小 不允许改变
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [1, 1], // 截图框的宽高比例
        canMove: false, // 上传图片是否可以移动
        canMoveBox: true, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: true, // 截图框是否被限制在图片里面
        infoTrue: true, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
        full: true, // 是否输出原图比例的截图
        enlarge: "1", // 图片根据截图框输出比例倍数
        mode: "contain", // 图片默认渲染方式
      },
      // 防止重复提交
      loading: false,
      show: false,
      imgList: [],
    };
  },
  methods: {
    // 上传按钮 限制图片大小
    changeUpload(file, fileList) {
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        this.$message.error("上传文件大小不能超过5MB!");
        return false;
      }

      // 上传成功后将图片地址赋值给裁剪框显示图片
      this.$nextTick(() => {
        this.option.img = URL.createObjectURL(file.raw);
        this.show = true;
      });
    },
    // 实时预览
    realTime() {
      // 可获取截图的base64 数据
      this.$refs.cropper.getCropData((data) => {
        this.fileImg = data;
      });
    },
    // 点击裁剪，这一步是可以拿到处理后的地址
    finish() {
      this.loading = true;
      let token = JSON.parse(localStorage.getItem("token"));
      let userId = token.userId;
      console.log(this.fileImg);

      // 把图片base64数据传到服务端
      this.$http
        .uploadAvatar({
          userId: userId,
          avatar: this.fileImg,
        })
        .then((res) => {
          console.log(res);
          res = JSON.parse(res);
          this.show = false;
          this.loading = false;
          if (res.code == 0) {
            this.$message({
              showClose: true,
              message: `${res.msg}，请重新设置`,
              type: "error",
            });
            return;
          } else {
            // 修改本地存储的信息，并更新本地信息
            token.avatar = this.fileImg;
            localStorage.setItem("token", JSON.stringify(token));
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
.title-wrapper {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  font-size: 16px;
  font-family: "楷体";
  font-weight: bold;
  color: #8d8d8d;
}

.title {
  margin-left: 5px;
}

.cropper-operation {
  margin: 0 20px;
}

.file-image img {
  width: 100px;
  height: 100px;
}

.cropper-container {
  height: 320px;
  background: #fff;
  padding: 20px;
  display: flex;
}

/deep/.el-upload-dragger {
  width: 200px;
  height: 200px;
}

/deep/.el-upload-dragger .el-icon-upload {
  margin-top: 35px;
}

/deep/.el-upload__tip {
  text-align: center;
  margin-top: 5px;
}

.cropper-wrapper {
  margin-top: 20px;
}

.cropper {
  width: 420px;
  height: 280px;
  margin-top: 20px;
}

.file-image {
  margin: 20px;
}

.upload-btn {
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
}
</style>
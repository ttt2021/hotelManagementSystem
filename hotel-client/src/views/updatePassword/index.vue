<template>
  <div class="wrapper">
    <div class="title-wrapper">
      <i class="el-icon-edit-outline"></i>
      <div class="title">修改密码</div>
    </div>
    <div class="password-wrapper">
      <van-field v-model="oldPwd" type="password" label="原密码" />
      <van-field v-model="newPwd" type="password" label="新密码" />
      <van-field v-model="reNewPwd" type="password" label="确认密码" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      oldPwd: '',
      newPwd: '',
      reNewPwd: ''
    }
  },
}
</script>

<style lang="less" scoped>

</style>
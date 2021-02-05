// 密码加密解密函数
const bcrypt = require('bcrypt')

// 将传过来的password按照加密次数saltTimes进行加密
const encrypt = async (password, saltTimes) => {
  const hash = await bcrypt.hash(password, saltTimes)
  return hash
}

// 解密
const validate = async (password, saltTimes) => {
  const match = await bcrypt.compare(password, saltTimes)
  return match
}

module.exports = {
  validate,
  encrypt
}
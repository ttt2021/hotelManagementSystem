const mongoose = require('mongoose')

const Schema = mongoose.Schema
const UserSchema = new Schema({
    userId: {  // 在需要取出来的值后面加上require
      type: String,
      unique: true,
      require: true
    },
    workNum: { // 员工号
      type: String
    },
    auth: { // 权限
      type: Number
    },
    username: { // 员工姓名
      type: String
    },
    avatar: { // 头像
      type: String
    },
    job: { // 职务
      type: String
    },
    age: { // 年龄
      type: Number
    },
    sex: { // 性别
      type: String
    },
    tel: { // 手机号
      type: String
    },
    address: { // 地址
      type: String
    },
    email: { // 电子邮件
      type: String
    },
    idCard: { // 身份证
      type: String
    },
    brith: { // 出生日期
      type: String
    },
    entryData: { // 入职日期
      type: String
    },
    status: { // 状态
      type: String
    },
    leaveData: { // 离职日期
      type: String 
    },
    remarks: { // 备注
      type: String
    }
  }, { collection: 'user', versionKey: false});
  
  module.exports = mongoose.model('user', UserSchema);
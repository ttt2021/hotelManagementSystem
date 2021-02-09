const mongoose = require('mongoose')

const Schema = mongoose.Schema
const PositionSchema = new Schema({
    positionId: {  // 在需要取出来的值后面加上require
      type: String,
      unique: true,
      require: true
    },
    position: { // 职位
      type: String
    },
    auth: { // 权限
      type: Number
    },
    positionDesc: { // 职位描述
      type: String
    },
    addTime: { // 添加时间
      type: String
    },
    addUserId: { // 添加人userId
      type: String
    },
    status: { // 状态
      type: Number
    }
  }, { collection: 'position', versionKey: false});
  
  module.exports = mongoose.model('position', PositionSchema);
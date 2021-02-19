const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomDetailSchema = new Schema({
  roomId: {  // 在需要取出来的值后面加上require
    type: String,
    unique: true,
    require: true
  },
  num: { // 房间号
    type: String,
  },
  name: { // 房间名称
    type: String,
  },
  price: { // 单价
    type: Number,
  },
  region: { // 房间状态
    type: String,
  },
  drinkings: { // 酒水
    type: Array,
  },
  kind: { // 房间类型
    type: String
  },
  addUser: { // 添加人
    type: String,
  },
  addTime: { // 添加时间
    type: String
  },
  remark: { // 备注
    type: String,
  }
}, { collection: 'roomDetail', versionKey: false});

module.exports = mongoose.model('roomDetail', roomDetailSchema);
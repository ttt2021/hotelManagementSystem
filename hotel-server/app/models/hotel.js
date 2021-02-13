const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HotelSchema = new Schema({
  username: { // 修改人
    type: String
  },
  updateTime: { // 修改时间
    type: String
  },
  profile: { // 简介
    type: String
  },
  tel: { // 酒店电话
    type: String
  },
  catering: { //餐饮服务
    type: String
  },
  name: { // 酒店名称
    type: String
  },
  address: { // 酒店地址
    type: String
  },
  pet: { // 宠物
    type: String
  },
  receive: { // 接待外宾
    type: String
  },
  fileList: { // 酒店图片
    type: Array
  },
  roomSetting: { // 房间设施
    type: String
  },
  certificate: { 
    type: String
  },
  entertainment: { // 娱乐设施
    type: String
  },
  payment: { // 支付方式
    type: String
  },
  frontDesk: { // 前台服务
    type: String
  },
  room: { // 房间服务
    type: String
  },
  base: { 
    type: String
  },
  transport: { // 交通服务
    type: String
  },
  business: { // 商务服务
    type: String
  }
}, { collection: 'hotel', versionKey: false});

module.exports = mongoose.model('hotel', HotelSchema);
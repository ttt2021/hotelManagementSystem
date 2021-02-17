const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
  roomKindId: {  // 在需要取出来的值后面加上require
    type: String,
    unique: true,
    require: true
  },
  kind: {  // 客房类型
    type: String,
  },
  price: {  // 客房最低价格
    type: Number,
  },
  count: {  // 客房数量
    type: Number,
  },
  rank: {  // 客房星级
    type: String,
  },
  area: {  // 客房面积
    type: String,
  },
  bedWidth: {  // 床宽
    type: String,
  },
  bedStyle: {  // 床型
    type: String,
  },
  liveCount: {  // 入住人数
    type: String,
  },
  remark: {  // 客房备注
    type: String,
  },
  window: { // 是否有窗
    type: String
  },
  floor: { // 楼层
    type: Number
  },
  smoking: { // 无烟房
    type: String
  },
  userId: {  // 客房添加人id
    type: String,
  },
  username: {  // 客房添加人
    type: String,
  },
  addTime: {  // 客房时间
    type: String,
  }
}, { collection: 'room', versionKey: false});

module.exports = mongoose.model('room', RoomSchema);
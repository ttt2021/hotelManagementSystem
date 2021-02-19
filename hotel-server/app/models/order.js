const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  orderId: {  // 在需要取出来的值后面加上require
    type: String,
    unique: true,
    require: true
  },
  roomId: { // 房间号
    type: String,
  },
  orderName: { // 姓名
    type: String,
  },
  orderSex: { // 性别
    type: String,
  },
  orderIdCard: { // 证件号
    type: String,
  },
  orderTel: { // 手机号
    type: String
  },
  orderTime: { // 开房时间
    type: String
  },
  expectedCheckout: { // 预期退房时间
    type: String
  },
  totalCost: { // 总费用
    type: String
  },
  addUser: { // 添加人
    type: String,
  },
  remark: { // 备注
    type: String
  }
}, { collection: 'order', versionKey: false});

module.exports = mongoose.model('order', OrderSchema);
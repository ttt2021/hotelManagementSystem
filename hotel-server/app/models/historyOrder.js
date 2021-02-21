const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HistoryOrderSchema = new Schema({
  orderId: {  // 在需要取出来的值后面加上require 订单号
    type: String,
    unique: true,
    require: true
  },
  roomId: { // 房间id号
    type: String,
  },
  order1Name: { // 姓名
    type: String,
  },
  order1Sex: { // 性别
    type: String,
  },
  order1IdCard: { // 证件号
    type: String,
  },
  order2Name: { // 姓名
    type: String,
  },
  order2Sex: { // 性别
    type: String,
  },
  order2IdCard: { // 证件号
    type: String,
  },
  order3Name: { // 姓名
    type: String,
  },
  order3Sex: { // 性别
    type: String,
  },
  order3IdCard: { // 证件号
    type: String,
  },
  order4Name: { // 姓名
    type: String,
  },
  order4Sex: { // 性别
    type: String,
  },
  order4IdCard: { // 证件号
    type: String,
  },
  orderTime: { // 开房时间
    type: String
  },
  expectedCheckout: { // 预期退房时间
    type: String
  },
  checkOutTime: { // 退房时间
    type: String
  },
  totalCost: { // 总费用
    type: Number
  },
  actualCost: { // 实际房费
    type: Number
  },
  prevCost: { // 预先支付
    type: Number
  },
  addUser: { // 添加人
    type: String,
  },
  drinkings: { // 消费的酒水
    type: Array
  },
  drinkingsCost: { // 酒水费用
    type: Number
  },
  checkOutUser: { // 退房登记人
    type: String
  },
  remark: { // 备注
    type: String
  }
}, { collection: 'historyOrder', versionKey: false});

module.exports = mongoose.model('historyOrder', HistoryOrderSchema);
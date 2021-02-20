const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  orderId: {  // 在需要取出来的值后面加上require
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
  totalCost: { // 费用
    type: String
  },
  addUser: { // 添加人
    type: String,
  },
  remark: { // 备注
    type: String
  }
}, { collection: 'book', versionKey: false});

module.exports = mongoose.model('book', BookSchema);
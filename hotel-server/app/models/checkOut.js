const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CheckOutSchema = new Schema({
  orderId: {  // 在需要取出来的值后面加上require
    type: String,
    unique: true,
    require: true
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
}, { collection: 'checkOut', versionKey: false});

module.exports = mongoose.model('checkOut', CheckOutSchema);
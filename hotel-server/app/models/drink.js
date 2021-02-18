const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DrinkSchema = new Schema({
  drinkId: {  // 在需要取出来的值后面加上require
    type: String,
    unique: true,
    require: true
  },
  name: { // 酒水名称
    type: String,
  },
  price: { // 酒水单价
    type: Number,
  },
  addUser: { // 添加人
    type: String,
  },
  addTime: { // 添加时间
    type: String
  }
}, { collection: 'drink', versionKey: false});

module.exports = mongoose.model('drink', DrinkSchema);
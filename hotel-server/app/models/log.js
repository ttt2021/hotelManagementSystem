const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LogSchema = new Schema({
  userId: {  // 在需要取出来的值后面加上require
    type: String,
    unique: true,
    require: true
  },
  username: { 
    type: String,
  },
  text: { // 日志内容
    type: String
  },
  logTime: { // 日志时间
    type: String
  }
}, { collection: 'log', versionKey: false});

module.exports = mongoose.model('log', LogSchema);
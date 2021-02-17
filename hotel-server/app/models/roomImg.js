const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomImgSchema = new Schema({
  roomKindId: {  // 在需要取出来的值后面加上require
    type: String,
    unique: true,
    require: true
  },
  img: { 
    type: String,
  }
}, { collection: 'roomImg', versionKey: false});

module.exports = mongoose.model('roomImg', RoomImgSchema);
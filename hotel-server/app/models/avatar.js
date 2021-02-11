const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AvatarSchema = new Schema({
  userId: { 
    type: String,
    unique: true,
    required: true
  },
  avatar: { // 头像
    type: String
  }
}, { collection: 'avatar', versionKey: false});

module.exports = mongoose.model('avatar', AvatarSchema);
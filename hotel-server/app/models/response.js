const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResponseSchema = new Schema({
  responseId: { 
    type: String,
    unique: true,
    required: true
  },
  content: { // 评论内容
    type: String
  },
  name: { // 评论者
    type: String
  },
  time: { // 评论时间
    type: String
  },
  articleId: { // 文章id
    type: String
  },
  commentId: { // 评论id
    type: String
  }
}, { collection: 'response', versionKey: false});

module.exports = mongoose.model('response', ResponseSchema);
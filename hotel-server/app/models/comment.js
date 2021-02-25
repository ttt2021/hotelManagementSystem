const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  commentId: { 
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
  }
}, { collection: 'comment', versionKey: false});

module.exports = mongoose.model('comment', CommentSchema);
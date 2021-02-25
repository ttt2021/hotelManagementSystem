const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  articleId: { 
    type: String,
    unique: true,
    required: true
  },
  theme: { // 主题
    type: String
  },
  content: { // 内容
    type: String
  },
  status: { // 状态
    type: String
  },
  addUser: { // 添加人
    type: String
  },
  addTime: { // 添加时间
    type: String
  },
  updatedUser: { // 修改人
    type: String
  },
  updatedTime: { // 修改时间
    type: String
  },
  checkUser: { // 审核人
    type: String
  },
  checkTime: { // 审核时间
    type: String
  },
  viewCount: { // 浏览次数
    type: String
  }
}, { collection: 'article', versionKey: false});

module.exports = mongoose.model('article', ArticleSchema);
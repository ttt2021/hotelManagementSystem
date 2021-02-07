const Koa = require('koa')
const cors = require('koa2-cors')
const session = require('koa-session')
const bodyParser = require('koa-bodyparser')  // 解析参数
const mongoose = require('mongoose')  // 做mongodb连接
const config = require('./config')

const app = new Koa()

// 建立mongodb连接
mongoose.connect(config.db, { useNewUrlParser: true }, (err) => {
  if (err) {
    console.log('Failed to connect to database');
  } else {
    console.log('Connecting database successfully');
  }
})

app.use(cors()); // 解决跨域
app.use(bodyParser()); // 帮助koa解析参数
app.use(session({      //使用session
  key: 'koa.sess',
  maxAge: 1000 * 60 * 30, //设置cookie最大时长
  renew: false,
  secure: true
}, app))

const user_router = require('./routes/api/user_router')
app.use(user_router.routes())

app.listen(config.port)  // 监听端口
const Koa = require('koa')
const cors = require('@koa/cors')
const session = require('koa-session')
const koaBody = require('koa-body');
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
// 解决数据请求过大问题
app.use(koaBody({
    multipart: true,
    formLimit:"10mb",
    jsonLimit:"10mb"
}));
app.use(bodyParser({
    formLimit:"10mb",
    jsonLimit:"10mb"
})); // 帮助koa解析参数
app.use(session({      //使用session
  key: 'koa.sess',
  maxAge: 1000 * 60 * 30, //设置cookie最大时长
  renew: false,
  secure: true
}, app))

const user_router = require('./routes/api/user_router')
const position_router = require('./routes/api/position_router')
const hotel_router = require('./routes/api/hotel_router')
const room_router = require('./routes/api/room_router')
const drink_router = require('./routes/api/drink_router')
app.use(user_router.routes())
app.use(position_router.routes())
app.use(hotel_router.routes())
app.use(room_router.routes())
app.use(drink_router.routes())

app.listen(config.port)  // 监听端口
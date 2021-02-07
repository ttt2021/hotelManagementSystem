const Router = require('koa-router')
const router = new Router()
const user_controller = require('../../app/controllers/user_controller')

// 调用控制层(user_controller)里的login方法
router.post('/login', user_controller.login)// 拿到前端传过来的参数，去数据库里匹配是否存在
router.post('/modifyPwd', user_controller.modifyPwd)
router.post('/logout', user_controller.logout)
router.post('/unlock', user_controller.unlock)

module.exports = router
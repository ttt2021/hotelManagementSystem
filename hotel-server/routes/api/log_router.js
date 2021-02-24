const Router = require('koa-router')
const router = new Router()
const log_controller = require('../../app/controllers/log_controller')

router.post('/getHomeLogList', log_controller.getHomeLogList)
router.post('/getLogList', log_controller.getLogList)
router.post('/searchLogList', log_controller.searchLogList)

module.exports = router
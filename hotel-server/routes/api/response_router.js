const Router = require('koa-router')
const router = new Router()
const response_controller = require('../../app/controllers/response_controller')

router.post('/getResponse', response_controller.getResponse)
router.post('/delResponse', response_controller.delResponse)

module.exports = router
const Router = require('koa-router')
const router = new Router()
const response_controller = require('../../app/controllers/response_controller')

router.post('/getResponse', response_controller.getResponse)
router.post('/delResponse', response_controller.delResponse)
router.post('/responsesList', response_controller.responsesList)
router.post('/searchResponse', response_controller.searchResponse)

module.exports = router
const Router = require('koa-router')
const router = new Router()
const position_controller = require('../../app/controllers/position_controller')

router.post('/addPosition', position_controller.addPosition)
router.post('/showPositionInfo', position_controller.showPositionInfo)
router.post('/updateStatus', position_controller.updateStatus)
router.post('/updatePositionInfo', position_controller.updatePositionInfo)
router.post('/deletePosition', position_controller.deletePosition)

module.exports = router
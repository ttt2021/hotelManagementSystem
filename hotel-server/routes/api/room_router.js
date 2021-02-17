const Router = require('koa-router')
const router = new Router()
const room_controller = require('../../app/controllers/room_controller')

router.post('/addRoomKind', room_controller.addRoomKind)
router.post('/getRoomKind', room_controller.getRoomKind)
router.post('/getKindImg', room_controller.getKindImg)

module.exports = router
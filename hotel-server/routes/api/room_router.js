const Router = require('koa-router')
const router = new Router()
const room_controller = require('../../app/controllers/room_controller')

router.post('/addRoomKind', room_controller.addRoomKind)
router.post('/getRoomKind', room_controller.getRoomKind)
router.post('/getKindImg', room_controller.getKindImg)
router.post('/updatedRoomKind', room_controller.updatedRoomKind)
router.post('/addRoom', room_controller.addRoom)
router.post('/getRoomList', room_controller.getRoomList)
router.post('/delRoom', room_controller.delRoom)
router.post('/updatedRoom', room_controller.updatedRoom)

module.exports = router
const Router = require('koa-router')
const router = new Router()
const hotel_controller = require('../../app/controllers/hotel_controller')

router.post('/updateHotelInfos', hotel_controller.updateHotelInfos)
router.post('/getHotelInfo', hotel_controller.getHotelInfo)

module.exports = router
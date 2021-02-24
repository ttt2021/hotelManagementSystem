const Router = require('koa-router')
const router = new Router()
const infos_controller = require('../../app/controllers/infos_controller')

router.post('/getDataInfo', infos_controller.getDataInfo)
router.post('/getRestRoom', infos_controller.getRestRoom)
router.post('/latestOrderList', infos_controller.latestOrderList)
router.post('/latestOrdeUserList', infos_controller.latestOrdeUserList)
router.post('/getImgList', infos_controller.getImgList)

module.exports = router
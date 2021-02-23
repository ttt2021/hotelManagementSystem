const Router = require('koa-router')
const router = new Router()
const statistics_controller = require('../../app/controllers/statistics_controller')

router.post('/getDayStatistics', statistics_controller.getDayStatistics)
router.post('/getRangeStatistics', statistics_controller.getRangeStatistics)
router.post('/getYearStatistics', statistics_controller.getYearStatistics)

module.exports = router
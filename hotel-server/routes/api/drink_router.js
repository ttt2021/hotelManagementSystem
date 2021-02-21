const Router = require('koa-router')
const router = new Router()
const drink_controller = require('../../app/controllers/drink_controller')

router.post('/addDrinking', drink_controller.addDrinking)
router.post('/getDrinkList', drink_controller.getDrinkList)
router.post('/updateDrink', drink_controller.updateDrink)
router.post('/delDrink', drink_controller.delDrink)
router.post('/checkDrinkList', drink_controller.checkDrinkList)
router.post('/updateDrinkList', drink_controller.updateDrinkList)

module.exports = router
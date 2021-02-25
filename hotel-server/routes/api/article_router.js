const Router = require('koa-router')
const router = new Router()
const article_controller = require('../../app/controllers/article_controller')

router.post('/uploadArticle', article_controller.uploadArticle)
router.post('/getArticleList', article_controller.getArticleList)
router.post('/delArticle', article_controller.delArticle)
router.post('/getArticleInfo', article_controller.getArticleInfo)
router.post('/updatedArticle', article_controller.updatedArticle)
router.post('/searchArticle', article_controller.searchArticle)
router.post('/updateView', article_controller.updateView)
router.post('/getCheckList', article_controller.getCheckList)
router.post('/updatedStatus', article_controller.updatedStatus)

module.exports = router
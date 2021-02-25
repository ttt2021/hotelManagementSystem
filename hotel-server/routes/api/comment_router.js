const Router = require('koa-router')
const router = new Router()
const comment_controller = require('../../app/controllers/comment_controller')

router.post('/getComment', comment_controller.getComment)
router.post('/getCommentList', comment_controller.getCommentList)
router.post('/delComment', comment_controller.delComment)

module.exports = router
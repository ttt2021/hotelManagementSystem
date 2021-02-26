const Router = require('koa-router')
const router = new Router()
const comment_controller = require('../../app/controllers/comment_controller')

router.post('/getComment', comment_controller.getComment)
router.post('/getCommentList', comment_controller.getCommentList)
router.post('/delComment', comment_controller.delComment)
router.post('/commentsList', comment_controller.commentsList)
router.post('/searchComment', comment_controller.searchComment)
router.post('/getMyComments', comment_controller.getMyComments)
router.post('/getMyCommentsList', comment_controller.getMyCommentsList)

module.exports = router
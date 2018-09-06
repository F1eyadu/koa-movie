const Router = require('koa-router')
let router = new Router()


router.get('/', async(ctx, next) => {
    ctx.render('index')
})

module.exports = router
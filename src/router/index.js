const Router = require('koa-router')
let router = new Router()
const Db = require('./../moudel/db')


router.get('/', async(ctx, next) => {
    let data = await Db.find('list',{})
    ctx.body = data
    console.log(data)
})

module.exports = router
const Koa  = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const session = require('koa-session')
let app = new Koa ()
let router = new Router()

app.keys = ['some secret hurr']
const CONFIG = {
    key: 'koa:sess', 
    maxAge: 86400000,
    autoCommit: true, 
    overwrite: true, 
    httpOnly: true, 
    signed: true,
    rolling: true, 
    renew: true, 
  };
app.use(session(CONFIG, app))

app.use(async (ctx, next) => {//bodyParser中间件
   await bodyParser()
   await next();
})
app.use(async(ctx, next) => {//自定义中间件
    console.log('server')
    await next()
})


const index = require('./router/index')

router.use('/index', index.routes())


app.use(router.routes())
app.use(router.allowedMethods())
app.listen(3300)


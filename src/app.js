const Koa  = require('koa')
const Router = require('koa-router')
const render = require('koa-art-template')
const bodyParser = require('koa-bodyparser')
const static = require('koa-static')
const path = require('path')
const session = require('koa-session')
let app = new Koa ()
let router = new Router()
app.use(static(__dirname + '/public'))
//模板引擎
render(app, {
    root: path.join(__dirname, 'view'),
    extname: '.html',
    debug: process.env.NODE_ENV !== 'production'
  })
//session
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
//bodyParser中间件
app.use(async (ctx, next) => {
   await bodyParser()
   await next();
})

const index = require('./router/index')

router.use('/index', index.routes())


app.use(router.routes())
app.use(router.allowedMethods())
app.listen(3300)


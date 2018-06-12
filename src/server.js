const logger = require('koa-logger')
const router = require('./router.js')
const db = require('./db.js')
const koaBody = require('koa-body')

const Koa = require('koa')
const app = new Koa()

// middleware
app.use(logger())
app.use(koaBody())

app.use(db)
app.use(router.routes())


app.listen(3000)

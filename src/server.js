const logger = require('koa-logger')
const router = require('./router.js')
const db = require('./db.js')
const koaBody = require('koa-body')

const Koa = require('koa')
const app = new Koa()

// middleware
app.use(db.open)
app.use(logger())
app.use(koaBody())
app.use(router.routes())
app.use(db.close)



db.init().then(()=>{
  app.listen(3000)
}).catch(error => {
  console.log(error)
})

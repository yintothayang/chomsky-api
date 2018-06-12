var r = require('rethinkdb')

const config = {
  host: "localhost",
  port: 28015,
  authKey: "",
  db: "chomsky"
}

module.exports = async (ctx, next) => {
  ctx.db_conn = await r.connect(config)
  await next()
}

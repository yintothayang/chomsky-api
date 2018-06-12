var r = require('rethinkdb')

async function create(ctx) {
  ctx.body = JSON.stringify(ctx.request)
  // const post = ctx.request.body
  // const id = posts.push(post) - 1
  // post.created_at = new Date()
  // post.id = id;
  // ctx.body = ''
}


async function list(ctx) {
  console.log("halp")
  // let cursor = await r.table('cards').orderBy({index: "createdAt"}).run(ctx.db_conn)
  // let result = await cursor.toArray()
  // console.log(result)
  // ctx.body = JSON.stringify(result)
}


async function update(ctx) {
  ctx.body = JSON.stringify(ctx.request)
}

async function remove(ctx) {
  ctx.body = JSON.stringify(ctx.request)
  // const id = ctx.params.id
  // const post = posts[id]
  // if (!post) ctx.throw(404, 'invalid post id')
  // ctx.body = ''
}




module.exports = {
  create,
  list,
  update,
  remove,
}

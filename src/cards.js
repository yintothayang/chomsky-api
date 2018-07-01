const TABLE_NAME = 'cards'
const r = require('rethinkdb')

async function create(ctx, next){
  try{
    let card = ctx.request.body
    card.createdAt = r.now()
    let result = await r.table(TABLE_NAME).insert(card, {returnChanges: true}).run(this.db_conn)

    card = result.changes[0].new_val
    this.body = JSON.stringify(card)
  }
  catch(e) {
    this.status = 500;
    this.body = e.message
  }
  await next()
}


async function list(ctx, next){
  let cursor = await r.table(TABLE_NAME).run(ctx.db_conn)
  let result = await cursor.toArray()
  ctx.body = JSON.stringify(result)
  await next()
}


async function update(ctx, next){
  try{
    var card = ctx.request.body
    delete card._saving
    if ((card == null) || (card.id == null)) {
      throw new Error("The card must have a field `id`.");
    }

    var result = await r.table(TABLE_NAME).get(card.id).update(card, {returnChanges: true}).run(this.db_conn)
    this.body = JSON.stringify(result.changes[0].new_val)
  }
  catch(e) {
    this.status = 500;
    this.body = e.message
  }
  await next()
}

async function remove(ctx, next){
  try{
    let card = ctx.request.body
    if ((todo == null) || (todo.id == null)) {
      throw new Error("The todo must have a field `id`.")
    }
    var result = await r.table(TABLE_NAME).get(todo.id).delete().run(this.db_conn)
    this.status = 200
    this.body = null
  }
  catch(e) {
    this.status = 500;
    this.body = e.message || http.STATUS_CODES[this.status];
  }
  await next()
}




module.exports = {
  create,
  list,
  update,
  remove,
}

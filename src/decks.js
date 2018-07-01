const TABLE_NAME = 'decks'
const r = require('rethinkdb')

async function create(ctx, next){
  try{
    let deck = ctx.request.body
    deck.createdAt = r.now()
    let result = await r.table(TABLE_NAME).insert(deck, {returnChanges: true}).run(this.db_conn)

    deck = result.changes[0].new_val
    this.body = JSON.stringify(deck)
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
    var deck = ctx.request.body
    delete deck._saving
    if ((deck == null) || (deck.id == null)) {
      throw new Error("The deck must have a field `id`.");
    }

    var result = await r.table(TABLE_NAME).get(deck.id).update(deck, {returnChanges: true}).run(this.db_conn)
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
    let deck = ctx.request.body
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

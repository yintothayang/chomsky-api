const r = require('rethinkdb')

const config = {
  host: "localhost",
  port: 28015,
  authKey: "",
  db: "chomsky"
}


class DB {
  constructor(){

  }

  async init(){
    let conn = await r.connect(config, (error, connection) => {
      if (error) {
        console.log("Could not open a connection to initialize the database")
        console.log(error.message)
        process.exit(1)
      }
      return connection
    })


    let all_dbs = await r.dbList().run(conn)
    if(!all_dbs.includes(config.db)){

      // Create DB
      let db = await r.dbCreate(config.db).run(conn)

      // Create Decks table
      let decks_table = await r.tableCreate('decks').run(conn)

      // Create Cards table
      let cards_table = await r.tableCreate('cards').run(conn)

    }

    await conn.close()
    console.log("database initialized")

  }

  async open(ctx, next){
    console.log("connection opened")
    ctx.db_conn = await r.connect(config)
    await next()
  }

  async close(ctx, next){
    console.log("connection closed")
    ctx.db_conn.close()
  }
}


module.exports = new DB()

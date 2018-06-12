const r = require('rethinkdb')
const l = console.log

async function init_db(){
  let connection = await r.connect( {host: 'localhost', port: 28015}, function(err, conn) {
    if (err) throw err
    return conn
  })

  r.db('test').tableCreate('authors').run(connection, function(err, result) {
    if (err) throw err;
    console.log(JSON.stringify(result, null, 2));
  })



}

init_db()

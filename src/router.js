const router = require('koa-router')()
const cards = require('./cards.js')
const decks = require('./decks.js')

router
  .post('/cards', cards.create)
  .get('/cards', cards.list)
  .put('/cards/:id', cards.update)
  .delete('/cards/:id', cards.remove)

router
  .post('/decks', decks.create)
  .get('/decks', decks.list)
  .put('/decks/:id', decks.update)
  .delete('/decks/:id', decks.remove)


module.exports = router

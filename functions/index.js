const functions = require('firebase-functions');

exports.translate = functions.https.onRequest((request, response) => {
  const Translate = require('@google-cloud/translate')
  const translate = new Translate({
    projectId: "einstein-213121"
  })

  let text = request.body.text
  let target = request.body.target

  try {
    translate
      .translate(text, target)
      .then(results => {
        let translations = results[0]
        translations = Array.isArray(translations) ? translations : [translations]
        response.send(JSON.stringify(translations))
      })
  } catch(e){
    response.send(JSON.stringify(e))
  }
})

exports.getLangs = functions.https.onRequest((request, response) => {
  const Translate = require('@google-cloud/translate')
  const translate = new Translate({
    projectId: "einstein-213121"
  })

  try {
    translate
      .getLanguages()
      .then(results => {
        response.send(JSON.stringify(results[0]))
      })
  } catch(e){
    response.send(JSON.stringify(e))
  }
})

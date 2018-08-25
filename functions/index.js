const functions = require('firebase-functions');

exports.translate = functions.https.onCall(async (data, context) => {
  const Translate = require('@google-cloud/translate')
  const translate = new Translate({
    projectId: "einstein-213121"
  })

  let text = data.text
  let target = data.target

  // console.log("text: ", text)
  // console.log("target: ", target)

  if(!text || !target){
    return {error: "text and target required"}
  }

  let translation
  try {
    translation = await translate
      .translate(text, target)
      .then(results => {
        // console.log("results :", results)
        // console.log("results[1] :", results[1])
        // console.log("results[1].data :", results[1].data)
        // console.log("results[1].data.translations :", results[1].data.translations)
        let translations = results[0]
        translations = Array.isArray(translations) ? translations : [translations]
        return translations
      })
  } catch(e){
    return e
  }

  return translation
})

exports.getLangs = functions.https.onCall((request, response) => {
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

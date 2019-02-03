
const wordGenerator = require('./wordGenerator')

function updateBoard () {
  console.log(wordGenerator.getNewWord())
}

module.exports.updateBoard = updateBoard

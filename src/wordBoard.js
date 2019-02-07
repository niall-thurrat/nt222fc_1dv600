
const wordGenerator = require('./wordGenerator')

function updateBoard () {
  return wordGenerator.getNewWord()
}

module.exports.updateBoard = updateBoard

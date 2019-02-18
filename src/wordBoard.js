
const wordGenerator = require('./wordGenerator')

function updateBoard () {
  return `SECRET WORD: ${wordGenerator.getNewWord()}`
}

module.exports.updateBoard = updateBoard

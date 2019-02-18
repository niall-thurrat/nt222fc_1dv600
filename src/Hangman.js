
const imageGenerator = require('./imageGenerator')
const wordBoard = require('./wordBoard')
const messageGenerator = require('./messageGenerator')

function PlayGame (test) {
  this.test = test

  this.test = function () {
    console.log(imageGenerator.getNewImage('banner'))
    console.log(imageGenerator.getNewImage('hangman-image'))
    console.log(wordBoard.updateBoard())
    console.log(messageGenerator.newMessage('new-game'))
    console.log('MENU will appear here')
  }
}

module.exports = {
  PlayGame: PlayGame
}

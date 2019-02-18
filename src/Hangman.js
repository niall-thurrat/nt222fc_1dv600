
const clear = require('clear')
const imageGenerator = require('./imageGenerator')
const wordBoard = require('./wordBoard')
const messageGenerator = require('./messageGenerator')

function PlayGame (test) {
  this.test = test

  this.test = function () {
    clear()
    console.log(imageGenerator.getNewImage('banner'))
    console.log(imageGenerator.getNewImage('hangman-image'))
    console.log(wordBoard.updateBoard('t', 2))
    console.log(messageGenerator.newMessage('new-game'))
    console.log('MENU will appear here\n\n\n\n\n')
  }
}

module.exports = {
  PlayGame: PlayGame
}

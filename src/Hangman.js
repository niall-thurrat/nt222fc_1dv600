
const clear = require('clear')
const readlineSync = require('readline-sync')

const imageGenerator = require('./imageGenerator')
const wordBoard = require('./wordBoard')
const messageGenerator = require('./messageGenerator')

function Hangman () {
  this.startScreen = function () {
    clear()
    console.log(imageGenerator.getNewImage('banner'))
    console.log(messageGenerator.newMessage('welcome'))
    console.log('MENU')

    const mainOptions = ['Play game', 'Quit application']

    let index = readlineSync.keyInSelect(mainOptions, 'What do you want to do?', { cancel: false })
    if (index === 0) {
      this.playGame()
    }
    if (index === 1) {
      console.log('### you\'re now terminating the app')
    }
  }

  this.playGame = function () {
    clear()
    console.log(imageGenerator.getNewImage('banner'))
    console.log(imageGenerator.getNewImage('hangman-image'))
    console.log(wordBoard.updateBoard('t', 2))
    console.log(messageGenerator.newMessage('new-game'))
    console.log('MENU')

    const gameOptions = ['Guess a letter', 'Quit game', 'Quit Application']

    let index = readlineSync.keyInSelect(gameOptions, 'What do you want to do?', { cancel: false })
    if (index === 0) {
      console.log('### guess a letter stuff')
    }
    if (index === 1) {
      console.log('### quitting')
    }
    if (index === 2) {
      console.log('### terminating!!')
    }
  }
}

module.exports = {
  Hangman: Hangman
}

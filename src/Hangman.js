
const clear = require('clear')
const readlineSync = require('readline-sync')

const imageGenerator = require('./imageGenerator')
const wordGenerator = require('./wordGenerator')
const wordUpdater = require('./wordUpdater')
const messageGenerator = require('./messageGenerator')

const LocalStorage = require('node-localstorage').LocalStorage
const localStorage = new LocalStorage('./localstorage')

let remainingTries = 2

/**
*
*
*/
function Hangman () {
  /*
  *
  *
  */
  this.startScreen = function () {
    clear()
    console.log(imageGenerator.getNewImage('banner'))
    console.log(messageGenerator.newMessage('welcome'))
    console.log('MENU')

    const mainOptions = ['Play game', 'Quit application']

    let index = readlineSync.keyInSelect(mainOptions, 'What do you want to do?', { cancel: false })

    // MAIN MENU OPTION 1 SELECTED (Play Game) - player is presented with the game screen
    if (index === 0) {
      this.playGame()
    }

    // MAIN MENU OPTION 2 SELECTED (Quit application) - clears terminal
    if (index === 1) {
      clear()
    }
  }

  /*
  *
  *
  */
  this.playGame = function (guessedLetter) {
    clear()

    // IF NEW GAME - no word exists yet - get a new word and save it in localstorage
    if (!localStorage.getItem('currentGameWord')) {
      let newWord = wordGenerator.getNewWord()
      let wordObject = { secretWord: newWord, progressWord: '', remainingTries: remainingTries }
      localStorage.setItem('currentGameWord', JSON.stringify(wordObject))
    }

    // send the secret word and guessed letter (if any) to wordUpdater
    // wordUpdater returns an updated word Object
    let parsedWordObject = wordUpdater.updateWord(localStorage.getItem('currentGameWord'), guessedLetter)

    // IF GAME IS LOST - no remaining tries
    if (parsedWordObject.remainingTries === 0) {
      localStorage.removeItem('currentGameWord')
      clear()
      console.log('\n\n    YOU LOSE!!!\n\n\n\n\n\n\n')
      setTimeout(function () { this.startScreen() }.bind(this), 2000)
      return
    }

    // print title banner and hangman image
    console.log(imageGenerator.getNewImage('banner'))
    console.log(imageGenerator.getNewImage('hangman-image-' + parsedWordObject.remainingTries))

    // store updated word object as a string in localstorage
    localStorage.setItem('currentGameWord', JSON.stringify(parsedWordObject))

    // print game details to termainal
    console.log(`SECRET WORD: ${parsedWordObject.progressWord}`)
    console.log(`REMAING TRIES: ${parsedWordObject.remainingTries}`)
    // console.log(messageGenerator.newMessage('game-message-' + parsedWordObject.remainingTries))

    // print menu title and options to terminal
    console.log('\nMENU')
    const gameOptions = ['Guess a letter', 'Quit game', 'Quit Application']
    let index = readlineSync.keyInSelect(gameOptions, 'What do you want to do?', { cancel: false })

    // GAME MENU OPTION 1 SELECTED (Guess a letter)
    if (index === 0) {
      let guessedLetter = readlineSync.question('What letter do you want to guess?  ')

      // if a single letter is guessed
      if (guessedLetter.length === 1) {
        this.playGame(guessedLetter)
      } else { this.playGame() }
    }

    // GAME MENU OPTION 2 SELECTED (Quit Game) - player is presented with welcome screen
    if (index === 1) {
      localStorage.removeItem('currentGameWord')
      this.startScreen()
    }

    // GAME MENU OPTION 3 SELECTED (Quit App) - clears terminal
    if (index === 2) {
      localStorage.removeItem('currentGameWord')
      clear()
    }
  }
}

module.exports = {
  Hangman: Hangman
}

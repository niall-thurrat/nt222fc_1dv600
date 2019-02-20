
const clear = require('clear')
const readlineSync = require('readline-sync')

const imageGenerator = require('./imageGenerator')
const wordGenerator = require('./wordGenerator')
const wordUpdater = require('./wordUpdater')
const messageGenerator = require('./messageGenerator')

const LocalStorage = require('node-localstorage').LocalStorage
const localStorage = new LocalStorage('./localstorage')

function Hangman () {
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

  this.playGame = function (guessedLetter) {
    clear()

    // if no word exists - get a new word
    if (!localStorage.getItem('currentGameWord')) {
      let newWord = wordGenerator.getNewWord()
      let wordObject = { secretWord: newWord, progressWord: '', remainingTries: 8 }
      localStorage.setItem('currentGameWord', JSON.stringify(wordObject))
    }

    // if a word exists - get it updated

    console.log(imageGenerator.getNewImage('banner'))
    console.log(imageGenerator.getNewImage('hangman-image'))

    let parsedWordObject = wordUpdater.updateWord(localStorage.getItem('currentGameWord'))
    console.log(`SECRET WORD: ${parsedWordObject.progressWord}`)
    console.log(parsedWordObject.remainingTries)

    console.log(messageGenerator.newMessage('new-game'))
    console.log('MENU')

    const gameOptions = ['Guess a letter', 'Quit game', 'Quit Application']

    let index = readlineSync.keyInSelect(gameOptions, 'What do you want to do?', { cancel: false })

    // GAME MENU OPTION 1 SELECTED (Guess a letter)
    if (index === 0) {
      let guessedLetter = readlineSync.question('What letter do you want to guess?  ')

      // if guess is not a single letter
      if (guessedLetter.length !== 1) {
        console.log('not one letter!')
      }

      // if guessed letter has not been guessed before
      if (guessedLetter.length === 1) {
        this.playGame(guessedLetter)
      }

      // if guessed letter has been guessed before
      /// ////////////////////////////////////////////// do something
    }

    // GAME MENU OPTION 2 SELECTED (Quit Game) - player is presented with welcome screen
    if (index === 1) {
      this.startScreen()
    }

    // GAME MENU OPTION 3 SELECTED (Quit App) - clears terminal
    if (index === 2) {
      clear()
    }
  }
}

module.exports = {
  Hangman: Hangman
}

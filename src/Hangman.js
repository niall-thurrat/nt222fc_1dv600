
const clear = require('clear')
const readlineSync = require('readline-sync')

const LocalStorage = require('node-localstorage').LocalStorage
const localStorage = new LocalStorage('./localstorage')

const imageGenerator = require('./imageGenerator')
const wordGenerator = require('./wordGenerator')
const wordUpdater = require('./wordUpdater')
const messageGenerator = require('./messageGenerator')

/**
*
*
*/
function Hangman () {
  this.parsedWordObject = {}
  this.startingTries = 2
  /*
  *
  *
  */
  this.showMainMenu = function () {
    clear()
    console.log(imageGenerator.getNewImage('banner'))
    console.log(messageGenerator.getNewMessage('welcome'))
    console.log('MENU')

    const mainOptions = ['Play game', 'Quit application']

    let index = readlineSync.keyInSelect(mainOptions, 'What do you want to do?', { cancel: false })

    // MAIN MENU OPTION 1 SELECTED (Play Game) - player is presented with the game screen
    if (index === 0) {
      this.playGame()
    }

    // MAIN MENU OPTION 2 SELECTED (Quit application) - clears terminal
    if (index === 1) {
      this.terminateApp('mainMenu')
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
      let wordObject = { secretWord: newWord, progressWord: '', remainingTries: this.startingTries }
      localStorage.setItem('currentGameWord', JSON.stringify(wordObject))
    }

    // send the secret word and guessed letter (if any) to wordUpdater
    // wordUpdater returns an updated word object
    this.parsedWordObject = wordUpdater.updateWord(localStorage.getItem('currentGameWord'), guessedLetter)

    // IF GAME IS LOST - no remaining tries
    if (this.parsedWordObject.remainingTries === 0) {
      this.gameCompleted('lost')
      return
    }

    // IF GAME IS WON - no remaining letters to guess in secret word
    if (this.parsedWordObject.progressWord.replace(/\s+/g, '') === this.parsedWordObject.secretWord) {
      this.gameCompleted('won')
      return
    }

    // print title banner and hangman image
    console.log(imageGenerator.getNewImage('banner'))
    console.log(imageGenerator.getNewImage('hangman-image-' + this.parsedWordObject.remainingTries))

    // store updated word object as a string in localstorage
    localStorage.setItem('currentGameWord', JSON.stringify(this.parsedWordObject))

    // print game details to termainal
    console.log(`SECRET WORD: ${this.parsedWordObject.progressWord}`)
    console.log(`REMAING TRIES: ${this.parsedWordObject.remainingTries}`)
    // console.log(messageGenerator.getNewMessage('game-message-' + this.parsedWordObject.remainingTries))

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
      if (readlineSync.keyInYN('Are you sure you want to quit this game?')) {
        // 'Y' key was pressed.
        localStorage.removeItem('currentGameWord')
        this.showMainMenu()
      } else {
        // Another key was pressed - return to current game
        this.playGame()
      }
    }

    // GAME MENU OPTION 3 SELECTED (Quit App) - clears terminal
    if (index === 2) {
      this.terminateApp()
    }
  }

  /*
  *
  *
  */
  this.terminateApp = function (currentScreen) {
    // Asks for confirmation player wants to terminate
    if (readlineSync.keyInYN('Are you sure you want to quit Hangman?')) {
      // if 'Y' key was pressed.
      localStorage.removeItem('currentGameWord')
      clear()
    } else {
      // or another key was pressed.
      if (currentScreen === 'mainMenu') {
        // return to start screen
        this.showMainMenu()
      } else {
        // return to game screen
        this.playGame()
      }
    }
  }

  /*
  *
  *
  */
  this.gameCompleted = function (result) {
    localStorage.removeItem('currentGameWord')
    clear()
    if (result === 'lost') {
      console.log('\n\n    YOU LOSE!!!\n\n\n\n\n\n\n')
    } else {
      console.log('\n\n    YOU WIN!!!\n\n\n\n\n\n\n')
    }
    setTimeout(function () { this.showMainMenu() }.bind(this), 2000) /// ////////////////// clear???
  }
}

module.exports = {
  Hangman: Hangman
}

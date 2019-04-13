
const clear = require('clear')
const readlineSync = require('readline-sync')
const CFonts = require('cfonts')
const chalk = require('chalk')

const LocalStorage = require('node-localstorage').LocalStorage
const localStorage = new LocalStorage('./localstorage')

const imageGenerator = require('./imageGenerator')
const wordGenerator = require('./wordGenerator')
const wordUpdater = require('./wordUpdater')
const messageGenerator = require('./messageGenerator')

/**
* A Hangman class which can be used to create instances of a hangman type object
*
*/
function Hangman () {
  this.parsedWordObject = {}
  this.startingTries = 8

  /*
  * logs the welcome screen with main menu to the terminal
  *
  */
  this.displayWelcomeScreen = function () {
    clear()

    // displays the game title banner
    CFonts.say('Hangman', {
      font: 'block',
      colors: ['cyanBright', 'red'],
      space: false
    })

    // displays game message
    console.log(chalk.redBright(messageGenerator.getNewMessage('welcome')))

    // displays main menu
    console.log('MAIN MENU')
    this.createMainMenu()
  }

  /*
  * creates the main menu
  *
  */
  this.createMainMenu = function () {
    // menu items
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
  * logs the play game screen (inc game menu) to the terminal
  *
  * @param {string} guessedLetter - a letter entered as a parameter of a terminal command
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

    // store updated word object as a string in localstorage
    localStorage.setItem('currentGameWord', JSON.stringify(this.parsedWordObject))

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

    this.displayGameScreen()
  }

  /*
  * logs the welcome screen with main menu to the terminal
  *
  */
  this.displayGameScreen = function () {
    clear()

    // displays the game title banner
    CFonts.say('Hangman', {
      font: 'block',
      colors: ['cyanBright', 'red'],
      space: false
    })

    console.log(`SECRET WORD REVEALED: ${this.parsedWordObject.secretWord}`)

    // display game message
    console.log(chalk.redBright(messageGenerator.getNewMessage('game-message-' + this.parsedWordObject.remainingTries)))

    // displays hangman image
    console.log(chalk.cyan(imageGenerator.getNewImage('hangman-image-' + this.parsedWordObject.remainingTries)))

    // print game details to termainal
    console.log(chalk.redBright(`SECRET WORD: ${this.parsedWordObject.progressWord}`))
    console.log(chalk.redBright(`REMAING TRIES: ${this.parsedWordObject.remainingTries}`))

    // displays game menu
    console.log('\nGAME MENU')
    this.createGameMenu()
  }

  /*
  * creates the game menu
  *
  */
  this.createGameMenu = function () {
    const gameOptions = ['Guess a letter', 'Quit game', 'Quit Application']
    let index = readlineSync.keyInSelect(gameOptions, 'What do you want to do?', { cancel: false })

    // GAME MENU OPTION 1 SELECTED (Guess a letter)
    if (index === 0) {
      let guessedLetter = readlineSync.question('What letter do you want to guess?  ')

      // if a single letter is guessed
      if (guessedLetter.length === 1) {
        this.playGame(guessedLetter)
      } else {
        // if letter guessed > 1 or 0
        this.playGame()
      }
    }

    // GAME MENU OPTION 2 SELECTED (Quit Game) - player is presented with welcome screen
    if (index === 1) {
      if (readlineSync.keyInYN('Are you sure you want to quit this game?')) {
        // 'Y' key was pressed.
        localStorage.removeItem('currentGameWord')
        this.displayWelcomeScreen()
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
  * removes the game from the terminal and deletes the local storage word
  *
  * @param {string} currentScreen - identifies either the main menu or game screen
  *
  */
  this.terminateApp = function (currentScreen) {
    // Asks for confirmation that player wants to terminate
    if (readlineSync.keyInYN('Are you sure you want to quit Hangman?')) {
      // if 'Y' key was pressed.
      localStorage.removeItem('currentGameWord')
      clear()
    } else {
      // or another key was pressed.
      if (currentScreen === 'mainMenu') {
        this.displayWelcomeScreen()
      } else {
        // return to game screen
        this.playGame()
      }
    }
  }

  /*
  * generates a final message to gamer before returning to main menu
  *
  * @param {string} result - identifies if gamer is loser or winner
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
    setTimeout(function () { this.displayWelcomeScreen() }.bind(this), 3000) /// ////////////////// clear???
  }
}

module.exports = {
  Hangman: Hangman
}

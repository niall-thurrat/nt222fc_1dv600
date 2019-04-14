
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
const highScoreBoard = require('./highScoreBoard')

/**
* A Hangman class which can be used to create instances of a hangman type object
*
*/
function Hangman () {
  this.sessionObject = {}
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
    const mainOptions = [
      'Play game',
      'View high-score board',
      'Read game instructions',
      'Quit application'
    ]

    let index = readlineSync.keyInSelect(mainOptions, 'What do you want to do?', { cancel: false })

    // MAIN MENU OPTION 1 SELECTED (Play Game)
    if (index === 0) {
      let username = readlineSync.question(chalk.green('ENTER YOUR USERNAME (max 10 characters):  '))
      // invalid username
      if (username.length === 0 || username.length > 10) {
        console.log(chalk.yellow('You\'ve entered an invalid username! Try again.'))
        setTimeout(function () { this.displayWelcomeScreen() }.bind(this), 2000)
      } else {
        // valid username
        this.updateGame('', username)
      }
    }

    // MAIN MENU OPTION 2 SELECTED (View high-score board)
    if (index === 1) {
      let table = highScoreBoard.displayScores()

      console.log(`${table.toString()}\n`)

      // console.log(table[1]) useful to know for testing
      // console.log(table[1][1])

      readlineSync.keyInPause(chalk.yellow('TO RETURN TO THE MAIN MENU...'))

      this.displayWelcomeScreen()
    }

    // MAIN MENU OPTION 3 SELECTED (Read game instructions)
    if (index === 2) {
      // do
    }

    // MAIN MENU OPTION 4 SELECTED (Quit application)
    if (index === 3) {
      this.terminateApp('mainMenu')
    }
  }

  /*
  * sets up new games and manages/uses sessionObject to control game changes after guessed letters
  *
  * @param {string} guessedLetter - a letter entered as an argument from a terminal command
  *
  */
  this.updateGame = function (guessedLetter, username) {
    clear()

    // IF NEW GAME (no sessionObject found in local-storage)
    if (!localStorage.getItem('sessionInfo')) {
      // get a new word
      let newWord = wordGenerator.getNewWord()

      // create new sessionObject to control game data persistence
      let sessionObject = {
        secretWord: newWord,
        progressWord: '',
        remainingTries: this.startingTries,
        wrongLetterList: '',
        username: username
      }

      // store new sessionObject in local-storage
      localStorage.setItem('sessionInfo', JSON.stringify(sessionObject))
    }

    // send the secret word and guessed letter (if any) to wordUpdater in the sessionObject
    // wordUpdater returns an updated word object
    this.sessionObject = wordUpdater.updateWord(JSON.parse(localStorage.getItem('sessionInfo')), guessedLetter)

    // store updated word object as a string in localstorage
    localStorage.setItem('sessionInfo', JSON.stringify(this.sessionObject))

    // IF GAME IS LOST - no remaining tries
    if (this.sessionObject.remainingTries === 0) {
      this.gameCompleted('lost')
      return
    }

    // IF GAME IS WON - no remaining letters to guess in secret word
    if (this.sessionObject.progressWord.replace(/\s+/g, '') === this.sessionObject.secretWord) {
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

    console.log(`SECRET WORD REVEALED: ${this.sessionObject.secretWord}`)

    // display game message
    console.log(chalk.redBright(messageGenerator.getNewMessage('game-message-' +
    this.sessionObject.remainingTries, this.sessionObject.username)))

    // displays hangman image
    console.log(chalk.cyan(imageGenerator.getNewImage('hangman-image-' + this.sessionObject.remainingTries)))

    // print game details to termainal
    console.log(chalk.redBright(`SECRET WORD: ${this.sessionObject.progressWord}`))
    console.log(chalk.redBright(`REMAING TRIES: ${this.sessionObject.remainingTries}`))
    console.log(chalk.redBright(`WRONG LETTER LIST: ${this.sessionObject.wrongLetterList}`))

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
        this.updateGame(guessedLetter)
      } else {
        // if letter guessed > 1 or 0
        this.updateGame()
      }
    }

    // GAME MENU OPTION 2 SELECTED (Quit Game) - player is presented with welcome screen
    if (index === 1) {
      if (readlineSync.keyInYN('Are you sure you want to quit this game?')) {
        // 'Y' key was pressed.
        localStorage.removeItem('sessionInfo')
        this.displayWelcomeScreen()
      } else {
        // Another key was pressed - return to current game
        this.updateGame()
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
      localStorage.removeItem('sessionInfo')
      clear()
    } else {
      // or another key was pressed.
      if (currentScreen === 'mainMenu') {
        this.displayWelcomeScreen()
      } else {
        // return to game screen
        this.updateGame()
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
    localStorage.removeItem('sessionInfo')
    clear()
    if (result === 'lost') {
      console.log('\n\n    YOU LOSE!!!\n\n\n\n\n\n\n')
    } else {
      console.log('\n\n    YOU WIN!!!\n\n\n\n\n\n\n')
    }
    setTimeout(function () { this.displayWelcomeScreen() }.bind(this), 3000)
  }
}

module.exports = {
  Hangman: Hangman
}

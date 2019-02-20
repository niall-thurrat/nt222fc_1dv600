
const clear = require('clear')
const readlineSync = require('readline-sync')

const imageGenerator = require('./imageGenerator')
const wordGenerator = require('./wordGenerator')
const wordUpdater = require('./wordUpdater')
const messageGenerator = require('./messageGenerator')

const LocalStorage = require('node-localstorage').LocalStorage
const localStorage = new LocalStorage('./localstorage')

let remainingTries = 9

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

    // print title banner and hangman image
    console.log(imageGenerator.getNewImage('banner'))
    console.log(imageGenerator.getNewImage('hangman-image'))

    // send the secret word and guessed letter (if any) to wordUpdater
    // wordUpdater returns an updated word Object
    let parsedWordObject = wordUpdater.updateWord(localStorage.getItem('currentGameWord'), guessedLetter)

    // store updated word object as a string in localstorage
    localStorage.setItem('currentGameWord', JSON.stringify(parsedWordObject))

    //
    console.log(`SECRET WORD: ${parsedWordObject.progressWord}`)

    console.log(`REMAING TRIES: ${parsedWordObject.remainingTries}`)

    // message prints to termainal
    console.log(messageGenerator.newMessage('new-game'))

    // Menu title and options now print to terminal
    console.log('MENU')
    const gameOptions = ['Guess a letter', 'Quit game', 'Quit Application']
    let index = readlineSync.keyInSelect(gameOptions, 'What do you want to do?', { cancel: false })

    // GAME MENU OPTION 1 SELECTED (Guess a letter)
    if (index === 0) {
      let guessedLetter = readlineSync.question('What letter do you want to guess?  ')

      // if guess is not a single letter
      if (guessedLetter.length !== 1) {
        console.log('not a single letter!') /// //////////////////////////////////////////////// expand this
      }

      // if guessed letter has not been guessed before...
      if (parsedWordObject.secretWord.indexOf(guessedLetter) !== -1) {
        // ... and guessed letter is a single letter
        if (guessedLetter.length === 1) {
          this.playGame(guessedLetter)
        }
      }

      // if guessed letter has been guessed before
      /// ////////////////////////////////////////////// do something
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

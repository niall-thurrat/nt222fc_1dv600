
const clear = require('clear')
const CFonts = require('cfonts')
const Table = require('cli-table')

/**
 * creates the high-score board
 *
 * @param {string} imageName - identifies which image should be returned /////////////////////// change
 * @returns {string} representing an image when logged on console //////////////////////////////// change
 *
 */
function displayScores () {
  clear()

  // displays the game title banner
  CFonts.say('Hangman', {
    font: 'block',
    colors: ['cyanBright', 'red'],
    space: false
  })

  console.log('')

  // displays the high-score header
  CFonts.say('HIGH-SCORE BOARD', {
    font: 'chrome',
    colors: ['cyanBright', 'white', 'red'],
    space: false
  })

  console.log('')

  // instantiate table and push values to it
  let table = new Table({ head: ['NAME', 'SCORE', 'RANK'], colWidths: [20, 15, 15] })
  table.push(
    ['test nae', '4', '1st'],
    ['Ftest name', '13', '2nd']
  )

  return table
}

module.exports.displayScores = displayScores

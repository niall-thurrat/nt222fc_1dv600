
const clear = require('clear')
const CFonts = require('cfonts')
const Table = require('cli-table')

const LocalStorage = require('node-localstorage').LocalStorage
const localStorage = new LocalStorage('./localstorage')

/**
 * uses gameScore to check and update stored high-scores
 *
 * @param {string} username -
 * @param {string} gameScore -
 * @returns {string}
 *
 */
function updateHighScores (username, gameScore, pastHighScores) {
  let newScore = { 'username': username, 'highScore': gameScore }
  let highScoreList = []

  // IF THERE ARE NO HIGH-SCORES IN LOCAL-STORAGE YET
  if (!localStorage.getItem('storedHighScores')) {
    highScoreList.push(newScore)
    return [highScoreList, 'yes']
  } else {
    // ELSE IF PREVIOUS-HIGH SCORES EXIST

    highScoreList = pastHighScores

    // IF 5 SCORES ARE ALREADY STORED
    if (typeof highScoreList[4] === 'object') {
      // if newScore is good enough it replaces the last array item
      if (Number(newScore.highScore) > Number(highScoreList[4].highScore)) {
        highScoreList.splice(4, 1, newScore)
        highScoreList = highScoreList.sort((b, a) => { return a.highScore - b.highScore })
        return [highScoreList, 'yes']
      } else {
        return [highScoreList, 'no']
      }
    } else {
      // IF THERE ARE LESS THAN 5 SCORES
      highScoreList.push(newScore)
      highScoreList = highScoreList.sort((b, a) => { return a.highScore - b.highScore })
      return [highScoreList, 'yes']
    }
  }
}

/**
 * creates and populates high-score board
 *
 * @param {object} scoresForBoard - an array of up to 5 objects with username + highScore properties
 * @returns {object} board - is an instance of Table with inserted high-scores
 *
 */
function displayBoard (scoresForBoard) {
  // instantiate table and push values to it
  let board = new Table({ head: ['NAME', 'SCORE', 'RANK'], colWidths: [20, 15, 15] })

  for (let i = 0; i < scoresForBoard.length; i++) {
    board.push(
      [scoresForBoard[i].username, scoresForBoard[i].highScore, i + 1]
    )
  }

  return board
}

module.exports = {
  displayBoard,
  updateHighScores
}

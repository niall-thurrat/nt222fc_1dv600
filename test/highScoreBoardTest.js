
const expect = require('chai').expect
const assert = require('chai').assert
const highScoreBoard = require('../src/highScoreBoard')

describe('highScoreBoard', function () {
  describe('updateHighScores', function () {
    it('should insert gameScore into high-score array', function () {
      let username = 'dave'
      let gameScore = 6
      let pastHighScores = [
        { username: 'neo', highScore: 8 },
        { username: 'diddler', highScore: 7 },
        { username: 'bob', highScore: 5 },
        { username: 'filip', highScore: 4 },
        { username: 'emil', highScore: 3 } ]
      let updatedHighScores = [
        { username: 'neo', highScore: 8 },
        { username: 'diddler', highScore: 7 },
        { username: 'dave', highScore: 6 },
        { username: 'bob', highScore: 5 },
        { username: 'filip', highScore: 4 } ]

      let sut = highScoreBoard.updateHighScores(username, gameScore, pastHighScores)

      assert.deepEqual(sut[0], updatedHighScores)
    })

    it('should not insert gameScore into high-score array', function () {
      let username = 'jack'
      let gameScore = 6
      let pastHighScores = [
        { username: 'neo', highScore: 8 },
        { username: 'diddler', highScore: 7 },
        { username: 'bob', highScore: 5 },
        { username: 'filip', highScore: 4 },
        { username: 'emil', highScore: 3 } ]

      let sut = highScoreBoard.updateHighScores(username, gameScore, pastHighScores)

      assert.deepEqual(sut[0], pastHighScores)
    })
  })

  describe('displayBoard', function () {
    it('should insert scoresForBoard into board object', function () {
      let scoresForBoard = [ { username: 'neo', highScore: 8 } ]

      let sut = highScoreBoard.displayBoard(scoresForBoard)

      expect(sut[0]).to.include(scoresForBoard[0].username && scoresForBoard[0].highScore)
    })

    it('should return board object if scoresForBoard empty', function () {
      let scoresForBoard = []

      let sut = highScoreBoard.displayBoard(scoresForBoard)

      expect(sut).to.contain.all.keys(['options'])
    })
  })
})

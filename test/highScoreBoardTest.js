
const expect = require('chai').expect
const highScoreBoard = require('../src/highScoreBoard')

describe('highScoreBoard.displayBoard', function () {
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

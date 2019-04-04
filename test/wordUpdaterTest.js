
const assert = require('chai').assert
const wordUpdater = require('../src/wordUpdater')

describe('wordUpdater', function () {
  it('should update progressWord property with correct guessedLetter', function () {
    let wordObject = '{"secretWord":"tactic","progressWord":"t - - t - -","remainingTries":8}'
    let guessedLetter = 'a'
    let sut = wordUpdater.updateWord(wordObject, guessedLetter)

    let expectedObject = { secretWord: 'tactic', progressWord: 't a - t - -', remainingTries: 8 }

    assert.deepEqual(sut, expectedObject)
  })

  it('should reduce remainingTries property with wrong guessedLetter', function () {
    let wordObject = '{"secretWord":"tactic","progressWord":"t - - t - -","remainingTries":8}'
    let guessedLetter = 'x'
    let sut = wordUpdater.updateWord(wordObject, guessedLetter)

    let expectedObject = { secretWord: 'tactic', progressWord: 't - - t - -', remainingTries: 7 }

    assert.deepEqual(sut, expectedObject)
  })
})

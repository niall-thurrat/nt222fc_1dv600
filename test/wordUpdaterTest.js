
const assert = require('chai').assert
const wordUpdater = require('../src/wordUpdater')

describe('wordUpdater', function () {
  it('should update progressWord property with correct guessedLetter', function () {
    let sessionObject = {
      secretWord: 'sugar',
      progressWord: '- - - - -',
      remainingTries: 8,
      wrongLetterList: '',
      username: 'tim'
    }
    let guessedLetter = 's'
    let sut = wordUpdater.updateWord(sessionObject, guessedLetter)

    let expectedObject = {
      secretWord: 'sugar',
      progressWord: 's - - - -',
      remainingTries: 8,
      wrongLetterList: '',
      username: 'tim'
    }

    assert.deepEqual(sut, expectedObject)
  })

  it('should update remainingTries and wrongLetterList with wrong guessedLetter', function () {
    let sessionObject = {
      secretWord: 'sugar',
      progressWord: '- - - - -',
      remainingTries: 8,
      wrongLetterList: '',
      username: 'tim'
    }

    let guessedLetter = 'x'
    let sut = wordUpdater.updateWord(sessionObject, guessedLetter)

    let expectedObject = {
      secretWord: 'sugar',
      progressWord: '- - - - -',
      remainingTries: 7,
      wrongLetterList: 'x  ',
      username: 'tim'
    }

    assert.deepEqual(sut, expectedObject)
  })
})


const assert = require('chai').assert
const imageGenerator = require('../src/imageGenerator')

describe('imageGenerator', function () {
  it('should respond with a string representing the title banner for correct input', function () {
    let sut = imageGenerator.getNewImage('banner')
    assert.equal(sut, '\n###   HANGMAN   ###\n')
  })

  it('should pass with correct input type string', function () {
    let sut = imageGenerator.getNewImage('banner')
    assert.typeOf(sut, 'string')
  })
})

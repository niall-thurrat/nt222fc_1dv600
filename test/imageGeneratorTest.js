
const assert = require('chai').assert
const expect = require('chai').expect

const imageGenerator = require('../src/imageGenerator')

describe('imageGenerator', function () {
  it('should throw exception with wrong parameter', function () {
    expect(function () { imageGenerator.getNewImage('blah') }).to.throw('parameter not recognised')
  })

  it('should not throw exception with correct parameter', function () {
    expect(function () { imageGenerator.getNewImage('banner') }).to.not.throw()
  })

  /*
    it('should respond with a string representing the title banner', function () {
    let sut = imageGenerator.getNewImage('banner')
    assert.equal(sut, '\n###   HANGMAN   ###\n')
  })
*/
})

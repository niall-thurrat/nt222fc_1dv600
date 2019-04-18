
const expect = require('chai').expect

const imageGenerator = require('../src/imageGenerator')

describe('imageGenerator', function () {
  it('should throw exception with wrong parameter', function () {
    expect(function () { imageGenerator.updateHangman('blah') }).to.throw('parameter not recognised')
  })

  it('should not throw exception with correct parameter', function () {
    expect(function () { imageGenerator.updateHangman('hangman-image-8') }).to.not.throw()
  })
})


const expect = require('chai').expect

const imageGenerator = require('../src/imageGenerator')

describe('imageGenerator', function () {
  it('should throw exception with wrong parameter', function () {
    expect(function () { imageGenerator.getNewImage('blah') }).to.throw('parameter not recognised')
  })

  it('should not throw exception with correct parameter', function () {
    expect(function () { imageGenerator.getNewImage('banner') }).to.not.throw()
  })
})

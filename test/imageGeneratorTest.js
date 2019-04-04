
const expect = require('chai').expect
const assert = require('chai').assert

const imageGenerator = require('../src/imageGenerator')

describe('imageGenerator', function () {
  it('should throw exception with wrong parameter', function () {
    expect(function () { imageGenerator.getNewImage('blah') }).to.throw('parameter not recognised')
  })

  it('should not throw exception with correct parameter', function () {
    expect(function () { imageGenerator.getNewImage('banner') }).to.not.throw()
  })

  it('should respond with a test string', function () {
    let sut = imageGenerator.failTestExample('test')
    assert.equal(sut, 'testy test mc test face')
  })
})

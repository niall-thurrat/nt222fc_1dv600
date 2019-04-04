
const assert = require('chai').assert
const example = require('../src/example')

describe('example', function () {
  it('should do something', function () {
    let sut = example.exampleFunc()

    assert.property(sut, 'progressWord')
  })
})

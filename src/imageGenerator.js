
/**
 * generates images for hangman game
 *
 * @param {string} imageName identifies which image should be returned
 * @returns string representing an image when logged on console
 *
 */
function getNewImage (imageName) {
  if (imageName === 'banner') {
    return '\n###   HANGMAN   ###\n'
  } else if (imageName === 'hangman-image-8') {
    return 'Hangman Frame: BASE IMAGE\n'
  } else if (imageName === 'hangman-image-7') {
    return 'Hangman Frame: BASE IMAGE + 1\n'
  } else if (imageName === 'hangman-image-6') {
    return 'Hangman Frame: BASE IMAGE + 2\n'
  } else if (imageName === 'hangman-image-5') {
    return 'Hangman Frame: BASE IMAGE + 3\n'
  } else if (imageName === 'hangman-image-4') {
    return 'Hangman Frame: BASE IMAGE + 4\n'
  } else if (imageName === 'hangman-image-3') {
    return 'Hangman Frame: BASE IMAGE + 5\n'
  } else if (imageName === 'hangman-image-2') {
    return 'Hangman Frame: BASE IMAGE + 6\n'
  } else if (imageName === 'hangman-image-1') {
    return 'Hangman Frame: BASE IMAGE + 7\n'
  } else if (imageName === 'hangman-image-0') {
    return 'Hangman Frame: COMPLETE IMAGE\n'
  } else { throw new Error('parameter not recognised') }
}

function failTestExample (imageName) {
  if (imageName === 'test') {
    // return 'testy test mc test face'
  } else { throw new Error('parameter not recognised') }
}

module.exports = {
  getNewImage,
  failTestExample
}

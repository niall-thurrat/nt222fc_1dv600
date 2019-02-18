
function getNewImage (imageType, wrongGuesses = 0) {
  if (imageType === 'banner') {
    return '\n\n\n\n\n###   HANGMAN   ###\n'
  }
  if (imageType === 'hangman-image') {
    return `Hangman: ${wrongGuesses} wrong guesses\n`
  }
}

module.exports.getNewImage = getNewImage

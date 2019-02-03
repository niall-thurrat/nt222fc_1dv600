
function getNewImage (imageType) {
  if (imageType === 'banner') {
    return 'here\'s a banner!'
  }
  if (imageType === 'hangman-base') {
    return 'here\'s a hangman base'
  }
}

module.exports.getNewImage = getNewImage

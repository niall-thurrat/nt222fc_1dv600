
/**
 * generates images for hangman game
 *
 * @param {string} imageName identifies which image should be returned
 * @returns string representing an image when logged on console
 *
 */
function getNewImage (imageName) {
  if (imageName === 'hangman-image-8') {
    return '    ##========\\ \n' +
           '    ||\n' +
           '    ||\n' +
           '    ||\n' +
           '    ||\n' +
           '    ||\n' +
           '    ||\n' +
           '    ||\n' +
           '#####################\n'
  } else if (imageName === 'hangman-image-7') {
    return '    ##========\\ \n' +
    '    ||      |\n' +
    '    ||\n' +
    '    ||\n' +
    '    ||\n' +
    '    ||\n' +
    '    ||\n' +
    '    ||\n' +
    '#####################\n'
  } else if (imageName === 'hangman-image-6') {
    return '    ##========\\ \n' +
    '    ||      |\n' +
    '    ||      0\n' +
    '    ||\n' +
    '    ||\n' +
    '    ||\n' +
    '    ||\n' +
    '    ||\n' +
    '#####################\n'
  } else if (imageName === 'hangman-image-5') {
    return '    ##========\\ \n' +
    '    ||      |\n' +
    '    ||      0\n' +
    '    ||      |\n' +
    '    ||\n' +
    '    ||\n' +
    '    ||\n' +
    '    ||\n' +
    '#####################\n'
  } else if (imageName === 'hangman-image-4') {
    return '    ##========\\ \n' +
    '    ||      |\n' +
    '    ||      0\n' +
    '    ||      |\n' +
    '    ||      |\n' +
    '    ||\n' +
    '    ||\n' +
    '    ||\n' +
    '#####################\n'
  } else if (imageName === 'hangman-image-3') {
    return '    ##========\\ \n' +
    '    ||      |\n' +
    '    ||      0\n' +
    '    ||   >--|\n' +
    '    ||      |\n' +
    '    ||\n' +
    '    ||\n' +
    '    ||\n' +
    '#####################\n'
  } else if (imageName === 'hangman-image-2') {
    return '    ##========\\ \n' +
    '    ||      |\n' +
    '    ||      0\n' +
    '    ||   >--|--<\n' +
    '    ||      |\n' +
    '    ||\n' +
    '    ||\n' +
    '    ||\n' +
    '#####################\n'
  } else if (imageName === 'hangman-image-1') {
    return '    ##========\\ \n' +
    '    ||      |\n' +
    '    ||      0\n' +
    '    ||   >--|--<\n' +
    '    ||      |\n' +
    '    ||     /\n' +
    '    ||    /\n' +
    '    ||\n' +
    '#####################\n'
  } else if (imageName === 'hangman-image-0') {
    return '    ##========\\ \n' +
    '    ||      |\n' +
    '    ||      0\n' +
    '    ||   >--|--<\n' +
    '    ||      |\n' +
    '    ||     / \\ \n' +
    '    ||    /   \\ \n' +
    '    ||\n' +
    '#####################\n'
  } else { throw new Error('parameter not recognised') }
}

function failTestExample (imageName) {
  if (imageName === 'test') {
  //  return 'testy test mc test face'
  } else { throw new Error('parameter not recognised') }
}

module.exports = {
  getNewImage,
  failTestExample
}

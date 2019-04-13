
/**
 * Uses guessedLetter to update sessionObject
 *
 * @param {object} sessionObject - an object which contains game session information
 * sessionObject example: { 'secretWord: 'tactic","progressWord":"t - - t - -","remainingTries":8} ////////////////////////////////////// change
 * @param {string} guessedLetter - used to update progressWord property
 * @returns object
 *
 */
function updateWord (sessionObject, guessedLetter) {
  let secretWord = sessionObject.secretWord
  let changingWord = []

  // creates an array of hyphens the length of the secret word
  if (sessionObject.progressWord === '') {
    for (let i = 0; i < secretWord.length; i++) {
      changingWord.push('-')
    }
  } else {
    // pushes each letter of word string to array as separate values, without spaces
    let str = sessionObject.progressWord
    str = str.replace(/\s+/g, '')
    changingWord = str.split('')
  }

  // if guessedLetter is found somewhere in secretWord
  if (secretWord.indexOf(guessedLetter) !== -1) {
    // loop on all letters
    for (let i = 0; i < secretWord.length; i++) {
      // change letter where theres a match
      if (secretWord[i] === guessedLetter) {
        changingWord[i] = secretWord[i]
      }
    }
  } else {
    // Don't lower remaining lives if there's no guessedLetter argument
    if (guessedLetter !== undefined) {
      sessionObject.remainingTries--
    }
  }

  // creates string from progressWord array with a space between each property
  sessionObject.progressWord = changingWord.join(' ')

  return sessionObject
}

module.exports.updateWord = updateWord

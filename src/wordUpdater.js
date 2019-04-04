
/**
 * Uses guessedLetter to update parsedWordObject
 *
 * @param {string} wordObject - a JSON string which can be parsed to form an object
 * wordObject argument should have 3 properties: secretWord, progressWord and remainingTries
 * wordObject example: {"secretWord":"tactic","progressWord":"t - - t - -","remainingTries":8}
 *
 * @param {string} guessedLetter - used to update progressWord property
 * @returns object
 */
function updateWord (wordObject, guessedLetter) {
  let parsedWordObject = JSON.parse(wordObject)
  let secretWord = parsedWordObject.secretWord

  console.log(wordObject)
  // console.log(`SECRET WORD REVEALED FOR DEV TESTING: ${secretWord}`)

  let changingWord = []

  // creates an array of hyphens the length of the secret word
  if (parsedWordObject.progressWord === '') {
    for (let i = 0; i < secretWord.length; i++) {
      changingWord.push('-')
    }
  } else {
    // pushes each letter of word string to array as separate values, without any spaces
    let str = parsedWordObject.progressWord
    str = str.replace(/\s+/g, '')
    changingWord = str.split('')
  }

  // if the character is found
  if (secretWord.indexOf(guessedLetter) !== -1) {
    // loop on all characters
    for (let i = 0; i < secretWord.length; i++) {
      // if this is an occurance
      if (secretWord[i] === guessedLetter) {
        changingWord[i] = secretWord[i]
      }
    }
  } else {
    // Don't lower remaining lives if there's no guessedLetter argument
    if (guessedLetter !== undefined) {
      parsedWordObject.remainingTries--
    } /// /////////////////////////////////////////////////// should message be updated here?
  }

  // creates a string from the array, with a space as delimeter
  parsedWordObject.progressWord = changingWord.join(' ')

  console.log(parsedWordObject)
  return parsedWordObject
}

module.exports.updateWord = updateWord

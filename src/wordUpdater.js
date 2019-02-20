
function updateWord (wordObject, guessedLetter) {
  let parsedWordObject = JSON.parse(wordObject)
  let secretWord = parsedWordObject.secretWord

  console.log(`SECRET WORD REVEALED: ${secretWord}`)

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
    parsedWordObject.remainingTries--
    console.log('bad guess')
  }

  /*
  if (progressWord.indexOf('-') === -1) { // if there are no dashes left
    console.log('player wins game')
  } else if (guessesLeft <= 0) {
    console.log('player loses game')
  }
*/

  // creates a string from the array, with a space as as delimeter
  parsedWordObject.progressWord = changingWord.join(' ')

  console.log(`### wordUpdater is returning stringified: ${JSON.stringify(parsedWordObject)}`)
  return parsedWordObject
}

module.exports.updateWord = updateWord

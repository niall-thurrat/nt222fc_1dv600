
function updateWord (wordObject, guessedLetter) {
  let parsedWordObject = JSON.parse(wordObject)
  let secretWord = parsedWordObject.secretWord

  console.log(`SECRET WORD REVEALED: ${secretWord}`)

  let changingWord = []
  for (let i = 0; i < secretWord.length; i++) { changingWord.push('-') }

  if (secretWord.indexOf(guessedLetter) !== -1) { // if the character is found
    for (let i = 0; i < secretWord.length; i++) { // loop on all characters
      if (secretWord[i] === guessedLetter) { // if this is an occurance
        changingWord[i] = secretWord[i]
      }
    }
  } else {
    console.log('bad guess')
  }

  /*
  if (progressWord.indexOf('-') === -1) { // if there are no dashes left
    console.log('player wins game')
  } else if (guessesLeft <= 0) {
    console.log('player loses game')
  }
*/
  parsedWordObject.progressWord = changingWord.join(' ')

  return parsedWordObject
  // `SECRET WORD: ${progressWord.join(' ')}` // will form a string from the array, with a space as as delimeter
}

module.exports.updateWord = updateWord

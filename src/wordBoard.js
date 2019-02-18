
const wordGenerator = require('./wordGenerator')

function updateBoard (guessedLetter, guessesLeft) {
  let secretWord = wordGenerator.getNewWord()
  console.log(`SECRET WORD: ${secretWord}`)

  var progressWord = []
  for (var i = 0; i < secretWord.length; i++) { progressWord.push('-') }

  if (secretWord.indexOf(guessedLetter) !== -1) { // if the character is found
    for (let i = 0; i < secretWord.length; i++) { // loop on all characters
      if (secretWord[i] === guessedLetter) { // if this is an occurance
        progressWord[i] = secretWord[i]
      }
    }
  } else {
    console.log('bad guess')
  }

  if (progressWord.indexOf('-') === -1) { // if there are no dashes left
    console.log('player wins game')
  } else if (guessesLeft <= 0) {
    console.log('player loses game')
  }

  return `PROGRESS WORD: ${progressWord.join(' ')}` // will form a string from the array, with a space as as delimeter
}

module.exports.updateBoard = updateBoard

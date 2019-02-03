
const hangman = require('./src/Hangman')
const PlayHangman = hangman.PlayGame

const playHangman = new PlayHangman()

console.log(playHangman.play)
playHangman.test()

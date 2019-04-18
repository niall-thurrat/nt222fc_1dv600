
/**
 * generates messages for various stages of hangman game
 *
 * @param {string} messageName identifies which message to return
 * @returns string
 */
function getNewMessage (messageName, username) {
  if (messageName === 'welcome') {
    return `\nWelcome to Hangman the world's greatest game!!! :)\n`
  }
  if (messageName === 'game-message-8') {
    return `\nGood luck ${username}! You can make 7 wrong guesses\n`
  }
  if (messageName === 'game-message-7') {
    return `\nBe careful ${username}. We don't want this guy to swing!!!\n`
  }
  if (messageName === 'game-message-6') {
    return `\n You've 5 wrong guesses left ${username}. Guess again!\n`
  }
  if (messageName === 'game-message-5') {
    return `\nDon't panic ${username}, you've 4 wrong guesses left\n`
  }
  if (messageName === 'game-message-4') {
    return `\nPANIC! You've only 3 wrong guesses left ${username}!!\n`
  }
  if (messageName === 'game-message-3') {
    return `\nYou need to guess really carefully now! 2 wrong tries left\n`
  }
  if (messageName === 'game-message-2') {
    return `\nYou're allowed 1 more wrong guess ${username}. Good luck. You'll need it!!!\n`
  }
  if (messageName === 'game-message-1') {
    return `\nOh no!!! No more bad guesses ${username} - otherwise you're gonna hang!!!!\n`
  }
}

module.exports.getNewMessage = getNewMessage


/**
 * generates messages for various stages of hangman game
 *
 * @param {string} messageName identifies which message to return
 * @returns string
 */
function getNewMessage (messageName) {
  if (messageName === 'welcome') {
    return '\nWelcome to Hangman the world\'s greatest game!!! :)\n'
  }
  if (messageName === 'game-message-8') {
    return '\nYou can make 7 wrong guesses, so be careful. We don\'t want this guy to swing!!!\n'
  }
  if (messageName === 'game-message-7') {
    return '\nYou\'re shit out of luck. Guess again!\n'
  }
  if (messageName === 'game-message-6') {
    return '\nOh oh! another wrong guess\n'
  }
  if (messageName === 'game-message-5') {
    return '\nDon\'t panic, you\'ve 4 wrong guesses left\n'
  }
  if (messageName === 'game-message-4') {
    return '\nPANIC! You\'ve only 3 wrong guesses left!!\n'
  }
  if (messageName === 'game-message-3') {
    return '\nYou need to guess real care now! 2 wrong tries left\n'
  }
  if (messageName === 'game-message-2') {
    return '\nYou\'re allowed 1 more wrong guess. Good luck. You\'ll need it!!!\n'
  }
  if (messageName === 'game-message-1') {
    return '\nOh no!!! No more bad guesses - otherwise you\'re gonna hang!!!!\n'
  }
  if (messageName === 'game-message-0') {
    return '\nMESSAGE: Game over boss\n'
  }
}

module.exports.getNewMessage = getNewMessage

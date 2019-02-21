
/**
 *
 *
 * @param {*} messageName
 * @returns
 */
function getNewMessage (messageName) {
  if (messageName === 'welcome') {
    return '\nWelcome to Hangman the world\'s greatest game!!! :)\n'
  }
  if (messageName === 'game-message-8') {
    return '\nMESSAGE: You can make 7 wrong guesses, so be careful. We don\'t want this guy to swing!!!\n'
  }
  if (messageName === 'game-message-7') {
    return '\nMESSAGE: You have 6 wrong guesses left.\n'
  }
  if (messageName === 'game-message-6') {
    return '\nMESSAGE: You have 5 wrong guesses left.\n'
  }
  if (messageName === 'game-message-5') {
    return '\nMESSAGE: You have 4 wrong guesses left.\n'
  }
  if (messageName === 'game-message-4') {
    return '\nMESSAGE: You have 3 wrong guesses left.\n'
  }
  if (messageName === 'game-message-3') {
    return '\nMESSAGE: You have 2 wrong guesses left.\n'
  }
  if (messageName === 'game-message-2') {
    return '\nMESSAGE: You have 1 wrong guesses left.\n'
  }
  if (messageName === 'game-message-1') {
    return '\nMESSAGE: Oh no!!! One more bad guess and you\'re gonna hang!!!!\n'
  }
  if (messageName === 'game-message-0') {
    return '\nMESSAGE: Game over boss\n'
  }
}

module.exports.getNewMessage = getNewMessage

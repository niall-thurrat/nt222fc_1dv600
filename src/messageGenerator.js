
function newMessage (messageType) {
  if (messageType === 'welcome') {
    return '\nWelcome to Hangman the world\'s greatest game!!! :)\n'
  }
  if (messageType === 'new-game') {
    return '\nYou can make 7 wrong guesses, so be careful. We don\'t want this guy to swing!!!\n'
  }
}

module.exports.newMessage = newMessage

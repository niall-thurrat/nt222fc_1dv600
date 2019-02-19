
function newMessage (messageType) {
  if (messageType === 'welcome') {
    return '\nWelcome to Hangman the world\'s greatest game!!! :)\n'
  }
  if (messageType === 'new-game') {
    return '\nHere\'s a message! You\'ve started a new game :)\n'
  }
}

module.exports.newMessage = newMessage

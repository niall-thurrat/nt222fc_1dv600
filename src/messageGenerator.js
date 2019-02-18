
function newMessage (messageType) {
  if (messageType === 'new-game') {
    return '\nHere\'s a message! You\'ve started a new game :)\n'
  }
}

module.exports.newMessage = newMessage

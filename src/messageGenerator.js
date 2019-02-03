
function newMessage (messageType) {
  if (messageType === 'new-game') {
    return 'Here\'s a message! You\'ve started a new game :)'
  }
}

module.exports.newMessage = newMessage

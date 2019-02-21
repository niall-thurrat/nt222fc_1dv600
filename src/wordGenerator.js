
/**
 *
 *
 * @returns
 */
function getNewWord () {
  let wordArary = ['copper', 'method', 'tactic', 'rhythm', 'retain',
    'cattle', 'instal', 'animal', 'viable', 'survey']

  for (var i = wordArary.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1))
    var temp = wordArary[i]
    wordArary[i] = wordArary[j]
    wordArary[j] = temp
  }
  return wordArary[0]
}

module.exports.getNewWord = getNewWord

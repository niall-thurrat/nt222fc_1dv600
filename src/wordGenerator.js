
/**
 * shuffles an array of nouns
 *
 * @returns string of a 6 letter noun
 */
function getNewWord () {
  let wordArary = ['copper', 'method', 'tactic', 'rhythm', 'retain',
    'cattle', 'instal', 'animal', 'viable', 'survey', 'sugar', 'power',
    'cabin', 'night', 'tiger', 'cable', 'attic', 'sport', 'uncle', 'youth',
    'currency', 'guidance', 'industry', 'accident', 'stranger', 'assumption',
    'enthusiasm', 'foundation', 'friendship', 'psychology']

  for (var i = wordArary.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1))
    var temp = wordArary[i]
    wordArary[i] = wordArary[j]
    wordArary[j] = temp
  }
  return wordArary[0]
}

module.exports.getNewWord = getNewWord

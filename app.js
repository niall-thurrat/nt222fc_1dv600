
/**
 * The starting point of the application.
 *
 * @author Niall Thurrat
 * @version 1.1
 */

const game = require('./src/Hangman')
const Hangman = game.Hangman

const hangman = new Hangman()

hangman.showMainMenu()

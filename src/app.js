
/**
 * The starting point of the application.
 *
 * @author Niall Thurrat
 * @version 1.1
 */

const game = require('./Hangman')
const Hangman = game.Hangman

const hangman = new Hangman()

hangman.showMainMenu()

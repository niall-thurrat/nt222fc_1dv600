
/**
 * The starting point of the application.
 *
 * @author Niall Thurrat
 * @version 1.1
 */

const Hangman = require('./src/Hangman').Hangman

const hangman = new Hangman()

hangman.displayWelcomeScreen()

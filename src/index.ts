import { Canister, Ok, Record, Result, Variant, text, update, nat16, bool, Tuple, Err } from 'azle';
import {obfuscateWord,getRandomWord} from './utils'
import { v4 as uuidv4 } from 'uuid';

/**
 * Types
 */
let GuessedLetters = Tuple(text);

const GameManager = Record({
  currentWord: text,
  renderWord:text,
  remainingGuesses:nat16,
  isGameOver:bool,
  isCorrectGuess:bool,
  alreadyRender:bool,  
  guessedLetters: GuessedLetters
})

const Response = Record({
  msg: text
})

type GameManager = typeof GameManager.tsType;
type Response = typeof Response.tsType;
type GuessedLetters = typeof GuessedLetters.tsType;

const Errors = Variant({
  InvalidInput: text
})

/**
 * Application State
 */
let gameManager: GameManager = {
  currentWord:'',
  isCorrectGuess:false,
  isGameOver:true,
  remainingGuesses:6,
  alreadyRender:false,
  renderWord:'',
  guessedLetters:[''],
};

let words = ['apple', 'orange', 'banana', 'grape', 'strawberry', 'mango', 'pineapple', 'watermelon', 'cantaloupe', 'papaya']

/**
 * High-Level API
 */
export default Canister({
  startGame: update([], Result(Response, Errors), ()=> {
    resetGame()
    const randomWord = getRandomWord(words, gameManager.guessedLetters)!
    gameManager.currentWord = randomWord

    logGameManager()
    return Ok({ msg:'The word guessing game has begun. Please hit renderWord()!'})   
  }),
  renderWord: update([], Result(Response, Errors), ()=> {
    if (gameManager.isGameOver) {
      return Ok({msg:'Game is over!'});
    }
    
    // Prevent underscore repositioning in guessed words
    if (gameManager.alreadyRender) {
      return Ok({msg:gameManager.renderWord})
    }

    const displayedWord = obfuscateWord(gameManager.currentWord)

    gameManager.alreadyRender = true
    gameManager.isCorrectGuess = false // flag to prevent guesses from being answered correctly multiple times
    gameManager.renderWord = displayedWord

    logGameManager()
    return Ok({msg:`Guess the word: ${displayedWord}. Enter the answer in the handleGuess()!`});
  }),
  handleGuess: update([text], Result(Response, Errors), (letter)=> {
    if (gameManager.isGameOver) {
      return Ok({msg:'Game is over!'});
    }

    if (letter.length === 0) {
      return Err({InvalidInput:'Please input the guess!'});
    }    

    if (gameManager.currentWord === letter) {
      if (gameManager.isCorrectGuess) {
        return Ok({msg:'Please hit renderWord() again for a new guess!'});
      }

      gameManager.isCorrectGuess = true // flag to prevent guesses from being answered correctly multiple times
      gameManager.alreadyRender = false
      gameManager.guessedLetters.push(letter)
      gameManager.currentWord = getRandomWord(words, gameManager.guessedLetters)!
      const newRemainingGuesses = gameManager.remainingGuesses - 1
      gameManager.remainingGuesses = newRemainingGuesses          
      
      if (newRemainingGuesses === 0) {
        gameManager.isGameOver = true
        logGameManager()
        return Ok({msg:'Correct answer! The game is over.'});
      } else {
        logGameManager()
        return Ok({msg:'Correct answer! Please hit renderWord() again.'});
      }      
    } else {      
      return Ok({msg:'Wrong answer! Please try again.'});
    }      
  })  
})

function resetGame() {
  gameManager.currentWord = '';
  gameManager.remainingGuesses = words.length;
  gameManager.isGameOver = false
  gameManager.guessedLetters = [''];
}

function logGameManager() {
  console.log(`Game Manager: ${JSON.stringify(gameManager)}`)
}

// a workaround to make uuid package work with Azle
globalThis.crypto = {
  // @ts-ignore
 getRandomValues: () => {
     let array = new Uint8Array(32)

     for (let i = 0; i < array.length; i++) {
         array[i] = Math.floor(Math.random() * 256)
     }

     return array
 }
}
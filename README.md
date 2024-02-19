 # Azle Word Guessing Game

Simple word guessing game built using Azle for the Internet Computer Blockchain (ICP). Smart contracts only.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/wiztensai/azle-word-guessing-game.git
   ```

2. **Prerequisites:**

   - Node.js version > 16
   - DFX command line tools (version 0.16.1):

     ```bash
     DFX_VERSION=0.16.1 sh -ci "$(curl -fsSL https://sdk.dfinity.org/install.sh)"
     ```

   - Build dependencies:

     **Ubuntu:**

     ```bash
     sudo apt install clang
     sudo apt install build-essential
     sudo apt install libssl-dev
     sudo apt install pkg-config
     ```

     **macOS:**

     ```bash
     xcode-select --install
     brew install llvm
     ```

3. **Install dependencies and deploy:**

   ```bash
   cd azle-word-guessing-game
   npm install
   dfx deploy
   ```

## API Usage Examples

1. `startGame()` : Starts the game and retrieves the initial word to guess
2. `renderWord()` : Displays the word with some letters hidden, replaced by underscores.
3. `handleGuess(text)` : Processes the player's guess and updates the game state

## Dependencies

- "azle": "^0.20.1"
- "uuid": "^9.0.1"

## Additional Information
- Azle github: https://github.com/demergent-labs/azle
- Azle package documentation: https://demergent-labs.github.io/azle/the_azle_book.html
- Dfinity SDK documentation: https://internetcomputer.org/docs/current/developer-docs/backend/typescript/
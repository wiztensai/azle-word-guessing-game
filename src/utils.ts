export function getRandomWord(words: string[], guessedWords: string[]): string | null {
    // Filter out words that have already been guessed
    const availableWords = words.filter(word => !guessedWords.includes(word));

    // Check if there are any available words
    if (availableWords.length === 0) {
        return null; // Return null if all words have been guessed
    }

    // Select a random word from the available words
    const randomIndex = Math.floor(Math.random() * availableWords.length);
    return availableWords[randomIndex];
}
  
export function obfuscateWord(text: string): string {
    const textArray = text.split('');
    const numberOfUnderscores = Math.floor(Math.random() * 2) + 1; // Random between 1 dan 2
    const underscorePositions = [];

    // Generate random positions for underscores
    for (let i = 0; i < numberOfUnderscores; i++) {
        const randomPosition = Math.floor(Math.random() * textArray.length);
        underscorePositions.push(randomPosition);
    }

    // Replace characters at random positions with underscores
    for (const position of underscorePositions) {
        textArray[position] = '_';
    }

    return textArray.join('');
}
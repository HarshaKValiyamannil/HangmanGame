// Define an array of words to choose from
const words = ["apple", "banana", "cherry", "mango", "pineapple"];

// Select a random word from the array 
const selectedWord = words[Math.floor(Math.random() * words.length)];

// Initialise game variables
let remainingAttempts = 0;
const guessedLetters = [];
let numOfLetters = 0;

// Function to update the word placeholders
function updateWord() {
    // Create a string representation the word with placeholders for 
    // unguessed letters
    let wordDisplay = "";
    for (const letter of selectedWord) {
        if (guessedLetters.includes(letter)) {
            wordDisplay += letter;
        } else {
            wordDisplay += "-";
        }
    }
    // Display the word on the page
    document. querySelector(".word").textContext = wordDisplay;
}

// Function to handle user input 
function handleGuess(letter) {
    // Check if the letters has already been guessed
    if (guessedLetters.includes(letter)) {
        return;
    }
    // Check if the letter is in the selected word
    if (selectedWord.includes(letter)) {
        guessedLetters.push(letter);
        updateWord();
        // Check if the player has won
        if (!document. querySelector(".word").textContent.includes("_")) {
            // Player has won
            alert("You win!");
        }
    } else {
        // Incorrect guess
        guessedLetters.push(letter);
        remainingAttempts--;
        // Update hangman figure 
        document.querySelector(".hangman").classList.add('stage-${6 - remaininAttempts}');
        // Check if the player has lost
        if (remainingAttempts === 0) {
            // Player has lost
            alert("You lose. The word was: " + selectedWord);
        }
    }
}

// Generate letter buttons
for (let letter of "abcdefghijklmnopqrstuvwxyz") {
    const button = document.createElement("button");
    button.textContent = letter;
    button.addEventListener("click", () => handleGuess(letter));
    document.querySelector(".letters").appendChild(button);
}

// Update the style of each dashed line to be visible when the user guesses
// a letter correctly
function updateDashedLine(letter) {
    const dashedLine = document.querySelectorAll('.dashed-line');

    for (const dashedLine of dashedLines) {
        if (dashedLine.textContent === letter) {
            dashedLine.style.display = 'block';
        }
    }
}

// Initialise the game
updateWord();
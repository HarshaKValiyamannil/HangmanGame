// Initial references
const letterContainer = document.getElementById("letter-container");
const optionsContainer = document.getElementById("options-container");
const userInputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("new-game-popup");
const newGameButton = document.getElementById("new-game-button");
const resultText = document.getElementById("result");

// Options values for buttons
let options = {
    fruits: ["Mango", "Pineapple", "Jackfruit", "Watermelon", "Guava"],
    animals: ["Lion", "Tiger", "Dog", "Panther", "Elephant"],
    countries: ["United Kingdom", "India", "Ireland", "France", "Japan"]
};

let winCount = 0;
let count = 0;
let chosenWord ="";

// Function to to display options
function displayOptions() {
    optionsContainer.innerHTML += `<h3>Please Select An Option</h3>`;
    for (const value in options) {
        const button = createOptionButton(value);
        optionsContainer.appendChild(button);
    }
}

// Function to create an option button
function createOptionButton(value) {
    const button = document.createElement("button");
    button.classList.add("options");
    button.textContent = value;
    button.addEventListener("click", () => generateWord(value));
    return button;
}

// Function to block all buttons
function blockAllButtons() {
    const optionsButtons = document.querySelectorAll(".options");
    const letterButtons = document.querySelectorAll(".letters");
    optionsButtons.forEach((button) => (button.disabled = true));
    letterButtons.forEach((button) => (button.disabled = true));
    newGameContainer.classList.remove("hide");
}

// Function to generate a word
function generateWord(optionValue) {
    const optionsButtons = document.querySelectorAll(".options");
    optionsButtons.forEach((button) => {
        if (button.innerText.toLowerCase() === optionValue) {
            button.classList.add("active");
        }
        button.disabled = true;
    });

    letterContainer.classList.remove("hide");
    userInputSection.innerText = "";

    const optionsArray = options[optionValue];
    chosenWord = optionsArray[Math.floor(Math.random() * optionsArray.length)].toUpperCase();
    
    const displayItem = chosenWord.replace(/./g, '<span class="dashes">_</span>');
    userInputSection.innerHTML = displayItem;
}

// Function to initialise the game
function initialiseGame() {
    winCount = 0;
    count = 0;

    userInputSection.innerHTML = "";
    optionsContainer.innerHTML = "";
    letterContainer.classList.add("hide");
    newGameContainer.classList.add("hide");
    letterContainer.innerHTML = "";

    for (let i = 65; i < 91; i++) {
        const button = createLetterButton(String.fromCharCode(i));
        letterContainer.append(button);
    }

    displayOptions();
    updateHangmanImage(0);
}

// Function to create a letter button
function createLetterButton(letter) {
    const button = document.createElement("button");
    button.classList.add("letters");
    button.innerText = letter;

    button.addEventListener("click", () => handleLetterClick(button.innerText));
    return button;
}

// Function to handle a letter button click
function handleLetterClick(clickedLetter) {
    const charArray = chosenWord.split("");
    const dashes = document.getElementsByClassName("dashes");

    if (charArray.includes(clickedLetter)) {
        charArray.forEach((char, index) => {
            if (char === clickedLetter) {
                dashes[index].innerText = char;
                winCount += 1;

                if (winCount === charArray.length) {
                    resultText.innerHTML = `<h2 class = 'win-msg'>You Win!</h2>
                        <p>The word was <span>${chosenWord}</span></p>`;
                    blockAllButtons(); 
                }
            }
        });                   
    } else {
        count += 1;
        updateHangmanImage(count);
        if (count === 6) {
            resultText.innerHTML = `<h2 class='lose-msg'>Game Over</h2>
                <p>The word was <span>${chosenWord}</span></p>`;
            blockAllButtons(); 
        }
    }

    letterContainer.querySelectorAll("button").forEach((button) => {
        if (button.innerText === clickedLetter) {
            button.disabled = true;
        }
    });
}

// Function to update the hangman image
function updateHangmanImage(stage) {
    const hangmanImage = document.getElementById("hangman-image");
    if (hangmanImage) {
        hangmanImage.src = "HangmanPhotosMin/stage" + stage + ".JPG";
    }
}

// Event listener for the "New Game" button        
newGameButton.addEventListener("click", initialiseGame);
window.onload = initialiseGame;
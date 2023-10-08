// Define an array of eclipse terms with hints
const wordsWithHints = [
    {
        term: "total eclipse",
        hint: "Occurs when the sun is completely covered by the moon."
    },
    {
        term: "partial eclipse",
        hint: "When only a portion of the sun is obscured by the moon."
    },
    {
        term: "penumbral eclipse",
        hint: "A subtle eclipse where the moon enters Earth's penumbral shadow."
    },
    {
        term: "annular eclipse",
        hint: "A type of eclipse where the moon doesn't fully cover the sun, creating a ring-like appearance."
    },
    {
        term: "totality",
        hint: "The brief moment of complete darkness during a total solar eclipse."
    },
    {
        term: "umbra",
        hint: "The darkest part of the moon's shadow during an eclipse."
    },
    {
        term: "penumbra",
        hint: "The outer part of the moon's shadow during an eclipse."
    },
    {
        term: "eclipse path",
        hint: "The trajectory along which an eclipse is visible on Earth."
    },
    {
        term: "corona",
        hint: "The outer atmosphere of the sun visible during a total solar eclipse."
    },
    {
        term: "Bailey's beads",
        hint: "Bright points of light visible just before and after a total solar eclipse."
    }
];

// Initialize game elements
const scrambledWordElement = document.getElementById("scrambled-word");
const guessInput = document.getElementById("guess-input");
const checkButton = document.getElementById("check-button");
const newWordButton = document.getElementById("new-word-button");
const resultElement = document.getElementById("result");
const hintElement = document.getElementById("hint");
const scoreElement = document.getElementById("score-value");

let currentWord = "";
let scrambledWord = "";
let score = 0;
let attempts = 0;

// Function to scramble a word
function scrambleWord(word) {
    // Implement your word scrambling logic here
    // For example, you can shuffle the letters randomly
    return word.split('').sort(() => 0.5 - Math.random()).join('');
}

// Function to update the score
function updateScore(newScore) {
    score = newScore;
    scoreElement.textContent = score;
}

// Function to start a new round with a hint
function newRound() {
    if (attempts >= 10) {
        // End the game if maximum attempts are reached
        resultElement.textContent = "Game Over!";
        checkButton.disabled = true;
        newWordButton.disabled = true;
        hintElement.textContent = "";
        return;
    }

    const randomIndex = Math.floor(Math.random() * wordsWithHints.length);
    currentWord = wordsWithHints[randomIndex].term;
    const hint = wordsWithHints[randomIndex].hint;

    scrambledWord = scrambleWord(currentWord);
    scrambledWordElement.textContent = scrambledWord;
    guessInput.value = "";
    resultElement.textContent = "";

    // Display the hint when a new term is generated
    hintElement.textContent = `Hint: ${hint}`;

    attempts++;
}

// Function to handle correct answers
function handleCorrectAnswer() {
    resultElement.textContent = "Correct! Well done!";
    updateScore(score + 1);

    // Delay for a moment and then start a new round
    setTimeout(() => {
        newRound();
    }, 1000); // Adjust the delay time (in milliseconds) as needed
}


// Event listener for the "Check" button
checkButton.addEventListener("click", () => {
    const playerGuess = guessInput.value.toLowerCase();

    if (playerGuess === currentWord) {
        handleCorrectAnswer();
    } else {
        resultElement.textContent = "Incorrect. Try again.";
    }
});

// Event listener for the "New Term" button
newWordButton.addEventListener("click", () => {
    newRound();
});

// Start the first round
newRound();

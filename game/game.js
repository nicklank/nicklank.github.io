// Store words in their categories as dictionaries
const words = {
    co2: ["reforestation", "renewable energy", "carbon tax", "direct air capture", "energy efficiency", "regenerative farming"],
    electricity: ["offshore wind", "grid modernization", "energy storage"],
    sociopolitical: ["civic education", "affordable housing", "citizen assemblies", "worker co-ops", "community gardens", "local governance", "urban farming", "public transit"],
    resources: ["circular economy", "repair culture", "smart manufacturing", "upcycling", "zero waste", "water conservation"],
    temperature: ["white roofs", "urban cooling", "climate finance", "heat resilience", "clean cooking", "rewilding", "coastal restoration"],
    biodiversity: ["habitat restoration", "wetland preservation", "pollinator pathways", "marine reserves", "wildlife corridors", "no-till farming"],
};

let currentLevel = 1; // Start at level 1
let countdown = 30; // 30-second countdown for each level
let timerInterval; // To store the interval ID
let currentWord = "";
let currentCategory = "";
let barLevels = {
    co2: 0,
    electricity: 0,
    sociopolitical: 0,
    resources: 0,
    temperature: 0,
    biodiversity: 0,
};
const maxBarLevel = 100; // Max height for bars in %
let gameActive = false; // Game state (start or stop)

const backgroundMusic = document.getElementById("backgroundMusic");
const newLevelSound = document.getElementById("newLevelSound");
const introModal = document.getElementById("introModal");
const introInput = document.getElementById("introInput");
const levelDisplay = document.getElementById("level-display");
const timerDisplay = document.getElementById("timer-display");
const victoryModal = document.getElementById("victoryModal");
const wordDisplay = document.getElementById("current-word");
const wordInput = document.getElementById("word-input");
const statusMessage = document.getElementById("status-message");

// Bars
const barElements = {
    co2: document.getElementById("co2"),
    electricity: document.getElementById("electricity"),
    sociopolitical: document.getElementById("sociopolitical"),
    resources: document.getElementById("resources"),
    temperature: document.getElementById("temperature"),
    biodiversity: document.getElementById("biodiversity"),
};


window.onload = () => {
    // Show the intro modal on page load
    introModal.classList.remove("hidden");
    introModal.style.display = "block";
};

// Handle input in the introductory modal
introInput.addEventListener("input", () => {
    if (introInput.value.trim().toLowerCase() === "start") {
        introInput.value = ""; // Clear the input field
        introModal.classList.add("hidden");
        introModal.style.display = "none"; // Hide the modal
        gameActive = true; // Set the game state to active
        startGame(); // Start the game
    }
});

// Handle typing in the input field
wordInput.addEventListener("input", () => {
    if (wordInput.value.trim().toLowerCase() === currentWord.toLowerCase()) {
        wordInput.value = ""; // Clear the input field
        reduceBar(currentCategory); // Reduce the bar for the correct category
        pickWord(); // Pick the next word
    }
});


// Start the game
function startGame() {
    statusMessage.textContent = "";
    wordInput.value = "";
    pickWord();
    updateBars();
    currentLevel = 1;
    countdown = 30;
    startLevel(currentLevel);
    backgroundMusic.play(); // Play background music
}


function startLevel(level) {
    updateLevelDisplay(level);
    countdown = 30; // Reset countdown
    startCountdown();
}


function updateLevelDisplay(level) {
    const levelNames = { 1: "2030", 2: "2040", 3: "2050" };
    levelDisplay.textContent = `Level ${level}: ${levelNames[level]}`;
}

function startCountdown() {
    clearInterval(timerInterval); // Clear any previous timer
    timerDisplay.textContent = `${countdown}s`; // Initialize display

    timerInterval = setInterval(() => {
        countdown--; // Decrement countdown
        if (countdown < 0) {
            clearInterval(timerInterval); // Stop the timer
            if (currentLevel < 3) {
                currentLevel++;
                countdown = 30; // Reset countdown for the next level
                startLevel(currentLevel); // Start the next level
            } else {
                triggerVictory(); // Trigger victory if on final level
            }
        } else {
            timerDisplay.textContent = `${countdown}s`; // Update the display
        }
    }, 1000);
}


// Play "new level" sound when advancing to a new level
function advanceLevel(level) {
    currentLevel = level;
    levelText.textContent = `Level ${level}: ${level === 1 ? "2030" : level === 2 ? "2040" : "2050"}`;
    timeRemaining = levelDuration;
    levelSound.play();
}

// Pick a random word from a random category
function pickWord() {
    const categories = Object.keys(words);
    currentCategory = categories[Math.floor(Math.random() * categories.length)];
    const wordList = words[currentCategory];
    currentWord = wordList[Math.floor(Math.random() * wordList.length)];

    wordDisplay.textContent = currentWord; // Display the word
}

// Update bars visually and check for game over
function updateBars() {
    for (let category in barLevels) {
        const bar = barElements[category];
        const level = barLevels[category];
        bar.style.height = `${level}%`;
        bar.style.backgroundColor = level > 70 ? "red" : level > 40 ? "yellow" : "blue";
    }
    checkGameOver(); // Check if any bar is full
}

// Reduce the bar level for the correct category
function reduceBar(category) {
    barLevels[category] = Math.max(0, barLevels[category] - 10);
    updateBars();
}

// Increase the bar levels over time (only when the game is active)
setInterval(() => {
    if (gameActive) {
        for (let category in barLevels) {
            barLevels[category] = Math.min(maxBarLevel, barLevels[category] + 2);
        }
        updateBars();
    }
}, 1500); // Bars rise every second

// Check if any bar has reached max level
function checkGameOver() {
    for (let category in barLevels) {
        if (barLevels[category] >= maxBarLevel) {
            triggerGameOver();
            return; // Stop further checks once game over is triggered
        }
    }
}

// Display the modal and stop the game
function triggerGameOver() {
    gameActive = false; // Stop the game
    const modal = document.getElementById("gameOverModal");
    modal.classList.remove("hidden"); // Show the modal
    modal.style.display = "block"; // Ensure it's visible
}

// Modal
const modal = document.getElementById("gameOverModal");

function triggerVictory() {
    gameActive = false; // Stop the game
    clearInterval(timerInterval); // Stop the timer
    victoryModal.classList.remove("hidden");
    victoryModal.style.display = "block";
}

function restartGame() {
    const modal = document.getElementById("gameOverModal");
    const victoryModal = document.getElementById("victoryModal");
    modal.classList.add("hidden"); // Hide the modal
    modal.style.display = "none"; // Reset the display style
    victoryModal.classList.add("hidden");
    victoryModal.style.display = "none";
    for (let category in barLevels) {
        barLevels[category] = 0; // Reset all bar levels
    }
    updateBars(); // Update the bars visually
    gameActive = true; // Restart the game
    startGame(); // Reset the game state
}


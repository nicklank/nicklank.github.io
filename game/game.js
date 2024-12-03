// Game variables
const words = {
    co2: ["reforestation", "renewable energy", "carbon tax", "direct air capture", "energy efficiency", "regenerative farming"],
    electricity: ["offshore wind", "grid modernization", "energy storage"],
    sociopolitical: ["civic education", "affordable housing", "citizen assemblies", "worker co-ops", "community gardens", "local governance", "urban farming", "public transit"],
    resources: ["circular economy", "repair culture", "smart manufacturing", "upcycling", "zero waste", "water conservation"],
    temperature: ["white roofs", "urban cooling", "climate finance", "heat resilience", "clean cooking", "rewilding", "coastal restoration"],
    biodiversity: ["habitat restoration", "wetland preservation", "pollinator pathways", "marine reserves", "wildlife corridors", "no-till farming"],
};
let currentWord = "";
let currentCategory = "";
let barLevels = {
    co2: 50,
    electricity: 50,
    sociopolitical: 50,
    resources: 50,
    temperature: 50,
    biodiversity: 50,
};
const maxBarLevel = 100; // Maximum height (in %)

// DOM elements
const wordDisplay = document.getElementById("current-word");
const wordInput = document.getElementById("word-input");
const startBtn = document.getElementById("start-btn");
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

// Start the game
startBtn.addEventListener("click", () => {
    startGame();
});

function startGame() {
    statusMessage.textContent = "";
    wordInput.value = "";
    pickWord();
    updateBars();
}

function pickWord() {
    // Randomly pick a category and word
    const categories = Object.keys(words);
    currentCategory = categories[Math.floor(Math.random() * categories.length)];
    const wordList = words[currentCategory];
    currentWord = wordList[Math.floor(Math.random() * wordList.length)];

    // Display the word
    wordDisplay.textContent = currentWord;
}

// Check input
wordInput.addEventListener("input", () => {
    if (wordInput.value.trim().toLowerCase() === currentWord.toLowerCase()) {
        wordInput.value = "";
        reduceBar(currentCategory);
        pickWord();
    }
});

// Update bars visually
function updateBars() {
    for (let category in barLevels) {
        const bar = barElements[category];
        const level = barLevels[category];
        bar.style.height = `${level}%`;
        bar.style.backgroundColor = level > 70 ? "red" : level > 40 ? "yellow" : "green";
    }
}

// Adjust bar levels
function reduceBar(category) {
    barLevels[category] = Math.max(0, barLevels[category] - 10);
    updateBars();
}

function increaseBar(category) {
    barLevels[category] = Math.min(maxBarLevel, barLevels[category] + 2);
    updateBars();
}

// Simulate bar rise over time
setInterval(() => {
    for (let category in barLevels) {
        increaseBar(category);
    }
}, 3000); // Bars rise every 3 seconds

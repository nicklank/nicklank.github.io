
const words = {
    co2: ["reforestation", "renewable energy", "carbon tax", "direct air capture", "energy efficiency", "regenerative farming"],
    electricity: ["offshore wind", "grid modernization", "energy storage"],
    sociopolitical: ["civic education", "affordable housing", "citizen assemblies", "worker co-ops", "community gardens", "local governance", "urban farming", "public transit"],
    resources: ["circular economy", "repair culture", "smart manufacturing", "upcycling", "zero waste", "water conservation"],
    temperature: ["white roofs", "urban cooling", "climate finance", "heat resilience", "clean cooking", "rewilding", "coastal restoration"],
    biodiversity: ["habitat restoration", "wetland preservation", "pollinator pathways", "marine reserves", "wildlife corridors", "no-till farming"],
};

let currentLevel = 1; 
let countdown = 40; 
let timerInterval; 
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
const maxBarLevel = 100; 
let gameActive = false; 

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

const barElements = {
    co2: document.getElementById("co2"),
    electricity: document.getElementById("electricity"),
    sociopolitical: document.getElementById("sociopolitical"),
    resources: document.getElementById("resources"),
    temperature: document.getElementById("temperature"),
    biodiversity: document.getElementById("biodiversity"),
};

window.onload = () => {
    introModal.classList.remove("hidden");
    introModal.style.display = "block";
};

introInput.addEventListener("input", () => {
    if (introInput.value.trim().toLowerCase() === "start") {
        introInput.value = ""; 
        introModal.classList.add("hidden");
        introModal.style.display = "none"; 
        gameActive = true; 
        startGame(); 
        wordInput.focus();
    }
});


wordInput.addEventListener("input", () => {
    if (wordInput.value.trim().toLowerCase() === currentWord.toLowerCase()) {
        wordInput.value = ""; 
        reduceBar(currentCategory); 
        pickWord(); 
    }
});


function startGame() {
    statusMessage.textContent = "";
    wordInput.value = "";
    pickWord();
    updateBars();
    currentLevel = 1;
    countdown = 30;
    startLevel(currentLevel);
    backgroundMusic.play(); 
}


function startLevel(level) {
    updateLevelDisplay(level);
    countdown = 30; 
    startCountdown();
}


function updateLevelDisplay(level) {
    const levelNames = { 1: "2030", 2: "2040", 3: "2050" };
    levelDisplay.textContent = `Level ${level}: ${levelNames[level]}`;
}

function startCountdown() {
    clearInterval(timerInterval); 
    timerDisplay.textContent = `${countdown}s`; 

    timerInterval = setInterval(() => {
        countdown--; 
        if (countdown < 0) {
            clearInterval(timerInterval); 
            if (currentLevel < 3) {
                currentLevel++;
                countdown = 30; 
                startLevel(currentLevel);
            } else {
                triggerVictory();
            }
        } else {
            timerDisplay.textContent = `${countdown}s`;
        }
    }, 1000);
}

// sound won't play and idk why
function advanceLevel(level) {
    currentLevel = level;
    levelText.textContent = `Level ${level}: ${level === 1 ? "2030" : level === 2 ? "2040" : "2050"}`;
    timeRemaining = levelDuration;
    levelSound.play();
}

function pickWord() {
    const categories = Object.keys(words);
    currentCategory = categories[Math.floor(Math.random() * categories.length)];
    const wordList = words[currentCategory];
    currentWord = wordList[Math.floor(Math.random() * wordList.length)];

    wordDisplay.textContent = currentWord; 
}

function updateBars() {
    for (let category in barLevels) {
        const bar = barElements[category];
        const level = barLevels[category];
        bar.style.height = `${level}%`;
        bar.style.backgroundColor = level > 70 ? "red" : level > 40 ? "yellow" : "blue";
    }
    checkGameOver(); 
}


function reduceBar(category) {
    barLevels[category] = Math.max(0, barLevels[category] - 15);
    updateBars();
}

setInterval(() => {
    if (gameActive) {
        for (let category in barLevels) {
            barLevels[category] = Math.min(maxBarLevel, barLevels[category] + 2);
        }
        updateBars();
    }
}, 1400);


function checkGameOver() {
    for (let category in barLevels) {
        if (barLevels[category] >= maxBarLevel) {
            triggerGameOver();
            return; 
        }
    }
}

function triggerGameOver() {
    gameActive = false; 
    clearInterval(timerInterval);
    const modal = document.getElementById("gameOverModal");
    modal.classList.remove("hidden"); 
    modal.style.display = "block"; 
}

const modal = document.getElementById("gameOverModal");

function triggerVictory() {
    gameActive = false; 
    clearInterval(timerInterval); 
    victoryModal.classList.remove("hidden");
    victoryModal.style.display = "block";
}

function restartGame() {
    const modal = document.getElementById("gameOverModal");
    const victoryModal = document.getElementById("victoryModal");
    modal.classList.add("hidden"); 
    modal.style.display = "none"; 
    victoryModal.classList.add("hidden");
    victoryModal.style.display = "none";
    for (let category in barLevels) {
        barLevels[category] = 0; 
    }
    updateBars(); 
    gameActive = true; 
    startGame(); 
}


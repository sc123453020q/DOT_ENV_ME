const wasteItems = [
    { name: "Plastic Bottle", type: "plastic" },
    { name: "Metal Can", type: "metal" },
    { name: "Glass Bottle", type: "glass" },
];

let score = 0;
let timeLeft = 60;
let currentWaste = {};
const gridSize = 25;
const grid = document.getElementById('grid');
const popup = document.getElementById('popup');
const scoreEl = document.getElementById('score');
const timerEl = document.getElementById('timer');
const wasteItemEl = document.getElementById('waste-item');

function generateGrid() {
    grid.innerHTML = '';
    for (let i = 0; i < gridSize; i++) {
        const block = document.createElement('div');
        block.classList.add('block');
        grid.appendChild(block);
    }
}

function pickRandomWaste() {
    const index = Math.floor(Math.random() * wasteItems.length);
    currentWaste = wasteItems[index];
    wasteItemEl.textContent = currentWaste.name;
}

function showPopup(message) {
    popup.textContent = message;
    popup.style.display = 'block';
    setTimeout(() => popup.style.display = 'none', 2000);
}

function handleBinClick(e) {
    const binType = e.target.dataset.type;
    if (binType === currentWaste.type) {
        // Correct
        score += 10;
        scoreEl.textContent = `Score: ${score}`;
        removeBlock();
        showPopup('✅ Correct! Good job.');
        pickRandomWaste();
    } else {
        // Incorrect
        generateGrid();
        showPopup('❌ Wrong bin! Grid reset.');
    }
}

function removeBlock() {
    const blocks = document.querySelectorAll('.block');
    for (let block of blocks) {
        if (block.style.visibility !== 'hidden') {
            block.style.visibility = 'hidden';
            break;
        }
    }
}

function startTimer() {
    const timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = `Time: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert(`Time’s up! Final Score: ${score}`);
            location.reload();
        }
    }, 1000);
}

document.querySelectorAll('.bin').forEach(button =>
    button.addEventListener('click', handleBinClick)
);

window.onload = () => {
    generateGrid();
    pickRandomWaste();
    startTimer();
};

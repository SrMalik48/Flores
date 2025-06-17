// scripts/game.js
const floweyContainer = document.getElementById('flowey-container');
const speechBubble = document.getElementById('speech-bubble');
const obstaclesDiv = document.getElementById('obstacles');
const scoreDiv = document.getElementById('score');
const messageDiv = document.getElementById('message');

const supportiveWords = [
    "Eres muy inteligente sabes?",
    "me encantan tus ojos",
    "Eres genial",
    "soy tú mayor fan",
    "ya te dije que te quiero?",
    "Tú = lo mejor",
    "Durísimo",
    "no me pagan lo suficiente para saltar",
    "terrible",
    "te amo"
];

let floweyY = 50; // px desde el suelo
let floweyVY = 0;
let gravity = 1.1;
let jumpPower = 18;
let isJumping = false;
let isGameOver = false;
let isVictory = false;
let score = 0;
let obstacles = [];
let obstacleSpeed = 7;
let totalObstacles = 7;
let gameStarted = false;

function moveFlowey(y) {
    floweyContainer.style.bottom = y + "px";
}

function showSpeechBubble() {
    const msg = supportiveWords[Math.floor(Math.random() * supportiveWords.length)];
    speechBubble.textContent = msg;
    speechBubble.classList.add('visible');
    setTimeout(() => {
        speechBubble.classList.remove('visible');
    }, 1000);
}

function resetGame() {
    floweyY = 50;
    floweyVY = 0;
    isJumping = false;
    isGameOver = false;
    isVictory = false;
    score = 0;
    scoreDiv.textContent = "Puntos: 0";
    messageDiv.style.display = "none";
    obstaclesDiv.innerHTML = "";
    obstacles = [];
    moveFlowey(floweyY);
    for (let i = 0; i < totalObstacles; i++) {
        createObstacle(600 + i * 300);
    }
}

function createObstacle(left) {
    const heart = document.createElement('img');
    heart.src = "assets/heart pixel art.png";
    heart.className = "pixel-heart";
    heart.style.left = left + "px";
    heart.style.bottom = "50px";
    obstaclesDiv.appendChild(heart);
    obstacles.push({el: heart, left: left, passed: false});
}

function showMessage(text, color = "#76453b") {
    messageDiv.innerHTML = text + '<br><button onclick="window.location.reload()">intentamos otra vez?</button>';
    messageDiv.style.display = "block";
    messageDiv.style.color = color;
}

function gameLoop() {
    if (isGameOver || isVictory) return;

    // Movimiento Flowey
    if (isJumping) {
        floweyVY -= gravity;
        floweyY += floweyVY;
        if (floweyY <= 50) {
            floweyY = 50;
            floweyVY = 0;
            isJumping = false;
        }
        moveFlowey(floweyY);
    }

    // Movimiento obstáculos
    for (let obs of obstacles) {
        obs.left -= obstacleSpeed;
        obs.el.style.left = obs.left + "px";
        // Colisión
        if (
            obs.left < 120 && obs.left + 40 > 50 && // rango horizontal
            floweyY < 90 // rango vertical
        ) {
            isGameOver = true;
            showMessage("¡Perdiste! es durísimo.");
            return;
        }
        // Score
        if (!obs.passed && obs.left + 40 < 50) {
            obs.passed = true;
            score++;
            scoreDiv.textContent = "Puntos: " + score;
        }
    }

    // Victoria
    if (score >= totalObstacles) {
        isVictory = true;
        showMessage("¡Victoria!");
        return;
    }

    // Eliminar obstáculos fuera de pantalla
    obstacles = obstacles.filter(obs => obs.left > -60);

    requestAnimationFrame(gameLoop);
}

// Salto
window.addEventListener('keydown', function(e) {
    if ((e.code === 'Space' || e.code === 'ArrowUp') && !isJumping && !isGameOver && !isVictory) {
        isJumping = true;
        floweyVY = jumpPower;
        showSpeechBubble();
        if (!gameStarted) {
            gameStarted = true;
            gameLoop();
        }
    }
});

function showMessage(text, color = "#76453b") {
    if (text.includes("Victoria")) {
        // Solo muestra la carta si es victoria
        document.getElementById('game-area').style.display = "none";
        document.getElementById('score').style.display = "none";
        document.getElementById('letter-screen').style.display = "flex";
        document.getElementById('letter-message').innerHTML = `
            ¡gracias por jugar!<br>
            Tengo miles de razones para que seas mi favorita, no solo tus preciosos ojos y la forma en la que me tratas siempre, pero voy a intentar resumir un poco......<br>
            Eres de las personas mas inteligentes que conozco, siempre tienes un buen consejo para mi, siempre me sacas una sonrisa y tambien me alegras los malos dias, eres mi favorita por todo lo que eres, por tú nombre, por tús gustos, solo porque eres tú y deseo esforzarme solo para que lo sepas siempre.<br>
            ¡Si, eres mi favorita!
        `;
    } else {
        // Si es derrota, muestra solo el mensaje normal
        messageDiv.innerHTML = text + '<br><button onclick="window.location.reload()">intentamos otra vez?</button>';
        messageDiv.style.display = "block";
        messageDiv.style.color = color;
    }
}
// Iniciar juego
window.onload = resetGame;
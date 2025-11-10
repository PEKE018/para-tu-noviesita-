// --- Lógica de la Carta Digital ---
function revealSecretMessage() {
    const teaser = document.getElementById('teaser');
    const cardContent = document.getElementById('card-content'); // Ahora usa el ID 'card-content'
    const revealButton = document.getElementById('reveal-button');

    if (teaser) teaser.style.display = 'none'; 

    if (cardContent) {
        cardContent.classList.remove('hidden');
        cardContent.classList.add('visible');
    }
    
    if (revealButton) revealButton.disabled = true;
}

// Evento para el botón de la carta
document.getElementById('reveal-button').addEventListener('click', revealSecretMessage);

// --- NUEVA LÓGICA: Mostrar el Juego ---
document.getElementById('show-game-button').addEventListener('click', function() {
    const gameSection = document.getElementById('game-section');
    gameSection.classList.remove('hidden-section');
    gameSection.classList.add('visible-section');
    
    // Opcional: Desplazarse suavemente hasta la sección del juego
    gameSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
});


// --- Lógica del Juego "Encuentra el Corazón" ---
const GRID_SIZE = 9; 
let heartLocation; 
let gameActive = true;

function initializeGame() {
    const grid = document.getElementById('game-grid');
    const message = document.getElementById('game-message');
    const resetButton = document.getElementById('reset-button');
    
    grid.innerHTML = ''; 
    message.textContent = '';
    resetButton.style.display = 'none'; 
    gameActive = true;

    heartLocation = Math.floor(Math.random() * GRID_SIZE);

    for (let i = 0; i < GRID_SIZE; i++) {
        const cell = document.createElement('div');
        cell.classList.add('game-cell');
        cell.textContent = '🎁'; 
        cell.dataset.index = i;
        cell.addEventListener('click', handleCellClick);
        grid.appendChild(cell);
    }
}

function handleCellClick(event) {
    if (!gameActive) return;

    const cell = event.target;
    const index = parseInt(cell.dataset.index);

    if (cell.classList.contains('opened')) return; 

    cell.classList.add('opened');

    if (index === heartLocation) {
        // ¡ENCONTRÓ EL CORAZÓN!
        cell.textContent = '💖';
        document.getElementById('game-message').textContent = "¡Felicidades, mi amor! ¡Encontraste el Corazón!";
        gameActive = false;
        
        // No revelamos la carta aquí, porque ya se reveló antes del juego.
        // Si quisieras un mensaje *diferente* aquí, podrías hacerlo.

        document.getElementById('reset-button').style.display = 'block';

    } else {
        // Falló
        cell.textContent = '😔'; 
        cell.style.backgroundColor = '#f0a0a0'; 
        document.getElementById('game-message').textContent = "¡Casi! Intenta de nuevo...";
    }
}

// Inicializa el juego al cargar la página (pero la sección está oculta)
initializeGame();

// Manejar el botón de reinicio del juego
document.getElementById('reset-button').addEventListener('click', initializeGame);
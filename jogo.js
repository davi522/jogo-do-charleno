const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');

// ----- SISTEMA DE PONTUAÇÃO -----
let score = 0;
let record = localStorage.getItem('record') || 0;

// Criar o placar
const scoreElement = document.createElement('div');
scoreElement.classList.add('score');
scoreElement.textContent = `Pontos: ${score} | Recorde: ${record}`;
document.body.appendChild(scoreElement);

// ----- TELA DE GAME OVER -----
const gameOverScreen = document.createElement('div');
gameOverScreen.classList.add('game-over-screen');

const gameOverText = document.createElement('div');
gameOverText.textContent = 'GAME OVER';

const finalScoreText = document.createElement('div');
finalScoreText.classList.add('final-score');

const restartButton = document.createElement('button');
restartButton.textContent = 'REINICIAR';
restartButton.classList.add('restart-btn');

gameOverScreen.appendChild(gameOverText);
gameOverScreen.appendChild(finalScoreText);
gameOverScreen.appendChild(restartButton);
document.body.appendChild(gameOverScreen);

// ----- FUNÇÃO DE PULO -----
const jump = () => {
    mario.classList.add('jump');
    setTimeout(() => mario.classList.remove('jump'), 500);
};

// Controle de pontos
let scored = false;

const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    if(pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        pipe.style.animation = 'none'; 
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none'; 
        mario.style.bottom = `${marioPosition}px`;
        
        mario.src= '/images/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';    

        clearInterval(loop);

        if (score > record) {
            record = score;
            localStorage.setItem('record', record);
        }

        finalScoreText.textContent = `Pontos: ${score} | Recorde: ${record}`;
        gameOverScreen.classList.add('show');
        document.removeEventListener('keydown', jump);

    } else {
        if (pipePosition < 50 && !scored) {
            score++;
            scoreElement.textContent = `Pontos: ${score} | Recorde: ${record}`;
            scored = true;
        }

        if (pipePosition > 400) {
            scored = false;
        }
    }

}, 10);

restartButton.addEventListener('click', () => location.reload());
document.addEventListener('keydown', jump);

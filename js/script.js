let userScore = 0;
let compScore = 0;
let isGameOver = false;

document.addEventListener('DOMContentLoaded', () => {
    const startScreen = document.getElementById('start-screen');
    const choices = document.querySelector('.choices');
    const resultBox = document.querySelector('.result-box');
    const scoreboard = document.querySelector('.scoreboard');
    
    // Configura estado inicial
    choices.style.display = 'none';
    resultBox.style.display = 'none';
    scoreboard.style.display = 'none';
    
    // Botão inicial
    document.getElementById('start-game').addEventListener('click', () => {
        startScreen.style.display = 'none';
        choices.style.display = 'flex';
        resultBox.style.display = 'flex';
        scoreboard.style.display = 'flex';
        resetGame();
    });
    
    // Botão jogar novamente
    document.getElementById('play-again').addEventListener('click', resetGame);
});

function resetGame() {
    userScore = 0;
    compScore = 0;
    isGameOver = false;
    
    document.getElementById('user-score').textContent = '0';
    document.getElementById('comp-score').textContent = '0';
    document.getElementById('user-choice').textContent = '✋';
    document.getElementById('comp-choice').textContent = '✌️';
    document.getElementById('game-over').style.display = 'none';
    document.querySelector('.choices').style.display = 'flex';
    document.querySelector('.result-box').style.display = 'flex';
    document.querySelector('.scoreboard').style.display = 'flex';
    document.getElementById('start-screen').style.display = 'none';
}

function updateChoices(userChoice, compChoice) {
    const emojiMap = {
        'pedra': '✊',
        'papel': '✋',
        'tesoura': '✌️'
    };
    
    document.getElementById('user-choice').textContent = emojiMap[userChoice];
    document.getElementById('comp-choice').textContent = emojiMap[compChoice];
}

function getWinner(userChoice, compChoice) {
    if (userChoice === compChoice) return 'empate';
    
    if (
        (userChoice === 'pedra' && compChoice === 'tesoura') ||
        (userChoice === 'papel' && compChoice === 'pedra') ||
        (userChoice === 'tesoura' && compChoice === 'papel')
    ) {
        return 'user';
    }
    
    return 'comp';
}

function updateScore(winner) {
    if (winner === 'user') {
        userScore++;
        document.getElementById('user-score').textContent = userScore;
    } else if (winner === 'comp') {
        compScore++;
        document.getElementById('comp-score').textContent = compScore;
    }
}

function play(userChoice) {
    if (isGameOver) return;

    const choices = ['pedra', 'papel', 'tesoura'];
    const compChoice = choices[Math.floor(Math.random() * 3)];
    
    updateChoices(userChoice, compChoice);
    const winner = getWinner(userChoice, compChoice);
    updateScore(winner);

    // Verifica se alguém ganhou o jogo
    if (userScore >= 5 || compScore >= 5) {
        isGameOver = true;
        document.getElementById('game-over').style.display = 'flex';
        document.querySelector('.choices').style.display = 'none';
    }
}

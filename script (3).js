let gameBoard = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameOver = false;

const cellElements = document.querySelectorAll('.cell');
const gameStatusElement = document.getElementById('game-status');
const resetButton = document.getElementById('reset-button');

cellElements.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        if (gameOver || gameBoard[index] !== '') {
            return;
        }

        gameBoard[index] = currentPlayer;
        cell.textContent = currentPlayer;
                if (currentPlayer === 'X') {
            cell.classList.add('x-mark');
        } else {
            cell.classList.add('o-mark');
        }


       if (checkWin()) {
    gameStatusElement.textContent = `Player ${currentPlayer} wins! 🎉👏`;
    gameOver = true;
} else if (checkDraw()) {
    gameStatusElement.textContent = 'It\'s a draw! 😐';
    gameOver = true;
}
else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    });
});

resetButton.addEventListener('click', () => {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameOver = false;
    cellElements.forEach(cell => cell.textContent = '');
    gameStatusElement.textContent = '';
});

function checkWin() {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winConditions.some(condition => {
        return condition.every(index => gameBoard[index] === currentPlayer);
    });
}

function checkDraw() {
    return gameBoard.every(cell => cell !== '');
}
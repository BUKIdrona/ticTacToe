document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const status = document.getElementById('status');
    const restartBtn = document.getElementById('restartBtn');
    let currentPlayer = 'X';
    let boardState = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    const checkWinner = () => {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                return boardState[a];
            }
        }

        if (!boardState.includes('')) return 'draw';
        return null;
    };

    const handleCellClick = (index) => {
        if (!gameActive || boardState[index] !== '') return;
        boardState[index] = currentPlayer;
        document.getElementById(`cell-${index}`).innerText = currentPlayer;
        const winner = checkWinner();
        if (winner) {
            gameActive = false;
            if (winner === 'draw') {
                status.innerText = "It's a draw!";
            } else {
                status.innerText = `${winner} wins!`;
            }
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            status.innerText = `${currentPlayer}'s turn`;
        }
    };

    const handleRestartClick = () => {
        currentPlayer = 'X';
        boardState = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        status.innerText = `${currentPlayer}'s turn`;
        document.querySelectorAll('.cell').forEach(cell => cell.innerText = '');
    };

    const initializeBoard = () => {
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.id = `cell-${i}`;
            cell.addEventListener('click', () => handleCellClick(i));
            board.appendChild(cell);
        }
    };

    initializeBoard();
    status.innerText = `${currentPlayer}'s turn`;
    restartBtn.addEventListener('click', handleRestartClick);
});

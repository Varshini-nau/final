document.addEventListener("DOMContentLoaded", () => {
    const boardSize = 5;
    const gameBoard = document.getElementById('game-board');

    let board = [];

    // Initialize the board
    for (let row = 0; row < boardSize; row++) {
        board[row] = [];
        for (let col = 0; col < boardSize; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', () => toggleCell(row, col));
            gameBoard.appendChild(cell);
            board[row][col] = false; // false means the cell is on
        }
    }

    // Toggle a cell and its neighbors
    function toggleCell(row, col) {
        const positions = [
            [row, col],
            [row - 1, col],
            [row + 1, col],
            [row, col - 1],
            [row, col + 1]
        ];

        positions.forEach(([r, c]) => {
            if (r >= 0 && r < boardSize && c >= 0 && c < boardSize) {
                board[r][c] = !board[r][c];
                const cell = document.querySelector(`[data-row='${r}'][data-col='${c}']`);
                cell.classList.toggle('is-off');
            }
        });

        checkWin();
    }

    // Check if the player has won the game
    function checkWin() {
        const allOff = board.flat().every(cell => cell);
        if (allOff) {
            window.alert("You win!");
        }
    }

    // Randomly toggle cells to create a solvable board
    function randomizeBoard() {
        for (let i = 0; i < boardSize * boardSize; i++) {
            const randomRow = Math.floor(Math.random() * boardSize);
            const randomCol = Math.floor(Math.random() * boardSize);
            toggleCell(randomRow, randomCol);
        }
    }

    randomizeBoard();
});

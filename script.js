//your JS code here. If required.
  const submitButton = document.getElementById('submit');
    const player1Input = document.getElementById('player-1');
    const player2Input = document.getElementById('player-2');
    const gameSection = document.querySelector('.game-section');
    const inputSection = document.querySelector('.input-section');
    const messageDiv = document.querySelector('.message');
    const boardDiv = document.querySelector('.board');

    let currentPlayer = 'X';
    let player1 = '';
    let player2 = '';
    let board = Array(9).fill(null);

    submitButton.addEventListener('click', () => {
      player1 = player1Input.value;
      player2 = player2Input.value;

      if (player1 && player2) {
        inputSection.style.display = 'none';
        gameSection.style.display = 'block';
        messageDiv.textContent = `${player1}, you're up!`;
        createBoard();
      }
    });

    function createBoard() {
      boardDiv.innerHTML = '';
      for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('id', i + 1);
        cell.addEventListener('click', () => handleCellClick(i));
        boardDiv.appendChild(cell);
      }
    }

    function handleCellClick(index) {
      if (!board[index]) {
        board[index] = currentPlayer;
        document.getElementById(index + 1).textContent = currentPlayer;

        if (checkWinner()) {
          const winner = currentPlayer === 'X' ? player1 : player2;
          messageDiv.textContent = `${winner}, congratulations you won!`;
          boardDiv.style.pointerEvents = 'none';
          return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        const currentPlayerName = currentPlayer === 'X' ? player1 : player2;
        messageDiv.textContent = `${currentPlayerName}, you're up!`;
      }
    }

    function checkWinner() {
      const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

      return winningCombinations.some((combination) => {
        const [a, b, c] = combination;
        return board[a] && board[a] === board[b] && board[b] === board[c];
      });
    }
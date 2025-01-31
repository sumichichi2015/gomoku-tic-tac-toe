class TicTacToe {
    constructor() {
        this.currentPlayer = 'black';
        this.board = Array(9).fill('');
        this.wins = { black: 0, white: 0 };
        this.gameActive = true;
        this.winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        
        this.cells = document.querySelectorAll('.cell');
        this.currentPlayerDisplay = document.getElementById('current-player');
        this.resetButton = document.getElementById('reset-button');
        
        this.initializeGame();
    }
    
    initializeGame() {
        this.cells.forEach(cell => {
            cell.addEventListener('click', (e) => this.handleCellClick(e));
        });
        
        this.resetButton.addEventListener('click', () => this.resetGame());
        this.updateCurrentPlayerDisplay();
    }
    
    handleCellClick(e) {
        const cell = e.currentTarget;
        const index = cell.dataset.index;
        
        if (this.board[index] === '' && this.gameActive) {
            this.board[index] = this.currentPlayer;
            const stone = cell.querySelector('.stone');
            
            // 既存のクラスをクリア
            stone.classList.remove('black', 'white');
            
            // 新しいクラスを追加
            stone.classList.add(this.currentPlayer);
            stone.classList.add('animate__animated', 'animate__fadeIn');
            
            if (this.checkWin()) {
                this.handleWin();
            } else if (this.checkDraw()) {
                this.handleDraw();
            } else {
                this.currentPlayer = this.currentPlayer === 'black' ? 'white' : 'black';
                this.updateCurrentPlayerDisplay();
            }
        }
    }
    
    checkWin() {
        return this.winningCombos.some(combo => {
            if (
                this.board[combo[0]] === this.currentPlayer &&
                this.board[combo[1]] === this.currentPlayer &&
                this.board[combo[2]] === this.currentPlayer
            ) {
                combo.forEach(index => {
                    this.cells[index].classList.add('winning-cell');
                });
                return true;
            }
            return false;
        });
    }
    
    checkDraw() {
        return this.board.every(cell => cell !== '');
    }
    
    handleWin() {
        this.gameActive = false;
        this.wins[this.currentPlayer]++;
        this.updateScoreDisplay();
        
        const winnerName = this.currentPlayer === 'black' ? 'サンセット' : 'サンライズ';
        setTimeout(() => {
            alert(`${winnerName}の勝利！`);
        }, 500);
    }
    
    handleDraw() {
        this.gameActive = false;
        setTimeout(() => {
            alert('引き分けです！');
        }, 500);
    }
    
    resetGame() {
        this.board = Array(9).fill('');
        this.gameActive = true;
        this.currentPlayer = 'black';
        
        this.cells.forEach(cell => {
            const stone = cell.querySelector('.stone');
            stone.classList.remove('black', 'white', 'animate__animated', 'animate__fadeIn');
            cell.classList.remove('winning-cell');
        });
        
        this.updateCurrentPlayerDisplay();
    }
    
    updateCurrentPlayerDisplay() {
        const playerName = this.currentPlayer === 'black' ? 'サンセット' : 'サンライズ';
        this.currentPlayerDisplay.textContent = playerName;
    }
    
    updateScoreDisplay() {
        const kimotoScore = document.querySelector('.kimoto-score .player-wins');
        const arimiScore = document.querySelector('.arimi-score .player-wins');
        
        kimotoScore.textContent = `${this.wins.black} 勝`;
        arimiScore.textContent = `${this.wins.white} 勝`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new TicTacToe();
});

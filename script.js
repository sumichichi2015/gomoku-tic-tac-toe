class TicTacToe {
    constructor() {
        this.board = Array(9).fill(null);
        this.currentPlayer = 'きもと';
        this.gameActive = true;
        this.scores = {
            'きもと': 0,
            'ありみ': 0
        };
        this.winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        this.cells = document.querySelectorAll('.cell');
        this.statusDisplay = document.getElementById('current-player');
        this.resetButton = document.getElementById('reset-button');

        this.initializeGame();
        this.initializeParticles();
    }

    initializeGame() {
        this.cells.forEach(cell => {
            cell.addEventListener('click', () => this.handleCellClick(cell));
            cell.classList.remove('kimoto', 'arimi', 'winning');
        });

        this.resetButton.addEventListener('click', () => this.resetGame());
        this.updateScoreDisplay();
    }

    initializeParticles() {
        particlesJS('particles', {
            particles: {
                number: {
                    value: 50,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#1a73e8'
                },
                shape: {
                    type: 'circle'
                },
                opacity: {
                    value: 0.3,
                    random: true
                },
                size: {
                    value: 3,
                    random: true
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#1a73e8',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    resize: true
                }
            },
            retina_detect: true
        });
    }

    handleCellClick(cell) {
        const index = cell.getAttribute('data-index');

        if (this.board[index] || !this.gameActive) return;

        this.board[index] = this.currentPlayer;
        cell.classList.add(this.currentPlayer === 'きもと' ? 'kimoto' : 'arimi');
        cell.classList.add('animate__animated', 'animate__bounceIn');

        if (this.checkWin()) {
            this.gameActive = false;
            this.scores[this.currentPlayer]++;
            this.updateScoreDisplay();
            this.announceWinner();
            this.highlightWinningCells();
            return;
        }

        if (this.checkDraw()) {
            this.gameActive = false;
            this.announceDraw();
            return;
        }

        this.currentPlayer = this.currentPlayer === 'きもと' ? 'ありみ' : 'きもと';
        this.updateStatus();
    }

    checkWin() {
        return this.winningCombinations.some(combination => {
            return combination.every(index => {
                return this.board[index] === this.currentPlayer;
            });
        });
    }

    checkDraw() {
        return this.board.every(cell => cell !== null);
    }

    highlightWinningCells() {
        const winningCombination = this.winningCombinations.find(combination => {
            return combination.every(index => this.board[index] === this.currentPlayer);
        });

        winningCombination.forEach(index => {
            this.cells[index].classList.add('winning');
        });
    }

    announceWinner() {
        this.statusDisplay.textContent = `${this.currentPlayer}の勝利！`;
        this.statusDisplay.classList.add('animate__animated', 'animate__bounceIn');
    }

    announceDraw() {
        this.statusDisplay.textContent = '引き分け！';
        this.statusDisplay.classList.add('animate__animated', 'animate__bounceIn');
    }

    updateStatus() {
        this.statusDisplay.textContent = this.currentPlayer;
    }

    updateScoreDisplay() {
        document.querySelector('.kimoto-score .player-wins').textContent = `${this.scores['きもと']} 勝`;
        document.querySelector('.arimi-score .player-wins').textContent = `${this.scores['ありみ']} 勝`;
    }

    resetGame() {
        this.board = Array(9).fill(null);
        this.currentPlayer = 'きもと';
        this.gameActive = true;
        
        this.cells.forEach(cell => {
            cell.classList.remove('kimoto', 'arimi', 'winning', 'animate__animated', 'animate__bounceIn');
        });
        
        this.statusDisplay.classList.remove('animate__animated', 'animate__bounceIn');
        this.updateStatus();
    }
}

// ゲームの初期化
document.addEventListener('DOMContentLoaded', () => {
    new TicTacToe();
});

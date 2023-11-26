var board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

var currentPlayer = 'X';
var gameOver = false;
var vsAI = false; 
var vsPlayer = false;
var vsEasy = false;
var vsMedium = false;
var vsHard= false; 
var difficulty = 'easy'; 

var vsAIButton = document.getElementById('vs-ai-button');
var vsPlayerButton = document.getElementById('vs-player-button');
var startButton = document.getElementById('start-button');
var gameContainer = document.getElementById('game-container');
var boardContainer = document.getElementById('board-container');
var optionMessage = document.getElementById('option-message');
var aiDifficultyButtons = document.getElementById('ai-difficulty');
var easyButton = document.getElementById('easy-button');
var mediumButton = document.getElementById('medium-button');
var hardButton = document.getElementById('hard-button');
var opponent;

function selectOpponent(selectedOpponent) {
    opponent = selectedOpponent;
}
vsAIButton.addEventListener('click', function() {
    vsAI = !vsAI; // Toggle vsAI selection
    vsPlayer = false;
    updateVsButtons();
    
    if (vsAI) {
        aiDifficultyButtons.classList.remove('hidden');
    } else {
        aiDifficultyButtons.classList.add('hidden');
    }

    optionMessage.classList.add('hidden');
});

vsPlayerButton.addEventListener('click', function() {
    vsPlayer = !vsPlayer; 
    vsAI = false;
    updateVsButtons();
    
    aiDifficultyButtons.classList.add('hidden');
    optionMessage.classList.add('hidden');
});

function updateVsButtons() {
    vsAIButton.classList.toggle('clicked', vsAI);
    vsPlayerButton.classList.toggle('clicked', vsPlayer);
    easyButton.classList.toggle('clicked',vsEasy);
    mediumButton.classList.toggle('clicked',vsMedium);
    hardButton.classList.toggle('clicked',vsHard);
}

easyButton.addEventListener('click', function () {
    setDifficulty('easy');
    vsEasy = !vsEasy;
    vsMedium = false;
    vsHard = false;
    updateVsButtons();

});

mediumButton.addEventListener('click', function () {
    setDifficulty('medium');
    vsEasy = false;
    vsMedium = !vsMedium;
    vsHard = false;
    updateVsButtons();
});

hardButton.addEventListener('click', function () {
    setDifficulty('hard');
    vsEasy = false;
    vsMedium = false;
    vsHard = !vsHard;
    updateVsButtons();
});




function setDifficulty(selectedDifficulty) {
    difficulty = selectedDifficulty;

}
document.getElementById('start-button').addEventListener('click', function () {
    startGame();
});

function startGame() {
    var modal = document.getElementById('myModal'); // Assuming you have a modal with this ID

    if (!vsAI && !vsPlayer) {
        displayModal('Pick an opponent first');
        aiDifficultyButtons.classList.add('hidden');
    } else if (vsAI && !vsEasy && !vsMedium && !vsHard) {
        displayModal('Pick difficulty option first');
        aiDifficultyButtons.classList.remove('hidden');
    } else {
        modal.style.display = 'none'; // Hide the modal if it was previously shown
        gameContainer.style.display = 'none';
        boardContainer.style.display = 'block';
        resetBoard();

        if (currentPlayer === 'O' && vsAI && !gameOver) {
            setTimeout(makeAIMove, 500);
        }
    }
}

function displayModal(message) {
    var modal = document.getElementById('myModal'); 
    var modalMessage = document.getElementById('modalMessage'); 

    modalMessage.innerText = message;
    modal.style.display = 'block';

    // Close the modal automatically after 2 seconds
    setTimeout(function() {
        modal.style.display = 'none';
    }, 2000);
}


function resetBoard() {
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    currentPlayer = 'X';
    gameOver = false;

    var cells = document.getElementsByClassName('cell');
    for (var i = 0; i < cells.length; i++) {
        cells[i].innerText = '';
    }

    document.getElementById('result').innerText = '';

    if (currentPlayer === 'O' && vsAI && !gameOver) {
        setTimeout(makeAIMove, 500);
    }
}

function makeAIMove() {
    if (gameOver) return;

    switch (difficulty) {
        case 'easy':
            makeMove(findRandomMove());
    
            break;
        case 'medium':
            makeMove(findBestMoveMedium());
           
            break;
        case 'hard':
            makeMove(findBestMoveHard());
            
            break;
        default:
            console.error('Invalid difficulty level');
            return null;
    }
}

function findRandomMove() {
    if (gameOver) return;
    
        // Use the easy-level logic
        var bestMove;
    
        // Randomly choose whether to make a strategic move or a random move
        if (Math.random() < 0.5) {
            bestMove = findBestMove(); // Use minimax for a strategic move
        } else {
            var availableCells = getAvailableCells();
            if (availableCells.length > 0) {
                var randomIndex = Math.floor(Math.random() * availableCells.length);
                bestMove = availableCells[randomIndex]; // Choose a random move
            }
        }
    
        if (bestMove) {
            makeMove(bestMove.row, bestMove.col);
        }
    
        return bestMove;
}

function findBestMoveMedium() {
        if (gameOver) return;
    
        // Use the medium-level logic
        var bestMove;
    
        // Randomly choose whether to make a strategic move or a random move
        if (Math.random() < 0.8) {
            bestMove = findBestMove(); // Use minimax for a strategic move
        } else {
            var availableCells = getAvailableCells();
            if (availableCells.length > 0) {
                var randomIndex = Math.floor(Math.random() * availableCells.length);
                bestMove = availableCells[randomIndex]; // Choose a random move
            }
        }
    
        if (bestMove) {
            makeMove(bestMove.row, bestMove.col);
        }
    
        return bestMove;
}

function findBestMoveHard() {
    if (gameOver) return;
    
    // Use the Hard-level logic
    var bestMove;

    // Randomly choose whether to make a strategic move or a random move
    if (Math.random() < 2) {
        bestMove = findBestMove(); // Use minimax for a strategic move
    } else {
        var availableCells = getAvailableCells();
        if (availableCells.length > 0) {
            var randomIndex = Math.floor(Math.random() * availableCells.length);
            bestMove = availableCells[randomIndex]; // Choose a random move
        }
    }

    if (bestMove) {
        makeMove(bestMove.row, bestMove.col);
    }

    return bestMove;
}

function makeMove(row, col) {
    if (gameOver || board[row][col] !== '') return;

    board[row][col] = currentPlayer;
    var cellElement = document.getElementById('board').children[row * 3 + col];
    
    if (currentPlayer === 'X') {
        cellElement.innerText = currentPlayer;
        cellElement.style.color = '#FFFFFF'; // Set color for X
    } else {
        cellElement.innerText = currentPlayer;
        cellElement.style.color = '#FFFFFF'; // Set color for O
    }

    if (checkWinner(currentPlayer)) {
        gameOver = true;
        document.getElementById('result').style.color = '#ffffff'; 
        document.getElementById('result').innerText = currentPlayer + " wins!";
    } else if (isBoardFull()) {
        gameOver = true;
        document.getElementById('result').style.color = '#ffffff'; 
        document.getElementById('result').innerText = "It's a draw!";
    } else {
        currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
        if (currentPlayer === 'O' && vsAI && !gameOver) {
            setTimeout(makeAIMove, 500);
        }
    }
}
var scores = {
    playerX: 0,
    playerO: 0
};

function checkWinner(player) {
    // Check rows, columns, and diagonals for winning positions
    for (var i = 0; i < 3; i++) {
        if (board[i][0] === player && board[i][1] === player && board[i][2] === player) {
            document.getElementById('result').style.color = '#ffffff'; // White color
            updateScore(player);
            return true;
        }
        if (board[0][i] === player && board[1][i] === player && board[2][i] === player) {
            document.getElementById('result').style.color = '#ffffff'; // White color
            updateScore(player);
            return true;
        }
    }
    if (board[0][0] === player && board[1][1] === player && board[2][2] === player) {
        document.getElementById('result').style.color = '#ffffff'; // White color
        updateScore(player);
        return true;
    }
    if (board[0][2] === player && board[1][1] === player && board[2][0] === player) {
        document.getElementById('result').style.color = '#ffffff'; // White color
        updateScore(player);
        return true;
    }

    return false;
}

function updateScore(player) {
    if (player === 'X') {
        scores.playerX++;
    } else if (player === 'O') {
        scores.playerO++;
    }

    // Update the score display
    document.getElementById('score-display').innerText = `Player X: ${scores.playerX} - Player O: ${scores.playerO}`;

    // Check if either player has reached 5 wins
    if (scores.playerX === 5 || scores.playerO === 5) {
        // Display modal with the winner and reset scores
        displayModal2(`${player} wins the game! Resetting scores to zero.`);
        scores.playerX = 0;
        scores.playerO = 0;
        document.getElementById('score-display').innerText = `Player X: 0 - Player O: 0`;
        resetGame();
    }

}
function resetGame() {
    
    resetBoard();
}
function displayModal2(message) {
    var modal2 = document.getElementById('myModal2'); 
    var modalMessage2 = document.getElementById('modalMessage2'); 

    modalMessage2.innerText = message;
    modal2.style.display = 'block';

    setTimeout(function() {
        modal2.style.display = 'none';
    }, 3000);
}
function isBoardFull() {
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (board[i][j] === '') {
                return false;
            }
        }
    }
    return true;
}


function evaluate(board) {
    // Check rows, columns, and diagonals for winning positions
    for (var i = 0; i < 3; i++) {
        if (board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
            if (board[i][0] === 'O') return 10;
            if (board[i][0] === 'X') return -10;
        }
        if (board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
            if (board[0][i] === 'O') return 10;
            if (board[0][i] === 'X') return -10;
        }
    }
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        if (board[0][0] === 'O') return 10;
        if (board[0][0] === 'X') return -10;
    }
    if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
        if (board[0][2] === 'O') return 10;
        if (board[0][2] === 'X') return -10;
    }
    return 0; // No winner
}

function isMovesLeft(board) {
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (board[i][j] === '') {
                return true;
            }
        }
    }
    return false;
}

function minimax(board, depth, isMax) {
    var score = evaluate(board);

    if (score === 10 || score === -10) {
        return score;
    }

    if (!isMovesLeft(board)) {
        return 0;
    }

    if (isMax) {
        var best = -Infinity;
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                if (board[i][j] === '') {
                    board[i][j] = 'O';
                    best = Math.max(best, minimax(board, depth + 1, !isMax));
                    board[i][j] = '';
                }
            }
        }
        return best;
    } else {
        var best = Infinity;
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                if (board[i][j] === '') {
                    board[i][j] = 'X';
                    best = Math.min(best, minimax(board, depth + 1, !isMax));
                    board[i][j] = '';
                }
            }
        }
        return best;
    }
}

function findBestMove() {
    var bestVal = -Infinity;
    var bestMove = { row: -1, col: -1 };

    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (board[i][j] === '') {
                board[i][j] = 'O';
                var moveVal = minimax(board, 0, false);
                board[i][j] = '';
                if (moveVal > bestVal) {
                    bestMove.row = i;
                    bestMove.col = j;
                    bestVal = moveVal;
                }
            }
        }
    }

    return bestMove.row === -1 ? null : bestMove;
}


function getAvailableCells() {
    var availableCells = [];
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (board[i][j] === '') {
                availableCells.push({ row: i, col: j });
            }
        }
    }
    return availableCells;
}

function restartGame() {
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    currentPlayer = 'X';
    gameOver = false;

    var cells = document.getElementsByClassName('cell');
    for (var i = 0; i < cells.length; i++) {
        cells[i].innerText = '';
    }

    document.getElementById('result').innerText = '';

    if (currentPlayer === 'O' && vsAI && !gameOver) {
        setTimeout(makeAIMove, 500);
    }
}

function backToMainScreen() {
    gameContainer.style.display = 'block';
    boardContainer.style.display = 'none';
    resetBoard();
    vsAI = false;
    vsPlayer = false;
    vsEasy = false;
    vsMedium = false;
    vsHard = false;

    updateVsButtons();
}

var w = window.innerWidth,
    h = window.innerHeight,
    canvas = document.getElementById('test'),
    ctx = canvas.getContext('2d'),
    rate = 60,
    arc = 100,
    time,
    count,
    size = 7,
    speed = 20,
    parts = new Array,
    colors = ['red','#f57900','yellow','#ce5c00','#5c3566'];
var mouse = { x: 0, y: 0 };

canvas.setAttribute('width',w);
canvas.setAttribute('height',h);

function create() {
    time = 0;
    count = 0;

    for(var i = 0; i < arc; i++) {
        parts[i] = {
        x: Math.ceil(Math.random() * w),
        y: Math.ceil(Math.random() * h),
        toX: Math.random() * 5 - 1,
        toY: Math.random() * 2 - 1,
        c: colors[Math.floor(Math.random()*colors.length)],
        size: Math.random() * size
        }
    }
}

function particles() {
    ctx.clearRect(0,0,w,h);
    canvas.addEventListener('mousemove', MouseMove, false);
    for(var i = 0; i < arc; i++) {
        var li = parts[i];
        var distanceFactor = DistanceBetween( mouse, parts[i] );
        var distanceFactor = Math.max( Math.min( 15 - ( distanceFactor / 10 ), 10 ), 1 );
        ctx.beginPath();
        ctx.arc(li.x,li.y,li.size*distanceFactor,0,Math.PI*2,false);
        ctx.fillStyle = li.c;
        ctx.strokeStyle=li.c;
        if(i%2==0)
        ctx.stroke();
        else
        ctx.fill();
        
        li.x = li.x + li.toX * (time * 0.05);
        li.y = li.y + li.toY * (time * 0.05);
        
        if(li.x > w){
            li.x = 0; 
        }
        if(li.y > h) {
            li.y = 0; 
        }
        if(li.x < 0) {
            li.x = w; 
        }
        if(li.y < 0) {
            li.y = h; 
        }
    }
    if(time < speed) {
        time++;
    }
    setTimeout(particles,1000/rate);
}
function MouseMove(e) {
    mouse.x = e.layerX;
    mouse.y = e.layerY;
}

function DistanceBetween(p1,p2) {
    var dx = p2.x-p1.x;
    var dy = p2.y-p1.y;
    return Math.sqrt(dx*dx + dy*dy);
}
create();
particles();



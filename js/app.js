// Step 1
// Define the required variables used to track the state of the game.

// 💡 None of these variables will need to hold a value when they are defined.

// a. Use a variable named board to represent the state of the squares on the board.

// b. Use a variable named turn to track whose turn it is.

// c. Use a variable named winner to represent if anyone has won yet.

// d. Use a variable named tie to represent if the game has ended in a tie.

/*---------------------------- Variables (state) ----------------------------*/
let board;
let turn;
let winner;
let tie;


// Step 2
// Store cached element references.

// a. In a constant called squareEls, store the nine elements representing the squares on the page.

// 💡 Notice how each square has a matching class name in your HTML to make this easier!

// b. In a constant called messageEl, store the element that displays the game’s status on the page.

/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.querySelector('#message');
const resetBtnEl = document.querySelector('#reset');
/*----------------------------------------------------------------------------*/

// Step 3
// Upon loading, the game state should be initialized, and a function should be called to render this game state.

// a. Create a function called init.

// b. Call the init function when the app loads.

// 🚨 Add a console.log() as a confirmation check inside this function. This helps to ensure you’re calling the function you just created correctly!

// c. Set the board variable to an array containing nine empty strings ('') representing empty squares.

// 💡 The nine elements in the board array will correspond to a square on the board. Index 0 (board[0]) will represent the top-left square. Index 1 (board[1]) will represent the top-middle square. Index 2 (board[2]) will represent the top-right square. Index 3 (board[3]) will represent the middle-left square. So on, continuing through the entire board until… Index 8 (board[8]) will represent the bottom-right square.

// d. Set the turn to X - this will represent player X.

// 💡 Player O will be represented by O.

// e. Set the winner to false.

// 💡 A false value in winner means that there is no winner yet. A value of true in winner will mean that a player has won.

// Once winner is set to true, we can determine which player won by whose turn it was when the winning move was played.

// f. Set tie to false.

// 💡 A true value in tie will mean that the board array contains no more empty strings ('') and will be used to render a tie message if winner is still false by the time all squares are played.

// g. Call a function named render() at the end of the init() function.

/*-------------------------------- Functions --------------------------------*/
const init = () => {

    board = ['', '', '', '', '', '', '', '', ''];    
    turn = 'X'; 
    winner = false; 
    tie = false;
    render();
};

// Step 4
// a. Create a function called render, then set it aside for now.

// b. Create a function called updateBoard.

// c. In the updateBoard function, loop over board and for each element:

// Style that square however you wish, dependent on the value contained in the current cell being iterated over ('X', 'O', or ''). To keep it simple, start by just putting a letter in each square depending on the value of each cell.

// d. Create a function called updateMessage.

// e. In updateMessage, render a message based on the current game state:

// If both winner and tie have a value of false (meaning the game is still in progress), render whose turn it is.
// If winner is false, but tie is true, render a tie message.
// Otherwise, render a congratulatory message to the player that has won.
// f. Invoke both the updateBoard and the updateMessage functions inside your render function.


function render() {
    updateBoard();
    updateMessage();
};

const updateBoard = () => {
    board.forEach((cell, idx) => {
        if (cell === 'X') {
            squareEls[idx].textContent = 'X';
            // squareEls[idx].style.backgroundColor = 'green'
        } else if (cell === 'O') {
          squareEls[idx].textContent = 'O';
        //   squareEls[idx].style.backgroundColor = 'orange'
        } else {
          squareEls[idx].textContent = '';
        //   squareEls[idx].style.backgroundColor = 'yellow'
        }
    });
};

const updateMessage = () => {
    if (winner === false && tie === false) {
        messageEl.textContent = 'Start the game by clicking on the cell'
    } else if (winner === false && tie === true) {
        messageEl.textContent = 'Tie! No winners!'
    } else {
        messageEl.textContent = 'Congratulations! You won!'
    }
}


const handleClick = (event) => {
    const squareIndex = event.target.id
    // console.log(squareIndex)
    if (board[squareIndex] === 'X' || board[squareIndex] === 'O' || winner === true) {                
    return;
    }
    if (event.target.innerText === '') {         
        // console.log('ok')
        board[squareIndex] === 'X'        
        }
        console.log(tie)
    placePiece(squareIndex);
    checkForWinner()
    checkForTie()
    console.log(tie)
    switchPlayerTurn()
    render()
}

squareEls.forEach((cell) => cell.addEventListener('click', handleClick))

const placePiece = (index) => {
    board[index] = turn;
    console.log(board)
}

// Step 5
// Define the required constants.

// a. In a constant called winningCombos, define the eight possible winning combinations as an array of arrays.

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],        
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

const checkForWinner = () => {
    winningCombos.forEach(combo => {
        if (board[combo[0]] !== '' && 
            board[combo[0]] === board[combo[1]] && 
            board[combo[1]] === board[combo[2]]) 
            
            {
                winner = true
            }
    })
};

const checkForTie = () => {
    if (winner === true) {
        return;
    } else if (board.includes('') === true) {
        tie = false;
    } else tie = true;
}

// 6.4 - switchPlayerTurn()
// a. Create a function called switchPlayerTurn.

// b. If winner is true, return out of the function - we don’t need to switch the turn anymore because the person that just played won!

// c. If winner is false, change the turn by checking the current value of turn. If it is 'X' then change turn to 'O'. If it is 'O' then change turn to 'X'.

// d. In the handleClick function, call the switchPlayerTurn function immediately after calling the checkForTie function.



const switchPlayerTurn = () => {
    console.log(turn, winner)
    if (winner === true) {
        return;
    } else if (winner === false && turn === 'X') {
        turn = 'O'
    } else if (winner === false && turn === 'O') {
        turn = 'X'
    }
};

// Step 7 - Create Reset functionality
// a. Add a reset button to the HTML document. Give it an id of reset.

// b. Store the new reset button element as a cached element reference in a constant named resetBtnEl.

// c. Attach an event listener to the resetBtnEl. On the 'click' event, it should call the init function you created in step 3


init()
// /*----------------------------- Event Listeners -----------------------------*/
resetBtnEl.addEventListener('click', init)





            //  DONE WITH THE COLLABORATION OF KHUSH & TITO!
            // ADDITIONAL HELP FROM BYRON AND CINDY AS WELL.
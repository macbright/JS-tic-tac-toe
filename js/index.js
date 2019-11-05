const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const player1Next = document.querySelector(".player1-next");
const player2Next = document.querySelector(".player2-next");
const userInfo = document.querySelector(".user-info");
const player2 = document.querySelector(".player2");
const player1 = document.querySelector(".player1");
const player1MarkButton = document.querySelector(".markNext");
const player1Mark = document.querySelector(".mark");
const boardLayout = document.querySelector(".game-board");
let playerInfo1 = [];
player1Next.addEventListener("click", e => {
    e.preventDefault;
    player1.style.display = "none";
    player1Next.style.display = "none";
    player1Mark.style.display = "block";
    player1MarkButton.style.display = "block";
});

player1MarkButton.addEventListener("click", e => {
    e.preventDefault;
    player1Mark.style.display = "none";
    player1MarkButton.style.display = "none";
    player2.style.display = "block";
    player2Next.style.display = "block";
});

player2Next.addEventListener("click", e => {
    e.preventDefault;
    userInfo.style.display = "none";
    boardLayout.style.display = "block";
});

const gameBoard = (() => {
    let board = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    const getBoard = board => board;

    const addPosition = (position, mark) => {
        board[position] = mark;
        console.log(board);
    };

    const resetBoard = () => {
        board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        renderBoard();
        return board;
    };
    let renderBoard = () => {
        Array.from($$(".col-4")).forEach((cell, index) => {
            cell.innerHTML = board[index];
        });
    };

    const checkRows = () => {
        let win = false;
        if (board[0] === board[1] && board[0] === board[2]) {
            win = true;
        } else if (board[3] === board[4] && board[3] === board[5]) {
            win = true;
        } else if (board[6] === board[7] && board[6] === board[8]) {
            win = true;
        }
        return win;
    };

    const checkColumns = () => {
        let win = false;
        if (board[0] === board[3] && board[0] === board[6]) {
            win = true;
        } else if (board[1] === board[4] && board[1] === board[7]) {
            win = true;
        } else if (board[2] === board[5] && board[2] === board[8]) {
            win = true;
        }
        return win;
    };

    const checkDiagonals = () => {
        let win = false;
        if (board[0] === board[4] && board[0] === board[8]) {
            win = true;
        } else if (board[2] === board[4] && board[2] === board[6]) {
            win = true;
        }
        return win;
    };
    const checkForWinner = () => {
        if (checkRows() || checkColumns() || checkDiagonals()) {
            console.log("congrats you won!!!");
        } else {
            console.log("nice attempt");
        }
    };

    // let renderBoard = () => {
    //     let one = document.querySelector('.one')
    //     let two = document.querySelector('.two')
    //     let three = document.querySelector('.three')
    //     let four = document.querySelector('.four')
    //     let five = document.querySelector('.five')
    //     let six = document.querySelector('.six')
    //     let seven = document.querySelector('.seven')
    //     let eight = document.querySelector('.eight')
    //     let nine = document.querySelector('.nine')

    //     return [
    //         one.innerHTML = '1',
    //         two.innerHTML = '2',
    //         three.innerHTML = '3',
    //         four.innerHTML = '4',
    //         five.innerHTML = '5',
    //         six.innerHTML = '6',
    //         seven.innerHTML = '7',
    //         eight.innerHTML = '8',
    //         nine.innerHTML = '9'
    //     ]
    // }

    return {
        getBoard,
        addPosition,
        resetBoard,
        renderBoard,
        checkForWinner
    };
})();

const playerFactory = (name, mark, score = 0) => {
    return { name, mark, score };
};
gameBoard.getBoard();

const game = (() => {
    let playersTurn = 1;
    const addMark = () => {
        // const player1Info = document.querySelector(".p11").value;
        // const player2 = document.querySelector(".p22");
        // let player1mark = document.querySelector("#player1mark").value;
        // const playerOne = playerFactory(player1Info, player1mark);
        // let player2mark;
        // player1mark === "X" ? (player2mark = "O") : (player2mark = "X");

        // let playerTwo = playerFactory(player2.value, player2mark);
        Array.from($$(".col-4")).forEach(cell => {
            cell.addEventListener("click", e => {
                e.preventDefault;
                cell.innerHTML = "X";
                console.log(cell.getAttribute("data-id"));
                gameBoard.addPosition(cell.getAttribute("data-id"), "X");
                gameBoard.getBoard();
                if (gameBoard.checkForWinner()) {
                    console.log("not breaking");
                }
            });
        });
    };

    return {
        addMark
    };
})();
game.addMark();
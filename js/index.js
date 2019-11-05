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
    let board = ["", "", "", "", "", "", "", "", ""];
    let count = 0;
    gamestop = false;

    const getBoard = board => board;

    const addPosition = (position, mark) => {
        board[position] = mark;
        console.log(board);
    };

    const resetBoard = () => {
        board = ["", "", "", "", "", "", "", "", ""];
        renderBoard();
        return board;
    };
    let renderBoard = () => {
        Array.from($$(".col-4")).forEach((cell, index) => {
            cell.innerHTML = board[index];
        });
    };

    const winner = player => {
        gamestop = true;
        $(".result").innerHTML = `Congrats ${player.name}  won!!! 🎉`;
        $(".result").style.display = "block";
        $$(".col-4").forEach(box => {
            const newBox = box.cloneNode(true);
            box.parentNode.replaceChild(newBox, box);
        });
    };

    const draw = () => {
        gamestop = true;
        $(".result").innerHTML = "It's a draw";
        $(".result").style.display = "block";
        $$(".col-4").forEach(box => {
            const newBox = box.cloneNode(true);
            box.parentNode.replaceChild(newBox, box);
        });
    };

    const checkDraw = () => {
        if (gamestop === false) {
            gamestop = true;
            draw();
        }
    };

    const checkRows = player => {
        if (board[0] === board[1] && board[0] === board[2] && board[0] !== "") {
            winner(player);
        } else if (
            board[3] === board[4] &&
            board[3] === board[5] &&
            board[3] !== ""
        ) {
            winner(player);
        } else if (
            board[6] === board[7] &&
            board[6] === board[8] &&
            board[6] !== ""
        ) {
            winner(player);
        }
    };

    const checkColumns = player => {
        if (board[0] === board[3] && board[0] === board[6] && board[0] !== "") {
            winner(player);
        } else if (
            board[1] === board[4] &&
            board[1] === board[7] &&
            board[1] !== ""
        ) {
            winner(player);
        } else if (
            board[2] === board[5] &&
            board[2] === board[8] &&
            board[2] !== ""
        ) {
            winner(player);
        }
    };

    const checkDiagonals = player => {
        if (board[0] === board[4] && board[0] === board[8] && board[0] !== "") {
            winner(player);
        } else if (
            board[2] === board[4] &&
            board[2] === board[6] &&
            board[2] !== ""
        ) {
            winner(player);
        }
    };
    const checkForWinner = player => {
        checkRows(player);
        checkColumns(player);
        checkDiagonals(player);
        count += 1;
        if (count === 9) {
            checkDraw();
        }
    };

    return {
        getBoard,
        addPosition,
        resetBoard,
        renderBoard,
        checkForWinner
    };
})();

gameBoard.getBoard();

const playerFactory = (name, mark, score = 0) => {
    return { name, mark, score };
};

const game = (() => {
    const p1 = $("#p1").value;
    const m1 = $("#m1").value;
    const p2 = $("#p2").value;
    let m2;
    m1 === "X" ? (m2 = "O") : (m2 = "X");
    let player1 = playerFactory(p1, m1);
    let player2 = playerFactory(p2, m2);
    let current_player = player1;
    let switch_player = () => {
        current_player === player1 ?
            (current_player = player2) :
            (current_player = player1);
    };

    const addMark = () => {
        Array.from($$(".col-4")).forEach(cell => {
            cell.addEventListener("click", e => {
                e.preventDefault;
                cell.innerHTML = current_player.mark;
                gameBoard.addPosition(
                    cell.getAttribute("data-id"),
                    current_player.mark
                );
                gameBoard.checkForWinner(current_player);
                switch_player();
            });
        });
    };

    return {
        addMark
    };
})();

game.addMark();
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const startGame = () => {
    $(".st-game").addEventListener("click", e => {
        $(".user-info").style.display = "none";
        $(".game-board").style.display = "block";
        gameBoard.renderBoard();
    });
};
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
        Array.from($$(".col")).forEach((cell, index) => {
            cell.innerHTML = board[index];
        });
    };

    const winner = player => {
        gamestop = true;
        $(".result").innerHTML = `Congrats ${player.name}  won!!! 🎉`;
        $(".result").style.display = "block";
        $$(".col").forEach(box => {
            const newBox = box.cloneNode(true);
            box.parentNode.replaceChild(newBox, box);
        });
    };

    const draw = () => {
        gamestop = true;
        $(".result").innerHTML = "It's a draw";
        $(".result").style.display = "block";
        $$(".col").forEach(box => {
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
        Array.from($$(".col")).forEach(cell => {
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
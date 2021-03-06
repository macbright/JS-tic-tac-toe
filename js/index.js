const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const gameBoard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];
    let count = 0;
    let gamestop = false;

    const getBoard = board => board;

    const addPosition = (position, mark) => {
        board[position] = mark;
    };

    const resetBoard = () => {
        board = ["", "", "", "", "", "", "", "", ""];
        count = 0;
        gamestop = false;
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
        checkForWinner,
        count
    };
})();

gameBoard.getBoard();

const playerFactory = (name, mark, score = 0) => {
    return { name, mark, score };
};

const game = (() => {

    const addMark = () => {
        const p1 = $("#p1").value;
        const m1 = $("#m1").value;
        const p2 = $("#p2").value;
        let m2;
        m1 === "X" ? (m2 = "O") : (m2 = "X");
        let player1 = playerFactory(p1, m1);
        let player2 = playerFactory(p2, m2);
        let current_player = player1;

        Array.from($$(".col")).forEach(cell => {
            cell.addEventListener("click", e => {
                if (cell.innerHTML === "") {
                    e.preventDefault;
                    cell.innerHTML = current_player.mark;
                    gameBoard.addPosition(
                        cell.getAttribute("data-id"),
                        current_player.mark
                    );
                    gameBoard.checkForWinner(current_player);
                    current_player === player1 ?
                        (current_player = player2) :
                        (current_player = player1);
                }
            });
        });
    };

    return {
        addMark
    };
})();

const startGame = () => {
    $(".st-game").addEventListener("click", e => {
        e.preventDefault;
        $(".user-info").style.display = "none";
        $(".game-board").style.display = "block";
        gameBoard.renderBoard();
        game.addMark();
    });
};

const newGame = () => {
    $(".new-game").addEventListener("click", e => {
        e.preventDefault;
        $(".result").style.display = "none";
        gameBoard.resetBoard();
        game.addMark();
    });
};
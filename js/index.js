const player1Next = document.querySelector(".player1-next")
const player2Next = document.querySelector(".player2-next")
const userInfo = document.querySelector(".user-info")
const player2 = document.querySelector(".player2")
const player1 = document.querySelector(".player1")
const boardLayout = document.querySelector(".game-board")
player1Next.addEventListener('click', () => {
    player1.style.display = "none"
    player1Next.style.display = "none"
    player2.style.display = "block"
    player2Next.style.display = "block"
});

player2Next.addEventListener('click', () => {
    userInfo.style.display = "none"
    boardLayout.style.display = 'block'
});


const gameBoard = (() => {
    let board = ['1', '4', '7', '2', '5', '8', '3', '6', '9'];
    const addPosition = (position, mark) => {
        board[position - 1] = mark;
    };

    const resetBoard = () => {
        board = ['1', '4', '7', '2', '5', '8', '3', '6', '9'];
        return board;
    };

    const render = () => {
        let one = document.querySelector('.one')
        let two = document.querySelector('.two')
        let three = document.querySelector('.three')
        let four = document.querySelector('.four')
        let five = document.querySelector('.five')
        let six = document.querySelector('.six')
        let seven = document.querySelector('.seven')
        let eight = document.querySelector('.eight')
        let nine = document.querySelector('.nine')

        return [
            one.innerHTML = 'X',
            two.innerHTML = 'O',
            three.innerHTML = 'X',
            four.innerHTML = 'O',
            five.innerHTML = 'X',
            six.innerHTML = 'O',
            seven.innerHTML = 'X',
            eight.innerHTML = 'O',
            nine.innerHTML = 'X'
        ]
    }
    return {
        board,
        addPosition,
        resetBoard,
        render
    };
})();
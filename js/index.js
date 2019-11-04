const player1Next = document.querySelector(".player1-next")
const player2Next = document.querySelector(".player2-next")
const userInfo = document.querySelector(".user-info")
const player2 = document.querySelector(".player2")
const player1 = document.querySelector(".player1")
const gameBoard = document.querySelector(".game-board")
player1Next.addEventListener('click', () => {
    player1.style.display = "none"
    player1Next.style.display = "none"
    player2.style.display = "block"
    player2Next.style.display = "block"
});

player2Next.addEventListener('click', () => {
    userInfo.style.display = "none"
    gameBoard.style.display = 'block'
});

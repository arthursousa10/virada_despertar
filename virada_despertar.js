const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winningMessageTextElement = document.querySelector("[data-winning-message-text]");
const winningMessage = document.querySelector("[data-winning-message]");
const restartButton = document.querySelector("[data-restart-button]")

let isCircleTurn = false;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const sartGame = () => {
    for (const cell of cellElements) {
        cell.addEventListener("click", handleClick, { once: true })
    }
    isCircleTurn = false
    board.classList.add("x");
    winningMessage.classList.remove("show-winning-message")
}

function endGame(isdraw) {
    if (isdraw) {
        winningMessageTextElement.innerText = "Empate!";
    } else {
        winningMessageTextElement.innerText = isCircleTurn ? "O Venceu!" : "X Venceu!";
    }
    winningMessage.classList.add("show-winning-message");
}

const checkForWin = (currentplayer) => {
    return winningCombinations.some(combination => {
        return combination.every(index =>{
            return cellElements[index].classList.contains(currentplayer);
        });
    });
};

const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd);
}

const swapTurns = () => {
        isCircleTurn = !isCircleTurn;

        board.classList.remove('circle')
        board.classList.remove('x')

        if (isCircleTurn){
            board.classList.add('circle')
        } else {
            board.classList.add('x')
        }
}

const handleClick = (e) => {
    //Colocar a marca (x ou circulo)
    const cell = e.target;
    const classToAdd = isCircleTurn ? "circle" : "x";

    placeMark(cell, classToAdd);
    
    //Verificar por vitória
    const isWin = checkForWin(classToAdd);
    if (isWin) {
        endGame(false);
    }
    //Verificar por empate

    
    
    //Mudar símbolo

    swapTurns();
};

for (const cell of cellElements) {
    cell.addEventListener("click", handleClick, { once: true })
}

restartButton.addEventListener("click", startGame)
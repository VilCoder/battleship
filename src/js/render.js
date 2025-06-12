import Gameboard from "./gameboard";

function renderBoardLabel() {
  const topLabel = document.querySelectorAll(".board__label-top");
  topLabel.forEach((label) => {
    for (let i = 0; i < 10; i++) {
      const top = document.createElement("div");
      top.textContent = i;
      label.appendChild(top);
    }
  });

  const leftLabel = document.querySelectorAll(".board__label-left");
  leftLabel.forEach((label) => {
    for (let i = 0; i < 10; i++) {
      const left = document.createElement("div");
      left.textContent = i;
      label.appendChild(left);
    }
  });
}

function renderBoards() {
  const boards = document.querySelectorAll(".board");
  boards.forEach((board) => {
    let countRow = 0;
    let countColumn = 0;

    for (let i = 0; i < 100; i++) {
      if (countColumn === 10) {
        countRow += 1;
        countColumn = 0;
      }

      const cell = document.createElement("div");
      cell.classList.add("board__cell");
      cell.dataset.index = `${countRow},${countColumn}`;
      board.appendChild(cell);
      countColumn += 1;
    }

    renderPlaceShip(board, new Gameboard(), 1, 0, 4, false);
    renderPlaceShip(board, new Gameboard(), 3, 4, 2, true);
    renderPlaceShip(board, new Gameboard(), 0, 9, 1);
  });
}

function renderPlaceShip(...args) {
  const [boardElement, gameboard, x, y, length, isVertical] = args;

  gameboard.placeShip(x, y, length, isVertical);

  for (let i = 0; i < length; i++) {
    const posX = isVertical ? x + i : x;
    const posY = isVertical ? y : y + i;
    const cell = boardElement.querySelector(
      `.board__cell[data-index="${posX},${posY}"]`,
    );

    if (cell) {
      cell.classList.add(`board__ship`);
    }
  }
}

export { renderBoardLabel, renderBoards, renderPlaceShip };

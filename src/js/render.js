function renderBoardLabel() {
  const topLabel = document.querySelectorAll(".board__label-top");
  topLabel.forEach((label) => {
    label.textContent = "" ;

    for (let i = 0; i < 10; i++) {
      const top = document.createElement("div");
      top.textContent = i;
      label.appendChild(top);
    }
  });

  const leftLabel = document.querySelectorAll(".board__label-left");
  leftLabel.forEach((label) => {
    label.textContent = "";

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
    board.textContent = "";
    
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
  });
}

export { renderBoardLabel, renderBoards };

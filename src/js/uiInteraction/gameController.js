// gameController.js
import Player from "../game/player";
import { renderBoardLabel, renderBoards } from "../ui/render";

const gameController = (() => {
  const infoGame = document.querySelector(".head__text");
  let player;
  let computer;
  let currentTurn = "player"; // player | computer

  function init() {
    try {
      infoGame.textContent = `Turn's ${currentTurn}`;

      player = new Player();
      computer = new Player();

      player.gameboard.placeShip(
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        4,
        true,
      );
      player.gameboard.placeShip(
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        3,
        false,
      );
      player.gameboard.placeShip(
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        2,
        false,
      );
      player.gameboard.placeShip(
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        1,
        false,
      );
      player.gameboard.placeShip(
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        1,
        false,
      );

      computer.gameboard.placeShip(
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        4,
        true,
      );
      computer.gameboard.placeShip(
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        3,
        false,
      );
      computer.gameboard.placeShip(
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        2,
        false,
      );
      computer.gameboard.placeShip(
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        1,
        false,
      );
      computer.gameboard.placeShip(
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        1,
        false,
      );

      renderBoardLabel();
      renderBoards();

      placeShipsOnBoard(
        document.querySelectorAll(".board")[0],
        player.gameboard,
      );

      // eslint-disable-next-line prefer-destructuring
      const computerBoard = document.querySelectorAll(".board")[1];
      computerBoard.addEventListener("click", handlePlayerClick);

      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      init();
    }
  }

  function placeShipsOnBoard(boardElement, gameboard) {
    gameboard.shipPositions.forEach((_ship, key) => {
      const cell = boardElement.querySelector(
        `.board__cell[data-index="${key}"]`,
      );

      if (cell) {
        cell.classList.add("board__ship");
      }
    });
  }

  function handlePlayerClick(e) {
    if (currentTurn !== "player") return;

    if (computer.gameboard.allShipsSunk()) {
      endGame("You win!");
      return;
    }

    if (player.gameboard.allShipsSunk()) {
      endGame("Computer win!");
      return;
    }

    const cell = e.target.closest(".board__cell");

    if (!cell || cell.classList.contains("attacked")) return;

    const [x, y] = cell.dataset.index.split(",").map(Number);

    if (player.attacksMade.has(`${x},${y}`)) return;

    player.attack(computer, x, y);
    cell.classList.add("attacked");

    if (computer.gameboard.shipPositions.has(`${x},${y}`)) {
      cell.classList.add("hit");

      if (computer.gameboard.allShipsSunk()) {
        endGame("You win!");
      }

      return;
    } else {
      cell.classList.add("miss");
    }

    currentTurn = "computer";
    infoGame.textContent = `Turn's ${currentTurn}`;
    setTimeout(() => computerTurn(), 500);
  }

  function computerTurn() {
    if (player.gameboard.allShipsSunk()) {
      endGame("Compute win!");
      return;
    }

    // eslint-disable-next-line prefer-destructuring
    const playerBoard = document.querySelectorAll(".board")[0];

    let x;
    let y;
    let key;

    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
      key = `${x},${y}`;
    } while (computer.attacksMade.has(key));

    computer.attack(player, x, y);

    const cell = playerBoard.querySelector(
      `.board__cell[data-index="${x},${y}"]`,
    );
    cell.classList.add("attacked");

    if (player.gameboard.shipPositions.has(key)) {
      cell.classList.add("hit");
      setTimeout(() => computerTurn(), 500);
    } else {
      cell.classList.add("miss");
    }

    currentTurn = "player";
    infoGame.textContent = `Turn's ${currentTurn}`;
  }

  function endGame(message) {
    alert(message);
  }

  return { init, placeShipsOnBoard };
})();

export default gameController;

import Gameboard from "./gameboard";

export default class Player {
  constructor() {
    this.gameboard = new Gameboard();
    this.attacksMade = new Set();
  }

  // Perform an attack on the enemy board
  attack(opponent, x, y) {
    opponent.gameboard.receiveAttack(x, y);
    this.attacksMade.add(`${x},${y}`);
  }
}

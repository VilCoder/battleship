import Gameboard from "./gameboard";

export default class Player {
  constructor(isComputer = false) {
    this.isComputer = isComputer;
    this.gameboard = new Gameboard();
    this.attacksMade = new Set();
  }

  // Perform an attack on the enemy board
  attack(opponent, x, y) {
    opponent.gameboard.receiveAttack(x, y);
    this.attacksMade.add(`${x},${y}`)
  }

  // If it's a computer, choose random coordinate that haven't been used
  attackRandom(opponent) {
    let x; 
    let y; 
    let key;

    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
      key = `${x},${y}`;
    } while (this.attacksMade.has(key));

    this.attack(opponent, x, y);
  }
}
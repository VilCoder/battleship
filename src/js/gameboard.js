import Ship from "./ship";

export default class Gameboard {
  constructor(size = 10) {
    this.size = size;
    this.ships = [];
    this.missedAttacks = [];
    this.shipPositions = new Map();
  }

  isWithinBounds(x, y) {
    return x >= 0 && x < this.size && y >= 0 && y < this.size;
  }

  isPositionFree(x, y, length, isHorizontal) {
    for (let i = 0; i < length; i++) {
      const posX = isHorizontal ? x + i : x;
      const posY = isHorizontal ? y : y + i;
      const key = `${posX},${posY}`;

      if (
        !this.isWithinBounds(posX, posY) ||
        this.shipPositions.has(key)
      ) {
        return false;
      }
    }
    return true;
  }

  placeShip(x, y, length, isVertical = true) {
    if (!this.isPositionFree(x, y, length, isVertical)) {
      throw new Error("Invalid position to place the ship");
    }

    const ship = new Ship(length);
    this.ships.push(ship);

    for (let i = 0; i < length; i++) {
      const posX = isVertical ? x + i : x;
      const posY = isVertical ? y : y + i;
      this.shipPositions.set(`${posX},${posY}`, ship);
    }
  }

  receiveAttack(x, y) {
    const key = `${x},${y}`;
    const ship = this.shipPositions.get(key);

    if (ship) {
      ship.hit();
    } else {
      this.missedAttacks.push(key);
    }
  }

  allShipsSunk() {
    return this.ships.every((ship) => ship.isSunk());
  }
}

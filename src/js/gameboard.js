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
        this.shipPositions.has(key) ||
        this.isAdjacentToAnotherShip(posX, posY)
      ) {
        return false;
      }
    }

    return true;
  }

  isAdjacentToAnotherShip(x, y) {
    const adjacentOffsets = [
      [1, 0], // Right
      [-1, 0], // Left
      [0, 1], // Bottom
      [0, -1], // Top
    ];

    return adjacentOffsets.some(([dx, dy]) => {
      return this.shipPositions.has(`${x + dx},${y + dy}`);
    })
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

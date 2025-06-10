import Gameboard from "./gameboard";

/* eslint-disable */
describe("Ship placement validations", () => {
  test("Does not allow placing a ship off the board", () => {
    const board = new Gameboard();

    expect(() => board.placeShip(8, 8, 4, false)).toThrow(
      "Invalid position to place the ship",
    );
  });

  test("Does not allow overlapping ships", () => {
    const board = new Gameboard();
    board.placeShip(2, 2, 3, true);

    expect(() => board.placeShip(3, 2, 4)).toThrow(
      "Invalid position to place the ship"
    );
  });

  test("Place the ship correctly", () => {
    const board = new Gameboard();
    board.placeShip(0, 0, 3, true);

    // Simulates 3 horizontal impacts
    board.receiveAttack(0, 0);
    board.receiveAttack(1, 0);
    board.receiveAttack(2, 0);

    expect(board.allShipsSunk()).toBeTruthy();
  });

  test("Correctly logs failed attacks", () => {
    const board = new Gameboard();
    board.placeShip(0, 0, 2);
    board.receiveAttack(5, 5);
    board.receiveAttack(0, 1);

    expect(board.missedAttacks).toContain("5,5");
  });

  test("It is not considered sunk if it is not impacted correctly", () => {
    const board = new Gameboard();
    board.placeShip(1, 2, 2);
    board.receiveAttack(1, 2);

    expect(board.allShipsSunk()).toBeFalsy();
  });
});

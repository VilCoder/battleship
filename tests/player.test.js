import Player from "../src/js/game/player";

/* eslint-disable */
describe("Player validations", () => {
  test("Each player has his own board", () => {
    const player1 = new Player();
    const player2 = new Player();

    expect(player1.gameboard).not.toBe(player2.gameboard);
  });

  test("A player may attack and sink a ship on the opponent's board", () => {
    const attacker = new Player();
    const defender = new Player();

    defender.gameboard.placeShip(0, 0, 1);
    attacker.attack(defender, 0, 0);

    expect(defender.gameboard.allShipsSunk()).toBeTruthy();
  });
});

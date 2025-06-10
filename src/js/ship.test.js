import Ship from "./ship";

/* eslint-disable */
describe("Ship", () => {
  test("It is not sunk when it is created", () => {
    const ship = new Ship(3);
    expect(ship.isSunk()).toBeFalsy();
  });
  test("It does not sink if it receives fewer impacts than necessary", () => {
    const ship = new Ship(3);
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBeFalsy();
  })
  test("It sinks after receiving the correct number of hits", () => {
    const ship = new Ship(1);
    ship.hit();
    expect(ship.isSunk()).toBeTruthy();
  });
});

import "../css/reset.css";
import "../css/styles.css";
import "../css/responsive.css";

import gameController from "./gameController";

document.addEventListener("DOMContentLoaded", () => {
  gameController.init();

  document.querySelector(".reset").addEventListener("click", () => {
    gameController.init();
  });
});

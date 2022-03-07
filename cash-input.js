import { REGEXP } from "./regexp.js";

const $cashInput = document.getElementById("cash-input");

$cashInput.addEventListener("keydown", (e) => {
  console.log("e.key", e.key);
  if (REGEXP.NOT_NUMBERorKOREAN.test(e.key) && e.key.length === 1) {
    e.preventDefault();
    return;
  }
});

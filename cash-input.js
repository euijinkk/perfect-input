import { REGEXP } from "./regexp.js";

const $cashInput = document.getElementById("cash-input");

let valueAfterKeyDown = "";

$cashInput.addEventListener("keydown", (e) => {
  if (REGEXP.NOT_NUMBERorKOREAN.test(e.key) && e.key.length === 1) {
    e.preventDefault();
    return;
  }

  if (REGEXP.KOREAN.test(e.key)) {
    valueAfterKeyDown = e.target.value;
    return;
  }
});

$cashInput.addEventListener("input", (e) => {
  const value = e.target.value;
  if (REGEXP.KOREAN.test(value)) {
    e.target.value = valueAfterKeyDown;
    return;
  }
});

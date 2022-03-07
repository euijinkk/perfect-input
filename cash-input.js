import { REGEXP } from "./regexp.js";

const $cashInput = document.getElementById("cash-input");

let valueAfterKeyDown = "";

// cmd + 알파벳 - 전체선택(a) 복사(c) 붙여넣기(v) 자르기(x) 새로고침(r) 되돌리기(z)
const possibleKey = ["a", "c,", "v", "x", "r", "z"];

$cashInput.addEventListener("keydown", (e) => {
  if ((e.metaKey || e.ctrlKey) && possibleKey.includes(e.key)) {
    return;
  }

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

  if (value === "") {
    return;
  }

  e.target.value = removeCommaInNumber(value).toLocaleString();
});

$cashInput.addEventListener("paste", (e) => {
  if (REGEXP.NOT_NUMBER.test(e.clipboardData.getData("Text"))) {
    const extractedNumber = Number(
      e.clipboardData.getData("Text").replace(REGEXP.NOT_NUMBER, "")
    );
    const numberWithComma = extractedNumber.toLocaleString();
    e.target.value = numberWithComma;
    e.preventDefault();
    return;
  }
});

function removeCommaInNumber(value) {
  return Number(value.replace(/,/g, ""));
}

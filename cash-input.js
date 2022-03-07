const $cashInput = document.getElementById("cash-input");

const REGEXP = {
  NUMBER: /[0-9]/,
  NOT_NUMBERorKOREAN: /[^0-9ㄱ-ㅎㅏ-ㅣ가-힣]/,
  NOT_NUMBER: /[^0-9]/g,
  KOREAN: /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/,
  EMOJI:
    /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g,
};

// cmd + 알파벳 - 전체선택(a) 복사(c) 붙여넣기(v) 자르기(x) 새로고침(r) 되돌리기(z)
const possibleKey = ["a", "c,", "v", "x", "r", "z"];

let valueAfterKeyDown = "";

$cashInput.addEventListener("keydown", (e) => {
  // Command/Ctrl 과 다른 알파벳을 함께 눌렀을 때
  if ((e.metaKey || e.ctrlKey) && possibleKey.includes(e.key)) {
    return;
  }

  // 숫자나 한글이 아닌 문자가 입력되었을 때 (특수문자, 영어 등)
  // Backspace, Meta, Tab, Shift 등을 인식하기 위해서, e.key의 길이를 validate
  if (REGEXP.NOT_NUMBERorKOREAN.test(e.key) && e.key.length === 1) {
    e.preventDefault();
    return;
  }

  // 한글이 입력되었을 때, 임시변수에 저장함.
  if (REGEXP.KOREAN.test(e.key)) {
    valueAfterKeyDown = e.target.value;
    return;
  }
});

$cashInput.addEventListener("input", (e) => {
  const value = e.target.value;

  // 비어있을 때, removeCommaInNumber(value).toLocaleString()를 실행하지 않도록함.
  if (value === "") {
    return;
  }

  // 한글이 입력되었을 때, keydown에서 임시변수로 저장해둔 변수값으로 대치함.
  if (REGEXP.KOREAN.test(value)) {
    e.target.value = valueAfterKeyDown;
    return;
  }

  // emoji 입력을 제한함
  if (REGEXP.EMOJI.test(value)) {
    e.target.value = value.replace(REGEXP.EMOJI, "");
    return;
  }

  // 3자리 수마다 comma 를 더해줌
  e.target.value = removeCommaInNumber(value).toLocaleString();
});

$cashInput.addEventListener("paste", (e) => {
  const copiedText = e.clipboardData.getData("Text");
  // 숫자가 아닌 것을 모두 ''으로 대체해줌
  if (REGEXP.NOT_NUMBER.test(copiedText)) {
    const extractedNumber = copiedText.replace(REGEXP.NOT_NUMBER, "");
    const numberWithComma = Number(extractedNumber).toLocaleString();
    e.target.value = numberWithComma;
    e.preventDefault();
    return;
  }
});

function removeCommaInNumber(value) {
  return Number(value.replace(/,/g, ""));
}

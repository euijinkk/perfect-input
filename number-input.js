const $numberInput = document.getElementById("number-input");

const REGEXP = {
  NOT_NUMBER_IN_NUMBER_INPUT: /[e\-+]/,
  NOT_NUMBER: /[^0-9]/g,
};

$numberInput.addEventListener("keydown", (e) => {
  // e, -, + 입력을 제한
  // Backspace, Meta 등을 인식하기 위해서, e.key의 길이를 validate
  if (REGEXP.NOT_NUMBER_IN_NUMBER_INPUT.test(e.key) && e.key === 1) {
    e.preventDefault();
    return;
  }
});

$numberInput.addEventListener("paste", (e) => {
  const copiedText = e.clipboardData.getData("Text");

  // 붙여넣기 된 텍스트에서 e, -, + 를 제외한 후 입력
  if (REGEXP.NOT_NUMBER.test(copiedText)) {
    const extractedNumber = copiedText.replace(REGEXP.NOT_NUMBER, "");
    e.target.value = extractedNumber;
    e.preventDefault();
    return;
  }
});

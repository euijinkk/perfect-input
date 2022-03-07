const $numberInput = document.getElementById("number-input");

const REGEXP = {
  NOT_NUMBER_IN_NUMBER_INPUT: /[e\-+]/,
  NOT_NUMBER: /[^0-9]/g,
};

$numberInput.addEventListener("keydown", (e) => {
  if (REGEXP.NOT_NUMBER_IN_NUMBER_INPUT.test(e.key) && e.key === 1) {
    e.preventDefault();
    return;
  }
});

$numberInput.addEventListener("paste", (e) => {
  const copiedText = e.clipboardData.getData("Text");

  if (REGEXP.NOT_NUMBER.test(copiedText)) {
    const extractedNumber = copiedText.replace(REGEXP.NOT_NUMBER, "");
    e.target.value = extractedNumber;
    e.preventDefault();
    return;
  }
});

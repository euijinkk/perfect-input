const $numberInput = document.getElementById("number-input");

const REGEXP = {
  NOT_NUMBER_IN_NUMBER_INPUT: /^[e\-+]$/,
};

$numberInput.addEventListener("keydown", (e) => {
  if (REGEXP.NOT_NUMBER_IN_NUMBER_INPUT.test(e.key)) {
    e.preventDefault();
    return;
  }
});

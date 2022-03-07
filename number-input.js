const $numberInput = document.getElementById("number-input");

const REGEXP = {
  NOT_NUMBER_IN_NUMBER_INPUT: /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|e\-+]/,
  NOT_NUMBER: /[^0-9]/g,
  KOREAN: /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/,
  NOT_ZERO: /[1-9]/,
};

let keyOnKeyDown = "";
let valueAfterKeyDown = "";

$numberInput.addEventListener("keydown", (e) => {
  // keydown에서 감지한 key를 input에서 사용하기 위해 변수로 정의
  // type=number인 input에서 한글, e, -, +는 input이벤트의 e.target.value에서 감지되지 않는다.
  keyOnKeyDown = e.key;
  const value = e.target.value;

  // 한글, e, -, + 입력을 제한
  // Backspace, Meta 등을 인식하기 위해서, keyOnKeyDown의 길이를 validate
  if (
    REGEXP.NOT_NUMBER_IN_NUMBER_INPUT.test(keyOnKeyDown) &&
    keyOnKeyDown.length === 1
  ) {
    valueAfterKeyDown = value;
    return;
  }
});

$numberInput.addEventListener("input", (e) => {
  // 한글, e, -, + 일때, e.target.value를 keyDown에서 임시 저장한 값으로 대치
  // Backspace, Meta 등을 인식 하기 위해서, keyOnKeyDown의 길이를 validate
  if (
    REGEXP.NOT_NUMBER_IN_NUMBER_INPUT.test(keyOnKeyDown) &&
    keyOnKeyDown.length === 1
  ) {
    e.target.value = valueAfterKeyDown;
    return;
  }

  // 숫자 앞에 0이 계속 입력되는 현상 방지
  if (e.target.value[0] === "0") {
    e.target.value = Number(e.target.value);
  }
});

$numberInput.addEventListener("paste", (e) => {
  const copiedText = e.clipboardData.getData("Text");
  // 붙여넣기 된 텍스트에서 e, -, + 를 제외한 후 입력
  if (REGEXP.NOT_NUMBER.test(copiedText)) {
    const extractedNumber = copiedText.replace(REGEXP.NOT_NUMBER, "");
    e.target.value += extractedNumber;
    e.preventDefault();
    return;
  }
});

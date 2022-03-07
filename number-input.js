const $numberInput = document.getElementById("number-input");

const REGEXP = {
  NOT_NUMBER_IN_NUMBER_INPUT: /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|e\-+]/,
  NOT_NUMBER: /[^0-9]/g,
  KOREAN: /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/,
  NOT_ZERO: /[1-9]/,
};

let keyOnKeyDown = "";
let valueAfterKeyDown = "";
let isKoreanPressed = false;

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
    isKoreanPressed = true;
    valueAfterKeyDown = value;
    return;
  }
});

$numberInput.addEventListener("input", (e) => {
  // 한글, e, -, + 일때, e.target.value를 keyDown에서 임시 저장한 값으로 대치
  // Backspace, Meta 등을 인식 하기 위해서, keyOnKeyDown의 길이를 validate

  // @comment keydown시 검증할 수 있으므로 여기선 정규식 검증이 필요없어보여요.
  if (isKoreanPressed) {
    e.target.value = valueAfterKeyDown;
    isKoreanPressed = false;
    return;
  }

  // @comment 필요업지 않을까요? 이미 숫자만 들어가있는 상태일 것 같아요 예외 케이스가 있다면 알려주세요
  // if (e.target.value !== "") {
  //   e.target.value = Number(e.target.value);
  // }
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

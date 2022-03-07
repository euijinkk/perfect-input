# perfect input

## 0. 사전 지식

- 정규식 (RegExp)
- Input Event (`keydown`, `keyup`, `input`의 차이 / `paste`)

## 1. 금액 입력

`<input type=text></input>`

1. 숫자, 한글 제외 입력 제한 (`keydown`)

   - `keydown` event가 발생했을 때, 숫자가 아니라면 `e.preventDefault()`

2. emoji 입력 제한

3. 한글 제한 (`keydown`, `input`)

   - 한글은 조합문자이므로, `keydown`에서 `e.preventDefault()` 만으로 막히지 않는다. 한글이 들어왔을 때, 따로 처리를 해주어야 한다.

   - `keydown` event에서 한글이면 임시 변수(`valueAfterKeyDown`)로 기억해두었다가, `input` event에서 e.target.value를 `valueAfterKeyDown`으로 바꾸어 준다.

4. 3자리 마다 comma(,) 찍기 (`input`)

   - string의 메소드 `toLocaleString` 활용

5. command+a , command+v 가능하게 하기 (multiple keys 처리)

   - 숫자 제외 입력을 제한했으므로, command나 ArrowLeft, Backspace, Enter와 같은 key도 제한된다.

   - key 가 1글자인지 확인함으로써 특수키를 허용할 수 있지만, command+a, command+v와 같은 multiple keys는 여전히 제한된다.

6. 숫자 제외 붙여넣기(command+v) 제한 (`paste`)

   - 숫자를 제외한 문자를 모두 공백으로 대체 후, 숫자만 출력

<br/>

## 2. 숫자 입력

`<input type=number></input>`

1. 숫자 증감 화살표 제거

   ```css
   input[type="number"]::-webkit-outer-spin-button,
   input[type="number"]::-webkit-inner-spin-button {
     -webkit-appearance: none;
   }
   ```

2. e , - , + 문자 제한 (`keydown`, `paste`)

   - `type=number`로 설정하여도, 위와 같은 문자는 입력이 가능하다. 그렇지만, `input` 이벤트의 e.target.value에 찍히지 않는다. 그러므로,

3. 한글 입력 제한

   - `type=number`로 설정하여도, 한글이 한글자씩 입력된다. 그렇지만, `input` 이벤트의 e.target.value에 찍히지 않는다. 그러므로, 위 `type=text`일 때와 다르게 처리해준다.

<br/>

## 3. 문자 입력 후 API 통신 (throttling)

- 추후 수정

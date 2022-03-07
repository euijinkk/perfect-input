export const REGEXP = {
  NUMBER: /[0-9]/,
  NOT_NUMBER_IN_NUMBER_INPUT: /[e.\-+]{,1}/,
  NOT_NUMBERorKOREAN: /[^0-9ㄱ-ㅎㅏ-ㅣ가-힣]/,
  NOT_NUMBER: /[^0-9]/g,
  KOREAN: /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/,
  EMOJI:
    /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g,
};

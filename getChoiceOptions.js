function getChoiceOptions(str) {
  const start = str.indexOf("A. ");
  const end = str.indexOf("【", start);
  const optionsStr = str.substring(start, end);
  const options = {
    A: optionsStr.substring(3, optionsStr.indexOf("B. ")),
    B: optionsStr.substring(
      optionsStr.indexOf("B. ") + 3,
      optionsStr.indexOf("C. ")
    ),
    C: optionsStr.substring(
      optionsStr.indexOf("C. ") + 3,
      optionsStr.indexOf("D. ")
    ),
    D: optionsStr.substring(optionsStr.indexOf("D. ") + 3),
  };
  return options;
}
// const str =
//   "1. —What’s the _________ of Beijing Winter Olympics in 2022? —Together for a Shared Future!A. planB. symbolC. themeD. sport【答案】C【解析】【详解】句意：——2022年北京冬奥会的主题是什么？——携手共创美好未来！考查名词辨析。plan计划；symbol象征；theme主题；sport运动。根据“Together for a Shared Future!”可知“携手共创美好未来”是北京冬奥会的主题，故选C。";
// const question = getChoiceInfo(str);
// console.log(question);
module.exports = getChoiceOptions;

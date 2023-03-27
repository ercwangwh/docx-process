function getChoiceContent(str) {
  //   const str =
  //     "1. —What’s the _________ of Beijing Winter Olympics in 2022? —Together for a Shared Future!A. planB. symbolC. themeD. sport【答案】C【解析】【详解】句意：——2022年北京冬奥会的主题是什么？——携手共创美好未来！考查名词辨析。plan计划；symbol象征；theme主题；sport运动。根据“Together for a Shared Future!”可知“携手共创美好未来”是北京冬奥会的主题，故选C。";

  const regex = /^(\d+\.\s*)(.*?)(?=[A-Z]\.)/i;
  const match = str.match(regex);

  if (match) {
    const result = match[2].trim();
    return result;
    console.log(result);
    // Output: "—What’s the _________ of Beijing Winter Olympics in 2022? —Together for a Shared Future!"
  } else {
    console.log("No match found");
    return null;
  }
}

module.exports = getChoiceContent;

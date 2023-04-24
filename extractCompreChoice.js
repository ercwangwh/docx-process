function extractCompreChoice(arr) {
  const regex = /^(\d{1,2})\.?\s?(.*?)A\.\s(.*?)B\.\s(.*?)C\.\s(.*?)D\.\s(.*)/;
  const result = arr.map((str) => {
    const match = str.match(regex);

    if (match) {
      return {
        number: match[1],
        content: match[2].trim(),
        A: match[3].trim(),
        B: match[4].trim(),
        C: match[5].trim(),
        D: match[6].trim(),
      };
    } else {
      return null;
    }
  });

  // 过滤掉无效匹配（如果有的话）
  return result.filter((item) => item !== null);
}
module.exports = extractCompreChoice;

function extractClozetestChoice(arr) {
  // const regex =
  //   /^(\d+\.?)?\s*([A-D])\.\s*(\S+)\s*([A-D])\.\s*(\S+)\s*([A-D])\.\s*(\S+)\s*([A-D])\.\s*(\S+)/;

  // const matches = str.match(regex);

  // if (matches) {
  //   const [
  //     ,
  //     number,
  //     optionA,
  //     valueA,
  //     optionB,
  //     valueB,
  //     optionC,
  //     valueC,
  //     optionD,
  //     valueD,
  //   ] = matches;
  //   return {
  //     number: number ? number.replace(".", "") : "",
  //     A: valueA,
  //     B: valueB,
  //     C: valueC,
  //     D: valueD,
  //   };
  // } else {
  //   return null;
  // }
  let result = arr.map((str) => {
    const regex = /^(\d{1,2})\.?\s?A\.\s(.*?)B\.\s(.*?)C\.\s(.*?)D\.\s(.*)/;
    const match = str.match(regex);

    if (match) {
      return {
        number: match[1],
        A: match[2].trim(),
        B: match[3].trim(),
        C: match[4].trim(),
        D: match[5].trim(),
      };
    } else {
      return null;
    }
  });

  // 过滤掉无效匹配（如果有的话）
  result = result.filter((item) => item !== null);
  return result;
  // console.log(result);
}
module.exports = extractClozetestChoice;

function getChoiceList(str) {
  // const patternNumber = /(\d+\..*?)(?=\d+\.|$)/gm;
  // const resultPatterNumber = [];
  // let matchNumber;
  // while ((matchNumber = patternNumber.exec(str)) !== null) {
  //   resultPatterNumber.push(matchNumber[1]);
  // }
  // console.log("Choice List", resultPatterNumber);
  // return resultPatterNumber;
  // const str = "##发士大夫十大##大撒反对撒##34335435";
  const markers = "##";
  const values = [];

  let start = 0;
  let end = 0;
  while (true) {
    start = str.indexOf(markers, end);
    if (start === -1) break;
    end = str.indexOf(markers, start + markers.length);
    if (end === -1) break;
    const value = str.slice(start + markers.length, end);
    values.push(value);
  }
  return values;
  // console.log(values); // ["发士大夫十大", "大撒反对撒", "34335435"]
}
module.exports = getChoiceList;

function getChoiceItems(str) {
  const pattern = /#(.*?)#/g;
  const result = str
    .match(pattern)
    .map((item) => item.substring(1, item.length - 1));
  return result;
  console.log("#text", result[0]);
}

module.exports = getChoiceItems;

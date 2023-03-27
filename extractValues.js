function extractValues(str, delimiter) {
  const values = [];
  let startIndex = 0;
  let endIndex = 0;
  while ((startIndex = str.indexOf(delimiter, endIndex)) !== -1) {
    endIndex = str.indexOf(delimiter, startIndex + 1);
    if (endIndex === -1) {
      break;
    }
    const value = str.slice(startIndex + delimiter.length, endIndex);
    values.push(value);
  }
  if (startIndex < str.length - delimiter.length) {
    const value = str.slice(startIndex + delimiter.length);
    values.push(value);
  }
  return values;
}

module.exports = extractValues;

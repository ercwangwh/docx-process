function extractIntroduction(str, introPrefix) {
  const introStart = str.indexOf(introPrefix);
  if (introStart === -1) {
    return null;
  }
  const bracketStart = str.indexOf("【", introStart + introPrefix.length);
  if (bracketStart === -1) {
    return null;
  }
  return str.slice(introStart + introPrefix.length, bracketStart);
}
module.exports = extractIntroduction;

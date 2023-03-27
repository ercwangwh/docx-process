function extractClozeAnswer(str, answerPrefix) {
  const answerStart = str.indexOf(answerPrefix);
  if (answerStart === -1) {
    return null;
  }

  const bracketStart = str.indexOf("【", answerStart + answerPrefix.length);
  const answerEnd = bracketStart === -1 ? str.length : bracketStart;
  const answerStr = str.slice(answerStart + answerPrefix.length, answerEnd);
  const parts = answerStr.split(/[.\s]+/).filter(Boolean);

  const answers = {};
  for (let i = 0; i < parts.length; i += 2) {
    answers[parts[i]] = parts[i + 1];
  }

  return answers;
}
module.exports = extractClozeAnswer;

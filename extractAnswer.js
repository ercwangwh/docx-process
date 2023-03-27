function extractAnswer(str) {
  const answerIndex = str.indexOf("【答案】");
  const analysisIndex = str.indexOf("【解析】");
  const detailIndex = str.indexOf("【详解】");
  const answer = str.slice(answerIndex + 4, analysisIndex).trim();
  const analysis = str.slice(analysisIndex + 4, detailIndex).trim();
  const detail = str.slice(detailIndex + 4).trim();
  return { answer, analysis, detail };
}
module.exports = extractAnswer;

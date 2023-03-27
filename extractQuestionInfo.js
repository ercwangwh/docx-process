function extractQuestionInfo(str) {
  const match = str.match(/^(\d+)\. ([\s\S]*?)\bA\./i);
  if (!match) return null;
  const number = match[1];
  const content = match[2].trim();
  return { number, content };
}
module.exports = extractQuestionInfo;

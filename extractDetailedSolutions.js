function extractDetailedSolutions(str) {
  const regex = /【(\d+)题详解】([\s\S]*?)(?=【\d+题详解】|$)/g;
  const matches = str.matchAll(regex);
  const solutions = {};
  for (const match of matches) {
    const [fullMatch, number, solution] = match;
    solutions[number] = solution.trim();
  }
  return solutions;
}
module.exports = extractDetailedSolutions;

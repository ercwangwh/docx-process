const fs = require("fs");
const Docxtemplater = require("docxtemplater");
// const getChoiceContent = require("./getChoiceContent");
// const getChoiceItems = require("./getChoiceItems");
// const getChoiceList = require("./getChoiceList");
// const extractClozetestChoice = require("./extractClozetestChoice");
const extractCompreChoice = require("./extractCompreChoice");
const extractValues = require("./extractValues");
const extractQuestionInfo = require("./extractQuestionInfo");
const extractClozeAnswer = require("./extractClozeAnswer");
const extractIntroduction = require("./extractIntroduction");
const extractDetailedSolutions = require("./extractDetailedSolutions");
const PizZip = require("pizzip");

const articleNumber = ["A", "B", "C", "D", "E", "F"];

function extractArticle(str) {
  const regex = /(?:\^\^)([^^^]+)/g;
  let match;
  const contentArr = [];

  while ((match = regex.exec(str)) !== null) {
    contentArr.push(match[1]);
  }

  return contentArr;
}

// 读取模板文件
const template = fs.readFileSync("template-compre.docx", "binary");
const zip = new PizZip(template);
const doc = new Docxtemplater().loadZip(zip);

// 提取题目内容并映射到模板中的变量
const inputContent = fs.readFileSync("input2.docx", "binary");
const inputZip = new PizZip(inputContent);
const inputDoc = new Docxtemplater().loadZip(inputZip);
const text = inputDoc.getFullText();

//取出阅读理解整块内容
const content = extractValues(text, "@");
const compre = content[2];
console.log("阅读", compre);

//分割每篇文章内容
const articleArr = extractArticle(compre);
// console.log("文章", articleArr);

const renderData = [];

for (let i = 0; i < articleArr.length; i++) {
  const contentNumber = articleNumber[i];
  // const element = articleArr[index];
  //取出选项列表
  const choiceList = extractValues(articleArr[i], "#");
  const index = choiceList[choiceList.length - 1].indexOf("【");
  choiceList[choiceList.length - 1] = choiceList[choiceList.length - 1].slice(
    0,
    index
  );
  // console.log("选项列表", choiceList);

  const choiceOption = extractCompreChoice(choiceList);
  // const choiceOption = extractClozetestChoice(choiceList[index]);
  // console.log("选项对象", choiceOption);

  const clozeAnswer = extractClozeAnswer(articleArr[i], "【答案】");
  // console.log("【答案】对象", clozeAnswer);

  const clozeTrans = extractIntroduction(articleArr[i], "【导语】");
  // console.log("【导语】字符串", clozeTrans);

  const detail = extractDetailedSolutions(articleArr[i]);
  // console.log("详解对象", detail);

  const clozeArr = [];
  const articleContentArr = [];
  articleContentArr.push({
    contentNumber: contentNumber,
    translation: clozeTrans,
  });
  console.log("题号和译文", contentNumber, clozeTrans);
  for (let index = 0; index < choiceList.length; index++) {
    // const element = array[index];
    clozeArr.push({
      number: choiceOption[index].number,
      A: choiceOption[index].A,
      B: choiceOption[index].B,
      C: choiceOption[index].C,
      D: choiceOption[index].D,
      content: choiceOption[index].content,
      answer: clozeAnswer[choiceOption[index].number],
      detail: detail[choiceOption[index].number],
    });
  }

  console.log("对象数组", clozeArr);
  renderData.push({
    contentNumber: contentNumber,
    translation: clozeTrans,
    questions: clozeArr,
  });
  // doc.setData({ translation: clozeTrans });
  // doc.setData({ questions: clozeArr });
}
console.log("渲染数组", renderData);
doc.setData({
  articles: renderData,
});
doc.render();
const output = doc.getZip().generate({ type: "nodebuffer" });
fs.writeFileSync("output-compre.docx", output);
// const choiceArr = [];
// for (let index = 0; index < choiceList.length; index++) {
//   const choiceInfo = extractQuestionInfo(choiceList[index]);
//   const choiceOption = getChoiceOptions(choiceList[index]);
//   const choiceAnswer = extractAnswer(choiceList[index]);
//   const mergedChoice = Object.assign(
//     {},
//     choiceInfo,
//     choiceOption,
//     choiceAnswer
//   );
//   choiceArr.push(mergedChoice);
// }

// console.log("choiceArr", choiceArr);
// doc.setData({ translation: clozeTrans });
// doc.setData({ questions: clozeArr });
// doc.render();

// const output = doc.getZip().generate({ type: "nodebuffer" });
// fs.writeFileSync("output-clozetest.docx", output);

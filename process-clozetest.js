const fs = require("fs");
const Docxtemplater = require("docxtemplater");
// const getChoiceContent = require("./getChoiceContent");
// const getChoiceItems = require("./getChoiceItems");
// const getChoiceList = require("./getChoiceList");
const extractClozetestChoice = require("./extractClozetestChoice");
const extractValues = require("./extractValues");
const extractQuestionInfo = require("./extractQuestionInfo");
const extractClozeAnswer = require("./extractClozeAnswer");
const extractIntroduction = require("./extractIntroduction");
const extractDetailedSolutions = require("./extractDetailedSolutions");
const PizZip = require("pizzip");

// 读取模板文件
const template = fs.readFileSync("template-cloze-test.docx", "binary");
const zip = new PizZip(template);
const doc = new Docxtemplater().loadZip(zip);

// 提取题目内容并映射到模板中的变量
// const data = { questions: [] };
// let match;
const inputContent = fs.readFileSync("input-test.docx", "binary");
const inputZip = new PizZip(inputContent);
const inputDoc = new Docxtemplater().loadZip(inputZip);
const text = inputDoc.getFullText();

//取出选择题整块内容
const content = extractValues(text, "@");
const clozetest = content[1];
// console.log("完形", clozetest);

//取出选择题列表
const choiceList = extractValues(clozetest, "#");
const index = choiceList[choiceList.length - 1].indexOf("【");
choiceList[choiceList.length - 1] = choiceList[choiceList.length - 1].slice(
  0,
  index
);
console.log("选项列表", choiceList);

// const choiceOption = [];
// for (let index = 0; index < choiceList.length; index++) {
//   const formattedStr = choiceList[index].replace(/([A-D])\.\s+/g, "$1.");
//   console.log("formattedStr", formattedStr);
//   const v = extractClozetestChoice(formattedStr);
//   // console.log("v", v);
//   choiceOption.push(v);
// }
const choiceOption = extractClozetestChoice(choiceList);
// const choiceOption = extractClozetestChoice(choiceList[index]);
console.log("选项对象", choiceOption);

const clozeAnswer = extractClozeAnswer(clozetest, "【答案】");
// console.log("【答案】对象", clozeAnswer);

const clozeTrans = extractIntroduction(clozetest, "【导语】");
// console.log("【导语】字符串", clozeTrans);

const detail = extractDetailedSolutions(clozetest);
// console.log("详解对象", detail);

const clozeArr = [];
for (let index = 0; index < choiceList.length; index++) {
  // const element = array[index];
  clozeArr.push({
    number: choiceOption[index].number,
    A: choiceOption[index].A,
    B: choiceOption[index].B,
    C: choiceOption[index].C,
    D: choiceOption[index].D,
    answer: clozeAnswer[choiceOption[index].number],
    detail: detail[choiceOption[index].number],
  });
}

console.log("对象数组", clozeArr);

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
doc.setData({ translation: clozeTrans });
doc.setData({ questions: clozeArr });
doc.render();

const output = doc.getZip().generate({ type: "nodebuffer" });
fs.writeFileSync("output-clozetest.docx", output);

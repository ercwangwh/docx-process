const fs = require("fs");
const Docxtemplater = require("docxtemplater");
// const getChoiceContent = require("./getChoiceContent");
// const getChoiceItems = require("./getChoiceItems");
// const getChoiceList = require("./getChoiceList");
const getChoiceOptions = require("./getChoiceOptions");
const extractValues = require("./extractValues");
const extractQuestionInfo = require("./extractQuestionInfo");
const extractAnswer = require("./extractAnswer");
const PizZip = require("pizzip");
const regex = /#([\s\S]+?)#/g;

// 读取模板文件
const template = fs.readFileSync("template.docx", "binary");
const zip = new PizZip(template);
const doc = new Docxtemplater().loadZip(zip);

// 提取题目内容并映射到模板中的变量
// const data = { questions: [] };
// let match;
const inputContent = fs.readFileSync("input2.docx", "binary");
const inputZip = new PizZip(inputContent);
const inputDoc = new Docxtemplater().loadZip(inputZip);
const text = inputDoc.getFullText();

//取出选择题整块内容
const content = extractValues(text, "@");
const choice = content[0];
console.log("选择题", choice);

//取出选择题列表
const choiceList = extractValues(choice, "#");
console.log("choiceList", choiceList[0]);
const choiceArr = [];
for (let index = 0; index < choiceList.length; index++) {
  const choiceInfo = extractQuestionInfo(choiceList[index]);
  const choiceOption = getChoiceOptions(choiceList[index]);
  const choiceAnswer = extractAnswer(choiceList[index]);
  const mergedChoice = Object.assign(
    {},
    choiceInfo,
    choiceOption,
    choiceAnswer
  );
  choiceArr.push(mergedChoice);
}

console.log("choiceArr", choiceArr);

doc.setData({ questions: choiceArr });
doc.render();

const output = doc.getZip().generate({ type: "nodebuffer" });
fs.writeFileSync("output.docx", output);

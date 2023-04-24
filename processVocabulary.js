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

const mammoth = require("mammoth");

function readDocxFile(filePath) {
  return new Promise((resolve, reject) => {
    mammoth
      .extractRawText({ path: filePath })
      .then((result) => {
        const extractedText = result.value;
        resolve(extractedText);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function processDocxText(docxText) {
  const arr = docxText.split("\n");
  return arr;
}

function containsEnglish(text) {
  // 正则表达式匹配英文字符
  const englishPattern = /[a-zA-Z]/;
  return englishPattern.test(text);
}

function containsChinese(text) {
  // 正则表达式匹配中文字符
  const chinesePattern = /[\u4e00-\u9fa5]/;
  return chinesePattern.test(text);
}

const arr = [
  "triumph",
  "n. （尤指苦战后获得的）胜利，成功，成就 ",
  "pledge",
  "vt. 发誓；作保证",
  "pose",
  "vi. （为照相或画像而）摆姿势",
  "vt. 造成，导致（困难或危险）",
  "测试",
  "orange",
];
function extractAndCombineLetterDotCombinations(text) {
  // 正则表达式匹配字母加 "." 的组合
  const pattern = /[a-zA-Z]\./g;
  const matches = text.match(pattern);
  return matches ? matches.join(" ") : "";
}
const data = [];
let tempArr = [];
function groupArray(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (!containsChinese(arr[i])) {
      if (tempArr.length > 0) {
        data.push(tempArr);
        tempArr = [];
      }
      data.push([arr[i]]);
    } else {
      tempArr.push(arr[i]);
    }
  }

  if (tempArr.length > 0) {
    data.push(tempArr);
  }

  return data;
}

function exportArrayToTxt(data, fileName) {
  const output = data.map((subArray) => subArray.join("\n")).join("\n");
  fs.writeFile(fileName, output, "utf8", (err) => {
    if (err) {
      console.error("Error writing file:", err);
    } else {
      console.log(`File saved as ${fileName}`);
    }
  });
}
// console.log("测试", data);
const dataA = [];
const dataB = [];
const filePath = "inputVoc.docx";
// readDocxFile(filePath)
//   .then((docxText) => {
//     const arr = processDocxText(docxText);
//     const filteredArr = arr.filter((item) => item !== "");
//     console.log(filteredArr);
//     const garr = groupArray(filteredArr);
//     // console.log(garr);
//     for (let subArray of garr) {
//       if (subArray.every((item) => !containsChinese(item))) {
//         dataA.push(subArray);
//       } else {
//         dataB.push(subArray);
//       }
//     }
//     // console.log(garr);
//     const filteredDataA = dataA.filter(
//       (subArray) => !subArray.some((item) => item.includes("@"))
//     );
//     // console.log(filteredDataA);
//     const filteredDataAWithEnglish = filteredDataA.filter((subArray) =>
//       subArray.some((item) => containsEnglish(item))
//     );
//     exportArrayToTxt(filteredDataAWithEnglish, "dataA.txt");
//     // console.log(filteredDataAWithEnglish);
//     // const flatDataB = dataB.flat();
//     const mergedDataB = dataB.map((subArray) => [subArray.join(" ")]);
//     const combinedCombinations = mergedDataB.flatMap((subArray) =>
//       subArray.map((item) => extractAndCombineLetterDotCombinations(item))
//     );
//     // console.log(combinedCombinations);
//     exportArrayToTxt(mergedDataB, "dataB.txt");
//     // console.log(dataB);
//     // console.log(combinedCombinations);
//     // exportArrayToTxt(combinedCombinations, "voc.txt");
//     fs.writeFileSync("voc.txt", combinedCombinations.join("\n"));
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });

function findChineseElements(arr) {
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    const current = arr[i];
    if (/^[^\u4e00-\u9fa5]+$/.test(current)) {
      // 如果不包含中文
      let count = 0; // 用于计算后续包含中文的元素的数量
      for (let j = i + 1; j < arr.length; j++) {
        const next = arr[j];
        if (/[\u4e00-\u9fa5]/.test(next)) {
          // 如果包含中文
          count++;
        } else {
          break; // 遇到下一个不包含中文的元素或者到数组末尾，退出循环
        }
      }
      result.push({ content: current, count: count }); // 将内容和数量存储到对象中
      i += count; // 跳过已经计算的中文元素
    } else {
      result.push({ content: current, count: 0 }); // 如果包含中文，则将数量设为0
    }
  }

  return result;
}

function writeToFile(data, outputPath) {
  let output = "";
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    output += item.content + "\n".repeat(item.count);
  }

  fs.writeFile(outputPath, output, function (err) {
    if (err) {
      console.error(err);
      return;
    }
    console.log("File has been created");
  });
}

readDocxFile(filePath)
  .then((docxText) => {
    const arr = processDocxText(docxText);
    const filteredArr = arr.filter((item) => item !== "");
    // console.log(filteredArr);
    const filteredData = filteredArr.filter((item) => !item.includes("@"));
    console.log(filteredData);
    const resultA = findChineseElements(filteredData);
    console.log(resultA);

    const resultB = filteredData.filter((item) => /[\u4e00-\u9fa5]/.test(item));
    console.log(resultB);
    // const garr = groupArray(filteredArr);
    // // console.log(garr);
    // for (let subArray of garr) {
    //   if (subArray.every((item) => !containsChinese(item))) {
    //     dataA.push(subArray);
    //   } else {
    //     dataB.push(subArray);
    //   }
    // }
    // // console.log(garr);
    // const filteredDataA = dataA.filter(
    //   (subArray) => !subArray.some((item) => item.includes("@"))
    // );
    // // console.log(filteredDataA);
    // const filteredDataAWithEnglish = filteredDataA.filter((subArray) =>
    //   subArray.some((item) => containsEnglish(item))
    // );
    // exportArrayToTxt(filteredDataAWithEnglish, "dataA.txt");
    // // console.log(filteredDataAWithEnglish);
    // // const flatDataB = dataB.flat();
    // const mergedDataB = dataB.map((subArray) => [subArray.join(" ")]);
    // const combinedCombinations = mergedDataB.flatMap((subArray) =>
    //   subArray.map((item) => extractAndCombineLetterDotCombinations(item))
    // );
    // // console.log(combinedCombinations);
    // exportArrayToTxt(mergedDataB, "dataB.txt");
    // // console.log(dataB);
    // // console.log(combinedCombinations);
    // // exportArrayToTxt(combinedCombinations, "voc.txt");
    // fs.writeFileSync("voc.txt", combinedCombinations.join("\n"));
    writeToFile(resultA, "resultA.txt");
    // fs.writeFileSync("resultB.txt", resultB.join("\n"));

    const result = resultB.map((str) => {
      const match = str.match(/^([a-z]+\.)\s+(.+)/i);
      if (match) {
        return { type: match[1], content: match[2] };
      } else {
        return { type: "", content: str };
      }
    });
    const types = result.map((item) => item.type).join("\n");
    const meanings = result.map((item) => item.content).join("\n");
    fs.writeFile("type.txt", types, (err) => {
      if (err) throw err;
      console.log("Type file has been saved!");
    });

    fs.writeFile("meaning.txt", meanings, (err) => {
      if (err) throw err;
      console.log("Meaning file has been saved!");
    });
    // console.log(result);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

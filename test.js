const str =
  "啊撒旦范德萨范德萨1.sadfsa2.safdsa3.dsfasdf24.444345.6.7.8.9.10.safdsafdsa";
const regex = /(\d+\..*?)(?=\d+\.|$)/gm;

const matches = [];

let match;
while ((match = regex.exec(str)) !== null) {
  matches.push(match[1]);
}

console.log(matches);

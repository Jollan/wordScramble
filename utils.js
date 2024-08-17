const fs = require("fs");

let words = JSON.parse(fs.readFileSync("./index.json", { encoding: "utf-8" }));
words = words.filter((value) => {
  return (
    value.length <= 8 &&
    // !value.includes("î") &&
    // !value.includes("ê") &&
    // !value.includes("ï") &&
    // !value.includes("ô") &&
    // !value.includes("û") &&
    // !value.includes("ü") &&
    // !value.includes("ë") &&
    // !value.includes("ö") &&
    // !value.includes("œ") &&
    // !value.includes("ù") &&
    // !value.includes("à") &&
    !value.includes("-") &&
    !value.includes("'") &&
    (value.endsWith("er") || value.endsWith("re") || value.endsWith("ir"))
  );
});

fs.writeFileSync("word.js", `export const words = ${JSON.stringify(words)}`);

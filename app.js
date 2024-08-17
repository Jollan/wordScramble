import { words } from "./word.js";

const wordContainer = document.querySelector(".word");
const randomButton = document.querySelector(".random");
const play = document.querySelector(".play");
const resetButton = document.querySelector(".reset");
const tryCountLabel = document.querySelector(".try-count");
const wrongWords = document.querySelector(".wrong-words");
const dottes = document.querySelectorAll(".dot");

let inputs = [];
let word = "";
let answer = "";
let tryCount = 0;
let simpleReset = false;

// document.createElement("input").addEventListener("");

document.addEventListener("DOMContentLoaded", () => {
  newGame();
  randomButton.addEventListener("click", () => {
    reset() && newGame();
  });
  resetButton.addEventListener("click", () => {
    if (tryCount > 0 && tryCount < 6) {
      simpleReset = true;
      reset();
    }
  });
});

function newGame() {
  word = words[Math.floor(Math.random() * words.length)];
  wordContainer.textContent = scrambleWord(word);
  play.innerHTML = "";
  for (let index = 0; index < word.length; index++) {
    play.innerHTML += `<input class="input" type="text" />`;
  }
  trackGameEvolution();
  return true;
}

function trackGameEvolution() {
  inputs = Array.from(document.querySelectorAll(".input"));

  inputs.forEach((input) => {
    input.addEventListener("focus", () => {
      input.placeholder = "_";
    });
    input.addEventListener("blur", () => {
      input.placeholder = "";
    });
  });

  inputs[0].focus();

  inputs.forEach((input, index) => {
    input.addEventListener("input", () => {
      let lastChar = "";
      const value = input.value.trim();
      if (value && word.includes((lastChar = value[value.length - 1]))) {
        input.value = lastChar;
        if (inputs.every((input) => input.value)) {
          answer = inputs.map((input) => input.value).join("");
          if (answer === word) {
            inputs.forEach((input) => (input.disabled = true));
            setTimeout(() => {
              if (confirm("🎉 Success. Continue ?")) {
                reset() && newGame();
              }
            }, 100);
          } else {
            ++tryCount;
            inputs.forEach((input, index) => {
              if (tryCount === 6) {
                input.value = word.charAt(index);
                input.disabled = true;
                wordContainer.textContent = word;
              } else {
                input.value = "";
                inputs[0].focus();
              }
            });
            updateGameInfo();
          }
        } else {
          const next = inputs[index + 1];
          if (next) {
            next.focus();
          }
        }
      } else input.value = "";
    });
  });
  return true;
}

function updateGameInfo() {
  tryCountLabel.textContent = `Tries(${tryCount}/6): `;
  dottes[tryCount - 1].classList.add("yet");
  wrongWords.textContent += wrongWords.textContent ? `, ${answer}` : answer;
  return true;
}

function reset() {
  tryCountLabel.textContent = `Tries(0/6): `;
  wrongWords.textContent = "";
  tryCount = 0;
  dottes.forEach((dot) => dot.classList.remove("yet"));
  if (simpleReset) {
    inputs.forEach((input) => {
      input.value = "";
    });
    inputs[0].focus();
    simpleReset = false;
  }
  return true;
}

function scrambleWord(word) {
  const array = word.split("");
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array.join(" ");
}

const SEPARADOR_NUMBER = "-";
const SEPARADOR_DATE = "/";

const inputCard = document.getElementById("inputCard");
const inputDate = document.getElementById("inputDate");
const inputCVV = document.getElementById("inputCVV");

const maskNumber = `####${SEPARADOR_NUMBER}####${SEPARADOR_NUMBER}####${SEPARADOR_NUMBER}####`;
const maskDate = `##${SEPARADOR_DATE}##`;
const maskCVV = "###";

let current = "";
let cardNumber = [];
let dateNumber = [];
let CVVNumber = [];

addEventMaskInput(inputCard, maskNumber, cardNumber);
addEventMaskInput(inputDate, maskDate, dateNumber);
addEventMaskInput(inputCVV, maskCVV, CVVNumber);

function addEventMaskInput(input, mask, arrResult) {
  input.addEventListener("keydown", (event) => {
    if (event.key === "Tab") {
      return;
    }

    event.preventDefault();
    handleInput(mask, event.key, arrResult);
    input.value = arrResult.join("");
  });
}

function handleInput(mask, key, arr) {
  let numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  if (key === "Backspace" && arr.length > 0) {
    arr.pop();
    return;
  }

  if (numbers.includes(key) && arr.length + 1 <= mask.length) {
    if (mask[arr.length] === SEPARADOR_NUMBER || mask[arr.length] === SEPARADOR_DATE) {
      arr.push(mask[arr.length], key);
    } else {
      arr.push(key);
    }
  }
}

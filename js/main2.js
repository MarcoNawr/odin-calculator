/* #######################################################################
    Variables
#######################################################################*/
let savedNumber = 0;
let lastOperator = "";
let result = 0;

let nextNumberWillAppend = false;
let savedNumberIsSet = false;
let nextOperatorLeadsToCalculation = true;
let nextNumberWillClearCalculationDisplay = false;

/* #######################################################################
    Selectors
#######################################################################*/
let displayCurrentCalculation = document.querySelector(
  ".displayCurrentCalculation"
);
let displayCurrentNumber = document.querySelector(".displayCurrentNumber");
let btnClear = document.querySelector("#btnClear");
let btnBackspace = document.querySelector("#btnBackspace");
let btn1 = document.querySelector("#btn1");
let btn2 = document.querySelector("#btn2");
let btn3 = document.querySelector("#btn3");
let btn4 = document.querySelector("#btn4");
let btn5 = document.querySelector("#btn5");
let btn6 = document.querySelector("#btn6");
let btn7 = document.querySelector("#btn7");
let btn8 = document.querySelector("#btn8");
let btn9 = document.querySelector("#btn9");
let btn0 = document.querySelector("#btn0");
let btnComma = document.querySelector("#btnComma");
let btnNegate = document.querySelector("#btnNegate");
let btnDivide = document.querySelector("#btnDivide");
let btnMultiply = document.querySelector("#btnMultiply");
let btnSubtract = document.querySelector("#btnSubtract");
let btnAdd = document.querySelector("#btnAdd");
let btnResult = document.querySelector("#btnResult");

/* #######################################################################
      EventListener
  #######################################################################*/
//TODO: Do this with a function not separate for each button
//FIXME: Do this with a function not separate for each button

btnClear.addEventListener("click", clearAll);

btnBackspace.addEventListener("click", () => {
  alert("btnBackspace was clicked");
});

btn1.addEventListener("click", () => {
  numberClicked(btn1.textContent);
});

btn2.addEventListener("click", () => {
  numberClicked(btn2.textContent);
});

btn3.addEventListener("click", () => {
  numberClicked(btn3.textContent);
});

btn4.addEventListener("click", () => {
  numberClicked(btn4.textContent);
});

btn5.addEventListener("click", () => {
  numberClicked(btn5.textContent);
});

btn6.addEventListener("click", () => {
  numberClicked(btn6.textContent);
});

btn7.addEventListener("click", () => {
  numberClicked(btn7.textContent);
});

btn8.addEventListener("click", () => {
  numberClicked(btn8.textContent);
});

btn9.addEventListener("click", () => {
  numberClicked(btn9.textContent);
});

btn0.addEventListener("click", () => {
  numberClicked(btn0.textContent);
});

btnComma.addEventListener("click", () => {
  appendComma(displayCurrentNumber.textContent);
});

btnNegate.addEventListener("click", () => {
  negate();
});

btnDivide.addEventListener("click", () => {
  operatorClicked(btnDivide.textContent);
});

btnMultiply.addEventListener("click", () => {
  operatorClicked(btnMultiply.textContent);
});

btnSubtract.addEventListener("click", () => {
  operatorClicked(btnSubtract.textContent);
});

btnAdd.addEventListener("click", () => {
  operatorClicked(btnAdd.textContent);
});

btnResult.addEventListener("click", () => {
  operatorClicked(btnResult.textContent);
});

/* #######################################################################
      Function Declaration
  #######################################################################*/
function clearAll() {
  savedNumber = 0;
  lastOperator = "";
  result = 0;

  nextNumberWillAppend = false;
  savedNumberIsSet = false;
  nextOperatorLeadsToCalculation = true;
  nextNumberWillClearCalculationDisplay = false;

  displayCurrentCalculation.textContent = "";
  displayCurrentNumber.textContent = "0";
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function calculate(a, operator, b) {
  result = 0;
  switch (operator) {
    case "+":
      result = add(a, b);
      break;
    case "-":
      result = subtract(a, b);
      break;
    case "*":
      result = multiply(a, b);
      break;
    case "/":
      result = divide(a, b);
      break;
    default:
      alert("Something wrong with the operator!");
  }
  nextNumberWillAppend = false;
  return result;
}

function numberClicked(number) {
  if (!nextNumberWillAppend && nextNumberWillClearCalculationDisplay) {
    // Case 3 ==> NEW NUMBER AND CLEAR DISPLAY OF CURRENT CALCULATION
    // IF a Number was clicked
    //AND nextNumberWillAppend = false
    //AND nextNumberWillClearCalculationDisplay = true
    //THEN
    // clear the displayCurrentCalculation
    // AND set clicked Number as new Number within displayCurrentNumber
    newNumberWithClear(number);
  } else if (!nextNumberWillAppend) {
    // Case 1 ==> NEW NUMBER
    // IF a Number was clicked AND nextNumberWillAppend = false THEN set clicked Number as new Number within displayCurrentNumber
    newNumber(number);
  } else {
    // Case 2 ==> APPEND NUMBER
    // IF a Number was clicked AND nextNumberWillAppend = true THEN append clicked Number to the currently displayed Number within displayCurrentNumber
    appendNumber(number);
  }
}

/* ########################################
    Function Declaration for Numbers
##########################################*/
// Case N1
function newNumber(number) {
  displayCurrentNumber.textContent = number;
  nextNumberWillAppend = true;
}

//Case N2
function appendNumber(number) {
  displayCurrentNumber.textContent += number;
}

//Case N3
function newNumberWithClear(number) {
  displayCurrentNumber.textContent = number;
  displayCurrentCalculation.textContent = "";
  nextNumberWillAppend = true;
}

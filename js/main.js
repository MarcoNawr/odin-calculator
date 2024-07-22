/* #######################################################################
    Variables
#######################################################################*/
let savedNumber = 0;
let lastOperator = "";
let result = 0;

let nextNumberWillAppend = false;
let savedNumberIsSet = false;
let nextOperatorLeadsToCalculation = false;
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
  backspaceClicked();
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
  nextOperatorLeadsToCalculation = false;
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
  if (savedNumberIsSet) {
    nextOperatorLeadsToCalculation = true;
  }

  if (!nextNumberWillAppend && nextNumberWillClearCalculationDisplay) {
    // Case 3 ==> NEW NUMBER AND CLEAR DISPLAY OF CURRENT CALCULATION
    newNumberWithClear(number);
  } else if (!nextNumberWillAppend) {
    // Case 1 ==> NEW NUMBER
    newNumber(number);
  } else {
    // Case 2 ==> APPEND NUMBER
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
  if (displayCurrentNumber.textContent.length <= 14) {
    displayCurrentNumber.textContent += number;
  }
}

//Case N3
function newNumberWithClear(number) {
  displayCurrentNumber.textContent = number;
  displayCurrentCalculation.textContent = "";
  nextNumberWillAppend = true;
  nextNumberWillClearCalculationDisplay = false;
}

function operatorClicked(operator) {
  if (operator != "=") {
    if (!nextOperatorLeadsToCalculation) {
      // Case 1 (+-*/=) ==> ONE NUMBER AND OPERATOR
      combineOperatorWithNumber(displayCurrentNumber.textContent, operator);
    } else if (savedNumberIsSet && nextOperatorLeadsToCalculation) {
      // Case 2 (+-*/) ==> OPERATOR LIKE +-*/ LEADS TO CALCULATION - (Order matters)
      operatorLeadsToCalculation(
        savedNumber,
        lastOperator,
        parseFloat(replaceCommaWithDot(displayCurrentNumber.textContent))
      );
    }
  } else {
    // Case 3 (=) ==> OPERATOR = LEADS TO CALCULATION - (Order matters)
    equalsLeadsToCalculation(
      savedNumber,
      lastOperator,
      parseFloat(replaceCommaWithDot(displayCurrentNumber.textContent))
    );
  }
}

/* ########################################
    Function Declaration for Operators
##########################################*/
//TODO: (Done) Solve Floating Problem: Solution here https://stackoverflow.com/questions/10473994/javascript-adding-decimal-numbers-issue

//Case O1
function combineOperatorWithNumber(number, operator) {
  savedNumber = parseFloat(replaceCommaWithDot(number));
  savedNumberIsSet = true;
  lastOperator = operator;
  displayCurrentCalculation.textContent =
    replaceDotWithComma(savedNumber.toString()) + " " + operator;
  nextNumberWillAppend = false;
}

//Case O2
function operatorLeadsToCalculation(x, operator, y) {
  result = calculate(x, operator, y).toFixed(3);
  if (result == "Infinity") {
    alert("Error: Division by zero");
    clearAll();
    return;
  }
  lastOperator = operator;
  displayCurrentNumber.textContent = replaceDotWithComma(result.toString());
  displayCurrentCalculation.textContent =
    replaceDotWithComma(result.toString()) + " " + operator;
  nextNumberWillAppend = false;
  nextNumberWillClearCalculationDisplay = false;
  nextOperatorLeadsToCalculation = false;
}

//Case O3
function equalsLeadsToCalculation(x, operator, y) {
  result = calculate(x, operator, y).toFixed(3);
  if (result == "Infinity") {
    alert("Error: Division by zero");
    clearAll();
    return;
  }
  displayCurrentCalculation.textContent =
    replaceDotWithComma(x.toString()) +
    " " +
    operator +
    " " +
    replaceDotWithComma(y.toString()) +
    " " +
    "=";
  displayCurrentNumber.textContent = replaceDotWithComma(result.toString());
  nextNumberWillAppend = false;
  nextNumberWillClearCalculationDisplay = true;
  nextOperatorLeadsToCalculation = false;
  savedNumberIsSet = false;
}

//Case 6 (,) ==> OPERATOR , ==> APPEND , TO CURRENT DISPLAYED NUMBER
// IF the Operator , was clicked AND no comma set so far THEN
// Append , to displayCurrentNumber
function appendComma(number) {
  if (!number.includes(",")) {
    displayCurrentNumber.textContent += ",";
  }
}

//Case 7 (NEGATE) ==> OPERATOR NEGATE ==> NEGATE CURRENT DISPLAYED NUMBER
// IF the Operator NEGATE was clicked AND displayCurrentNumber!=0 THEN
// negate displayCurrentNumber
function negate() {
  if (displayCurrentNumber != "0") {
    let negatedNumber =
      parseFloat(replaceCommaWithDot(displayCurrentNumber.textContent)) * -1;
    displayCurrentNumber.textContent = replaceDotWithComma(
      negatedNumber.toString()
    );
  }
}

function backspaceClicked() {
  if (displayCurrentNumber.textContent.length > 1) {
    let newString = displayCurrentNumber.textContent.slice(0, -1);
    displayCurrentNumber.textContent = newString;
  } else {
    displayCurrentNumber.textContent = "0";
    nextNumberWillAppend = false;
  }
}

/* ########################################
    Function Declaration for Basics
##########################################*/

function replaceCommaWithDot(wrongFormatString) {
  return wrongFormatString.replace(",", ".");
}

function replaceDotWithComma(wrongFormatString) {
  return wrongFormatString.replace(".", ",");
}

/* #######################################################################
    Variables
#######################################################################*/
let firstNumber = 0;
let secondNumber = 0;
let lastOperator = "";
let result = 0;

let nextNumberWillAppend = false;
let firstNumberIsSet = false;
let secondNumberIsSet = false;
let nextOperatorLeadsToCalculation = false;
let nextNumberWillClearCalculationDisplay = false;
let isFirstResult = true;

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
  firstNumber = 0;
  secondNumber = 0;
  lastOperator = "";
  result = 0;

  nextNumberWillAppend = false;
  firstNumberIsSet = false;
  secondNumberIsSet = false;
  nextOperatorLeadsToCalculation = false;
  nextNumberWillClearCalculationDisplay = false;
  isFirstResult = true;

  displayCurrentCalculation.textContent = "empty";
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
  if (firstNumberIsSet) {
    nextOperatorLeadsToCalculation = true;
  }
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
  displayCurrentCalculation.textContent = "empty";
  nextNumberWillAppend = true;
  nextNumberWillClearCalculationDisplay = false;
  nextOperatorLeadsToCalculation = false;
}

function operatorClicked(operator) {
  if (!nextOperatorLeadsToCalculation) {
    combineOperatorWithNumber(displayCurrentNumber.textContent, operator);
  } else {
    if (lastOperator == "=") {
      combineOperatorWithNumber(displayCurrentNumber.textContent, operator);
    } else {
      if (operator == "=") {
        secondNumber = parseFloat(
          replaceCommaWithDot(displayCurrentNumber.textContent)
        );
        equalsLeadsToCalculation(firstNumber, lastOperator, secondNumber);
      } else {
        secondNumber = parseFloat(
          replaceCommaWithDot(displayCurrentNumber.textContent)
        );
        operatorLeadsToCalculation(
          firstNumber,
          lastOperator,
          secondNumber,
          operator
        );
      }
    }
  }
}

/* ########################################
    Function Declaration for Operators
##########################################*/
//Case O1
function combineOperatorWithNumber(number, operator) {
  firstNumber = parseFloat(replaceCommaWithDot(number));
  firstNumberIsSet = true;
  secondNumber = parseFloat(replaceCommaWithDot(number));
  secondNumberIsSet = true;
  //Case O2
  lastOperator = operator;
  displayCurrentCalculation.textContent =
    replaceDotWithComma(firstNumber.toString()) + " " + operator;
  nextNumberWillAppend = false;
  nextNumberWillClearCalculationDisplay = false;
}

//Case O2
function operatorLeadsToCalculation(x, operator, y, nextOperator) {
  result = calculate(x, operator, y).toFixed(3);
  firstNumber = result;
  if (result == "Infinity") {
    alert("Nice try Dude. Start again");
    clearAll();
    return;
  }
  lastOperator = nextOperator;
  displayCurrentNumber.textContent = replaceDotWithComma(result.toString());
  displayCurrentCalculation.textContent =
    replaceDotWithComma(result.toString()) + " " + nextOperator;
  nextNumberWillAppend = false;
  nextNumberWillClearCalculationDisplay = false;
  nextOperatorLeadsToCalculation = false;
}

//Case O3
function equalsLeadsToCalculation(x, operator, y) {
  // x == firstNumber , operator == lastOperator, y == secondNumber
  if (isFirstResult) {
    result = calculate(x, operator, y).toFixed(3);
  } else {
    result = calculate(y, operator, x).toFixed(3);
  }

  if (result == "Infinity") {
    alert("Nice try Dude. Start again");
    clearAll();
    return;
  }

  if (isFirstResult) {
    displayCurrentCalculation.textContent =
      replaceDotWithComma(x.toString()) +
      " " +
      operator +
      " " +
      replaceDotWithComma(y.toString()) +
      " " +
      "=";
    isFirstResult = false;
  } else {
    displayCurrentCalculation.textContent =
      replaceDotWithComma(y.toString()) +
      " " +
      operator +
      " " +
      replaceDotWithComma(x.toString()) +
      " " +
      "=";
  }
  firstNumber = result;
  displayCurrentNumber.textContent = replaceDotWithComma(result.toString());
  nextNumberWillAppend = false;
  nextNumberWillClearCalculationDisplay = true;
  nextOperatorLeadsToCalculation = false;
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

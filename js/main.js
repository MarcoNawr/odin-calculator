/* #######################################################################
    Variables
#######################################################################*/
let firstNumber = 0;
let secondNumber = 0;
let lastOperator = "";
let result = 0;

let firstNumberIsSet = false;
let secondNumberIsSet = false;
let operatorLeadsToCalculation = false;
let equalsLeadsToCalculation = false;

let nextNumberWillAppend = false;
let nextNumberWillClear = false;
//let isFirstResult = true;

/* #######################################################################
    Selectors
#######################################################################*/
const calculationDisplay = document.querySelector(".displayCurrentCalculation");
const currentDisplay = document.querySelector(".displayCurrentNumber");
const btnClear = document.querySelector("#btnClear");
const btnBackspace = document.querySelector("#btnBackspace");
const btnComma = document.querySelector("#btnComma");
const btnNegate = document.querySelector("#btnNegate");

const numberButtons = document.querySelectorAll(".btnNumber");
const operatorButtons = document.querySelectorAll(".btnOperator");

const btnDivide = document.querySelector("#btnDivide");
const btnMultiply = document.querySelector("#btnMultiply");
const btnSubtract = document.querySelector("#btnSubtract");
const btnAdd = document.querySelector("#btnAdd");
const btnResult = document.querySelector("#btnResult");

/* #######################################################################
      EventListener
  #######################################################################*/
//TODO: Do this with a function not separate for each button
//FIXME: Do this with a function not separate for each button

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    numberClicked(button.textContent);
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    operatorClicked(button.textContent);
  });
});

btnClear.addEventListener("click", clearAll);

btnBackspace.addEventListener("click", () => {
  backspaceClicked();
});

btnComma.addEventListener("click", () => {
  appendComma(currentDisplay.textContent);
});

btnNegate.addEventListener("click", () => {
  negate();
});

/* #######################################################################
      Function Declaration
#######################################################################*/
function clearAll() {
  firstNumber = 0;
  secondNumber = 0;
  lastOperator = "";
  result = 0;
  firstNumberIsSet = false;
  secondNumberIsSet = false;
  operatorLeadsToCalculation = false;
  equalsLeadsToCalculation = false;
  nextNumberWillAppend = false;
  nextNumberWillClear = false;
  calculationDisplay.textContent = "empty";
  currentDisplay.textContent = "0";
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
  //nextNumberWillAppend = false;
  return result;
}

/* ########################################
    Function Call & Declaration for Numbers
##########################################*/
function numberClicked(clickedNumber) {
  if (nextNumberWillAppend) {
    //APPEND NUMBER
    if (currentDisplay.textContent.length <= 14) {
      //FIXME: Erste Nummer = 0 ungewolltes aber nicht fehlerhaftes verhalten.
      updateDisplay(currentDisplay.textContent, clickedNumber);
    }
  } else if (nextNumberWillClear) {
    //NEW NUMBER WITH CLEAR
    clearAll();
    updateDisplay(clickedNumber);
    nextNumberWillClear = false;
    nextNumberWillAppend = true;
  } else {
    //NEW NUMBER
    updateDisplay(clickedNumber);
    nextNumberWillAppend = true;
  }

  if (calculationDisplay.textContent != "empty") {
    secondNumber = parseFloat(replaceCommaWithDot(currentDisplay.textContent));
    secondNumberIsSet = true;
    operatorLeadsToCalculation = true;
    equalsLeadsToCalculation = true;
  } else {
    firstNumber = parseFloat(replaceCommaWithDot(currentDisplay.textContent));
    firstNumberIsSet = true;
    operatorLeadsToCalculation = false;
    equalsLeadsToCalculation = false;
  }
}

/* ########################################
    Function Call & Declaration for Operators
##########################################*/

function operatorClicked(clickedOperator) {
  if (clickedOperator == "=") {
    // OPERATOR =
    if (equalsLeadsToCalculation && lastOperator != "=") {
      result = calculate(firstNumber, lastOperator, secondNumber).toFixed(3);
      if (result == "Infinity") {
        alert("Nice try Dude. Start again");
        clearAll();
        return;
      }
      updateCalculationDisplay(
        replaceDotWithComma(firstNumber.toString()),
        lastOperator,
        replaceDotWithComma(secondNumber.toString()),
        "="
      );
      firstNumber = parseFloat(result);
      updateDisplay(replaceDotWithComma(result));
      nextNumberWillAppend = false;
      nextNumberWillClear = true;
      operatorLeadsToCalculation = false;
      equalsLeadsToCalculation = true;
    } else {
      updateCalculationDisplay(currentDisplay.textContent, clickedOperator);
      firstNumber = parseFloat(currentDisplay.textContent);
      lastOperator = clickedOperator;
      secondNumber = parseFloat(currentDisplay.textContent);
      secondNumberIsSet = true;
      operatorLeadsToCalculation = false;
      equalsLeadsToCalculation = false;
      nextNumberWillClear = false;
      nextNumberWillAppend = false;
    }
  } else {
    // OPERATORS LIKE +, - , / , *
    if (operatorLeadsToCalculation) {
      if (lastOperator == "=") {
        firstNumber = parseFloat(currentDisplay.textContent);
      } else {
        result = calculate(firstNumber, lastOperator, secondNumber).toFixed(3);
        if (result == "Infinity") {
          alert("Nice try Dude. Start again");
          clearAll();
          return;
        }
        firstNumber = parseFloat(result);
        firstNumberIsSet = true;
        updateDisplay(replaceDotWithComma(result));
      }
    } else {
      // will be done for all cases. Thats why the setting comes after this else line
    }
    updateCalculationDisplay(currentDisplay.textContent, clickedOperator);
    lastOperator = clickedOperator;
    secondNumber = parseFloat(currentDisplay.textContent);
    secondNumberIsSet = true;
    operatorLeadsToCalculation = false;
    equalsLeadsToCalculation = true;
    nextNumberWillClear = false;
    nextNumberWillAppend = false;
  }
}

/* ########################################
      Function Declaration for Basics
  ##########################################*/

//(,) ==> OPERATOR , ==> APPEND , TO CURRENT DISPLAYED NUMBER
function appendComma(number) {
  if (!number.includes(",")) {
    currentDisplay.textContent += ",";
    nextNumberWillAppend = true;
  }
}

//(NEGATE) ==> OPERATOR NEGATE ==> NEGATE CURRENT DISPLAYED NUMBER
function negate() {
  if (currentDisplay != "0") {
    let negatedNumber =
      parseFloat(replaceCommaWithDot(currentDisplay.textContent)) * -1;
    currentDisplay.textContent = replaceDotWithComma(negatedNumber.toString());
    firstNumber = negatedNumber;
  }
}

function backspaceClicked() {
  if (currentDisplay.textContent.length > 1) {
    let newString = currentDisplay.textContent.slice(0, -1);
    currentDisplay.textContent = newString;
  } else {
    currentDisplay.textContent = "0";
    nextNumberWillAppend = false;
  }
}

function replaceCommaWithDot(wrongFormatString) {
  return wrongFormatString.replace(",", ".");
}

function replaceDotWithComma(wrongFormatString) {
  return wrongFormatString.replace(".", ",");
}

function updateDisplay() {
  currentDisplay.textContent = "";
  for (let i = 0; i < arguments.length; i++) {
    currentDisplay.textContent += arguments[i];
  }
}

function updateCalculationDisplay() {
  calculationDisplay.textContent = "";
  for (let i = 0; i < arguments.length; i++) {
    calculationDisplay.textContent += arguments[i];
  }
}

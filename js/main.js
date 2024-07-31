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
let calculationDisplay = document.querySelector(".displayCurrentCalculation");
let currentDisplay = document.querySelector(".displayCurrentNumber");
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

/* ########################################
    Function Declaration for Basics
##########################################*/

function replaceCommaWithDot(wrongFormatString) {
  return wrongFormatString.replace(",", ".");
}

function replaceDotWithComma(wrongFormatString) {
  return wrongFormatString.replace(".", ",");
}

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
  appendComma(currentDisplay.textContent);
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
        // do nothing
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

//Case 6 (,) ==> OPERATOR , ==> APPEND , TO CURRENT DISPLAYED NUMBER
// IF the Operator , was clicked AND no comma set so far THEN
// Append , to currentDisplay
function appendComma(number) {
  if (!number.includes(",")) {
    currentDisplay.textContent += ",";
    nextNumberWillAppend = true;
  }
}

//Case 7 (NEGATE) ==> OPERATOR NEGATE ==> NEGATE CURRENT DISPLAYED NUMBER
// IF the Operator NEGATE was clicked AND currentDisplay!=0 THEN
// negate currentDisplay
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

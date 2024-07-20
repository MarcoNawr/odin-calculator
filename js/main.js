/* #######################################################################
    Variables
#######################################################################*/
let firstNumber = 0;
let lastOperator = "";
let secondNumber = 0;
let result = 0;
let nextNumberWillAppend = false;
let nextNumberWillClearCalculationDisplay = false;
let isFirstNumberSet = false;
let isSecondNumberSet = false;
let nextOperatorLeadsToCalculation = true;

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

//TODO: Nice Highlighted Comment
//FIXME: Nice Highlighted Comment
/* #######################################################################
    Function Declaration
#######################################################################*/
function clearAll() {
  firstNumber = 0;
  lastOperator = "";
  secondNumber = 0;
  result = 0;
  nextNumberWillAppend = false;
  nextNumberWillClearCalculationDisplay = false;
  isFirstNumberSet = false;
  isSecondNumberSet = false;
  nextOperatorLeadsToCalculation = true;
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

function operatorClicked(operator) {
  if (operator != "=") {
    if (!isFirstNumberSet) {
      // Case 1 (+-*/=) ==> ONE NUMBER AND OPERATOR
      // IF
      //an Operator out of (+-*/=) was clicked
      //AND currentOperator != "="
      //AND isFirstNumberSet == false
      //THEN
      // set displayCurrentCalculation to displayCurrentNumber and clicked Operator (e.g. "2+" OR "2=")
      // set firstNumber = displayCurrentNumber.textContent
      // set lastOperator = clicked Operator
      // set nextNumberWillAppend = false
      combineOperatorWithNumber(displayCurrentNumber.textContent, operator);
    } else if (isFirstNumberSet && nextOperatorLeadsToCalculation) {
      // Case 2 (+-*/) ==> OPERATOR LIKE +-*/ LEADS TO CALCULATION - (Order matters)
      // IF
      // an Operator out of (+-*/) was clicked
      //AND currentOperator != "="
      //AND nextOperatorLeadsToCalculation
      //And isFirstNumberSet == true
      //THEN
      // calculate x (firstNumber) operator (last clicked Operator) y (displayCurrentNumber)
      // AND display the result within displayCurrentNumber (e.g. After 2+3 = 5 "5")
      // AND set displayCurrentCalculation to displayCurrentNumber and clicked Operator (e.g. After 2+3 = 5 "5+")
      operatorLeadsToCalculation(
        firstNumber,
        lastOperator,
        parseFloat(replaceCommaWithDot(displayCurrentNumber.textContent))
      );
    }
  }

  // Case 3 (=) ==> OPERATOR = LEADS TO CALCULATION - (Order matters)
  // IF
  //the Operator = was clicked
  //AND <WANN?>...
  //THEN
  // calculate x (firstNumber) operator (last clicked Operator) y (displayCurrentNumber)
  // AND set displayCurrentCalculation to x (firstNumber) operator (last clicked Operator) y(displayCurrentNumber/(Or secondNumber/last clicked Number)) and = (e.g. After 2+3 = 5 "2+3=")
  // AND display the result within displayCurrentNumber (e.g. After 2+3 = 5 "5")
  // equalsLeadsToCalculation(
  //   firstNumber,
  //   lastOperator,
  //   displayCurrentNumber.textContent
  // );

  // Case 4 (=) ==> OPERATOR = LEADS TO REPEATED CALCULATION (with last Result as firstNumber / second number does not change)
  // IF
  //the Operator = was clicked
  //AND <WANN?
  //THEN
  // calculate x (displayCurrentNumber) operator (last clicked Operator) y (secondNumber)
  // AND display the result within displayCurrentNumber (e.g. After 2+3=5=8=11=14=17 "17")
  // AND set displayCurrentCalculation to x(result) operator (last clicked Operator) y(secondNumber) and = (e.g. After 2+3=5=8=11=14=17 "14+3=")

  // Case 5 (=) ==> OPERATOR = LEADS TO REPEATED CALCULATION (with current display / last clicked Number as firstNumber / second number does not change)
  // IF
  // the Operator = was clicked
  // AND <WANN?>
  // THEN
  // calculate x (displayCurrentNumber) operator (last clicked Operator) y (secondNumber from Last Calculation)
  // AND display the result within displayCurrentNumber (e.g. After 2+3=1= "4")
  // AND set displayCurrentCalculation to x(result) operator (last clicked Operator) y(secondNumber) and = (e.g. After 2+3=1= "1+3=")
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

/* ########################################
    Function Declaration for Operators
##########################################*/
//Case O1
function combineOperatorWithNumber(number, operator) {
  firstNumber = parseFloat(replaceCommaWithDot(number));
  isFirstNumberSet = true;
  lastOperator = operator;
  displayCurrentCalculation.textContent =
    replaceDotWithComma(firstNumber.toString()) + " " + operator;
  nextNumberWillAppend = false;
}

//Case O2
function operatorLeadsToCalculation(x, operator, y) {
  result = calculate(x, operator, y);
  lastOperator = operator;
  displayCurrentNumber.textContent = replaceDotWithComma(result.toString());
  displayCurrentCalculation.textContent =
    replaceDotWithComma(result.toString()) + operator;
  nextNumberWillAppend = false;
  nextNumberWillClearCalculationDisplay = false;
  nextOperatorLeadsToCalculation = false;
}

//Case O3
function equalsLeadsToCalculation(x, operator, y) {
  result = calculate(x, operator, y);
  displayCurrentCalculation.textContent = x + operator + y + "=";
  displayCurrentNumber.textContent = result;
  nextNumberWillAppend = false;
}

//Case O4 AND Case 05 (Same behavior / different arguments)
function equalsLeadsToRepeatedCalculation(x, operator, y) {
  result = calculate(x, operator, y);
  displayCurrentNumber.textContent = result;
  displayCurrentCalculation.textContent = result + operator + y + "=";
  nextNumberWillAppend = false;
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

function replaceCommaWithDot(wrongFormatString) {
  return wrongFormatString.replace(",", ".");
}

function replaceDotWithComma(wrongFormatString) {
  return wrongFormatString.replace(".", ",");
}

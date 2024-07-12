/* #######################################################################
    Variables
#######################################################################*/
let firstNumber = 0;
let operator = "";
let secondNumber = 0;
let result = 0;


/* #######################################################################
    Selektors
#######################################################################*/
let displayCurrentCalculation = document.querySelector(".displayCurrentCalculation");
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
    alert("btn1 was clicked");
});

btn2.addEventListener("click", () => {
    alert("btn2 was clicked");
});

btn3.addEventListener("click", () => {
    alert("btn3 was clicked");
});

btn4.addEventListener("click", () => {
    alert("btn4 was clicked");
});

btn5.addEventListener("click", () => {
    alert("btn5 was clicked");
});

btn6.addEventListener("click", () => {
    alert("btn6 was clicked");
});

btn7.addEventListener("click", () => {
    alert("btn7 was clicked");
});

btn8.addEventListener("click", () => {
    alert("btn8 was clicked");
});

btn9.addEventListener("click", () => {
    alert("btn9 was clicked");
});

btn0.addEventListener("click", () => {
    alert("btn0 was clicked");
});

btnComma.addEventListener("click", () => {
    alert("btnComma was clicked");
});

btnNegate.addEventListener("click", () => {
    alert("btnNegate was clicked");
});

btnDivide.addEventListener("click", () => {
    alert("btnDivide was clicked");
});

btnMultiply.addEventListener("click", () => {
    alert("btnMultiply was clicked");
});

btnSubtract.addEventListener("click", () => {
    alert("btnSubtract was clicked");
});

btnAdd.addEventListener("click", () => {
    alert("btnAdd was clicked");
});

btnResult.addEventListener("click", () => {
    alert("btnResult was clicked");
});


/* #######################################################################
    Funktion Declaration
#######################################################################*/
function clearAll(){
    firstNumber = 0;
    operator = "";
    secondNumber = 0;
    displayCurrentCalculation.textContent = "";
    displayCurrentNumber.textContent = "0";
}

function add(a,b){
    return a+b;
}

function subtract(a,b){
    return a-b;
}

function multiply(a,b){
    return a*b
}

function divide(a,b){
    return a/b;
}

function operate(a,b, operator){
    result = 0;
    switch (operator) {
        case "+":
            result = add(a,b);
            break;
        case "-":
            result = subtract(a,b);
            break;
        case "*":
            result = multiply(a,b);
            break;
        case "/":
            result = divide(a,b);
            break;
        default:
            alert("Something wrong with the operator!");
      }
      return result;
}

function updatedisplayCurrentCalculation(){
    
}

function updatedisplayCurrentNumber(){
    
}

function numberClicked(){
    // Case 1 ==> NEW NUMBER
    // IF a Number was clicked AND... THEN set clicked Number as new Number within displayCurrentNumber

    // Case 2 ==> APPEND NUMBER
    // IF a Number was clicked AND... THEN append clicked Number to the currently displayed Number within displayCurrentNumber

    // Case 3 ==> NEW NUMBER AND CLEAR DISPLAY OF CURRENT CALCULATION
    // IF a Number was clicked AND... THEN 
        // clear the displayCurrentCalculation 
        // AND set clicked Number as new Number within displayCurrentNumber

}

function operatorClicked(){
    // Case 1 (+-*/=) ==> ONE NUMBER AND OPERATOR
    // IF an Operator out of (+-*/=) was clicked AND... THEN set displayCurrentCalculation to displayCurrentNumber and clicked Operator (e.g. "2+" OR "2=")
    
    // Case 2 (+-*/) ==> OPERATOR LIKE +-*/ LEADS TO CALCULATION
    // IF an Operator out of (+-*/) was clicked AND... THEN
        // calculate x (firstNumber) operator (last clicked Operator) y (displayCurrentNumber)
        // AND display the result within displayCurrentNumber (e.g. After 2+3 = 5 "5")
        // AND set displayCurrentCalculation to displayCurrentNumber and clicked Operator (e.g. After 2+3 = 5 "5+")

    // Case 3 (=) ==> OPERATOR = LEADS TO CALCULATION - (Order matters)
    // IF the Operator = was clicked AND... THEN 
        // calculate x (firstNumber) operator (last clicked Operator) y (displayCurrentNumber)
        // AND set displayCurrentCalculation to x (firstNumber) operator (last clicked Operator) y(displayCurrentNumber/(Or secondNumber/last clicked Number)) and = (e.g. After 2+3 = 5 "2+3=")
        // AND display the result within displayCurrentNumber (e.g. After 2+3 = 5 "5")
        

    // Case 4 (=) ==> OPERATOR = LEADS TO REPEATED CALCULATION 
    // IF the Operator = was clicked AND... THEN
        // calculate x (displayCurrentNumber) operator (last clicked Operator) y (last clicked Number) 
        // AND display the result within displayCurrentNumber (e.g. After 2+3=5=8=11=14=17 "17")
        // AND set displayCurrentCalculation to x(result) operator (last clicked Operator) y(secondNumber/last clicked Number) and = (e.g. After 2+3=5=8=11=14=17 "14+3=")
}
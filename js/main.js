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

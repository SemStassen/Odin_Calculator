const numbersButtons = document.querySelectorAll('.num')
const operatorButtons = document.querySelectorAll('.operator')
const newNumDisplay = document.querySelector('.newNum')
const storedNumDisplay = document.querySelector('.storedNum')
const equalsButton = document.querySelector('.equals')
const clearButton = document.querySelector('.clear')
const deleteButton = document.querySelector('.delete')
const decimalButton = document.querySelector('.dot')

numbersButtons.forEach((number) => number.addEventListener('click', function () {
    numberAppend(this.textContent)
}))

operatorButtons.forEach((operator) => operator.addEventListener('click', function () {
    pickOperator(this.textContent)
}))
equalsButton.addEventListener('click', equalsPressed)

clearButton.addEventListener('click', clearAll)

deleteButton.addEventListener('click', deleteDigit)

// decimalButton.addEventListener('click', addDecimal)

// global variables
let editableNumber = ''
let storedNumber = ''
let operator = ''



function numberAppend(clickedNumber) {
    if (operator == '-' && editableNumber == '' && storedNumber == '') { // if the - operator is pressed before a number, make the number negative.
        editableNumber = operator.concat(editableNumber)
    }  

    //reset if answer is calculated and no new operator has been pressed;
    if (storedNumber != '' && operator == '') {
        storedNumber = '';
    }
    //append clicked number to editableNumber string and update display
    if (clickedNumber == '.' && editableNumber.includes('.')) {
        //do nothing
    } else {
   editableNumber = editableNumber.concat(clickedNumber);
    }
    
   updateDisplay();
}

function pickOperator(chosenOperator) { 
    if (storedNumber == '') {   // if operator is pressed without a second number to operate on, save the current number for future operations
        storedNumber = editableNumber;
        editableNumber = ''
    } else if (storedNumber != '' && editableNumber != '') {
        calcAnswer();
    }
    // first calculate with previous operator, then set next operator
    operator = chosenOperator;
    updateDisplay();
}

function calcAnswer() {
    if (operator == '/' && editableNumber == '0') {
        storedNumber = 'nice try'
        editableNumber = ''
    } else if (editableNumber != '' && storedNumber != '') { // only calculate when there are two numbers to calculate on
        storedNumber = operate(operator, storedNumber, editableNumber);
        //round number to 2 decimal places
        storedNumber = Math.round((storedNumber + Number.EPSILON) * 100) / 100;
        editableNumber = ''
        operator = ''    
    }
    
    updateDisplay();
}

function equalsPressed() {
    calcAnswer();
    operator = ''
}

function updateDisplay() {
        newNumDisplay.textContent = editableNumber;
    if (storedNumber != '') {
        storedNumDisplay.textContent = `${storedNumber} ${operator}`;
    } else {
        storedNumDisplay.textContent = `${storedNumber}`
    }
}

function clearAll() {
    storedNumber = '';
    editableNumber = '';
    operator = ''
    updateDisplay();
}

function deleteDigit() {
    editableNumber = editableNumber.slice(0, -1);
    updateDisplay();
}

//basic math functions
function add(a, b) {
    return +a + +b
}

function subtract(a, b) {
    return a - b
}

function multiply(a, b) {
    return a * b
}

function divide(a, b) {
    return a / b
}

function operate(operator, aNum, bNum) {
    if (operator == '+') {
        return add(aNum, bNum)
    }

    if (operator == '-') {
        return subtract(aNum, bNum)
    }

    if (operator == 'x') {
        return multiply(aNum, bNum)
    }

    if (operator == '/') {
        return divide(aNum, bNum)
    }
}
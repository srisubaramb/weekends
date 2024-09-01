const display = document.querySelector('#display');
const buttons = document.querySelectorAll('.btn');

//to keep track the previous and current value and operation we want the variables
let currentInput = '';
let operation = null;
let previousInput = '';

buttons.forEach( button => {
    button.addEventListener('click' , () => {
        const value = button.getAttribute('data-value');
        const op = button.getAttribute('data-operation');
        if(value) {
            handleValue(value);
        } else if(op) {
            handleOperation(op);
        }
    }
    )
}
)
function handleValue(value) {
    if(currentInput === '0') {
        currentInput = value;
    } else {
        currentInput += value;
    }
    display.innerText = currentInput;
}
function handleOperation(op) {
    // what if the user press = before input second value
    if(currentInput === '') return 0;
    // = is pressed when user in past pressed + , - , * , / that means the previous value is not empty
    else if(previousInput !== '' && currentInput !== '') {
        claculate();
    }else {
        operation = op;
        previousInput = currentInput;
        currentInput = '';
    }
}
function claculate() {
   let result = 0;
   const currentValue = parseFloat(currentInput);
   const previousValue = parseFloat(previousInput);
   if(! (isNaN(currentValue) && isNaN(previousValue))) {
    switch(operation) {
        case '+' :
            result = currentValue + previousValue;
            break;
        case '-' :
            result = previousValue - currentValue;
            break;
        case '*' :
            result = previousValue * currentValue;
            break;
        case '/' :
            result = previousValue / currentValue;
            break;
        default:
            return 0;
    }
    operation = null;
    currentInput = result.toString();
    previousInput = '';
    display.innerText = currentInput;
   }
}
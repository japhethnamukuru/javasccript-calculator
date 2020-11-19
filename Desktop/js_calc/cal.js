/* creating the calculator object for tracking of files */
const calculator = {
	// store string input in displayValue, the first operand and the
	//second operand 
	displayValue: '0',
	firstOperand: null,
	waitingForSecondOperand: false,
	operator: null,
};

// function for inputting the digits

function inputDigit(digit) {
	const { displayValue, waitingForSecondOperand } = calculator;

	if (waitingForSecondOperand === true) {
		calculator.displayValue = digit;
		calculator.waitingForSecondOperand = false;
	}
	else{
		// overite the displayValue if the current value is 0 otherwise append to it 
		// ternary operator(?) used to check if the  current displayed value is zero
		calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;

	}
	
	console.log(calculator);
}

// inputting decimals
function inputDecimal(dot) {
	if (calculator.waitingForSecondOperand === true) {
		calculator.displayValue = '0.';
		calculator.waitingForSecondOperand = false;
		return;
	}
	
	// if the display value property does not contain a decimal pont
	if (!calculator.displayValue.includes(dot)) {
		// append the decimal point
		calculator.displayValue += dot;
	} 
}

//handling operators
function handleOperator(nextOperator) {
	// destructure the properties on the calculator object
	const { firstOperand, displayValue, operator } = calculator;

	/* use 'parseFloat' to convert string contents of displayValue
	 to a floating point number */
	const inputValue = parseFloat(displayValue);

	if (operator && calculator.waitingForSecondOperand) {
		calculator.operator = nextOperator;
		console.log(calculator);
		return;
	}

	/* verify that the 'firstOperand' is null and that the 'inputValue'
	is not of type 'NaN' */
	if (firstOperand === null && !isNaN(inputValue)) {
		// update the first operand property
		calculator.firstOperand = inputValue;
	}
	else if (operator) {
		const result = calculate(firstOperand, inputValue, operator);
		calculator.displayValue = String(result);
		calculator.firstOperand = result;
	} 

	calculator.waitingForSecondOperand = true;
	calculator.operator = nextOperator;

	console.log(calculator);

}

// function to handle an operator after the second operand
function calculate(firstOperand, secondOperand, operator) {
	if (operator === '+') {
		return firstOperand + secondOperand;
	}
	else if (operator === '-') {
		return firstOperand - secondOperand;
	}
	else if (operator === '*') {
		return firstOperand * secondOperand;
	}
	else if (operator === '/') {
		return firstOperand / secondOperand;
	}

	return secondOperand;
}

/* step 1 function for updating the display screen */
function updateDisplay() {
	// select the element with class of 'calculator-screen'
	const display= document.querySelector('.calculator-screen');

	// update the value of the  element with the content of 'displayValue'
	display.value = calculator.displayValue;  
}
updateDisplay();

/* step 2 handling key events */
const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => {
	// access the clicked element
	const { target } = event;

	//check if the  clicked  element is button
	// if not exit form the function
	if (!target.matches('button')) {
		return;
	}

	if (target.classList.contains('operator')) {
		handleOperator(target.value);
		updateDisplay();
		return;
	}

	if (target.classList.contains('decimal')) {
		inputDecimal(target.value);
		updateDisplay();
		return;
	}

	if (target.classList.contains('all-clear')) {
		resetCalculator();
		updateDisplay();
		return;
	}

	inputDigit(target.value);
	updateDisplay();
});

// function to reset the calculator to its initial state
function resetCalculator() {
	calculator.displayValue = '0';
	calculator.firstOperand = null;
	calculator.waitingForSecondOperand = false;
	calculator.operator = null;
	console.log(calculator);
}

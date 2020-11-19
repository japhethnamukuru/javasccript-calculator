/* declaring constants */

const calc = document.querySelector('.calc');
const keys = calc.querySelector('.calc_keys');

/* listening and determining the type of key pressed */

keys.addEventListener('click', e => {
	if (e.target.matches('button')) {
		/* using the data-action attribute to determine the type of key pressed */

		const key = e.target;
		const action = key.dataset.action;

		/* if key misses the data-action attribute, it must be a number key */
		if (!action) {
			console.log('number key');
			calc.dataset.previousKey = 'number';
		}

		/* if the key has a data-action attribute then that is an operator */
		if (
			action === 'add' ||
			action === 'subtract' ||
			action === 'multiply' ||
			action ==='divide'
			) {
			console.log('operator_key');
		} 

		/* for special function keys i.e decimal, equal and clear */
		if (action === 'decimal') {
			console.log('decimal key');
			calc.dataset.previousKey = 'decimal';
		} 

		if (action === 'clear') {
			console.log('clear key');
			calc.dataset.previousKeyType = 'clear';
		}

		if (action === 'calculate') {
			console.log('equal key');
			calc.dataset.previousKey = 'calculate';
		}
	}
});

/* getting the current and the previously clicked keys using the textContent 
property and .calc_display. */
const display = document.querySelector('.calc_display');

keys.addEventListener('click', e => {
	if (e.target.matches('button')) {
		const key = e.target;
		const action = key.dataset.action;
		const keyContent = key.textContent;
		const displayedNum = display.textContent;

		/* replacing the default output(0) with the output of the clicked key */
		if (!action) {
			if (displayedNum === '0') {
				display.textContent = keyContent;
			}
		}

		/* appending current clicked number to the previous by concatination */
		if (!action) {
			if (displayedNum === '0') {
				display.textContent = keyContent;
			}
			else {
				display.textContent = displayedNum + keyContent;
			}
		}

		/* concatinating the decimal key(.) to the  displayed num */
		if (action ==='decimal') {
			display.textContent = displayedNum + '.';
		}

		/*highlighting a clicked operator to show its active state to the user 
		using the is-depressed class on the key */
		if (
			action === 'add' ||
			action === 'subtract' ||
			action === 'multiply' ||
			action === 'divide') {
			key.classList.add('is-depressed');
			calc.dataset.previousKeyType = 'operator';

			/* using an attribute to store the first number and the operator */
			calc.dataset.firstValue = displayedNum;
			calc.dataset.operator = action;


		} 

		/* replacing the displayed number with a clicked number */
		const previousKeyType = calc.dataset.previousKeyType;
		if (!action) {
			if (displayedNum === '0' ||
				previousKeyType === 'operator') {
				display.textContent = keyContent;
			}
			else {
				display.textContent = displayedNum + keyContent;
			}
		}

		// the calculations
		if (action === 'calculate') {			
			const firstValue = calc.dataset.firstValue;
			const operator = calc.dataset.operator;
			const secondValue = displayedNum;

			display.textContent = calculate(firstValue,operator,secondValue);
		} 
		/* creating the calculate function 
		const calculate = (n1, operator, n2) => {
			let result = ''

			if (operator === 'add') {
				result = n1 + n2;
			}
			else if (operator === 'subtract') {
				result = n1 - n2;
			}
			else if (operator === 'multiply') {
				result = n1 * n2;
			}
			else if (operator === 'divide') {
				result = n1 / n2;
			}
			return result;
		} */

		// using parseFloat formular to convert the string input to float
		const calculate = (n1, operator, n2) => {
			let result = '';

			if (operator === 'add') {
				result = parseFloat(n1) + parseFloat(n2);
			}
			else if (operator === 'subtract') {
				result = parseFloat(n1) - parseFloat(n2);
			}
			else if (operator === 'multiply') {
				result = parseFloat(n1) * parseFloat(n2);
			}
			else if (operator === 'divide') {
				result = parseFloat(n1) / parseFloat(n2);
			}
			return result;
		}

		// do nothing if the string has a dot(.)
		if (!displayedNum.includes('.')) {
			display.textContent = displayedNum + '.';
		}

		/*if (action === 'decimal') {
			if (!displayedNum.includes('.')) {
				display.textContent = displayedNum + '.';
			}
			else if (previousKeyType === 'operator') {
				display.textContent = '0.';
			}
			calc.dataset.previousKeyType = 'decimal';
		} */

		// removing  the .is-depressed  class  from all keys
		Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'));

	}
});
// equals stage
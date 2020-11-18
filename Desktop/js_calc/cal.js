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
		}

		/* if the key has a data-action attribute then that is an operator */
		if (
			action === 'add' ||
			action === 'subtract' ||
			action === 'multiply' ||
			action ==='devide'
			) {
			console.log('operator_key');
		} 

		/* for special function keys i.e decimal, equal and clear */
		if (action === 'decimal') {
			console.log('decimal key');
		} 

		if (action === 'clear') {
			console.log('clear key');
		}

		if (action === 'calculate') {
			console.log('equal key');
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

		/*highlighting a clicked operator to show its activw state to the user 
		using the is-depressed class on the key */
		if (
			action === 'add' ||
			action === 'subtract' ||
			action === 'multiply' ||
			action === 'devide') {
			key.classList.add('is-depressed');

			// adding custom attribute (data-previous-key-type)to
			// check if prevoius key is operator 
			calculator.dataset.previousKeyType = 'operator';
		} 

		/* hitting a number key after an operator should cause the previous 
		display to disappear and be replaced with the current key input an the 
		operator to release its is-depressed state */

		// remove is-depressed class from all keys
		Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'));

		/* replacing the displayed number if the previous key is an operator */
		const previousKeyType = calc.dataset.previousType;

		if (!action) {
			if (displayedNum === '0' || previousKeyType === 'operator') {
				display.textContent = keyContent;
			}
			else {
				display.textContent = displayedNum + keyContent;
			}
		}

	}
});



// equals stage
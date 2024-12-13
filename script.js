let runningTotal = 0;
let buffer = "0";
let previousOperator = null;

const screen = document.querySelector('.screen');

function buttonClick(value) {
    if (isNaN(value)) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    updateScreen();
}

function handleSymbol(symbol) {
    switch (symbol) {
        case 'C':
            buffer = '0';
            runningTotal = 0;
            previousOperator = null;
            break;

        case '=':
            if (previousOperator === null) return;

            flushOperation(parseFloat(buffer));
            previousOperator = null;
            buffer = runningTotal.toString(); // Replace with the result
            runningTotal = 0; // Reset for new calculations
            break;

        case '←':
            if (buffer.length === 1) {
                buffer = '0';
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;

        case '+':
        case '−':
        case '×':
        case '÷':
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol) {
    if (buffer === '0') return;

    const intBuffer = parseFloat(buffer);

    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }

    previousOperator = symbol;
    buffer = ""; // Clear buffer for the next number
}

function flushOperation(intBuffer) {
    if (previousOperator === '+') {
        runningTotal += intBuffer;
    } else if (previousOperator === '−') {
        runningTotal -= intBuffer;
    } else if (previousOperator === '×') {
        runningTotal *= intBuffer;
    } else if (previousOperator === '÷') {
        if (intBuffer === 0) {
            buffer = "Error";
            runningTotal = 0;
            previousOperator = null;
            return;
        }
        runningTotal /= intBuffer;
    }
}

function handleNumber(numberString) {
    if (buffer === "0" || buffer === "") {
        buffer = numberString;
    } else {
        buffer += numberString;
    }
}

function updateScreen() {
    // Display the ongoing calculation
    if (previousOperator) {
        screen.innerText = `${runningTotal} ${previousOperator} ${buffer}`;
    } else {
        screen.innerText = buffer;
    }
}

function init() {
    document.querySelector('.calcu-buttons').addEventListener('click', function (event) {
        if (event.target.tagName === "BUTTON") {
            buttonClick(event.target.innerText);
        }
    });
}

init();

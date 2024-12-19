
const resultsBox = document.querySelector('.results-box');

// Store the operation
let currentInput = '';

function updateScreen(value) {
    resultsBox.innerText = value || '0'; // "0" if empty
}

// Main function to handle button clicks
function handleButton(value) {
    if (!isNaN(value) || value === '.') {
        // If it's a number or a decimal point, add it to the current input
        currentInput += value;
    } else if (['+', '-', 'x', '%'].includes(value)) {
        // If it's an operator, add it with spaces for separation
        currentInput += ` ${value} `;
    } else if (value === 'C') {
        // Clear all input
        currentInput = '';
    } else if (value === '←') {
        // Remove the last character
        currentInput = currentInput.trim().slice(0, -1);
    } else if (value === '=') {
        // Evaluate the operation
        try {
            const result = evaluateExpression(currentInput);
            currentInput = result.toString();
        } catch {
            currentInput = 'Error';
        }
    }

    // Update the screen after each action
    updateScreen(currentInput);
}

// Evaluate the expression with operator precedence
function evaluateExpression(expression) {
    const tokens = expression.split(' ');

    // Mantain the result step by step
    let stack = [];

    // Process first * and /
    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];

        if (token === 'x') {
            const prev = stack.pop();
            const next = parseFloat(tokens[++i]);
            stack.push(prev * next);
        } else if (token === '%') {
            const prev = stack.pop();
            const next = parseFloat(tokens[++i]);
            stack.push(prev / next);
        } else {
            // Add numbers and other operators to stack
            stack.push(token === '+' || token === '-' ? token : parseFloat(token));
        }
    }

    // Then process + and -
    let result = stack[0];
    for (let i = 1; i < stack.length; i += 2) {
        const operator = stack[i];
        const next = stack[i + 1];

        if (operator === '+') {
            result += next;
        } else if (operator === '-') {
            result -= next;
        }
    }

    return result;
}

updateScreen('');

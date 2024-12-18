const operators = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "x": (a, b) => a * b,
    "%": (a, b) => {
        if (b === 0) {
            throw new Error("Cannot divide by zero");
        }
        return a / b;
    }
};

function calculate(prev, next, operator) {
    return operators[operator](prev, next);
}

var operation = {
    operationList:[],
    currentNumber: "",

    reset: function (){
        this.operationList = [];
        this.currentNumber = "";
    },
    execute: function() {
        // First pass: resolve multiplication and division
        let firstPass = [];
        let i = 0;
        
        while (i < this.operationList.length) {
            const current = this.operationList[i];
            
            // If the operation is multiplication (x) or division (%), execute it immediately
            if (current === "x" || current === "%") {
            const prevNumber = parseFloat(firstPass.pop());
            const nextNumber = parseFloat(this.operationList[i + 1]);
            firstPass.push(calculate(prevNumber, nextNumber, current));
            i += 2;  // Skip to the next element after the operation

            } else {
                // If the operation is not high priority, just add it to the list
                firstPass.push(current);
                i++;
            }
        }

        // Second pass: resolve addition and subtraction
        let result = parseFloat(firstPass[0]);
        for (let i = 1; i < firstPass.length; i += 2) {
            const operator = firstPass[i];
            const nextNumber = parseFloat(firstPass[i + 1]);
            result = calculate(result, nextNumber, operator);
        }

        return result;

    }
    
}
function handleNumberClick(event) {
    operation.currentNumber += event.target.innerText;
    paragraph.innerText = operation.currentNumber;
}

function handleOperatorClick(event) {
    if (operation.currentNumber === "") return;
    var currentOperator = event.target.innerText;
    operation.operationList.push(operation.currentNumber);
    operation.operationList.push(currentOperator);
    operation.currentNumber = "";
    paragraph.innerText = currentOperator;
}

function handleEqualClick() {
    operation.operationList.push(operation.currentNumber);
    const result = operation.execute();
    paragraph.innerText = result.toString();
    operation.reset();
}

function handleCleanClick() {
    operation.reset();
    paragraph.innerText = "";
}

function handleDeleteClick() {
    if (operation.currentNumber !== "") {
        operation.currentNumber = operation.currentNumber.slice(0, -1);
        paragraph.innerText = operation.currentNumber;
    } else if (operation.operationList.length > 0) {
        operation.operationList.pop();
        paragraph.innerText = operation.operationList.length > 0 ? operation.operationList[operation.operationList.length - 1] : "";
    }
}
const paragraph = document.querySelector(".results-box");

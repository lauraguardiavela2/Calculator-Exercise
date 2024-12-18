var operation = {
    operationList:[],
    currentNumber: "",

    reset: function (){
        this.operationList = [];
        this.currentNumber = "";
    },
    execute: function() {

        // Multiply and divide first
        let prioritizedList = [];
        for (let i = 0; i < this.operationList.length; i++) {
            
            let item = this.operationList[i];
            if (item === "x" || item === "%") {
                let prevNumber = parseFloat(prioritizedList.pop());
                let nextNumber = parseFloat(this.operationList[++i]);
    
                if (item === "x") { prioritizedList.push(prevNumber * nextNumber);} 
                else if (item === "%") {
                    if (nextNumber === 0) { return "Error: Division by zero"; }
                    prioritizedList.push(prevNumber / nextNumber);
                }
            } else { prioritizedList.push(item); }
        }
    
        // Sum and minus
        let result = 0;
        let currentOperator = "+";
    
        for (let i = 0; i < prioritizedList.length; i++) {
            let item = prioritizedList[i];
    
            if (!isNaN(item)) {
                let number = parseFloat(item);
                if (currentOperator === "+") { result += number; } 
                else if (currentOperator === "-") { result -= number;}
            } else { currentOperator = item; }
        }
        console.log("result: " + result);
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

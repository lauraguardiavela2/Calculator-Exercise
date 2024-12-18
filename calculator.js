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
document
  .querySelector(".calculator")
  .addEventListener("click", function (event) 
   {
        if (!event.target.classList.contains("default-button")) {
            return;
        }
        if (event.target.classList.contains("results-box")) {
            return;
        }
        if(event.target.classList.contains("number")){
            operation.currentNumber += (event.target.innerText).toString();
            paragraph.innerText = operation.currentNumber;
        }
        if(event.target.classList.contains("operator")){
            if (operation.currentNumber === "") { return; }
            var currentOperator = (event.target.innerText).toString();
            operation.operationList.push(operation.currentNumber);
            operation.operationList.push(currentOperator);
            operation.currentNumber = "";
            paragraph.innerText = currentOperator;
        }
        if(event.target.classList.contains("equal")){
            operation.operationList.push(operation.currentNumber);
            const result = operation.execute();
            paragraph.innerText = result.toString();
            operation.reset();
        }
        if(event.target.classList.contains("clean")){
            operation.reset();
            paragraph.innerText = "";
        }
        if(event.target.classList.contains("delete")){
            if (operation.currentNumber !== "") {
                // If we are writting a number, we delete the last number
                operation.currentNumber = operation.currentNumber.slice(0, -1);
                paragraph.innerText = operation.currentNumber;
            } else if (operation.operationList.length > 0) {
                // If there is not any number, we delete the last element of the list
                operation.operationList.pop();
                // We show the last element of the list if there is any
                if (operation.operationList.length > 0) {
                    paragraph.innerText = operation.operationList[operation.operationList.length - 1];
                } else {
                    paragraph.innerText = "";
                }
            }
        }
    }
);
const paragraph = document.querySelector(".results-box");

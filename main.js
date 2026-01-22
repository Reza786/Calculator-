const display = document.querySelector(".output");
const btn = document.querySelectorAll("button");
let currentInput = "";
let previousInput = "";
let operator = "";

function displayZero() {
  display.textContent = "0";
}
displayZero();

function updateDisplay() {
  let displayText = "";
  if (previousInput) {
    displayText += previousInput;
  }
  if (operator) {
    displayText += operator;
  }
  if (currentInput) {
    displayText += currentInput;
  }
  if (!displayText) {
    displayText = "0";
  }
  display.textContent = displayText;
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return b !== 0 ? a / b : "Error";
}

function calculate(a, b, op) {
  a = parseFloat(a);
  b = parseFloat(b);
  let res;
  switch (op) {
    case "+":
      res = add(a, b);
      break;
    case "-":
      res = subtract(a, b);
      break;
    case "*":
      res = multiply(a, b);
      break;
    case "/":
      res = divide(a, b);
      break;
    default:
      res = 0;
  }
  if (typeof res === "number") {
    return res.toFixed(4).replace(/\.?0+$/, "");
  } else {
    return res;
  }
}

btn.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;
    if (
      (value >= "0" && value <= "9") ||
      (value === "." && !currentInput.includes("."))
    ) {
      currentInput += value;
      updateDisplay();
    } else if (["+", "-", "X", "/"].includes(value)) {
      if (currentInput) {
        previousInput = currentInput;
        currentInput = "";
        operator = value === "X" ? "*" : value;
        updateDisplay();
      }
    } else if (value === "=") {
      if (previousInput && currentInput && operator) {
        const result = calculate(previousInput, currentInput, operator);
        display.textContent = result;
        currentInput = result.toString();
        previousInput = "";
        operator = "";
      }
    } else if (value === "AC") {
      currentInput = "";
      previousInput = "";
      operator = "";
      updateDisplay();
    } else if (value === "C") {
      if (currentInput == "Error") {
        displayZero();
      } else {
        currentInput = currentInput.slice(0, -1);
        updateDisplay();
      }
    } else if (value === "-/+") {
      if (currentInput) {
        let num = parseFloat(currentInput) * -1;
        currentInput = num.toFixed(4).replace(/\.?0+$/, "");
        updateDisplay();
      }
    } else if (value === "%") {
      if (currentInput) {
        let num = parseFloat(currentInput) / 100;
        currentInput = num.toFixed(4).replace(/\.?0+$/, "");
        updateDisplay();
      }
    }
  });
});

//

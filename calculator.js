let isOperator = /[+*÷-]/;
let formula = [];
let solution = 0;
let lastIndex = "";
let equalsPressed = false;
let decimalPressed = false;
let decimalPlace = 0.1;
let amountDecimalPlace = 1;

document.getElementById("clear").onclick = function () {
  formula = [];
  decimalPressed = false;
  decimalPlace = 0.1;
  amountDecimalPlace = 1;
  equalsPressed = false;
  document.getElementById("formula").innerHTML = solution;
  document.getElementById("solution").innerHTML = "0";
};

function addInput(number) {
  if (decimalPressed == false) {
    if (equalsPressed == false) {
      if (formula.length > 0) {
        lastIndex = formula[formula.length - 1].toString();
        if (isOperator.test(lastIndex)) {
          formula.push(number);
        } else {
          formula[formula.length - 1] *= 10;
          formula[formula.length - 1] += number;
        }
      } else {
        formula.push(number);
      }
    } else {
      formula.pop();
      formula.push(number);
      equalsPressed = false;
    }
  } else {
    if (
      formula.length > 0 &&
      equalsPressed == false &&
      !isOperator.test(formula[formula.length - 1])
    ) {
      if (decimalPlace == 0.1) {
        formula[formula.length - 1] = parseFloat(
          formula[formula.length - 1].toString().concat("." + number.toString())
        ).toFixed(amountDecimalPlace);
      } else {
        formula[formula.length - 1] = parseFloat(
          formula[formula.length - 1].toString().concat(number.toString())
        ).toFixed(amountDecimalPlace);
      }
      decimalPlace /= 10;
      amountDecimalPlace += 1;
    } else {
      if (equalsPressed == false) {
        formula.push(
          Math.round(number * decimalPlace * (1 / decimalPlace)) /
            (1 / decimalPlace)
        );
        decimalPlace /= 10;
        amountDecimalPlace += 1;
      } else {
        formula.pop();
        formula.push(
          Math.round(number * decimalPlace * (1 / decimalPlace)) /
            (1 / decimalPlace)
        );
        decimalPlace /= 10;
        amountDecimalPlace += 1;
        equalsPressed = false;
      }
    }
  }
}

function updateDisplay() {
  document.getElementById("solution").innerHTML = formula.join("");
}

document.getElementById("zero").onclick = function () {
  addInput(0);
  updateDisplay();
};

document.getElementById("one").onclick = function () {
  addInput(1);
  updateDisplay();
};

document.getElementById("two").onclick = function () {
  addInput(2);
  updateDisplay();
};

document.getElementById("three").onclick = function () {
  addInput(3);
  updateDisplay();
};

document.getElementById("four").onclick = function () {
  addInput(4);
  updateDisplay();
};

document.getElementById("five").onclick = function () {
  addInput(5);
  updateDisplay();
};

document.getElementById("six").onclick = function () {
  addInput(6);
  updateDisplay();
};

document.getElementById("seven").onclick = function () {
  addInput(7);
  updateDisplay();
};

document.getElementById("eight").onclick = function () {
  addInput(8);
  updateDisplay();
};

document.getElementById("nine").onclick = function () {
  addInput(9);
  updateDisplay();
};

function addOperator(operator) {
  if (formula.length != 0) {
    lastIndex = formula[formula.length - 1].toString();
    if (!isOperator.test(lastIndex) || formula[formula.length - 1] < 0) {
      formula.push(operator);
    } else {
      alert("You can't put two operators in a row");
    }
  } else {
    alert("You cannot start with an operator");
  }
  equalsPressed = false;
  decimalPressed = false;
  decimalPlace = 0.1;
  amountDecimalPlace += 1;
}

document.getElementById("divide").onclick = function () {
  addOperator("÷");
  updateDisplay();
};

document.getElementById("multiply").onclick = function () {
  addOperator("*");
  updateDisplay();
};

document.getElementById("subtract").onclick = function () {
  addOperator("-");
  updateDisplay();
};

document.getElementById("add").onclick = function () {
  addOperator("+");
  updateDisplay();
};

document.getElementById("changeSign").onclick = function () {
  if (formula.length != 0 && typeof formula[formula.length - 1] == "number") {
    formula[formula.length - 1] *= -1;
  }
  updateDisplay();
};

document.getElementById("percent").onclick = function () {
    if (formula.length != 0 && typeof formula[formula.length - 1] == "number") {
      formula[formula.length - 1] *= 0.01;
    }
    updateDisplay();
  };
  
document.getElementById("decimal").onclick = function () {
  if (decimalPressed == false) {
    document.getElementById("solution").innerHTML = formula.join("") + ".";
  }
  decimalPressed = true;
};



document.getElementById("equals").onclick = function () {
  equalsPressed = true;
  decimalPressed = false;
  decimalPlace = 0.1;
  amountDecimalPlace = 1;
  document.getElementById("formula").innerHTML = formula.join("");
  for (let i = 0; i < formula.length; ++i) {
    if (formula[i] == "*") {
      formula.splice(i - 1, 3, formula[i - 1] * formula[i + 1]);
      i = 0;
    } else if (formula[i] == "÷") {
      formula.splice(i - 1, 3, formula[i - 1] / formula[i + 1]);
      i = 0;
    }
  }
  for (let i = 0; i < formula.length; ++i) {
    if (formula[i] == "+") {
      formula.splice(
        i - 1,
        3,
        parseFloat((formula[i - 1] + formula[i + 1]).toFixed(5))
      );
      i = 0;
    } else if (formula[i] == "-") {
      formula.splice(
        i - 1,
        3,
        parseFloat((formula[i - 1] - formula[i + 1]).toFixed(5))
      );
      i = 0;
    }
  }
  document.getElementById("solution").innerHTML = formula[0];
};

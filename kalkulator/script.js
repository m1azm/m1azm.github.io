let history = [];

function clearDisplay() {
    document.getElementById('display').innerText = '0';
}

function appendToDisplay(value) {
    const display = document.getElementById('display');
    if (display.innerText === '0' && value !== '/') {
        display.innerText = value;
    } else {
        display.innerText += value;
    }
}

function calculate() {
    const display = document.getElementById('display');
    let expression = display.innerText;

    // Replace π with Math.PI
    expression = expression.replace(/pi/g, Math.PI);
    
    // Replace factorial
    expression = expression.replace(/(\d+)!/g, (match, num) => {
        return factorial(Number(num));
    });

    // Replace sqrt
    expression = expression.replace(/sqrt\((.*?)\)/g, (match, num) => {
        return Math.sqrt(num);
    });

    // Replace power ^
    expression = expression.replace(/\^/g, '**');

    try {
        const result = eval(expression);
        display.innerText = result;
        history.push(`${expression} = ${result}`);
        updateHistory();
    } catch {
        display.innerText = 'Error';
    }
}

function updateHistory() {
    const historyDiv = document.getElementById('history');
    historyDiv.innerHTML = history.map(entry => `<div>${entry}</div>`).join('');
}

function factorial(n) {
    if (n === 0) return 1;
    return n * factorial(n - 1);
}

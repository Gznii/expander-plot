// Generates a random integer between min and max (inclusive)
function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate random slope (m) and y-intercept (b)
const m = randInt(1, 10);
const b = randInt(1, 10);

// 50% chance to generate a point on the line
const onLine = Math.random() < 0.5;
let x, y;
if (onLine) {
    x = randInt(1, 10);
    y = m * x + b;
} else {
    x = randInt(1, 10);
    // Pick a y that is NOT on the line
    let yCandidate;
    do {
        yCandidate = randInt(1, 10);
    } while (yCandidate === m * x + b);
    y = yCandidate;
}

// Display equation and point
const eqnStr = `y = ${m}x + ${b}`;
document.getElementById('equation').textContent = `Equation: ${eqnStr}`;
document.getElementById('point').textContent = `Point: (${x}, ${y})`;

// Check button logic
const checkBtn = document.getElementById('checkBtn');
const resultDiv = document.getElementById('result');
checkBtn.onclick = function() {
    const isOnLine = y === m * x + b;
    if (isOnLine) {
        resultDiv.textContent = 'Correct! The point is on the line.';
        resultDiv.style.color = 'green';
    } else {
        resultDiv.textContent = 'Incorrect. The point is not on the line.';
        resultDiv.style.color = 'red';
    }
};

// Render LaTeX solution
function renderLatex() {
    const latex = `y = ${m}x + ${b} \\ 
    y = ${m} \times ${x} + ${b} = ${m * x + b} \\ 
    \text{Given point: } (${x}, ${y}) \\ 
    ${y} ${y === m * x + b ? '=' : '\\neq'} ${m * x + b} \\ 
    ${y === m * x + b ? '\text{The point is on the line.}' : '\text{The point is not on the line.}'}`;
    katex.render(latex, document.getElementById('latex'), { displayMode: true });
}

document.querySelector('.expander').addEventListener('toggle', function(e) {
    if (this.open) renderLatex();
});

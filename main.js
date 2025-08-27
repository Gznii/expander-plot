// Generates a random integer between min and max (inclusive)
function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let m, b, x, y, onLine;

function generateQuestion() {
    m = randInt(1, 10);
    b = randInt(1, 10);
    onLine = Math.random() < 0.5;
    if (onLine) {
        x = randInt(1, 10);
        y = m * x + b;
    } else {
        x = randInt(1, 10);
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
    document.getElementById('result').textContent = '';
    document.getElementById('latex').innerHTML = '';
    // Close expander if open
    const expander = document.querySelector('.expander');
    if (expander.open) expander.open = false;
}

// Render LaTeX solution
function renderLatex() {
    const latex = `y = ${m}x + ${b} \\ 
    y = ${m} \\times ${x} + ${b} = ${m * x + b} \\ 
    \\text{Given point: } (${x}, ${y}) \\ 
    ${y} ${y === m * x + b ? '=' : '\\neq'} ${m * x + b} \\ 
    ${y === m * x + b ? '\\text{The point is on the line.}' : '\\text{The point is not on the line.}'}`;
    katex.render(latex, document.getElementById('latex'), { displayMode: true });
}

document.querySelector('.expander').addEventListener('toggle', function(e) {
    if (this.open) renderLatex();
});

// Change button to 'Next' and generate new question on click
const nextBtn = document.getElementById('checkBtn');
nextBtn.textContent = 'Next';
nextBtn.onclick = generateQuestion;

// Initial question
generateQuestion();

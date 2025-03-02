let isDrawingEnabled = false;
let canvas = null;
let ctx = null;
let drawingColor = '#0000FF'; // Default blue
let isDrawing = false;
let lastX = 0;
let lastY = 0;

function initializeCanvas() {
    canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    ctx = canvas.getContext('2d');

    // Create color picker and clear button
    const controls = document.createElement('div');
    controls.style.position = 'fixed';
    controls.style.top = '10px';
    controls.style.left = '10px';
    controls.style.zIndex = '1000';
    controls.innerHTML = `
        <button onclick="clearCanvas()" style="margin-right: 10px;">Clear</button>
        <button onclick="setColor('#0000FF')" style="background: blue; margin-right: 5px;">Blue</button>
        <button onclick="setColor('#00FF00')" style="background: green; margin-right: 5px;">Green</button>
        <button onclick="setColor('#FF0000')" style="background: red; margin-right: 5px;">Red</button>
        <button onclick="setColor('#FFFF00')" style="background: yellow;">Yellow</button>
    `;
    document.body.appendChild(controls);
}

function toggleDrawing() {
    isDrawingEnabled = !isDrawingEnabled;
    if (isDrawingEnabled) {
        initializeCanvas();
    } else {
        if (canvas) {
            canvas.remove();
            canvas = null;
        }
    }
}

function setColor(color) {
    drawingColor = color;
}

function clearCanvas() {
    if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

function draw(e) {
    if (!isDrawingEnabled || !isDrawing) return;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.clientX, e.clientY);
    ctx.strokeStyle = drawingColor;
    ctx.lineWidth = 2;
    ctx.stroke();
    [lastX, lastY] = [e.clientX, e.clientY];
}

// Add mouse event listeners when drawing is enabled
document.addEventListener('mousedown', (e) => {
    if (!isDrawingEnabled) return;
    isDrawing = true;
    [lastX, lastY] = [e.clientX, e.clientY];
});

document.addEventListener('mousemove', draw);
document.addEventListener('mouseup', () => isDrawing = false);
document.addEventListener('mouseout', () => isDrawing = false);

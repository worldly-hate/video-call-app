let isDrawing = false;
let lastX = 0;
let lastY = 0;
let currentColor = '#0000FF';

function initializeCanvas() {
    const canvas = document.createElement('canvas');
    canvas.id = 'drawing-canvas';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    // Create color picker and clear button
    const controls = document.createElement('div');
    controls.id = 'drawing-controls';
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

    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.strokeStyle = currentColor;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse events for drawing
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    function startDrawing(e) {
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }

    function draw(e) {
        if (!isDrawing) return;
        
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }

    function stopDrawing() {
        isDrawing = false;
    }
}

function toggleDrawing() {
    const drawingControls = document.getElementById('drawing-controls');
    const canvas = document.getElementById('drawing-canvas');
    
    if (drawingControls.style.display === 'none' || !drawingControls.style.display) {
        drawingControls.style.display = 'block';
        canvas.style.pointerEvents = 'auto';
        initializeCanvas();
    } else {
        drawingControls.style.display = 'none';
        canvas.style.pointerEvents = 'none';
        if (canvas) {
            canvas.remove();
        }
    }
}

function clearCanvas() {
    const canvas = document.getElementById('drawing-canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function setColor(color) {
    currentColor = color;
    const canvas = document.getElementById('drawing-canvas');
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = color;
}

document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('mousedown', (e) => {
    });

    document.addEventListener('mousemove', () => {});
    document.addEventListener('mouseup', () => {});
    document.addEventListener('mouseout', () => {});
});

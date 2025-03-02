let isDrawing = false;
let lastX = 0;
let lastY = 0;
let currentColor = '#0000FF';

// Initialize canvas and context
function initializeCanvas() {
    const canvas = document.getElementById('drawing-canvas');
    if (!canvas) return null;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Set drawing style
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    return ctx;
}

// Handle mouse/touch events
function handleStart(e) {
    isDrawing = true;
    const pos = getPosition(e);
    [lastX, lastY] = [pos.x, pos.y];
}

function handleMove(e) {
    if (!isDrawing) return;
    
    const ctx = initializeCanvas();
    if (!ctx) return;
    
    const pos = getPosition(e);
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    [lastX, lastY] = [pos.x, pos.y];
}

function handleEnd() {
    isDrawing = false;
}

// Get position for both mouse and touch events
function getPosition(e) {
    let x, y;
    
    if (e.type.includes('mouse')) {
        x = e.clientX;
        y = e.clientY;
    } else if (e.type.includes('touch')) {
        const touch = e.touches[0];
        x = touch.clientX;
        y = touch.clientY;
    }
    
    return { x, y };
}

// Add event listeners
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('drawing-canvas');
    if (!canvas) return;
    
    // Mouse events
    canvas.addEventListener('mousedown', handleStart);
    canvas.addEventListener('mousemove', handleMove);
    canvas.addEventListener('mouseup', handleEnd);
    canvas.addEventListener('mouseout', handleEnd);
    
    // Touch events
    canvas.addEventListener('touchstart', handleStart);
    canvas.addEventListener('touchmove', handleMove);
    canvas.addEventListener('touchend', handleEnd);
    
    // Prevent scrolling while drawing on mobile
    canvas.addEventListener('touchstart', (e) => e.preventDefault());
    canvas.addEventListener('touchmove', (e) => e.preventDefault());
    
    // Handle window resize
    window.addEventListener('resize', initializeCanvas);
});

// Toggle drawing mode
function toggleDrawing() {
    const drawingControls = document.getElementById('drawing-controls');
    const canvas = document.getElementById('drawing-canvas');
    const toggleBtn = document.getElementById('toggle-drawing');
    
    if (!drawingControls || !canvas || !toggleBtn) return;
    
    const isEnabled = drawingControls.style.display === 'block';
    
    drawingControls.style.display = isEnabled ? 'none' : 'block';
    canvas.style.pointerEvents = isEnabled ? 'none' : 'auto';
    toggleBtn.style.background = isEnabled ? '#4CAF50' : '#f44336';
    toggleBtn.innerHTML = isEnabled ? '✏️ Draw' : '✏️ Stop';
    
    // Reset canvas when enabling drawing
    if (!isEnabled) {
        initializeCanvas();
    }
}

// Clear the canvas
function clearCanvas() {
    const canvas = document.getElementById('drawing-canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Set drawing color
function setColor(color) {
    currentColor = color;
    const ctx = initializeCanvas();
    if (ctx) {
        ctx.strokeStyle = color;
    }
}

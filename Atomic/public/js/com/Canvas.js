const mainCanvas = document.getElementById('myCanvas');
const context = mainCanvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const brushSizeInput = document.getElementById('brushSize');
const brushSizeLabel = document.getElementById('brushSizeLabel');

let initialX;
let initialY;
let brushColor = '#000';
let isEraser = false;
let brushSize = 5;
let texture = 'brush';

colorPicker.addEventListener('input', (event) => {
    brushColor = event.target.value;
    isEraser = false;
});

brushSizeInput.addEventListener('input', (event) => {
    brushSize = event.target.value;
});

const setTexture = (selectedTexture) => {
    texture = selectedTexture;
};

const dibujar = (cursorX, cursorY) => {
    context.beginPath();
    context.moveTo(initialX, initialY);
    context.lineWidth = isEraser ? 20 : brushSize;
    context.strokeStyle = isEraser ? '#fff' : brushColor;

    switch (texture) {
        case 'pencil':
            context.globalAlpha = 1;
            context.setLineDash([]);
            break;
        case 'brush':
            context.globalAlpha = 1;
            context.setLineDash([]);
            context.filter = 'blur(2px)';
            break;
        case 'marker':
            context.globalAlpha = 1;
            context.lineWidth = 20;
            context.setLineDash([]);
            break;
        case 'pen':
            context.globalAlpha = 1;
            context.lineWidth = 2;
            context.setLineDash([]);
            break;
        default:
            context.globalAlpha = 1;
            context.setLineDash([]);
            break;
    }

    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.lineTo(cursorX, cursorY);
    context.stroke();
    context.filter = 'none';
    initialX = cursorX;
    initialY = cursorY;
};

const cleanPage = () => {
    context.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
};

const setEraser = () => {
    isEraser = true;
    brushSizeInput.style.display = 'block';
    brushSizeLabel.style.display = 'block';
};

const setBrush = () => {
    isEraser = false;
    setTexture('brush');
    brushSizeInput.style.display = 'block';
    brushSizeLabel.style.display = 'block';
};

const setPencil = () => {
    isEraser = false;
    setTexture('pencil');
    brushSizeInput.style.display = 'block';
    brushSizeLabel.style.display = 'block';
};

const setMarker = () => {
    isEraser = false;
    setTexture('marker');
    brushSizeInput.style.display = 'none';
    brushSizeLabel.style.display = 'none';
};

const setPen = () => {
    isEraser = false;
    setTexture('pen');
    brushSizeInput.style.display = 'none';
    brushSizeLabel.style.display = 'none';
};

const mouseDown = (evt) => {
    initialX = evt.offsetX;
    initialY = evt.offsetY;
    dibujar(initialX, initialY);
    mainCanvas.addEventListener('mousemove', mouseMoving);
};

const mouseMoving = (evt) => {
    dibujar(evt.offsetX, evt.offsetY);
};

const mouseUp = () => {
    mainCanvas.removeEventListener('mousemove', mouseMoving);
};

mainCanvas.addEventListener('mousedown', mouseDown);
mainCanvas.addEventListener('mouseup', mouseUp);

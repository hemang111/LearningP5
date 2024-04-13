let grid;
let cols;
let rows;
let resolution = 15;
function changeresolution() {
    resolution = Math.max(25,(Math.random() * 100));
    setup();
    draw();
}
function setup() {
    let bodyStyles = window.getComputedStyle(document.body);
    let bodyHeight = parseInt(bodyStyles.getPropertyValue('height'));
    let bodyWidth = parseInt(bodyStyles.getPropertyValue('width'));
    createCanvas(bodyWidth, bodyHeight);
    cols = Math.floor(width / resolution);
    rows = Math.floor(height / resolution);
    grid = make2DArray(cols, rows);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = floor(random(2));
        }
    }
}
function draw() {
    background(0);
    let next = make2DArray(cols, rows);
    clear();
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let state = grid[i][j];
            let neighbours = countNeighbors(grid, i, j)
            if (state == 0 && neighbours == 3) {
                next[i][j] = 1;
            } else if (state == 1 && (neighbours < 2 || neighbours > 3)) {
                next[i][j] = 0;
            } else {
                next[i][j] = state;
            }
            let x = i * resolution;
            let y = j * resolution;
            if (grid[i][j] == 1) {
                fill(Math.random() * 255, Math.random() * 255, Math.random() * 255);
                stroke(Math.random() * 255, Math.random() * 255, Math.random() * 255);
                rect(x, y, resolution - 1,resolution-1);
            }
        }
    }
    grid = next;
}
function countNeighbors(grid, x, y) {
    let sum = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            let col = (x + i + cols) % cols;
            let row = (y + j + rows) % rows;
            sum += grid[col][row];
        }
    }
    sum -= grid[x][y];
    return sum;
}
function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}

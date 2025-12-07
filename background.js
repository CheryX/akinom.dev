const canvas = document.getElementById("grid");
const ctx = canvas.getContext("2d");

const noise3D = createNoise3D();

// Grid
const scale = 10
let cols = Math.floor(canvas.width / scale) + 1;
let rows = Math.floor(canvas.height / scale) + 2;
const thresholds = [0.2, 0.4, 0.6, 0.8];
let t = 0;

// Generate noise field
function generateField() {
    const field = [];
    for (let y = 0; y < rows; y++) {
        field[y] = [];
        for (let x = 0; x < cols; x++) {
            const nx = x * 0.05;
            const ny = y * 0.05;
            field[y][x] = noise3D(nx, ny, t) * 0.5 + 0.5; // Normalize to 0–1
        }
    }
    return field;
}

// Draw contour lines with marching squares
function drawContours(field) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#ffffff20";
    ctx.lineWidth = 1;

    const drawLine = (x1, y1, x2, y2) => {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    };

    for (const threshold of thresholds) {
        for (let y = 0; y < rows - 1; y++) {
            for (let x = 0; x < cols - 1; x++) {
                const tl = field[y][x] > threshold ? 1 : 0;
                const tr = field[y][x + 1] > threshold ? 1 : 0;
                const br = field[y + 1][x + 1] > threshold ? 1 : 0;
                const bl = field[y + 1][x] > threshold ? 1 : 0;
                const state = (tl << 3) | (tr << 2) | (br << 1) | bl;

                const px = x * scale;
                const py = y * scale;
                const mid = scale / 2;

                switch (state) {
                    case 1: case 14: drawLine(px, py + mid, px + mid, py + scale); break;
                    case 2: case 13: drawLine(px + mid, py + scale, px + scale, py + mid); break;
                    case 3: case 12: drawLine(px, py + mid, px + scale, py + mid); break;
                    case 4: case 11: drawLine(px + scale, py + mid, px + mid, py); break;
                    case 5: drawLine(px, py + mid, px + mid, py);
                        drawLine(px + mid, py + scale, px + scale, py + mid); break;
                    case 6: case 9: drawLine(px + mid, py, px + mid, py + scale); break;
                    case 7: case 8: drawLine(px, py + mid, px + mid, py); break;
                    case 10: drawLine(px + mid, py, px + scale, py + mid);
                        drawLine(px, py + mid, px + mid, py + scale); break;
                }
            }
        }
    }
}

// Animate
function animate() {
    const field = generateField();
    drawContours(field);
    t += 0.005;
    requestAnimationFrame(animate);
}
animate();

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    cols = Math.floor(canvas.width / scale) + 1;
    rows = Math.floor(canvas.height / scale) + 2;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
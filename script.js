const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set canvas size dynamically
canvas.width = window.innerWidth * 0.9;
canvas.height = window.innerHeight * 0.6;

// Game variables
let hearts = [];
let basket = { x: canvas.width / 2 - 25, y: canvas.height - 40, width: 50, height: 20 };
let score = 0;
let moveLeft = false;
let moveRight = false;
let heartSpeed = 2; // Initial speed

// Function to create hearts
function createHeart() {
    return {
        x: Math.random() * (canvas.width - 30),
        y: 0,
        size: 20,
        speed: heartSpeed
    };
}

//


// Add hearts at intervals
setInterval(() => {
    hearts.push(createHeart());
}, 1000);

// Mobile Controls (Fix Deadlock)
document.getElementById("leftBtn").addEventListener("touchstart", () => moveLeft = true);
document.getElementById("leftBtn").addEventListener("touchend", () => moveLeft = false);
document.getElementById("rightBtn").addEventListener("touchstart", () => moveRight = true);
document.getElementById("rightBtn").addEventListener("touchend", () => moveRight = false);

// Fix deadlock by handling touchmove
document.getElementById("leftBtn").addEventListener("touchmove", (e) => e.preventDefault());
document.getElementById("rightBtn").addEventListener("touchmove", (e) => e.preventDefault());

// Function to draw a heart shape
function drawHeart(x, y, size) {
    ctx.fillStyle = "red";
    ctx.beginPath();
    
    // Left Arc
    ctx.moveTo(x, y + size / 4);
    ctx.arc(x - size / 4, y, size / 4, Math.PI, 0, false);
    
    // Right Arc
    ctx.arc(x + size / 4, y, size / 4, Math.PI, 0, false);
    
    // Bottom Triangle
    ctx.lineTo(x, y + size);
    ctx.closePath();
    
    ctx.fill();
}

// Game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Move basket smoothly
    if (moveLeft && basket.x > 0) basket.x -= 5;
    if (moveRight && basket.x < canvas.width - basket.width) basket.x += 5;

    // Draw the basket
    ctx.fillStyle = "#ff4081";
    ctx.fillRect(basket.x, basket.y, basket.width, basket.height);

    // Move and draw hearts
    for (let i = hearts.length - 1; i >= 0; i--) {
        let heart = hearts[i];
        heart.y += heart.speed;

        // Draw heart shape
        drawHeart(heart.x, heart.y, heart.size);

        // Check if the basket catches a heart
        if (
            heart.y + heart.size > basket.y &&
            heart.x > basket.x &&
            heart.x < basket.x + basket.width
        ) {
            hearts.splice(i, 1);
            score++;
        }

        // If heart reaches the bottom, just remove it
        if (heart.y > canvas.height) {
            hearts.splice(i, 1);
        }
    }

    // Show score
    ctx.fillStyle = "#d63384";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 30);

    // Show love message when score is high
    if (score >= 10) {
        document.getElementById("message").innerText = "You caught all the love! 💕";
        document.getElementById("message").style.display = "block";
    }

    requestAnimationFrame(gameLoop);
}

gameLoop();

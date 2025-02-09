const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth * 0.9;
canvas.height = window.innerHeight * 0.6;

let hearts = [];
let basket = { x: canvas.width / 2 - 25, y: canvas.height - 40, width: 50, height: 20 };
let score = 0;
let gameOver = false;

// Function to create hearts
function createHeart() {
    return {
        x: Math.random() * (canvas.width - 20),
        y: 0,
        size: 20,
        speed: 2 + Math.random() * 2
    };
}

// Add hearts at intervals
setInterval(() => {
    if (!gameOver) hearts.push(createHeart());
}, 1000);

// Mobile Controls (Touch Buttons)
document.getElementById("leftBtn").addEventListener("touchstart", () => {
    if (basket.x > 0) basket.x -= 20;
});
document.getElementById("rightBtn").addEventListener("touchstart", () => {
    if (basket.x < canvas.width - basket.width) basket.x += 20;
});

// Game loop
function gameLoop() {
    if (gameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the basket
    ctx.fillStyle = "#ff4081";
    ctx.fillRect(basket.x, basket.y, basket.width, basket.height);

    // Move and draw hearts
    hearts.forEach((heart, index) => {
        heart.y += heart.speed;
        
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(heart.x, heart.y, heart.size / 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Check if the basket catches a heart
        if (
            heart.y + heart.size > basket.y &&
            heart.x > basket.x &&
            heart.x < basket.x + basket.width
        ) {
            hearts.splice(index, 1);
            score++;
        }

        // End game if hearts reach bottom
        if (heart.y > canvas.height) {
            gameOver = true;
        }
    });

    // Show score
    ctx.fillStyle = "#d63384";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 30);

    // Show love message when score is high
    if (score >= 10) {
        document.getElementById("message").innerText = "You caught all the love! 💕";
        document.getElementById("message").style.display = "block";
        gameOver = true;
    }

    requestAnimationFrame(gameLoop);
}

gameLoop();

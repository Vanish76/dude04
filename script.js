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

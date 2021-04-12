let snake = { body: [{ "x": 5, "y": 2 }, { "x": 4, "y": 2 }, { "x": 3, "y": 2 }, { "x": 2, "y": 2 }, { "x": 1, "y": 2 }], dir: "right", prevdir: "right" },
    canvas = document.getElementById("canv"),
    ct = canvas.getContext("2d"),
    apple;
if (window.innerWidth <= window.innerHeight * 1.5) {
    canvas.width = window.innerWidth - (window.innerWidth % 30)
    canvas.height = canvas.width / 1.5;
} else {
    canvas.height = window.innerHeight - (window.innerHeight % 20);
    canvas.width = canvas.height * 1.5;
}
canvas.style.marginTop = (window.innerHeight % 20) / 2;
sl = canvas.height / 20;
ct.fillStyle = "#00ff00";

startDrawSnake();
drawApple();

let t = setInterval(Update, 250);


function Update() {
    moveSnake();
    drawSnake();
}

function reDir(e) {
    switch (e.key) {
        case "ArrowLeft":
            if (snake.prevdir != "right")
                snake.dir = "left";
            break;
        case "ArrowUp":
            if (snake.prevdir != "down")
                snake.dir = "up";
            break;
        case "ArrowRight":
            if (snake.prevdir != "left")
                snake.dir = "right";
            break;
        case "ArrowDown":
            if (snake.prevdir != "up")
                snake.dir = "down";
            break;
    }
}

addEventListener("keydown", reDir);

function moveSnake() {
    switch (snake.dir) {
        case "right":
            snake.body.unshift({ x: snake.body[0].x + 1, y: snake.body[0].y });
            break;
        case "left":
            snake.body.unshift({ x: snake.body[0].x - 1, y: snake.body[0].y });
            break;
        case "up":
            snake.body.unshift({ x: snake.body[0].x, y: snake.body[0].y - 1 });
            break;
        case "down":
            snake.body.unshift({ x: snake.body[0].x, y: snake.body[0].y + 1 });
            break;
    }
    if (apple.x != snake.body[0].x || apple.y != snake.body[0].y) {
        snake.body.pop();
    } else {
        drawApple();
    }
    snake.prevdir = snake.dir;
}

function startDrawSnake() {
    ct.fillRect(sl * 2, sl * 2 + 1, sl * 4 - 1, sl - 2);
}

function drawSnake() {
    ct.clearRect(snake.body[snake.body.length - 1].x * sl - 1, snake.body[snake.body.length - 1].y * sl - 1, sl + 2, sl + 2);
    switch (snake.prevdir) {
        case "right":
            ct.fillRect(snake.body[0].x * sl - 1, snake.body[0].y * sl + 1, sl + 1, sl - 1);
            break;
        case "left":
            ct.fillRect(snake.body[0].x * sl + 1, snake.body[0].y * sl + 1, sl + 1, sl - 1);
            break;
        case "up":
            ct.fillRect(snake.body[0].x * sl + 1, snake.body[0].y * sl + 1, sl - 1, sl + 1);
            break;
        case "down":
            ct.fillRect(snake.body[0].x * sl + 1, snake.body[0].y * sl - 1, sl - 1, sl + 1);
            break;
    }
}

function drawApple() {
    apple = { x: Math.round(Math.random() * 30), y: Math.round(Math.random() * 20) };
    ct.fillStyle = "#ff0000";
    ct.fillRect(apple.x * sl + 1, apple.y * sl + 1, sl - 2, sl - 2);
    ct.fillStyle = "#00ff00";
}
class Snake {
    constructor(body, dir, prevdir, status) {
        this.body = body;
        this.dir = dir;
        this.prevdir = prevdir;
        this.status = status;
    }
}

class pos {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

let canvas = document.getElementById("canv"),
    ct = canvas.getContext("2d"),
    snake = new Snake([new pos(6, 3), new pos(5, 3), new pos(4, 3), new pos(3, 3), new pos(2, 3), new pos(1, 3)], "right", "down", "standart"),
    i, apple, golden_apple, oil, gold_ore, coal_ore, woman, putin,
    appleisinsnake = false,
    coalisseeked = false,
    goldisseeked = false,
    aplle_png = document.getElementById("apple"),
    golden_apple_png = document.getElementById("gold_apple"),
    dirt_png = document.getElementById("dirt"),
    lime_wool_png = document.getElementById("lime_wool"),
    green_wool_png = document.getElementById("green_wool"),
    yellow_wool_png = document.getElementById("yellow_wool"),
    stone_png = document.getElementById("stone"),
    blue_wool_png = document.getElementById("blue_wool"),
    orange_wool_png = document.getElementById("orange_wool"),
    oil_png = document.getElementById("oil"),
    gold_ore_png = document.getElementById("gold_ore"),
    coal_ore_png = document.getElementById("coal_ore"),
    woman_png = document.getElementById("woman"),
    gold_block_png = document.getElementById("gold"),
    putin_png = document.getElementById("putin");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

setTimeout(drawGrunt, 0);
setTimeout(drawApple, 50);
setTimeout(setCoal, 100);
setTimeout(setGold, 150);
setTimeout(setOil, 200);
let t = setInterval(Update, 250);

function drawGrunt() {
    ct.fillStyle = ct.createPattern(dirt_png, "repeat");
}

function drawApple() {
    ct.clearRect(0, 0, 480, 480);
    ct.fillRect(0, 0, 480, 480);
    do apple = new pos(Math.round(Math.random() * 9, 0), Math.round(Math.random() * 9, 0))
    while (apple.x >= 2 && apple.x <= 6 && apple.y == 3);
}

function setCoal() {
    ct.drawImage(aplle_png, apple.x * 48, apple.y * 48, 48, 48);
    coal_ore = new pos(Math.round(Math.random() * 15 + 10), Math.round(Math.random() * 10 + 5));
}

function setGold() {
    do gold_ore = new pos(Math.round(Math.random() * 15 + 10), Math.round(Math.random() * 10 + 5))
    while (gold_ore.x == coal_ore.x && gold_ore.y == coal_ore.y);
}

function setOil() {
    do oil = new pos(Math.round(Math.random() * 15 + 10), Math.round(Math.random() * 10 + 5))
    while (oil.x == coal_ore.x && oil.y == coal_ore.y && gold_ore.x == oil.x && gold_ore.y == oil.y);
    console.log("Coal: ", coal_ore);
    console.log("Gold: ", gold_ore);
    console.log("Oil: ", oil);
}

async function Update() {
    switch (snake.dir) {
        case "left":
            snake.body.unshift(new pos(snake.body[0].x - 1, snake.body[0].y));
            if (snake.body[0].x != apple.x || snake.body[0].y != apple.y)
                snake.body.pop();
            for (i = 1; i < snake.body.length - 1; i++)
                if (snake.body[0].x == snake.body[i].x && snake.body[0].y == snake.body[i].y) {
                    dead();
                }
            break;
        case "right":
            snake.body.unshift(new pos(snake.body[0].x + 1, snake.body[0].y));
            if (snake.body[0].x != apple.x || snake.body[0].y != apple.y)
                snake.body.pop();
            for (i = 1; i < snake.body.length - 1; i++)
                if (snake.body[0].x == snake.body[i].x && snake.body[0].y == snake.body[i].y) {
                    dead();
                }
            break;
        case "up":
            snake.body.unshift(new pos(snake.body[0].x, snake.body[0].y - 1));
            if (snake.body[0].x != apple.x || snake.body[0].y != apple.y)
                snake.body.pop();
            for (i = 1; i < snake.body.length - 1; i++)
                if (snake.body[0].x == snake.body[i].x && snake.body[0].y == snake.body[i].y) {
                    dead();
                }
            break;
        case "down":
            snake.body.unshift(new pos(snake.body[0].x, snake.body[0].y + 1));
            if (snake.body[0].x != apple.x || snake.body[0].y != apple.y)
                snake.body.pop();
            for (i = 1; i < snake.body.length - 1; i++)
                if (snake.body[0].x == snake.body[i].x && snake.body[0].y == snake.body[i].y) {
                    dead();
                }
            break;
    }
    snake.prevdir = snake.dir;
    for (i = snake.body.length - 1; i >= 0; i--) {
        if (i == 0) {
            if (snake.status == "standart")
                ct.drawImage(yellow_wool_png, snake.body[i].x * 48, snake.body[i].y * 48, 48, 48);
            if (snake.status == "miner")
                ct.drawImage(orange_wool_png, snake.body[i].x * 48, snake.body[i].y * 48, 48, 48);
        } else if (i == snake.body.length - 1) {
            ct.drawImage(dirt_png, snake.body[i].x * 48, snake.body[i].y * 48, 48, 48);
        } else {
            if (snake.status == "standart")
                ct.drawImage(lime_wool_png, snake.body[i].x * 48, snake.body[i].y * 48, 48, 48);
            if (snake.status == "miner")
                ct.drawImage(blue_wool_png, snake.body[i].x * 48, snake.body[i].y * 48, 48, 48);
        }
    }
    if (snake.body[0].x == apple.x && snake.body[0].y == apple.y) {
        do {
            appleisinsnake = false;
            apple = new pos(Math.round(Math.random() * 9, 0), Math.round(Math.random() * 9, 0));
            for (i = 0; i < snake.body.length; i++)
                if (snake.body[i].x == apple.x && snake.body[i].y == apple.y)
                    appleisinsnake = true;
        }
        while (appleisinsnake == true)
        if (Math.round(Math.random() * 10) == 5)
            ct.drawImage(golden_apple_png, apple.x * 48, apple.y * 48, 48, 48);
        else
            ct.drawImage(aplle_png, apple.x * 48, apple.y * 48, 48, 48);
    }
    if (Math.abs(snake.body[0].x - coal_ore.x) + Math.abs(snake.body[0].y - coal_ore.y) == 1 && coalisseeked == false) {
        ct.drawImage(coal_ore_png, 48 * coal_ore.x, 48 * coal_ore.y, 48, 48);
        coalisseeked = true;
    }
    if (snake.body[0].x == coal_ore.x && snake.body[0].y == coal_ore.y) {
        snake.status = "miner";
        clearInterval(t);
        t = setInterval(Update, 750);
    }
    if (Math.abs(snake.body[0].x - gold_ore.x) + Math.abs(snake.body[0].y - gold_ore.y) == 1 && goldisseeked == false) {
        ct.drawImage(gold_ore_png, 48 * gold_ore.x, 48 * gold_ore.y, 48, 48);
        goldisseeked = true;
    }
    if (snake.body[0].x == gold_ore.x && snake.body[0].y == gold_ore.y) {
        clearInterval(t);
        woman = new pos(37, snake.body[0].y);
        for (i = snake.body.length - 1; i >= 0; i--)
            if (i == 0)
                ct.drawImage(yellow_wool_png, snake.body[i].x * 48, snake.body[i].y * 48, 48, 48);
            else if (i == snake.body.length - 1)
            ct.drawImage(dirt_png, snake.body[i].x * 48, snake.body[i].y * 48, 48, 48);
        else
            ct.drawImage(gold_block_png, snake.body[i].x * 48, snake.body[i].y * 48, 48, 48);
        t = setInterval(WomanComingToSnake, 250);
    }
    if (Math.abs(snake.body[0].x - oil.x) + Math.abs(snake.body[0].y - oil.y) == 1) {
        ct.drawImage(oil_png, 48 * oil.x, 48 * oil.y, 48, 48);
        clearInterval(t);
        putin = new pos(37, oil.y);
        t = setInterval(PutinComingToOil, 250);
    }
    if (snake.body.length == 100) {
        clearInterval(t);
        alert("Поздравляю! Вы сдохли от ожирения.");
        window.location.reload();
    }
}

function WomanComingToSnake() {
    if (woman.x == snake.body[0].x + 2) {
        clearInterval(t);
        t = setInterval(WomanComingWithSnake, 250);
    }
    ct.fillRect((woman.x - 1) * 48, woman.y * 48, 144, 192);
    for (i = snake.body.length - 1; i >= 0; i--)
        if (i == 0)
            ct.drawImage(yellow_wool_png, snake.body[i].x * 48, snake.body[i].y * 48, 48, 48);
        else if (i == snake.body.length - 1)
        ct.drawImage(dirt_png, snake.body[i].x * 48, snake.body[i].y * 48, 48, 48);
    else
        ct.drawImage(gold_block_png, snake.body[i].x * 48, snake.body[i].y * 48, 48, 48);
    woman.x--;
    ct.drawImage(woman_png, woman.x * 48, woman.y * 48, 96, 192);
}

function WomanComingWithSnake() {
    woman.x++;
    ct.fillRect((woman.x - 1) * 48, woman.y * 48, 96, 192);
    ct.drawImage(woman_png, woman.x * 48, woman.y * 48, 96, 192);
    for (i = snake.body.length - 1; i >= 0; i--)
        if (i == 0)
            ct.drawImage(yellow_wool_png, snake.body[i].x * 48, snake.body[i].y * 48, 48, 48);
        else if (i == snake.body.length - 1)
        ct.drawImage(dirt_png, snake.body[i].x * 48, snake.body[i].y * 48, 48, 48);
    else
        ct.drawImage(gold_block_png, snake.body[i].x * 48, snake.body[i].y * 48, 48, 48);
    snake.body.unshift(new pos(snake.body[0].x + 1, snake.body[0].y));
    snake.body.pop();
    if (snake.body[snake.body.length - 1].x == 40) {
        clearInterval(t);
        alert("Поздравляю! Вы больше не девственик.");
        window.location.reload();
    }
}

function PutinComingToOil() {
    if (putin.x == oil.x + 2) {
        ct.fillRect(oil.x * 48, oil.y * 48, 48, 48);
        clearInterval(t);
        t = setInterval(PutinComingWithOil, 250);
    }
    ct.fillRect((putin.x - 1) * 48, putin.y * 48, 144, 192);
    putin.x--;
    ct.drawImage(putin_png, putin.x * 48, putin.y * 48, 96, 192);
    for (i = snake.body.length - 1; i >= 0; i--) {
        if (i == 0) {
            if (snake.status == "standart")
                ct.drawImage(yellow_wool_png, snake.body[i].x * 48, snake.body[i].y * 48, 48, 48);
            if (snake.status == "miner")
                ct.drawImage(orange_wool_png, snake.body[i].x * 48, snake.body[i].y * 48, 48, 48);
        } else if (i == snake.body.length - 1) {
            ct.drawImage(dirt_png, snake.body[i].x * 48, snake.body[i].y * 48, 48, 48);
        } else {
            if (snake.status == "standart")
                ct.drawImage(lime_wool_png, snake.body[i].x * 48, snake.body[i].y * 48, 48, 48);
            if (snake.status == "miner")
                ct.drawImage(blue_wool_png, snake.body[i].x * 48, snake.body[i].y * 48, 48, 48);
        }
    }
}

function PutinComingWithOil() {
    putin.x++;
    ct.fillRect((putin.x - 1) * 48, putin.y * 48, 192, 192);
    ct.drawImage(putin_png, putin.x * 48, putin.y * 48, 96, 192);
    oil.x = putin.x + 2;
    ct.drawImage(oil_png, 48 * oil.x, 48 * oil.y, 48, 48);
    for (i = snake.body.length - 1; i >= 0; i--) {
        if (i == 0) {
            if (snake.status == "standart")
                ct.drawImage(yellow_wool_png, snake.body[i].x * 48, snake.body[i].y * 48, 48, 48);
            if (snake.status == "miner")
                ct.drawImage(orange_wool_png, snake.body[i].x * 48, snake.body[i].y * 48, 48, 48);
        } else if (i == snake.body.length - 1) {
            ct.drawImage(dirt_png, snake.body[i].x * 48, snake.body[i].y * 48, 48, 48);
        } else {
            if (snake.status == "standart")
                ct.drawImage(lime_wool_png, snake.body[i].x * 48, snake.body[i].y * 48, 48, 48);
            if (snake.status == "miner")
                ct.drawImage(blue_wool_png, snake.body[i].x * 48, snake.body[i].y * 48, 48, 48);
        }
    }
    if (putin.x == 40) {
        clearInterval(t);
        alert("Поздравляю! Вы всё делали зря.");
        window.location.reload();
    }
}

function moveRect(e) {
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

function dead() {
    clearInterval(t);
    alert("Вы cдохли");
    window.location.reload();
}

addEventListener("keydown", moveRect);
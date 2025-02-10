const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const tileSize = 40;
const player = { x: 1, y: 1 };

// 地圖（0=空地, 1=牆, 2=敵人, 3=樓梯）
const map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 0, 2, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 1, 3, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

// 繪製地圖
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] === 1) {
                ctx.fillStyle = "gray"; // 牆壁
            } else if (map[y][x] === 2) {
                ctx.fillStyle = "red"; // 敵人
            } else if (map[y][x] === 3) {
                ctx.fillStyle = "blue"; // 樓梯
            } else {
                ctx.fillStyle = "white"; // 空地
            }
            ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
        }
    }
    // 畫玩家
    ctx.fillStyle = "green";
    ctx.fillRect(player.x * tileSize, player.y * tileSize, tileSize, tileSize);
}

// 處理鍵盤移動
document.addEventListener("keydown", (e) => {
    let newX = player.x;
    let newY = player.y;
    if (e.key === "ArrowUp") newY--;
    if (e.key === "ArrowDown") newY++;
    if (e.key === "ArrowLeft") newX--;
    if (e.key === "ArrowRight") newX++;
    
    // 檢查是否可以移動
    if (map[newY][newX] !== 1) {
        player.x = newX;
        player.y = newY;
    }

    drawGame();
});

drawGame();

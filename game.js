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
const player = {
    x: 1, y: 1,
    HP: 100,
    ATK: 10,
    DEF: 5
};

const enemies = {
    "2": { name: "小怪", HP: 30, ATK: 8, DEF: 3 } // 敵人類型
};
function fight(enemyType) {
    let enemy = { ...enemies[enemyType] }; // 取得敵人數據

    while (player.HP > 0 && enemy.HP > 0) {
        // 玩家攻擊敵人
        let playerDamage = Math.max(player.ATK - enemy.DEF, 0);
        enemy.HP -= playerDamage;

        if (enemy.HP <= 0) {
            alert(`你擊敗了 ${enemy.name}！`);
            return true; // 勝利
        }

        // 敵人反擊
        let enemyDamage = Math.max(enemy.ATK - player.DEF, 0);
        player.HP -= enemyDamage;

        if (player.HP <= 0) {
            alert("你被打敗了，遊戲結束！");
            location.reload(); // 重新加載遊戲
            return false; // 戰敗
        }
    }
}
document.addEventListener("keydown", (e) => {
    let newX = player.x;
    let newY = player.y;

    if (e.key === "ArrowUp") newY--;
    if (e.key === "ArrowDown") newY++;
    if (e.key === "ArrowLeft") newX--;
    if (e.key === "ArrowRight") newX++;

    let targetTile = map[newY][newX];

    if (targetTile === 1) return; // 碰到牆不能移動

    if (targetTile === 2) { // 碰到敵人
        let won = fight("2"); // 進行戰鬥
        if (won) {
            map[newY][newX] = 0; // 敵人消失
            player.x = newX;
            player.y = newY;
        }
    } else {
        player.x = newX;
        player.y = newY;
    }

    drawGame();
});

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

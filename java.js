document.addEventListener('DOMContentLoaded', () => {
// 캔버스와 컨텍스트
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// 이미지 로드
const paddleImage = new Image();//패들
paddleImage.src = "img/paddle.png";

const ballImage = new Image(); //공
ballImage.src = "img/earth.png";

// 벽돌 이미지 로드
const brickImagePaths = [
    "img/물.png",
    "img/깡통.png",
    "img/쓰레기.png",
    "img/우유.png",
    "img/칫솔.png",
    "img/종이.png"
];
const brickImages = [];
brickImagePaths.forEach((path) => {
    const img = new Image();
    img.src = path;
    brickImages.push(img);
});

const heartImage = new Image(); // 빨간색 하트
heartImage.src = "img/heart.png";

const blackHeartImage = new Image(); // 검은색 하트
blackHeartImage.src = "img/black_heart.png";

// 공과 패들 속성
const ballRadius = 30; //공의 크기 증가
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2; //공의 속도를 증가
let dy = -2; //공의 속도를 증가

const paddleWidth = 75; // 패들의 크기
const paddleHeight = 10;
let paddleX = (canvas.width - paddleWidth) / 2;

let rightPressed = false;
let leftPressed = false;
//점수와 생명 변수 추가
let score = 0;
let lives = 3;
let lifeStatus = [true, true, true]; // 생명 상태를 저장하는 배열

//일시정지 변수
let paused = false;

// 벽돌 속성
const brickRowCount = 3; // 벽돌의 행
const brickColumnCount = 7; // 벽돌의 열
const brickWidth = 75; // 벽돌의 너비
const brickHeight = 50; // 벽돌의 높이
const brickPadding = 5;
const brickOffsetTop = 20;
const brickOffsetLeft = 20;

// 벽돌 배열 초기화
const bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        const imageIndex = Math.floor(Math.random() * brickImages.length);
        bricks[c][r] = { x: 0, y: 0, status: 1, image: brickImages[imageIndex] };
    }
}

//이벤트 리스너 추가
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }
}

function mouseMoveHandler(e) {
    const relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
}
//공 그리기
function drawBall() {
    // ctx.beginPath();
    // ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    // ctx.fillStyle = "#0095DD";
    // ctx.fill();
    // ctx.closePath();
    ctx.drawImage(ballImage, x - ballRadius, y - ballRadius, ballRadius * 2, ballRadius * 2);
}

 // 패들 그리기 함수
 function drawPaddle() {
    // ctx.beginPath();
    // ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    // ctx.fillStyle = "#0095DD";
    // ctx.fill();
    // ctx.closePath();
    ctx.drawImage(paddleImage, paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
}

 // 벽돌 그리기 함수
 function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status === 1) {
                const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.drawImage(bricks[c][r].image, brickX, brickY, brickWidth, brickHeight);
                // ctx.beginPath();
                // ctx.rect(brickX, brickY, brickWidth, brickHeight);
                // ctx.fillStyle = "#0095DD";
                // ctx.fill();
                // ctx.closePath();
            }
        }
    }
}

 // 점수 그리기 함수
 function drawScore() {
    ctx.font = "16px DungGeunMo";
    ctx.fillStyle = "#0095DD";
    ctx.fillText(`Score: ${score}`, 8, 20);
}

// 생명 그리기 함수
function drawLives() {
    for (let i = 0; i < lives; i++) {
        const heartX = canvas.width - 100 + (i * 20);//위치 조정
        const heartY = 0;
        if (lifeStatus[i]) {
            ctx.drawImage(heartImage, heartX, heartY, 50, 50);//크기 조정
        } else {
            ctx.drawImage(blackHeartImage, heartX, heartY, 50, 50);//크기 조정
        }
    }
}


 // 충돌 감지 함수
 function collisionDetection() {
    // 공과 벽돌 감지
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            const b = bricks[c][r];
            if (b.status === 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0; // 벽돌 제거
                    score++; // 점수 증가
                    if (score === brickRowCount * brickColumnCount) {
                        displayWinMessage();
                        cancelAnimationFrame(requestId);
                    }
                }
            }
        }
    }

    // 공과 패들 감지
    if (x > paddleX && x < paddleX + paddleWidth && y + dy > canvas.height - paddleHeight) {
        dy = -dy; // 패들에 충돌하면 공을 위쪽으로 반사시킴
    }
}

 // 게임을 그리는 함수
 function draw() {
    if (paused) return; // 게임이 일시정지 상태라면 draw 함수를 종료

    ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스 초기화
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore(); // 점수 표시
    drawLives(); // 생명 표시
    collisionDetection();

    // 공의 벽 충돌 감지
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
        // 바닥에 닿았을 때
        if (x > paddleX && x < paddleX + paddleWidth) {
            // 패들에 닿았으면 공을 다시 반사
            dy = -dy;
        } else { // 패들에 닿지 않았으면 생명 감소 및 공을 초기 위치로 리셋
            lives--; // 생명 감소
            if (!lives) {
                displayGameOverMessage();
                cancelAnimationFrame(requestId);
            } else {
                x = canvas.width / 1;
                y = canvas.height - 20;
                dx = 2; // 공의 속도를 초기화
                dy = -2; // 공의 속도를 초기화
                paddleX = (canvas.width - paddleWidth) / 2;
            }
        }
    }

    x += dx;
    y += dy;

     // 패들 이동
     if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    requestId = requestAnimationFrame(draw); // 애니메이션 프레임을 통해 게임 루프 계속
}

let requestId;
function startGame() {
    paused = false;
    draw(); // 게임 루프 시작
}

function pauseGame() {
    paused = !paused;
    if (!paused) {
        draw(); // 게임이 다시 시작될 때 draw 함수 재호출
    }
}

function displayWinMessage() {
    const messageElement = document.getElementById("message");
    messageElement.textContent = "YOU WIN, CONGRATULATIONS!";
    messageElement.style.display = "block";
    setTimeout(() => {
        window.location.href = "2.html"; // 승리 메시지가 나타난 후 1초 후에 index 페이지로 이동
    }, 1000);
}

function displayGameOverMessage() {
    const messageElement = document.getElementById("message");
    messageElement.textContent = "GAME OVER";
    messageElement.style.display = "block";
    setTimeout(() => {
        location.reload(); // 게임 오버 메시지가 나타난 후 1초 후에 페이지 새로 고침
    }, 1000);
}

 // 시작 버튼 클릭 이벤트 핸들러
 document.getElementById("runButton").addEventListener("click", function () {
    startGame();
    this.disabled = true; // 게임 시작 후 버튼 비활성화
});

// 일시정지 버튼 클릭 이벤트 핸들러
document.getElementById("pauseButton").addEventListener("click", function () {
    pauseGame();
    this.textContent = paused ? "Resume game" : "Pause game"; // 버튼 텍스트 변경
});
});

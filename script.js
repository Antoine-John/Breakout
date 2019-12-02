//Canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//Ball
var radius = 6;
var speed = 5;
var angle = Math.PI/4;
var ball = new Ball(radius, speed, angle);
var deflectionAngle = 10/180*Math.PI;

//Bricks
var brickRowCount = 5;
var brickColumnCount = 9;
var brickOffsetTop = 15;
var brickPadding = 10;
var brickOffsetLeft = 17;
var brickWidth = 40;
var brickHeight = 15;
var bricks = [];
for (var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for (var r=0; r<brickRowCount; r++) {
        var brickX = c*(brickWidth+brickPadding) + brickOffsetLeft;
        var brickY = r*(brickHeight+brickPadding) +brickOffsetTop;
        bricks[c][r] = new Brick(brickX, brickY);
    }
}
var brick100 = new Image();
brick100.src = "./sprites/BrickHealth100.png";
var brick75 = new Image();
brick75.src = "./sprites/BrickHealth75.png";
var brick50 = new Image();
brick50.src = "./sprites/BrickHealth50.png";
var brick25 = new Image();
brick25.src = "./sprites/BrickHealth25.png";
var brickImages = [brick25, brick50, brick75, brick100];

//Paddle
var paddleHeight = 10;
var paddleWidth = 60;
var paddleYOffset = 0;
var paddle = {x:(canvas.width-paddleWidth)/2, y:canvas.height-paddleHeight-paddleYOffset};

//User Control
var rightPressed = false;
var leftPressed = false;
document.addEventListener("keydown", keyDownHandler,false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);
var score = 0;
var gameOver = 0;

function keyDownHandler(e) {
    if (gameOver) {
        document.location.reload();
    }
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddle.x = relativeX - paddleWidth/2;
    }
}

//Draw methods
function drawBricks() {
    for (var c=0; c<brickColumnCount; c++) {
        for (var r=0; r<brickRowCount; r++) {
            if (bricks[c][r].health != 0) {
                ctx.beginPath();
                ctx.rect(bricks[c][r].x, bricks[c][r].y, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
                ctx.drawImage(brickImages[bricks[c][r].health-1], 0, 0, 400, 400, bricks[c][r].x, bricks[c][r].y, 40, 40);
            }
        }
    }
}

function drawPaddle() {
    var paddleImage = new Image();
    paddleImage.src = "./sprites/Paddle.png";
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddleWidth, paddleHeight);
    ctx.fillStyle = "0095DD";
    ctx.fill();
    ctx.closePath;
    ctx.drawImage(paddleImage, 0, 0, 600, 600, paddle.x, paddle.y, paddleWidth, paddleWidth);
}

function drawBall() {
    var ballImage = new Image();
    ballImage.src = "./sprites/Ball.png";
    ctx.beginPath();
    ctx.arc(ball.pos.x, ball.pos.y, ball.rad, 0, Math.PI*2);
    ctx.fillStyle = ball.col;
    ctx.fill();
    ctx.closePath();
    ctx.drawImage(ballImage, 0, 0, 400, 400, ball.pos.x-ball.rad, ball.pos.y-ball.rad, ball.rad*2, ball.rad*2);
}
function drawScore() {
    ctx.font = "8px PressStart2P";
    ctx.fillStyle = "white";
    ctx.fillText("Score: "+score, 5, 12);
}


//Update
function bounceHor(){
    ball.vel.agl += 2*(Math.PI-ball.vel.agl);
}

function bounceVer(){
    ball.vel.agl = Math.PI - ball.vel.agl;
    if (ball.vel.agl < 0) {ball.vel.agl += Math.PI*2;}
}

function bounceBack() {
    bounceHor();
    bounceVer();
}

function updateBall() {
    //update ball position 
    var dx = Math.cos(ball.vel.agl)*ball.vel.spd;
    var dy = Math.sin(ball.vel.agl)*ball.vel.spd;
    if (ball.pos.y + dy <= ball.rad) {
        dy = -dy;
        bounceHor();
    }
    if (ball.pos.y + dy > canvas.height) {
        ctx.font = "12px PressStart2P";
        ctx.fillStyle = "white";
        ctx.textAlign = "center"; 
        ctx.fillText("Game over!", canvas.width/2, 160);
        ctx.fillText("Press any button to restart!", canvas.width/2, 190);
        gameOver = true;

    }
    if (ball.pos.x + dx <= ball.rad || ball.pos.x + dx + ball.rad >= canvas.width) {
        dx = -dx;
        bounceVer();
    }
    ball.pos.x += dx;
    ball.pos.y += dy;

}

function updatePaddle() {
    if (rightPressed) {
        paddle.x += 5;
        if (paddle.x + paddleWidth > canvas.width) {
            paddle.x = canvas.width - paddleWidth;
        }
    }
    if (leftPressed) {
        paddle.x -=5;
        if (paddle.x < 0) {
            paddle.x = 0;
        }
    }
}

function distance(x1,y1,x2,y2) {
    return Math.sqrt(Math.pow(x1-x2,2)+Math.pow(y2-y2,2));
}

function map(x, in_min, in_max, out_min, out_max) {
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function collisionDetection() {
    //Try Paddle Collision
    if (ball.pos.y + ball.rad > paddle.y && ball.vel.agl <= Math.PI) {
        if (ball.pos.x >= paddle.x && ball.pos.x <= paddle.x+paddleWidth) {
            bounceHor();
        } else if (distance(ball.pos.x, ball.pos.y, paddle.x, paddle.y) <= ball.rad) {
            if (ball.vel.agl >= 0 && ball.vel.agl <= Math.PI/2) {
                bounceBack();
                ball.vel.agl += map(Math.sin(getRelativeAngle(ball.vel.agl)), 0, 1, -Math.PI/4, Math.PI/4);
                console.log(ball.vel.agl);
                if (ball.vel.agl <= Math.PI) {
                     ball.vel.agl = Math.PI + 20/180*Math.PI;
                } else if (ball.vel.agl >= Math.PI*3/2) {
                    ball.vel.agl = Math.PI*3/2 - 20/180*Math.PI;
                }
            } else if (ball.vel.agl <= Math.PI) {
                ball.vel.agl -= deflectionAngle;
            } else {
                alert("error line 195");
            }
        } else if (distance(ball.pos.x, ball.pos.y, paddle.x + paddleWidth, paddle.y) <= ball.rad) {
            if (ball.vel.agl >= 0 && ball.vel.agl <= Math.PI/2) {
                ball.vel.agl += deflectionAngle;
            } else if (ball.vel.agl <= Math.PI) {
                console.log("here");
                bounceBack();
                ball.vel.agl += map(Math.cos(getRelativeAngle(ball.vel.agl)), 0, 1, -Math.PI/4, Math.PI/4);
                if (ball.vel.agl <= Math.PI*3/2) {
                    ball.vel.agl = Math.PI*3/2 + 20/180*Math.PI;
                } else if (ball.vel.agl >= Math.PI*2) {
                    ball.vel.agl = Math.PI*2 - 20/180*Math.PI;
                }
            } else {
                alert("error line 183");
            }
        } 
    } else {
    //Check Brick Collision
        for (var c=0; c<brickColumnCount; c++) {
            for (var r=0; r<brickRowCount; r++) {
                var b = bricks[c][r];
                if (b.health != 0) {
                    if (((ball.pos.y + ball.rad > b.y && ball.pos.y + ball.rad < b.y + brickHeight) || (ball.pos.y - ball.rad < b.y + brickHeight && ball.pos.y - ball.rad > b.y)) && ball.pos.x >= b.x && ball.pos.x <= b.x + brickWidth ) {
                        bounceHor();
                        b.health--;
                    } else if (((ball.pos.x + ball.rad > b.x && ball.pos.x + ball.rad < b.x + brickWidth) || (ball.pos.x - ball.rad < b.x + brickWidth && ball.pos.x - ball.rad > b.x)) && ball.pos.y >= b.y && ball.pos.y <= b.y + brickHeight ) {
                        bounceVer();
                        b.health--;
                    } else {
                        //get size of vector of center of ball to points on block and choose smallest distance
                        if (Math.sqrt(Math.pow(b.x-ball.pos.x, 2) + Math.pow(b.y-ball.pos.y, 2)) < ball.rad) {
                            //collision
                            if (ball.vel.agl >= 0 && ball.vel.agl <= Math.PI/2) {
                                bounceBack();
                            } else if (ball.vel.agl <= Math.PI) {
                                ball.vel.agl += deflectionAngle;
                            } else {
                                ball.vel.agl -= deflectionAngle;
                            }
                            b.health--;
                        } else if (Math.sqrt(Math.pow((b.x+brickWidth)-ball.pos.x, 2) + Math.pow(b.y-ball.pos.y, 2)) < ball.rad) {
                            //collision
                            console.log("here");
                            if (ball.vel.agl >= 0 && ball.vel.agl <= Math.PI/2) {
                                ball.vel.agl += deflectionAngle;
                            } else if (ball.vel.agl <= Math.PI) {
                                bounceBack();
                                console.log("2");
                            } else {
                                ball.vel.agl -= deflectionAngle;
                            }
                            b.health--;
                        } else if (Math.sqrt(Math.pow((b.x+brickWidth)-ball.pos.x, 2) + Math.pow((b.y+brickHeight)-ball.pos.y, 2)) < ball.rad) {
                            //collision
                            if (ball.vel.agl >= Math.PI/2 && ball.vel.agl <= Math.PI) {
                                ball.vel.agl += deflectionAngle;
                            } else if (ball.vel.agl <= Math.PI*3/2) {
                                bounceBack();
                            } else {
                                ball.vel.agl -= deflectionAngle;
                            }
                            b.health--;
                        } else if (Math.sqrt(Math.pow(b.x-ball.pos.x, 2) + Math.pow((b.y+brickHeight)-ball.pos.y, 2)) < ball.rad) {
                            //collision
                            if (ball.vel.agl >= 0 && ball.vel.agl <= Math.PI/2) {
                                ball.vel.agl += deflectionAngle;
                            } else if (ball.vel.agl <= Math.PI*3/2) {
                                ball.vel.agl -= deflectionAngle;
                            } else {
                                bounceBack();
                            }
                            b.health--;
                        }
                    }
                    if (b.health == 0) {
                        score++;
                    }
                }
            }
        }
    }
}

function getRelativeAngle(angle) {
    if (angle-Math.PI/2 < 0) {
        return angle;
    }
    else {
        return getRelativeAngle(angle-Math.PI/2);
    }
}

function main() {
    if (!gameOver) {
        ctx.clearRect(0,0,canvas.width, canvas.height);
        drawBall();
        drawBricks();
        drawPaddle();
        drawScore();
        if(score == brickRowCount*brickColumnCount) {
            ctx.font = "12px PressStart2P";
            ctx.fillStyle = "white";
            ctx.textAlign = "center"; 
            ctx.fillText("You win!", canvas.width/2, 160);
            ctx.fillText("Press any button to play again!", canvas.width/2, 190);
            gameOver = true;
        }
        collisionDetection();
        //updateBall();
        updatePaddle();
        updateBall();
    } else {

    }
    requestAnimationFrame(main);
}

main();

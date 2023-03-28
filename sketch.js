const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var canvas;
var palyer, playerBase, playerArcher;
var playerArrows = [];
var board1, board2, board3;
var numberOfArrows = 10;
var enemies = [];

var score = 0;
var timer = 1;

function preload() {
  backgroundImg = loadImage("./PNG/2_game_background/2_game_background.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  engine = Engine.create();
  world = engine.world;

  playerBase = new PlayerBase(300, 500, 200, 100);
  player = new Player(285, playerBase.body.position.y - 100, 50, 180);
  playerArcher = new PlayerArcher(
    340,
    playerBase.body.position.y - 180,
    20,
    120
  );
/* board1 = new Board(width - 200, 400, 100, 50,"polvo.png");
  board2 = new Board(width - 550, height - 200, 100, 50,"Idle.png");
  board3 = new Board(width - 300, 200, 100, 50, "Idle.png" );
  board4 = new Board(width -100, 600, 100, 50, "polvo.png" );
  board1.posX = -20;*/
}
function generateBoard() {
  for (let i = 0; i < 5; i++) {
    enemies.push(
      new Board( 
        floor(random(600, width )),
        floor(random(20, height -20)),
        100,50,"Idle.png"
      )
    );
  }
}

function draw() {
  background( backgroundImg);
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].display();
  }

 if (frameCount % 300 == 0 && timer > 0) {
  timer--;
  if (timer == 0) {
    generateBoard();
    timer = 1;
  }
}
  Engine.update(engine);

  playerBase.display();
  player.display();
  playerArcher.display(); 

 /* board1.display();
  board2.display();
  board3.display();
  board4.display();
  */

  for (var i = 0; i < playerArrows.length; i++) {
    for (var j = 0; j < enemies.length; j++) {
      if (playerArrows[i] !== undefined) {
      playerArrows[i].display();

      var boardCollision = Matter.SAT.collides(
        enemies[j].body,
        playerArrows[i].body
      );

/*
      var board2Collision = Matter.SAT.collides(
        board2.body,
        playerArrows[i].body
      );

       var board3Collision = Matter.SAT.collides(
        board3.body,
        playerArrows[i].body
      );

      var board4Collision = Matter.SAT.collides(
        board4.body,
        playerArrows[i].body
      )
      

      

      if (board1Collision.collided || board2Collision.collided || board3Collision.collided ||  board4Collision.collided ) {
        score += 5;
        board.destroy()
      }
      */
      if (boardCollision.collided ) {
        score += 5;
        //enemies[j].removes(j);
      }
      

      
      var posX = playerArrows[i].body.position.x;
      var posY = playerArrows[i].body.position.y;

      if (posX > width || posY > height) {
        if (!playerArrows[i].isRemoved) {
          playerArrows[i].remove(i);
        } else {
          playerArrows[i].trajectory = [];
        }
      }
    }
  }
}

  // Título
  fill("#FFFF");
  textAlign("center");
  textSize(40);
  text("PECARIA ÉPICA", width / 2, 100);

  // Contagem de Flechas
  fill("#FFFF");
  textAlign("center");
  textSize(30);
  text("iscas restantes: " + numberOfArrows, 200, 100);
  
  // Pontuação
  fill("#FFFF");
  textAlign("center");
  textSize(30);
  text("Pontuação: " + score, width - 200, 100);

 

  if (numberOfArrows == 0) {
    gameOver();
  }

 
}

function keyPressed() {
  if (keyCode === 32) {
    if (numberOfArrows > 0) {
      var posX = playerArcher.body.position.x;
      var posY = playerArcher.body.position.y;
      var angle = playerArcher.body.angle;

      var arrow = new PlayerArrow(posX, posY, 100, 10, angle,"Fisherman_idle.png");

      arrow.trajectory = [];
      Matter.Body.setAngle(arrow.body, angle);
      playerArrows.push(arrow);
      numberOfArrows -= 1;
    }
  }
}

function keyReleased() {
  if (keyCode === 32) {
    if (playerArrows.length) {
      var angle = playerArcher.body.angle;
      playerArrows[playerArrows.length - 1].shoot(angle);
    }
  }
}

function gameOver() {
  swal(
    {
     title: `Fim de Jogo!!!`,
      text: "Obrigado por jogar!!",
      imageUrl:
        "https://raw.githubusercontent.com/vishalgaddam873/PiratesInvision/main/assets/board.png",
      imageSize: "150x150",
      confirmButtonText: "Jogar Novamente"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}



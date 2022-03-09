var PLAY = 1;
var END = 0;
var gameState = PLAY;
var obstacle
var score;
var gameOverImg,restartImg

function preload()
{
  playerImg = loadImage("player_running_image.gif")
  groundImage = loadImage("ground2.png");
  obstacleImg = loadImage("coin_image.png")
  restartImg = loadImage("kindpng_3833748.png")
  gameoverImg = loadImage("gameover.png")
  backgroundImg = loadImage("2d-video-game-bk-effect.3gif.gif")
}

function setup() 
{
  createCanvas(600, 200);
  background = createSprite(600,200)
  background.addImage(backgroundImg)
 
  player = createSprite(50,160,20,50);
  player.addImage(playerImg)
  player.scale = 0.5;
  
  gameover = createSprite(300,100);
  gameover.addImage(gameoverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
 
  gameover.scale = 0.5;
  restart.scale = 0.5;
  
  obstaclesGroup = createGroup();

  player.setCollider("rectangle",0,0,player.width,player.height);
  player.debug = true
  
  score = 0;
}

function draw() 
{
  background(200)
  text("Score: "+ score, 500,50);
  
  if(gameState === PLAY){

    gameover.visible = false;
    restart.visible = false;

    score = score + Math.round(getFrameRate()/60);

    if(keyDown("space")&& player.y >= 100) 
    {
        player.velocityY = -12;
    }
    
    player.velocityY = player.velocityY + 0.8
    
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(player)){
        gameState = END;
      
    }
  }
   else if (gameState === END) 
   {
      gameover.visible = true;
      restart.visible = true;

      player.velocityY = 0
      
    obstaclesGroup.setLifetimeEach(-1);
    obstaclesGroup.setVelocityXEach(0);
   }
  
   
  if(mousePressedOver(restart)) {
      reset();
    }

  drawSprites();
}

function reset()
{
  gameState = PLAY;
  gameover.visible = false;
  restart.visible = false;
  obstaclesGroup.destroyEach();
  score = 0
}

function spawnObstacles()
{
 if (frameCount % 60 === 0)
 {
   var obstacle = createSprite(600,165,10,40);
   obstacle.velocityX = -(6 + score/100);
   obstacle.addImage(obstacleImg)
  }
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
    obstaclesGroup.add(obstacle);
}

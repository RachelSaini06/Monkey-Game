var PLAY = 1;
var END = 0;
var gameState;


var monkey , monkey_running, ground
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup, bananaGroup
var score
var survivalTime;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600, 400);
  
  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = 4;
  ground.x = ground.width/2;
  //console.log(ground.x);
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
  score = 0;
  survivalTime = 0;
  
  gameState = PLAY;
}


function draw() {
  background("#87ceeb");
  
  if (gameState === PLAY){
    
    monkey.collide(ground);
    
    food();
    obstacles();

    if (keyDown("space") && monkey.y >= 150){
      monkey.velocityY = -10;
    }

    monkey.velocityY = monkey.velocityY + 0.5;


    if (ground.x > 400){
      ground.x = ground.width / 2;
    }
    
    if (bananaGroup.isTouching(monkey)){
      bananaGroup.destroyEach();
      score = score + 1;
    }

    stroke("black");
    textSize(20);
    fill("black");
    survivalTime = Math.ceil(frameCount/frameRate());
    text("Survival Time: " + survivalTime, 20, 50);
    
    if (obstacleGroup.isTouching(monkey)){
      gameState = END;
    }
  }
  
  if (gameState === END){
    monkey.velocityX = 0;
    monkey.destroy();
    
    ground.velocityX = 0;
    ground.destroy();
    
    banana.velocityX = 0;
    bananaGroup.destroyEach();
    
    obstacle.velocityX = 0;
    obstacleGroup.destroyEach();
    
    //survivalTime.stop();
    
    stroke("black")
    textSize(20);
    fill("black");
    text("Game Over", 260, 200);
    
    text("Survival Time: " + survivalTime, 20, 50);
  }
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score, 500, 50);
  
  drawSprites();
}


function food(){
  if (frameCount % 190 === 0){
    banana = createSprite(600, 400);
    banana.y = Math.round(random(150, 300));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -5;
    banana.lifetime = -120;
    bananaGroup.add(banana);
  }
}


function obstacles(){
  if (frameCount % 300 === 0){
    obstacle = createSprite(600, 335);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -5;
    obstacle.lifetime = -120;
    obstacleGroup.add(obstacle);
  }
}

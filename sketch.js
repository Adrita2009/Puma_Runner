var puma, pumaRun, aliens, alien1, alien2, alien3, alien4, alien5, alien6, alien7, alienGroup, ground, groundImg, invisibleGround, cloud, cloudGroup, cloudImg
var PLAY = 1
var END = 0
var gameState = PLAY
var pumaPause, pumaPauseAni
var gameOver, gameOverImg, restart, restartImg
var jumpSound , checkPointSound, dieSound
var score
var coins, coinsAni, coinGroup
var alienNo, alienNoAni
var alienScore = 0
var sky, cloudImg, ground02Img, ground02
var ary = [];


function preload() {
  pumaRun = loadAnimation("Puma1.png","Puma2.png","Puma3.png","Puma4.png","Puma5.png","Puma6.png","Puma7.png","Puma8.png")

  alien1 = loadImage("Obstacle1.PNG")
  alien2 = loadImage("Obstacle2.PNG")
  alien3 = loadImage("Obstacle3.PNG")
  alien4 = loadImage("Obstacle4.PNG")
  alien5 = loadImage("Obstacle5.PNG")
  alien6 = loadImage("Obstacle6.PNG")
  alien7 = loadImage("Obstacle7.PNG")
  groundImg = loadImage("ground2 copy.png");

  cloudImg = loadImage("cloud copy.png")

  pumaPauseAni = loadAnimation("Puma8.png","Puma8.png");

  restartImg = loadImage("restart copy.png")
  gameOverImg = loadImage("gameOver copy.png")

  jumpSound = loadSound("jump copy.mp3")
  checkPointSound = loadSound("checkpoint copy.mp3")
  dieSound = loadSound("die copy.mp3")

  coinsAni = loadAnimation("coin1.png", "coin2.png", "coin3.png", "coin4.png", "coin5.png", "coin6.png")

  alienNoAni = loadAnimation("Obstacle1.PNG","Obstacle2.PNG", "Obstacle3.PNG", "Obstacle4.PNG", "Obstacle5.PNG", "Obstacle6.PNG", "Obstacle7.PNG")

  sky = loadImage("sky.png")
  ground02Img = loadImage("ground02.png")
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  puma = createSprite(windowWidth-1100, windowHeight-93, 50, 50);
  puma.addAnimation("running", pumaRun);
  puma.scale = 0.6

  pumaPause = createSprite(windowWidth-1100, windowHeight-145, 50, 500)
  pumaPause.addAnimation("pause", pumaPauseAni)
  pumaPause.scale = 0.6
  pumaPause.visible = false
  
  alienNo = createSprite(windowWidth-300,windowHeight-655,20,20);
  alienNo.addAnimation("alien", alienNoAni)
  alienNo.scale = 0.4
  
  ground = createSprite(100,350,1500,10)
  ground.addImage(groundImg)
  ground.visible = false

  invisibleGround = createSprite(100,windowHeight-93,1500,10)
  invisibleGround.visible = false

  puma.setCollider("rectangle",0,0,puma.width,puma.height);

  gameOver = createSprite(windowWidth/2,(windowHeight/2) - 100,100,20)
  gameOver.addImage(gameOverImg)
  gameOver.scale = 1.5
  gameOver.visible = false

  restart = createSprite(windowWidth/2,(windowHeight/2) - 30,100,20)
  restart.addImage(restartImg)
  restart.scale = 0.8
  restart.visible = false

  ground02 = createSprite(windowWidth - 300,windowHeight-25,1500,10);
  ground02.addImage(ground02Img)

  score = 0


  alienGroup = createGroup();
  cloudGroup = createGroup();
  coinGroup = createGroup();

}


function draw() {
  background(sky);  

  textSize(24)
  text("Score: "+ score, windowWidth-200,windowHeight-650);
  text(alienScore, windowWidth-270,windowHeight-650)
  
  if (gameState === PLAY) {
   if(ary.length > 0 || keyDown("space") && puma.y >= windowHeight-160) {
    puma.velocityY = -15
    jumpSound.play();
    ary = [];
  }
  
  score = score + Math.round(getFrameRate()/60);

  alienGroup.lifetime = 300


  if (ground02.x < 0){
    ground02.x = ground02.width/2;
  }

  if(alienGroup.x > puma.x) {
    alienScore = alienScore +1
  }

  spawnAliens();
  ground02.velocityX = -15

  if (score%200 === 0 && score > 0) {
    checkPointSound.play();
    ground02.velocityX = ground02.velocityX + 2
  }

  if (puma.isTouching(alienGroup)) {
    dieSound.play();
    gameState = END;
  }
}

  puma.velocityY = puma.velocityY +0.8


  puma.collide(invisibleGround)




  if (gameState === END) {
    alienGroup.setVelocityXEach(0)
    pumaPause.visible = true
    puma.visible = false
    ground02.velocityX = 0
    restart.visible = true
    gameOver.visible = true
    reset(); 
  }

  



  drawSprites();

  
  


}

function reset() {
  if(mousePressedOver(restart)) {
    alienGroup.destroyEach();
    gameOver.visible = false
    restart.visible = false
    alienScore = 0
    score =0
    puma.visible = true
    pumaPause.visible = false
    gameState = PLAY;
  }
}

function spawnClouds() {
  var clouds = createSprite(600,120,40,10)
}



function spawnAliens() {
 if(frameCount%60 === 0) {
    aliens = createSprite(windowWidth+5,windowHeight-135,50,100)
    aliens.velocityX = -15
    aliens.scale=0.4
    alienScore = alienScore+1
    
    var rand = Math.round(random(1,7)) 
  
    switch (rand) {
      case 1: aliens.addImage(alien1);
              break;
      case 2: aliens.addImage(alien2);
              break;
      case 3: aliens.addImage(alien3);
              break;
      case 4: aliens.addImage(alien4);
              break;
      case 5: aliens.addImage(alien5);
              break;
      case 6: aliens.addImage(alien6);
              break;
      case 7: aliens.addImage(alien7);
             break;
      default: break;
  }


  aliens.setCollider("rectangle",0,0,50,100);
  alienGroup.add(aliens);

 }
}

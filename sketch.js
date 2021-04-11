var PLAY = 1
var END = 0
var gameState = PLAY
var bg, bgImg
var guardian, guardianR, guardianL
var asteroidImg, ufoImg, spaceTrashImg, blackHoleImg
var ufo, ufoGroup
var asteroid, asteroidGroup
var blackHole, blackHoleGroup
var trash, trashGroup
var side
var laser
var score



function preload(){
  bgImg = loadImage("Images/Space.jpg")
  guardianR = loadImage("Images/Guardian_of_the_galaxyR.png")
  guardianL = loadImage("Images/Guardian_of_the_galaxyL.png")
  spaceTrashImg = loadImage("Images/Scrap_Metal.png")
  blackHoleImg = loadImage("Images/Black_hole.png")
  ufoImg = loadImage("Images/Ufo.png")
  asteroidImg = loadImage("Images/Asteroid.png")
  
}

function setup() {
  createCanvas(800,1200)
  bg = createSprite(500,400)
  bg.addImage(bgImg)
  bg.y = bg.height/2
  bg.scale = 1.8
  bg.velocityY = 1

  guardian = createSprite(400,1000)
  guardian.addImage(guardianR)
  guardian.scale = 0.8

  side = "right"

  ufoGroup = new Group();
  asteroidGroup = new Group();
  trashGroup = new Group();
  blackHoleGroup = new Group();

  score = 0;

}

function draw() {
background(0);

if(ufoGroup.isTouching(guardian)){
  gameState = END;
}
if(blackHoleGroup.isTouching(guardian)){
  gameState = END;
}
if(trashGroup.isTouching(guardian)){
  gameState = END;
}
if(asteroidGroup.isTouching(guardian)){
  gameState = END;
}

if(gameState === PLAY){
if(bg.y>800){
bg.y = bg.height/2
}

score = score + Math.round(getFrameRate()/60);

if(keyDown("left") && guardian.x > 100){
  guardian.x = guardian.x - 10
  guardian.addImage(guardianL)
  side = "left"
}

if(keyDown("right") && guardian.x < 700){
  guardian.x = guardian.x + 10
  guardian.addImage(guardianR)
  side = "right"
}

if(keyDown("up") && guardian.y > 100){
  guardian.y = guardian.y - 10
  if(side === "right"){
  guardian.addImage(guardianR)
  }
  if(side === "left"){
    guardian.addImage(guardianL)
  }
}

if(keyDown("down") && guardian.y < 1100){
  guardian.y = guardian.y + 10
  if(side === "right"){
    guardian.addImage(guardianR)
  }
  if(side === "left"){
    guardian.addImage(guardianL)
  }
}

guardian.scale = 0.5;


spawnUfo()
spawnAsteroid()
spawnBlackHole()
spawnTrash()

drawSprites()

if(keyWentDown("space")){
  console.log(guardian.y)
  if(side === "left"){
  //strokeWeight(5)
  //stroke("red")
  //line(guardian.x-30,guardian.y-80, guardian.x-30, 0)
  laser = createSprite(guardian.x-30,0, 5, guardian.y*2-80)
  laser.shapeColor = "red"
  console.log(laser.height)
  }

  if(side === "right"){
    //strokeWeight(5)
    //stroke("red")
    //line(guardian.x+30,guardian.y-80, guardian.x+30, 0)
    laser = createSprite(guardian.x+30,0, 5, guardian.y*2-80)
    laser.shapeColor = "red"
    }
}

  if(keyWentUp("space")){
    laser.destroy()
  }

}

  if(gameState === END){
    ufoGroup.setVelocityYEach(0);
    ufoGroup.setLifetimeEach(-1);

    asteroidGroup.setVelocityYEach(0);
    asteroidGroup.setLifetimeEach(-1);

    trashGroup.setVelocityYEach(0);
    trashGroup.setLifetimeEach(-1);

    blackHoleGroup.setVelocityYEach(0);
    blackHoleGroup.setLifetimeEach(-1);

    textSize(50)
    fill(255)
    text("Game Over",300,600)
  }
  fill("green");
  textSize(24);
  text("Score: " + score, 600,100)

}



function spawnUfo(){
  if(frameCount% 320 === 0){
    ufo=createSprite(Math.round(random(100,700)),0)
    ufo.addImage(ufoImg)
    ufo.scale = 0.6
    ufo.velocityY = (3 + 3*score/100)
    ufo.lifetime = 500
    ufoGroup.add(ufo);
  }
}

function spawnAsteroid(){
  if(frameCount% 130 === 0){
    asteroid=createSprite(Math.round(random(100,700)),0)
    asteroid.addImage(asteroidImg)
    asteroid.scale = 0.5
    asteroid.velocityY = (3 + 3*score/200)
    asteroid.lifetime = 500
    asteroidGroup.add(asteroid);
  }
}

function spawnTrash(){
  if(frameCount% 90 === 0){
    trash=createSprite(Math.round(random(100,700)),0)
    trash.addImage(spaceTrashImg)
    trash.scale = 0.45
    trash.velocityY = (3 + 3*score/200)
    trash.lifetime = 500
    trashGroup.add(trash);
  }
}

function spawnBlackHole(){
  if(frameCount% 230 === 0){
    blackHole=createSprite(Math.round(random(100,700)),0)
    blackHole.addImage(blackHoleImg)
    blackHole.scale = 0.6
    blackHole.velocityY = (3 + 3*score/200)
    blackHole.lifetime = 500
    blackHoleGroup.add(blackHole);
  }
}
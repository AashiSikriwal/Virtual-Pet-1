//Create variables here
var dog,happyDog,database, foodS, foodStock;
var dogSprite,ground;



function preload()
{
  //load images here
  dog=loadImage("images/dogImg1.png");
  happyDog=loadImage("images/dogImg.png")
}

function setup() {
  database=firebase.database();
  createCanvas(500,500);
   rectMode(CENTER);
   ground=createSprite(width/2, height-30, width,70);
   ground.shapeColor=color("lightgreen")
   
   
  dogSprite=createSprite(250,390,30,30);
  dogSprite.addImage(dog);
  dogSprite.scale=0.2

  
var foodStock=database.ref('Food');
foodStock.on("value",readStock);

 
  
}


function draw() {  
  background("#00b0ff")
  textSize(20);
  stroke("black")
  text("PRESS UP_ARROW TO FEED DRAGO MILK",50 ,20);
  

if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dogSprite.addImage(happyDog)
}



  drawSprites();
  //add styles here

}
function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1
  }
  text("FOOD REMAINING: "+x,150,100)
  database.ref('/').update({
    Food:x
  })
  
}


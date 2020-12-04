var database , dog , dogImage ,happyDog, foodStock , foods;
var food;
var foodS = 20;

function preload(){
  dogImage = loadImage("images/dogImg.png")
  happyDog = loadImage("images/dogImg1.png")
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  dog = createSprite(250,340,30,30)
  dog.addImage(dogImage);
  dog.scale = 0.2;
  var foodStock = database.ref('food')
  foodStock.on("value",readStock)
}


function draw() {  
  background(46,138,87);
  textSize(20);
  fill("white")
  text("Press Up Arrow To Feed The Dog",100,70)
  text("Food Remaining :"+foodS,180,200)

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
    foodS = foodS-1;
    if(foodS < 0){
      foodS = 0;
    }
  }else{
    dog.addImage(dogImage);
  }


  drawSprites();
}

function readStock(data) {
  food = data.val();
}

function writeStock(x){
  if(x<1){
    x=0
  }else{
    x=x-1;
  }
  database.ref('/').set({
    Food : x
  })
}





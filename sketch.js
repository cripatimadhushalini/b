var dog,sadDog,happyDog;
var database;
var fedTime,FeedTime,lastfed, feed, foodObj,foodS;

function preload(){
  bg = loadImage("Images/background.jpg");
  sadDog = loadImage("Images/dog.png");
  happyDog = loadImage("Images/happy dog.png");
}

function setup(){
  database = firebase.database();
  createCanvas(1000,400);

  dog = createSprite(800,200,100,100);
  dog.addImage(sadDog);
  dog.scale = 0.15;
  
  foodObj = new Food();

  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
  lastfed = data.val();
  });

  feed = createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog)

  addfood = createButton("Add Food");
  addfood.position(800,95);
  addfood.mousePressed(addFoods);
  
}

function draw(){
  background(bg);

  fill(255,255,254);
  textSize(15);
  foodObj.display();
  
  if(lastfed>=12){
    text("LastFeed : " + lastfed%12+ " Pm",350,30)
  }else if(lastfed==0){
    text("LastFeed : 12 Am",350,30)
  }else{
    text("LastFeed : " + lastfed + " Am",350,30);
  }

  drawSprites();
}

function addFoods(){
  foodS++
  database.ref('/').update({
    Food:foodS
  })
}

function feedDog(){
  dog.addImage(happyDog);
  foodObj.updatefoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
  Food:foodObj.getFoodStock(),
  FeedTime:hour()
  })
}
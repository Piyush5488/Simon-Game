var userClickedPattern = [];
var gamePattern = [];
var level = 0;
var started = 0;
var buttonColor = ["red", "blue", "green", "yellow"];
var countClick = -1;

$(".btn").click(function(){

  countClick++;
  var temp = $(this).attr("id");
  $("#"+temp).fadeOut("fast").fadeIn("fast");
  userClickedPattern.push(temp);
  animatePress(temp);
  playSound(temp);
  checkAnswer(countClick);
  if(userClickedPattern.length === level && userClickedPattern.length !=0){
    setTimeout(function(){
      nextSequence();
    },1000);
  }
});



$(document).on("keypress",function(){
  if (started === 0){
    $("h1").text("Level 0")
    nextSequence();
  }
  started = 1;
})


function nextSequence(){

  var randomNumber = Math.floor((Math.random()*4));
  level++;
  $("h1").text("Level "+level);
  var randomChosenColor = buttonColor[randomNumber];

  gamePattern.push(randomChosenColor);

  $("#"+randomChosenColor).fadeOut("fast").fadeIn("fast");
  playSound(randomChosenColor);
  userClickedPattern=[];
  countClick=-1;
}

function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  },50);
}

function checkAnswer(currentlevel){

  if(gamePattern[currentlevel] === userClickedPattern[currentlevel]){
    console.log("Correct");
  }
  else{
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    playSound("wrong");
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }

}

function startOver(){
  gamePattern = [];
  userClickedPattern = [];
  countClick = -1;
  level = 0;
  started = 0;
}

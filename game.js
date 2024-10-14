
var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userPattern = [];

var level = 0;

var started = false;

$(document).keypress(function () {
    if(started === false){
    nextSequence();
    started = true;
    $("h1").text("Level " + (level));
    }
})


function nextSequence() {

    level++

    $("h1").text("Level " + (level));

    var randomNumber = Math.floor(Math.random()*4);

    var randomChoosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChoosenColor);

    $("#" + randomChoosenColor).fadeOut(150).fadeIn(150);

    playSound(randomChoosenColor);

    
    
}

$(".btn").click(function (event) {

    var userChoosenColor = $(this).attr("id");
    
    userPattern.push(userChoosenColor);

    playSound(userChoosenColor);

    animatePress(userChoosenColor);

    checkAnswer(userPattern.length-1);
    
})


function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}


function animatePress (currentColor){
        $("." + currentColor).addClass("pressed");

        setTimeout(function(){
            $("." + currentColor).removeClass("pressed");
        }, 100);
}


function checkAnswer (currentLevel) {
    if( gamePattern[currentLevel]===userPattern[currentLevel]){
        console.log("success");

        if(gamePattern.length === userPattern.length){
        setTimeout(nextSequence, 1000);
        userPattern = [];
    }
    }else{
        console.log("wrong");
        playSound("wrong");

        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}


function startOver() {

    gamePattern = [];

    userPattern = [];

    level = 0;

    started = false;
}

var userClickedPattern = []
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"]; 
function nextSequence() {
    userClickedPattern = [];
    level++ ;
    $('#level-title').text("Level " + level );
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber]; 
    gamePattern.push(randomChosenColour);
    // $('#'+randomChosenColour).animate({opacity: 0.5}, 45).animate({opacity: 1}, 45);
    $('#'+randomChosenColour).fadeIn(45).fadeOut(45).fadeIn(45);
    
    // var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    // audio.play();
    // console.log(gamePattern);
    playSound(randomChosenColour);

}



$(".btn").click(function (){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length -1 );
});

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    return audio.play();
}

function animatePress(currentColor) {
    $('#' + currentColor).addClass("pressed");
    setTimeout(function (){
        $('#' + currentColor).removeClass("pressed");
    }, 45);
}

var ready = false;
var level = 0;


$(document).on("keypress", function () {
    if (!ready) {
        $('#level-title').text("Level "+ level);
        nextSequence(); 
        ready = true;
    }
        // console.log(ready);
    });
$(document).on("touchstart", function () {
    if (!ready) {
        $('#level-title').text("Level "+ level);
        nextSequence(); 
        ready = true;
    }
        // console.log(ready);
    });
  

// step 8
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        // console.log(gamePattern[currentLevel] + ' ' + userClickedPattern[currentLevel]);
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
               }, 1000); 
        }

    } else {
        console.log("wrong");
        playSound("wrong");
        $('body').addClass("game-over");
        setTimeout(function (){
            $('body').removeClass("game-over");
        }, 200);
        $('#level-title').text("Game Over! Press Any Key to Restart");
        startOver();
    }
}
    
// console.log(userClickedPattern);
// console.log(gamePattern);

function startOver() {
    level = 0;
    gamePattern = [];
    ready = false;
}

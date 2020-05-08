let soundPath = ["sounds/red.mp3", "sounds/blue.mp3", "sounds/green.mp3", "sounds/yellow.mp3", "sounds/wrong.mp3"];
let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userPattern = [];

let count = userPattern.length;
let c = 0;
let score = 0;
let start = false;

function nextSequence() {
    let low = 0;
    let high = 3;

    let randomNumber = Math.floor(Math.random() * (high+1)) + low;

    return randomNumber;
}

function nextColor() {
    let randomChosenColor = buttonColors[nextSequence()];
    // console.log(randomChosenColor);
    gamePattern.push(randomChosenColor);
    console.log(gamePattern);
    let index = buttonColors.indexOf(randomChosenColor);

    return index;
}

function pressButton(index) {
    let press = buttonColors[index];
    $("#" + press).addClass("pressed");
    $("#" + press).fadeOut(100).fadeIn(100);
    var sound = new Audio(soundPath[index]);
    sound.play();
    setTimeout(function() {
        $("#" + press).removeClass("pressed");
    },100);
}

function pressNextButton() {
    $("#level-title").html("Level " + eval(score+1));
    let index = nextColor();
    pressButton(index);
}

//game start from here
$(document).keypress(function(event) {
    start = true;
    if(gamePattern.length == 0)
        pressNextButton();
    else {
        let k = event.key;

        switch(k) {
            case 'y':
                pressButton(buttonColors.indexOf("yellow"));
                checkColor("yellow");
                break;
            case 'g':
                pressButton(buttonColors.indexOf("green"));
                checkColor("green");
                break;
            case 'b':
                pressButton(buttonColors.indexOf("blue"));
                checkColor("blue");
                break;
            case 'r':
                pressButton(buttonColors.indexOf("red"));
                checkColor("red");
                break;
            default:
                alert("Ohh..You bymistakenly pressed a wrong button. Please read the Instruction and Try again. All the best!!!");
                $("p").addClass("instruction");
                setTimeout(function() {
                    $("p").removeClass("instruction");
                }, 1000);
                break;
        }
    }
});

function checkColor(color) {
    if(color == gamePattern[c]) {
        if(c == gamePattern.length-1) {
            c = 0;
            ++score;
            $(".score").html(score);
            setTimeout(pressNextButton, 1000);
        }
        else c++;
        console.log(c);
    }
    else {
        endGame();
        alert("Ohh..U Missed it.... The color was: " + gamePattern[c] + " not " + color);
    }
}

$(".btn").click(function(){
    if(start) {
        let color = $(this).attr("id");
        userPattern.push(color);
        pressButton(buttonColors.indexOf(color));
        console.log(color);
        checkColor(color);
    }
});

function endGame() {
    // $("body").css("background-color", "red");
    let sound = new Audio(soundPath[soundPath.length - 1]);
        sound.play();
        // setTimeout(function() {$("body").css("background-color", "#011F3F"); }, 100);
        $("#level-title").addClass("game-over");
        $("#level-title").html("Game Over. Press any key to restart the game.");
        // $(".btn").off("click");
        gamePattern = [];
        gamePattern.length = score = 0;
        start = false;
}

function checkPattern() {
    let status = true;
    for(var i=0; i<gamePattern.length; i++) {
        console.log(userPattern[i] + " " + gamePattern[i]);

        if(userPattern[i] != gamePattern[i]) {
            status = false;
            break;
        }
    }
    console.log(status);
    if(status == true) {
        userPattern = [];
        count = 0;
        pressNextButton();
    } else {
        let sound = new Audio(soundPath[soundPath.length - 1]);
        sound.play();
        $("#level-title").addClass("game-over");
        $("#level-title").html("Game Over");
    }
}



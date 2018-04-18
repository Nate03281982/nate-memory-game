// JavaScript source code variables
var gameArray = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
var arrayValues = [];
var carIds = [];
var cardsClicked = 0;
var totalMoves = 0;
var totalSeconds = 0;
var timerVar;

newgameBoard();

// Shuffle function from http://stackoverflow.com/a/2450976

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//reset
function reset() {
    clearInterval(timerVar);
    totalSeconds = 0;
    document.getElementById("timer").innerHTML = "0";

    totalMoves = 0;
    document.getElementById("moveCounter").innerText = "0";

    document.querySelectorAll('.star-list li').forEach(function(star, index){
        star.innerText = `*${index + 1}`
        // console.log(star);
    })


    newgameBoard();
}

//timer
function countTimer() {
    ++totalSeconds;
    var hour = Math.floor(totalSeconds / 3600);
    var minute = Math.floor((totalSeconds - hour * 3600) / 60);
    var seconds = totalSeconds - (hour * 3600 + minute * 60);

    document.getElementById("timer").innerHTML = hour + ":" + minute + ":" + seconds;
}

//newgameboard
function newgameBoard() {
    cardsClicked = 0;
    var output = '';
    shuffle(gameArray);
    for (var i = 0; i < gameArray.length; i++) {
        output += '<div id="tile_' + i + '" onclick="cardFlip(this,\'' + gameArray[i] + '\')"></div>';
    }
    document.getElementById('gameBoard').innerHTML = output;
}

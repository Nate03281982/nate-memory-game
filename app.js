// JavaScript source code variables
var gameArray = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
var arrayValues = [];
var cardIds = [];
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

    document.getElementById("first-star").style.opacity = 1;
    document.getElementById("second-star").style.opacity = 1;
    document.getElementById("third-star").style.opacity = 1;
    //for (var i= 0; i < star-list.length; i++){
        //stars-list[i].style.opacity = 1;
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

//trackmoves 
function trackMoves() {
    totalMoves++;
    console.log(totalMoves)
    document.getElementById("moveCounter").innerText = totalMoves.toString();
}

//cardflip

function cardFlip(tile, val) {
    if (totalMoves === 0) {
        timerVar = setInterval(countTimer, 1000);
    }

    trackMoves();

    //stars
    if (totalMoves === 26) {
        document.getElementById("first-star").style.opacity = 0;
    }
    if (totalMoves === 36) {
        document.getElementById("second-star").style.opacity = 0;
    }
    if (totalMoves === 46) {
        document.getElementById("third-star").style.opacity = 0;
    }

//rest

 if (tile.innerHTML == "" && arrayValues.length < 2) {
        tile.style.background = '#FFF';
        tile.innerHTML = val;
        if (arrayValues.length == 0) {
            arrayValues.push(val);
            cardIds.push(tile.id);
        } else if (arrayValues.length == 1) {
            arrayValues.push(val);
            cardIds.push(tile.id);
            if (arrayValues[0] == arrayValues[1]) {
                cardsClicked += 2;
                // Clear both arrays
                arrayValues = [];
                cardIds = [];
                // Check to see if the whole board is cleared
                if (cardsClicked == gameArray.length) {
                    alert("Board cleared... generating new board");
                    document.getElementById('gameBoard').innerHTML = "";
                    newgameBoard();
                }
            } else {
                function flipOver(){
                    // Flip the 2 tiles back over
                    var tile_1 = document.getElementById(cardIds[0]);
                    var tile_2 = document.getElementById(cardIds[1]);
                    tile_1.style.background = "#CCC";
                    tile_1.innerHTML = "";
                    tile_2.style.background = "#CCC";
                    tile_2.innerHTML = "";
                    // Clear both arrays
                    arrayValues = [];
                    cardIds = [];
                }
                setTimeout(flipOver, 700);
            }
        }
    }
}
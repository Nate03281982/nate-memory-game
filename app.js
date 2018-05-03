// JavaScript source code variables
var gameArray = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
var arrayValues = [];
var cardIds = [];
var cardsClicked = 0;
var totalMoves = 0;
var totalSeconds = 0;
var totalStars = 3;
var totalTime = null;
var timerVar;

var twoClicksCounter = 0;

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
    arrayValues = [];
    totalMoves = 0;
    twoClicksCounter = 0;
    document.getElementById("moveCounter").innerText = "0";

    // document.getElementById("first-star").style.opacity = 1;
    // document.getElementById("second-star").style.opacity = 1;
    // document.getElementById("third-star").style.opacity = 1;
    //for (var i= 0; i < star-list.length; i++){
    //stars-list[i].style.opacity = 1;
    document.querySelectorAll('.star-list li').forEach(function (star) {
        star.style.opacity = 1;
    })


    newgameBoard();
}

//timer
function countTimer() {
    ++totalSeconds;
    var hour = Math.floor(totalSeconds / 3600);
    var minute = Math.floor((totalSeconds - hour * 3600) / 60);
    var seconds = totalSeconds - (hour * 3600 + minute * 60);

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    totalTime = minute + ":" + seconds;
    document.getElementById("timer").innerHTML = minute + ":" + seconds;
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
function trackMoves(tile) {
    
    // if clicked on already clicked, return
    if(tile.innerHTML !== ''){
        return;
    }
    twoClicksCounter++;

    if (twoClicksCounter === 2) {
        totalMoves++;
        twoClicksCounter = 0;
    }
    // console.log(totalMoves)
    document.getElementById("moveCounter").innerText = totalMoves.toString();
}

//cardflip

function fireTimerOnce(){
    if (totalMoves === 0 && twoClicksCounter === 0) {
        timerVar = setInterval(countTimer, 1000);
    }
}

function decrementStars() {
    //stars
    if (totalMoves === 26) {
        document.getElementById("first-star").style.opacity = 0;
        totalStars--;
    }
    if (totalMoves === 36) {
        document.getElementById("second-star").style.opacity = 0;
        totalStars--;
    }
}


// MASTER FUNCTION 
function cardFlip(tile, val) {
    // Pre-flip actions and checks
    fireTimerOnce();
    trackMoves(tile);
    decrementStars();
    
    // helper functions and conditionals
    function flipOpenTile() {
        tile.style.background = '#FFF';
        tile.innerHTML = val;
    }

    function populateMemoryArrays() {
        arrayValues.push(val);
        cardIds.push(tile.id);
    }
    
    var isTileOpen = tile.innerHTML == "" && arrayValues.length < 2;
    var doCardsMatch = arrayValues[0] == arrayValues[1];
    
    // where the flipping logic starts
    if (isTileOpen) {
        flipOpenTile();
        if (arrayValues.length == 0) {
            populateMemoryArrays()
        } else if (arrayValues.length == 1) {
            populateMemoryArrays()
            if (doCardsMatch) {

                // track cards used
                cardsClicked += 2; 

                // Clear both arrays
                arrayValues = [];
                cardIds = [];

                checkForGameOver();
               
            } else {
               flipOverUnmatched();
            }
        }
    }
}

//================= Central Card flip logic ==================== 



function checkForGameOver() {
     // Check to see if the whole board is cleared
     if (cardsClicked == gameArray.length) {
        alert(`Game Finished!! Total time: ${totalTime}, Star Rating: ${totalStars}, Press Okay to play again`);
        // document.getElementById('gameBoard').innerHTML = "";
        // newgameBoard();
        reset();
    }
}

function flipOverUnmatched(){
    function flipOver() {
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
    setTimeout(flipOver, 200);
}
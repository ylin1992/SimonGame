// common element

let colorArray = ["red", "green", "blue", "yellow"];
let COLOR_NUM = 4;
var randomColorQueue = [];
var state = 0; // 0: random picking logic 1: user gets answer logic
var count = 0;

function startGame() {
  if (state === 0) {
    setTimeout(randomPickColor, 800);
    state = 1;
  }
}

function getRandomColor() {
  var randNum = Math.floor(Math.random() * COLOR_NUM);
  return colorArray[randNum];
}

function randomPickColor() {
  blockshowUp();
  refreshBlock();
  var randomChosenColor = getRandomColor();
  flickerAnimation($("."+randomChosenColor), animationDuration = 200);
  playSounds(randomChosenColor, true);
  randomColorQueue.push(randomChosenColor);
  console.log(randomColorQueue);
  changeLevelState();
}

function userPickColor() {
  if (state === 1) {
    var chosenColor = this.classList[1];
    console.log("Picked Color = " + chosenColor);

    if (chosenColor != randomColorQueue[count]) {
      playSounds(chosenColor, false);
      flickerAnimation($(this), false);
      resetCheckBox();
      console.log("!!!!fail!!!!");
      clearState();
    } else {
      blockShowCorrect(chosenColor, count);
      count += 1;
      console.log(chosenColor);
      playSounds(chosenColor, true);
      flickerAnimation($(this), true); // remeber to convert it to jQuery object
      if (count === randomColorQueue.length) {
        changeLevelState();
        state = 0;
        count = 0;
        setTimeout(randomPickColor, 1000);
        state = 1;
      }
      //console.log("count = " + count.toString());
    }
  }
}

// states
function changeLevelState () {
  $("h1").text("Level " + randomColorQueue.length.toString());
}

function clearState() {
  state = 0;
  count = 0;
  randomColorQueue = [];
  $("h1").text("Press A Key to Start");
}

// effects
function playSounds (color, isCorrect=true) {
  var audioFile = "";
  if (isCorrect) {
    audioFile = "sounds/" + color + ".mp3";
  } else {
    audioFile = "sounds/wrong.mp3";
  }
  var audio = new Audio(audioFile);
  audio.play();
}

function flickerAnimation (object, isCorrect=true, animationDuration=50) {
  // object: jQuery object
  if (isCorrect) {
    object.toggleClass("pressed");
    setTimeout(function () {
      object.toggleClass("pressed");
    }, animationDuration);
  } else {
    $("body").toggleClass("game-over");
    setTimeout(function () {
      $("body").toggleClass("game-over");
    }, animationDuration);
  }
}

// check boxes
function blockshowUp () {
  $(".check-box-array").append("<p></p>").find('p:last').addClass("check-box check-box-mysterious");
  $(".check-box").text("?");
  console.log("block number:" + document.querySelectorAll("check-box").length);
}

function blockShowCorrect (color, i) {
  $($(".check-box")[i]).removeClass("check-box-mysterious");
  $($(".check-box")[i]).addClass(color);
  $($(".check-box")[i]).text("");
}

function refreshBlock () {
  $(".check-box").addClass("check-box-mysterious");
}

function resetCheckBox() {
  $(".check-box").remove();
}

$(document).on("keydown", startGame);
$(".btn").on("click", userPickColor);

'use strict';

var gQuests = [];
var gCurrQuestIdx;
var gNextId = 1;

function OnInit() {
  createQuests();
  gCurrQuestIdx = 0;
}

function startGame() {
  hideElements('.pokeball');
  hideElements('.bulbasaur');
  hideElements('.play-btn');
  renderQuest();
}

function createQuest(opts, correctOptIndex) {
  var quest = {
    id: gNextId++,
    opts,
    correctOptIndex,
  };
  gQuests.push(quest);
}

function createQuests() {
  createQuest(['Pikachu', 'Onix'], 0);
  createQuest(['Weedle', 'Squirtle'], 1);
  createQuest(['JigglyPuff', 'PsyDuck'], 1);
  createQuest(['Charizard', 'Dragonite'], 0);
}

function renderQuest() {
  var elBtns = document.querySelector('.btns');
  var strHTML = '';
  var opts = gQuests[gCurrQuestIdx].opts;
  // console.log('opts', opts);
  // console.log('opts length', opts.length);

  for (var i = 0; i < opts.length; i++) {
    var imgId = gCurrQuestIdx + 1;
    var currOpt = opts[i];
    strHTML += `<button class="btn btn${i + 1}" onclick="checkAnswer(${i},this)">${currOpt} </button>`;
  }
  elBtns.innerHTML = strHTML;

  var elQuest = document.querySelector('.quest img');
  elQuest.src = `img/${imgId}.png`;
  elQuest.classList.remove('reveal-img');
}

function checkAnswer(answerIndex, elBtn) {
  if (gQuests[gCurrQuestIdx].correctOptIndex === answerIndex) {
    elBtn.style.backgroundColor = '#53ce2e';
    var elQuest = document.querySelector('.quest img');

    elQuest.classList.add('reveal-img');
    gCurrQuestIdx++;

    if (gCurrQuestIdx === gQuests.length) {
      // victory();
      setTimeout(victory, 2500);
      return;
    }
  } else {
    elBtn.style.backgroundColor = '#f61f42';
  }
  setTimeout(renderQuest, 2500);
}

function victory() {
  var elPlayAgainBtn = document.querySelector('.play-again-btn');
  elPlayAgainBtn.style.display = 'block';

  hideElements('.btns');
  hideElements('.background-img');

  var elBackgroundWin = document.querySelector('.background-win');
  elBackgroundWin.src = './img/backgroundWin.jpg';

  var elMoveChar = document.querySelector('.moving-char');
  elMoveChar.src = './img/moving char.gif';

  var elMoveChar = document.querySelector('.moving-lightning');
  elMoveChar.src = './img/lighting.gif';
}

function gameRestart() {
  gCurrQuestIdx = 0;
  hideElements('.background-win');
  hideElements('.play-again-btn');
  gQuests = [];
  gNextId = 1;
  OnInit();
  startGame();
  // var elBackgroundWin = document.querySelector('.background-win');
  // elBackgroundWin.classList.remove('body.win');
}

function hideElements(element) {
  var elElement = document.querySelector(element);
  elElement.style.display = 'none';
  // console.log(elElement);
}

//! this is functions for reveal and hide the pokemon behind the pokeball incluslivley
function onMouseOver() {
  var elbulbasaur = document.querySelector('.bulbasaur');
  elbulbasaur.classList.add('reveal-bulbasaur');
}
function onMouseOut() {
  var elbulbasaur = document.querySelector('.bulbasaur');
  elbulbasaur.classList.remove('reveal-bulbasaur');
}

// function hideBulbasaur() {
//   var elBulbasaur = document.querySelector('.bulbasaur');
//   elBulbasaur.style.display = 'none';

//   var elPokeball = document.querySelector('.pokeball');
//   elPokeball.style.display = 'none';
// }

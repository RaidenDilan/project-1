$(() => {
  const $timer = $('.timer');
  const $display = $('.display');
  const $startBtn = $('.play');
  const $result = $('.result');
  const $reset = $('.reset');
  const $score = $('.score');
  const $begin = $('.playgame');
  const $playaudio = $('.playaudio');
  let $cells = null;
  let time = 10;
  let timerId = null;
  let userScore = 0;
  let width = 0;
  let level = null;
  let currentIndex = 0;

//------ Reset the board if the player runs into a wall within the board -----//


//--------------------------- CHOOSE DIFFICULTY------------------------------//
  const $select = $('select');
  const $chosenDifficulty = $('#chosen-difficulty');

  $select.on('change', () => {
    // e.preventDefault();
    level = $select.val();
    $chosenDifficulty.html(level);
    $begin.show();
    // $audio.play(); //----------------------------------------------?
    // $audio.html = ('PAUSE AUDIO');
  });
  $begin.hide();
  $reset.hide();
  $startBtn.hide();
  $playaudio.hide();
  $begin.on('click', buildGrid);
//----------------------------LEVEL DIFFICULTY------------------------------//
  const level1 = [0,0,0,0,1,0,0,1,0];
  // *       ==================
  // *         0  |  0  |  0
  // *       -----+-----+-----
  // *         0  |  1  |  0
  // *       -----+-----+-----
  // *         0  |  1  |  0
  // *       ==================
  const level2 = [0,1,1,0,0,1,0,1,0,0,0,0];
  // *       =======================
  // *         0  |  1  |  1  |  0
  // *       -----+-----+-----+-----
  // *         0  |  1  |  0  |  1
  // *       -----+-----+-----+-----
  // *         0  |  0  |  0  |  0
  // *       =======================
  const level3 = [0,1,0,1,0,1,0,1,0,0,0,0,0,0,1,0];
  // *       =======================
  // *         0  |  1  |  0  |  1
  // *       -----+-----+-----+-----
  // *         0  |  1  |  0  |  1
  // *       -----+-----+-----+-----
  // *         0  |  0  |  0  |  0
  // *       -----+-----+-----+-----
  // *         0  |  0  |  1  |  0
  // *       =======================

  function buildGrid() {
    let levelArray = [];
    currentIndex = 0;
    const $grid = $('ul');
    $grid.empty();

    switch(level) {
      case 'Easy':
        levelArray = level1;
        width = 3;
        break;
      case 'Medium':
        levelArray = level2;
        width = 4;
        break;
      case 'Hard':
        levelArray = level3;
        width = 4;
        break;
    }

    $begin.hide(); //-------------------------------Unhide it after game over?
    $audio.play(); //----------------------------------------------?
    $startBtn.show();
    $reset.show();
    $playaudio.show();
    // $playaudio.html('PAUSE AUDIO'); //------------------------------still have to click it twice to pause audio

    $grid.attr('data-width', width);

    levelArray.forEach((cell, index) => {
      const $cell = $('<li>');
      if (cell === 1) {
        $cell.addClass('wall');
      }
      if(index === 0) {
        $cell.addClass('ball');
      }
      $cell.appendTo($grid);
    });

    $cells = $('li');
    $cells.eq(currentIndex).addClass('ball');
    // $begin.hide(); //------------------------------------------?
  }
  //--------------------------------TIMER------------------------------------//
  $startBtn.on('click', startTimer);

  function startTimer() {
    $display.html('GO!');
    $score.html(userScore);
    $timer.addClass('active');
    $startBtn.hide();
    $begin.hide();
    $reset.show();

    timerId = setInterval(() => {
      time--;
      $timer.html(time);
      $audio.play();

      if(time === 0) {
        clearInterval(timerId);
        // $result.html('Game Over Dude!');
        $startBtn.show('Start');
        $startBtn.html('Play Again');
        $display.html('Try again or choose another difficulty');
        $result.html('Game Over!');
        $reset.hide();
        $begin.show();
        $audio.pause(); //------------------------ option to keep or remove
      }
      if(time === 0) {
        time = 11;
      }
    }, 1000);
  }
//------------------------------BALL & ARROW KEYS-----------------------------//
  $(document).keydown(function(e) {
    moveBall(e);
  });

  function moveBall(e) {
    if(!e.metaKey) e.preventDefault();
    $cells.removeClass('ball');
    switch (e.keyCode) {
      case 37: //left arrow key
        if (currentIndex%width !== 0) {
          currentIndex--;
        }
        break;
      case 38: //up arrow key
        if (currentIndex > width-1) {
          currentIndex -= width;
        }
        break;
      case 39: //right arrow key
        if (currentIndex%width !== width-1) {
          currentIndex++;
        }
        break;
      case 40: //down arrow key
        if (currentIndex < ($cells.length - width)) {
          currentIndex += width;
        }
        break;
    }

    $cells.eq(currentIndex).addClass('ball');
    winCondition();
  }
//-------------------------------RESET BUTTON---------------------------------//
  $reset.on('click', () => {
    userScore = 0;
    time = 10;
    clearInterval(timerId);
    $score.html(userScore);
    $display.html('Ready?');
    // $result.html('Well Done!');
    $timer.removeClass('active');
    $startBtn.show();
    $audio.pause(); //-----------------------------------------optin to keep or remove
    $begin.show();
  });
// ------------------------------WIN CONDITION------------------------------- //
  function winCondition() {
    const wins = 8;
    const wall = ('li.wall');
    if (currentIndex === wins) {
      $result.html('You Won!');
      $display.html('Try a different level?');
      // clearInterval(timerId);
      userScore++;
      currentIndex = 0;
    }
    if (currentIndex === wall) {
      $result.html('Try Again!');
      // $result.html('Game Over!');
      userScore--;
      currentIndex = 0;
    }
    if (userScore !== userScore) {
      $result.html('Game Over!');
    }
    $score.html(userScore);
  }
// -----------------------------------AUDIO----------------------------------//
  const $audio = $('audio').get(0);
  let hello = 1;
  $playaudio.on('click', () => {
    if( hello%2 !==0) {
      $audio.play();
      $playaudio.html('PAUSE AUDIO');
      hello+=1;
    } else {
      $audio.pause();
      $playaudio.html('PLAY AUDIO');
      hello+=1;
    }
  });
});

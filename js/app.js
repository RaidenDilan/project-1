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
  let time = 5;
  let timerId = null;
  let userScore = 0;
  let width = 0;
  let level = null;
  let currentIndex = 0;
//--------------------------- CHOOSE DIFFICULTY------------------------------//
  const $select = $('select');
  const $chosenDifficulty = $('#chosen-difficulty');
  $select.on('change', () => {
    level = $select.val();
    $chosenDifficulty.html(level);
    $begin.show();
  });
  $begin.on('click', buildGrid);
  $begin.hide();
  $reset.hide();
  $startBtn.hide();
  $playaudio.hide();
  $score.html(userScore);
//----------------------------LEVEL DIFFICULTY------------------------------//
  const level1 = [0,0,0,0,1,0,0,1,0];
  // *                     -----+-----+-----
  // *                    |  0  |  0  |  0  |
  // *                     -----+-----+-----
  // *                    |  0  |  1  |  0  |
  // *                     -----+-----+-----
  // *                    |  0  |  1  |  0  |
  // *                     -----+-----+-----
  const level2 = [0,1,1,0,0,0,0,1,0,1,0,0];
  // *                     -----+-----+-----+-----
  // *                    |  0  |  1  |  1  |  0  |
  // *                     -----+-----+-----+-----
  // *                    |  0  |  0  |  0  |  1  |
  // *                     -----+-----+-----+-----
  // *                    |  0  |  1  |  0  |  0  |
  // *                     -----+-----+-----+-----
  const level3 = [0,1,0,1,0,0,0,0,0,1,1,0,1,1,1,0];
  // *                     -----+-----+-----+------
  // *                    |  0  |  1  |  0  |  1  |
  // *                     -----+-----+-----+-----
  // *                    |  0  |  0  |  0  |  0  |
  // *                     -----+-----+-----+-----
  // *                    |  0  |  1  |  1  |  0  |
  // *                     -----+-----+-----+-----
  // *                    |  1  |  1  |  1  |  0  |
  // *                     -----+-----+-----+-----
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
    $begin.hide();
    $audio.play();
    $startBtn.show();
    $reset.show();
    $playaudio.show();

    $grid.attr('data-width', width);

    levelArray.forEach((cell) => {
      const $cell = $('<li>');
      if (cell === 1) {
        $cell.addClass('wall');
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
    buildGrid();

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
        $score.html(userScore);
        $reset.hide();
        $begin.show();
        $audio.pause(); //------------------------ option to keep or remove
      }
      if(time === 0) {
        time = 5;
      }
    }, 1000);
  }
//-----------------------BALL, ARROW KEYS, WIN CONDITION----------------------//
  $(document).keydown(function(e) {
    moveBall(e);
  });

  function moveBall(e) {
    if(!e.metaKey) e.preventDefault();
    if(!$cells) return false; //------
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
    if($cells.eq(currentIndex).hasClass('wall')) {  //-----
      currentIndex = 0; //-----
      $display.html('Oops, you ran into a wall!');
    }
    $cells.eq(currentIndex).addClass('ball'); //-----

    if (currentIndex === $cells.length-1) { //-----
      $result.html('You Won!'); //-----
      $display.html('Try a different level?');  //-----
      userScore++;  //-----
      currentIndex = 0; //-----
    }
  }
//-------------------------------RESET BUTTON---------------------------------//
  $reset.on('click', () => {
    userScore = 0;
    time = 5;
    clearInterval(timerId);
    $score.html(userScore);
    $display.html('Ready?');
    $timer.removeClass('active');
    $startBtn.show();
    // $audio.pause();
    $begin.show();
  });
// -----------------------------------AUDIO----------------------------------//
  const $audio = $('audio').get(0);
  let hello = 1;
  $playaudio.on('click', () => {
    if( hello%2 === 0) {
      $audio.play();
      $playaudio.html('PAUSE AUDIO');
      hello+=1;
    } else {
      $audio.pause();
      $playaudio.html('PLAY AUDIO');
      hello+=1;
    }
  });
//--------------------------MORE LOGIC----------------------------------------//

//-change color of wall if the player runs into the wall.
//--either keep the wall color or slowly hide it when the player goes back to the first cell.
//---notify the player with a display message that they ran into a wall.
});

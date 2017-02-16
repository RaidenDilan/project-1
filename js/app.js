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
  const $grid = $('ul');
//--------------------------- CHOOSE DIFFICULTY------------------------------//
  const $select = $('select');
  const $chosenDifficulty = $('#chosen-difficulty');

  function changeLevel() {
    level = $select.val();
    $chosenDifficulty.html(level);
    $begin.show();
  }

  $select.on('change', changeLevel);
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
  }
  //----------------------------------TIMER-----------------------------------//
  $startBtn.on('click', startTimer);

  function reset() {
    $startBtn
      .show('Start')
      .html('Play Again');
    $display.html('Try again or choose another difficulty');
    // $result.html('Result');
    $result.hide();
    $score.html(userScore);
    $reset.hide();
    $begin.show();
    $grid.empty();
  }

  function countDown() {
    time--;
    $audio.play();
    $timer.html(time);
    // $audio.play()

    if(time === 0) {
      clearInterval(timerId);
      reset();
      // $audio.pause();
    }
    if(time === 0) {
      time = 5;
    }
  }

  function startTimer() {
    $display.html('GO!');
    $score.html(userScore);
    $timer.addClass('active');
    $begin.hide();
    $reset.show();
    buildGrid();
    $startBtn.hide();

    timerId = setInterval(countDown, 1000);
  }
//----------------------BALL, ARROW KEYS & WIN CONDITION----------------------//
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
    if($cells.eq(currentIndex).hasClass('wall')) {
      $cells.eq(currentIndex).addClass('hit');
      removeHitClass(currentIndex);

      currentIndex = 0;
      $display.html('Oops, you ran into a wall!');
    }
    $cells.eq(currentIndex).addClass('ball');

    if (currentIndex === $cells.length-1) {
      $result.html('You Won!');
      $display.html('Try a different level?');
      userScore++;
      currentIndex = 0;
    }
  }

  function removeHitClass(currentIndex) {
    setTimeout(() => {
      $cells.eq(currentIndex).removeClass('hit');
    }, 100);
  }
//-------------------------------RESET BUTTON---------------------------------//
  $reset.on('click', () => {
    userScore = 0;
    time = 6;
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
});

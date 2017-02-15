$(() => {
  const $timer = $('.timer');
  const $display = $('.display');
  const $startBtn = $('.play');
  const $result = $('.result');
  const $reset = $('.reset');
  const $score = $('.score');
  const $begin = $('.playgame');
  const destination = 8;
  let $cells = null;
  let time = 3;
  let timerId = null;
  let userScore = 0;
  let width = 0;
  let level = null;
  let currentIndex = 0;
//------ Reset the board if the player runs into a wall within the board -----//
//--------------------------- CHOOSE DIFFICULTY------------------------------//
  const $select = $('select');
  const $chosenDifficulty = $('#chosen-difficulty');

  $select.on('change', (e) => {
    // e.preventDefault();
    level = $(e.target).val();
    $chosenDifficulty.html(level);
    $audio.play();
  });
  $begin.on('click', buildGrid);
//----------------------------LEVEL DIFFICULTY------------------------------//
  const level1 = [0,0,0,0,1,0,0,1,0];
  const level2 = [0,1,1,0,0,1,0,1,0,0,0,0];
  const level3 = [0,1,0,1,0,1,0,1,0,0,0,0,0,0,1,0];

  function buildGrid() {
    console.log('inside buildGrid()');
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
  }
  //--------------------------------TIMER------------------------------------//
  $startBtn.on('click', startTimer);

  function startTimer() {
    $display.html('GO!');
    $score.html(userScore);
    $timer.addClass('active');
    $startBtn.hide();

    timerId = setInterval(() => {
      time--;
      $timer.html(time);
      $audio.play();

      if(time === 0) {
        clearInterval(timerId);
        $result.html('Game Over!');
        $startBtn.show('Start');
        $startBtn.html('Play Again');
        $display.html('Try Again?');
        $reset.hide();
      }
      if(time === 0) {
        time = 4;
      }
    }, 1000);
  }
//------------------------------BALL & ARROW KEYS-----------------------------//
  $(document).keydown(function(e) {
    moveBall(e);
  });

  function moveBall(e) {
    // console.log('inside moveBall()');
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
    // console.log(currentIndex);
  }
//-------------------------------RESET BUTTON---------------------------------//
  $reset.on('click', () => {
    userScore = 0;
    time = 3;
    clearInterval(timerId);
    $score.html(userScore);
    $display.html('Ready???');
    console.log($display);
    $result.html('Result:');
    $timer.removeClass('active');
    $startBtn.show();
  });
// ------------------------------WIN CONDITION------------------------------- //
  function winCondition() {

    if (currentIndex === destination) {
      $result.html('You Won!');
      userScore++;
    } else {
      $result.html('You Lost!');
      userScore--;
    }
    $score.html(userScore);
    // console.log(userScore);
  }
  // winCondition();
// -----------------------------------AUDIO----------------------------------//
  const $audio = $('audio').get(0);
  const $playaudio = $('.playaudio');
  let h = 1;
  $playaudio.on('click', (e) => {
    if( h%2 !==0) {
      $audio.play();
      e.target.innerHTML = 'PAUSE AUDIO';
      h+=1;
    } else {
      $audio.pause();
      e.target.innerHTML = 'PLAY AUDIO';
      h+=1;
    }
    // console.log(h);
  });
});

$(() => {
//----------- Show instructions when the key 'I' is pressed and held ---------//
// add an empty div that covers the whole screen
// give the choice of difficulties to choose from
// then hide the div to show the game

  // const $startScreen = $('startScreen');

//--------------------------------- OBJECTS ----------------------------------//

  const $timer = $('.timer');
  const $display = $('.display');
  const $startBtn = $('.play');
  const $result = $('.result');
  const $reset = $('.reset');
  const $score = $('.score');
  const $begin = $('.playgame');
  const destination = 8;

  let time = 3;
  let timerId = null;
  let userScore = 0;
  let width = 0;
  let level = null;

//------ Reset the board if the player runs into a wall within the board -----//

//--------------------------- CHOOSE DIFFICULTY------------------------------//
  const $select = $('select');
  const $chosenDifficulty = $('#chosen-difficulty');

  $select.on('change', (e) => {
    // e.preventDefault();
    level = $(e.target).val();
    $chosenDifficulty.html(level);
    // console.log();
  });

  $begin.on('click', buildGrid);
//----------------------------LEVEL DIFFICULTY------------------------------//
  const level1 = [0,0,0,0,1,0,0,1,0];
  const level2 = [0,1,1,0,0,1,0,1,0,0,0,0];
  const level3 = [0,1,0,1,0,1,0,1,0,0,0,0,0,0,1,0];

  function buildGrid() {
    console.log('inside buildGrid()');
    let gridWidth = null;
    let levelArray = [];
    const $grid = $('ul');

    switch(level) {
      case 'Easy':
        levelArray = level1;
        gridWidth = 3;
        break;
      case 'Medium':
        levelArray = level2;
        gridWidth = 4;
        break;
      case 'Hard':
        levelArray = level3;
        gridWidth = 5;
        break;
    }

    $grid.attr('data-width', gridWidth);
    width = gridWidth;

    levelArray.forEach((cell, index) => {
      const $cell = $('<li>');
      if (cell === 1) {
        $cell.addClass('wall');
      }
      if(index === 0) {
        $cell.addClass('ball');
      }
      $cell.appendTo($grid);
      // console.log('Lists');
      // console.log(cell);
      // console.log($grid);
    });
  }

  //--------------- Runs the PLAY button and starts the timer ------------------//

  $startBtn.on('click', startTimer);

  function startTimer() {
    // time = 3; //------------------------------------//
    $display.html('GO!');
    $timer.addClass('active');
    $startBtn.hide();

    timerId = setInterval(() => {
      time--;
      $timer.html(time);
      // console.log('Set Interval Working!');

      if(time === 0) {
        clearInterval(timerId);
        $result.html('Game Over!');
        $startBtn.show('Start');
        $startBtn.html('Play Again');
        $display.html('Try Again?');
        $reset.hide();
        // console.log('Clear Interval Working!');
      }
      if(time === 0) {
        time = 4;
      }
    }, 1000);
  }

//--------- Create the edges of the board and the arrow key function --------//

  const $cells = $('li');
  let currentIndex = 0;
  $cells.eq(currentIndex).addClass('ball');

  $(document).keydown(function(e) {
    moveBall(e);
  });

  function moveBall(e) {
    console.log('inside moveBall()');
    // e.preventDefault(); //------------------------------------------//
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
        // if (currentIndex < width === width) {
        //   currentIndex = currentIndex - 3;
        // }
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
        // if (currentIndex > $cells.length !== (width+1)) {
        //   currentIndex = currentIndex + 3;
        // }
        break;
    }
    $cells.eq(currentIndex).addClass('ball');
    // console.log(currentIndex);
  }

//---------------------------- The reset button ------------------------------//

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
    // console.log('Game Restarted');
  });

// ----------------------------- Win Condition ------------------------------ //

  // $startBtn.on('click', winCondition);

  function winCondition() {
    // console.log(destination);
    if (currentIndex === destination) {
      $result.html('You Won!');
      userScore++;
    } else {
      $result.html('You Lost!');
      userScore--;
    }
    $score.html(userScore); //updates latest score
    // console.log(userScore);
  }
  winCondition();

// ----------------------------Create sound effects---------------------------//
  // const $audio = $('audio');
  //
  // $audio.on('click', () => {
  //
  // });
});

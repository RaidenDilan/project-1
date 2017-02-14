$(() => {
//----------- Show instructions when the key 'I' is pressed and held ---------//
// add an empty div that covers the whole screen with a choice of difficulties to choose from.

  // const $startScreen = $('startScreen');

//--------------------------------- OBJECTS ----------------------------------//

  const $timer = $('.timer');
  const $display = $('.display');
  const $startBtn = $('.play');
  const $result = $('.result');
  const $reset = $('button.reset');
  const $score = $('.score');

  let time = 10;
  let timerId = null;
  let userScore = 0;
  let width = 0;

//----------------------------LEVEL 1 DIFFICULTY------------------------------//

  const $level1 = [0,0,0,0,1,0,0,1,0];
  const $grid = $('ul');
  width = 3;

  $level1.forEach((cell, index) => {
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

  function startTimer() {
    $timer.addClass('active');
    $startBtn.detach('.play');

    timerId = setInterval(() => {
      time--;
      $timer.html(time);
      // console.log('Set Interval Working!');

      if(time === 0) {
        clearInterval(timerId);
        $result.html('Game Over');
        // $startBtn.append('Start---');
        $startBtn.html('Play Again');
        $display.html('Try Again?');
        // console.log('Clear Interval Working!');
      }
    }, 1000);
  }

//--------------- Runs the PLAY button and starts the timer ------------------//

  $startBtn.on('click', startTimer);

//---------------------------- The play button -------------------------------//

  $startBtn.on('click', () => {
    $display.html('GO!');
    // console.log('Started');
  });

  //--------- Create the edges of the board and the arrow key function --------//

  const $cells = $('li');
  let currentIndex = 0;
  $cells.eq(currentIndex).addClass('ball');

  $(document).keydown(function(e) {
    moveBall(e);
  });

  function moveBall(e) {
    // e.preventDefault();
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
    console.log(currentIndex);
  }

//---------------------------- The reset button ------------------------------//

  $reset.on('click', () => {
    userScore = 0;
    time = 10;
    clearInterval(timerId);
    $score.html(userScore);
    $display.html('Ready???');
    $result.html('Reset Activated');
    $timer.removeClass('active');
    $startBtn.html('Start!!!');
    console.log('Game Restarted');
  });

// ----------------------------- Win Condition ------------------------------ //

  $startBtn.on('click', checkForMatch);

  function checkForMatch() {
    const curIndex = 8;
    // const userProgress = currentIndex;
    if (curIndex === curIndex) { //THIS LINE IS WRONG!
      $result.html('You Won!');
      userScore++;
    } else {
      $result.html('You Lost!');
      userScore--;
    }
    $score.html(userScore); //updates latest score
    console.log(userScore);
  }
  // checkForMatch();

//----------------------------LEVEL 2 DIFFICULTY------------------------------//

  // const $level2 = [0,1,1,0,0,1,0,1,0,0,0,0]; //arrays for the level 2 gird (12 cells).
  // const $grid = $('ul'); //attaches the object to the unordered lists
  // width = 4;
  //
  // $level2.forEach((cell) => {
  //   const $cell = $('<li>'); //creates the lists
  //   if (cell === 1) {
  //     $cell.addClass('wall'); //adds class of wall
  //   }
  //   $cell.appendTo($grid); //appends the class of wall to the ul.
  //   // console.log('Lists');
  //   // console.log(cell);
  //   // console.log($grid);
  // });

//----------------------------LEVEL 3 DIFFICULTY------------------------------//

  // const $level3 = [0,1,0,1,0,1,0,1,0,0,0,0,0,0,0,1,0]; //arrays for the level 3 gird (17 cells).
  // const $grid = $('ul'); //attaches the object to the unordered lists
  // width = 5 // change this number
  //
  // $level3.forEach((cell) => {
  //   const $cell = $('<li>'); //creates the lists
  //   if (cell === 1) {
  //     $cell.addClass('wall'); //adds class of wall
  //   }
  //   $cell.appendTo($grid); //appends the class of wall to the ul.
  //   // console.log('Lists');
  //   // console.log(cell);
  //   // console.log($grid);
  // });

//------ Reset the board if the player runs into a wall within the board -----//

// ----------------------------Create sound effects---------------------------//

});

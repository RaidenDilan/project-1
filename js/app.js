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
  // const $grid = $('ul');
  // const $begin = $('.playgame'); //play button at the main page
  const destination = 8;

  let time = 3;
  let timerId = null;
  let userScore = 0;
  let width = 0;
//------ Reset the board if the player runs into a wall within the board -----//

//--------------------------- CHOOSE DIFFICULTY------------------------------//
  const $select = $('select');
  const $chosenDifficulty = $('#chosen-difficulty');

  $select.on('change', (e) => {
    const $value = $(e.target).val();
    $chosenDifficulty.html($value);
    // $begin.on('click');
    // console.log($begin);
  });
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
//----------------------------LEVEL 2 DIFFICULTY------------------------------//

  // const $level2 = [0,1,1,0,0,1,0,1,0,0,0,0]; //arrays for the level 2 gird (12 cells).
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


  //--------------- Runs the PLAY button and starts the timer ------------------//

  $startBtn.on('click', startTimer);

  function startTimer() {
    time = 4; //------------------------------------//
    $display.html('GO!');
    $timer.addClass('active');
    $startBtn.hide('.play');

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
      // if(time === 0) {
      //   time = 4;
      // }
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
    $result.html('Result:');
    $timer.removeClass('active');
    $startBtn.show('Start');
    // console.log('Game Restarted');
  });

// ----------------------------- Win Condition ------------------------------ //

  // $startBtn.on('click', winCondition);

  function winCondition() {
    console.log(destination);
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

});

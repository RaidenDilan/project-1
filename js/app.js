$(() => {
//----------- Show instructions when the key 'I' is pressed and held ---------//
  // const $startScreen = $('');

//--------------------------------- OBJECTS ----------------------------------//
  const $timer = $('.timer');
  const $display = $('.display');
  const $startBtn = $('.play');
  const $result = $('.result');
  const $reset = $('button.reset');
  const $play = $('button.play');
  const $score = $('.score');
  let time = 3; //amount of seconds to finish the maze
  let timerId = null;
  let userScore = 0; //user score starts at 0

  function startTimer() {
    toggleBoard();  //Toggles the MAZE board - doesn't work yet
    // $showBoard(); //shows maze board when game begins
    $timer.addClass('active');

    timerId = setInterval(() => { //Starts the timer
      time--;
      $timer.html(time);
      console.log('Set Interval Working!');

      if(time === 0) {  //Stops the timer
        clearInterval(timerId);
        $result.html('Game Over');
        $play.html('Play Again');
        toggleBoard();
        // $hideBoard();
        // $timer.addClass('ringing'); //this adds a ringing animation
        console.log('Clear Interval Working!');
      }
    }, 1000); //the amount of milliseconds in a single second
  }
  //--------- Create the edges of the board and the arrow key function ---------//
  const $cells = $('li');
  let currentIndex = 0; //lets the start at the index  0
  $cells.eq(currentIndex).addClass('ball'); //adds a class of ball

  $(document).keydown(function(e) { //grabs the event listener
    moveBall(e); //calls moveBall function
  });

  function moveBall(e) {
    $cells.removeClass('ball'); //removes the class of ball
    switch (e.keyCode) {
      case 37: //left arrow key
        if ($cells.eq(currentIndex).hasClass('edge-left') ===  false) { // if the li has a class of edge-left it will equal to false because we want to block the layer from going through the edges
          currentIndex--;
        }
        break;
      case 38: //up arrow key
        if ($cells.eq(currentIndex).hasClass('edge-top') ===  false) {
          currentIndex = currentIndex - 3;
        }
        break;
      case 39: //right arrow key
        if ($cells.eq(currentIndex).hasClass('edge-right') ===  false) {
          currentIndex++;
        }
        break;
      case 40: //down arrow key
        if ($cells.eq(currentIndex).hasClass('edge-down') ===  false) {
          currentIndex = currentIndex + 3;
        }
        break;
    }
    $cells.eq(currentIndex).addClass('ball'); //adds a class ball to the arrow key destination
    console.log(currentIndex);
  }
//--------------- Runs the PLAY button and starts the timer ------------------//
  $startBtn.on('click', startTimer);
//---------------------------- The play button -------------------------------//
  $play.on('click', () => {
    $display.html(''); //hides the ready display message
    console.log('Started');
  });
//---------------------------- The reset button ------------------------------//
  $reset.on('click', () => {
    userScore = 0; //sets user score to 0
    time = 3;
    $score.html(userScore); //reset user score
    $timer.html(time);
    $display.html('Ready?'); //resets display to READY
    $result.text('Result!'); //dispays result in the result box
    $timer.removeClass('active'); //reset timer to 3 seconds
    $startBtn.html('Start'); //after reset button is pressed the start button display message resets to normal
    console.log('Restarted');
  });
//------------------------- The BALL function on CLICK -----------------------//
  // $ball.on('click', () => {
  //   console.log('Ball Clicked');
  // });
//----- Create a 'You Won!' message when the player reaches destination ------//
  // const $winConditions = $('winConditions');

// ------------------------------ Score System ------------------------------ //
  $startBtn.on('click', checkForMatch);

  function checkForMatch() {
    const userProgress = currentIndex;
    if (userProgress === currentIndex[8]) {
      $result.html('You Won!');
      userScore++; //increases score by 1 if successful
    } else {
      $result.html('You Lost!');
      userScore--; //decreases score by 1 if not successful
    }
    $score.html(userScore); //updates latest score
    console.log(userScore);
    console.log(userProgress);
    // generateSum();
  }
//------------------------ Hidding buttons and boards ------------------------//
  function toggleBoard() { // not working yet
    // $play.toggle(); //NOT working yet
    // $showBoard.toggle(); //hides the maze board
  }
//----------------------------LEVEL 1 DIFFICULTY------------------------------//
  const $level1 = [0,0,0,0,1,0,0,1,0]; //arrays for the level 1 gird (9 cells).

  const $grid = $('ul'); //attaches the object to the unordered lists

  $level1.forEach((cell) => {
    const $cell = $('<li>'); //creates the lists
    if (cell === 1) {
      $cell.addClass('wall'); //adds class of wall
    }
    $cell.appendTo($grid); //appends the class of wall to the ul.
    // console.log('Lists');
    // console.log(cell);
    // console.log($grid);
  });
//----------------------------LEVEL 2 DIFFICULTY------------------------------//
  // const $level2 = [0,1,1,0,0,1,0,1,0,0,0,0]; //arrays for the level 2 gird (12 cells).
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
});

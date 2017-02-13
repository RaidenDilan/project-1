console.log('JS loaded!');
$(() => {

//----------- Show instructions when the key 'I' is pressed and held ---------//

//------ Reset the board if the player runs into a wall within the board -----//

// //------------------ Create the walls/edges of the board ---------------------//
  const $cells = $('li');

  $Ball(e) {
    curIndex = 0;
    $cells.eq(curIndex).removeClass('ball');
    $cells.eq(curIndex).hasClass('ball');
    $cells.eq(curIndex).addClass('ball');
    switch (e.keyCode) {
      $cells.removeClass('ball');
      case 37:
          curIndex: -=1 //left arrow key
        break;
      case 38:
          curIndex: -=1 //up arrow key
        break;
      case 39:
          curIndex: +=1 //right arrow key
        break;
      case 40:
          curIndex: +=1 //bottom arrow key
        break;
    }
  }
//--------------------------------- OBJECTS ----------------------------------//
  // const $circle = $('.circle');
  // const $hideBoard = $('.hidden'); // hides board
  // const $showBoard = $('.show'); // shows board
  const $timer = $('.timer');
  const $display = $('.display');
  const $startBtn = $('.play');
  const $result = $('.result');
  const $reset = $('button.reset');
  const $play = $('button.play');
  const $ball = $('.ball');
  let time = 3;
  let timerId = null;

  function startTimer() {
// Toggles the MAZE  board -- doesn't work yet
    toggleBoard();
    // $showBoard(); //shows board
    $timer.addClass('active');

// --- Starts the timer --- //
    timerId = setInterval(() => {
      time--;
      // $reset();
      $timer.html(time);
      console.log('Set Interval Working!');

// --- Stops the timer --- //
      if(time === 0) {
        clearInterval(timerId);
        $display.html('Game Over');
        $play.html('Play Again');
        toggleBoard();
        // $hideBoard();
        // $timer.addClass('ringing'); //-- this adds a ringing animation --//
        console.log('Clear Interval Working!');
      }
    }, 1000); // --- Stops the timer after 10 seconds --- //
  }
//--------------- Runs the PLAY button and starts the timer ------------------//
  $startBtn.on('click', startTimer);
//------------------------------- Move the BALL ------------------------------//

  // $(document).keydown(function(e) {
  //   switch (e.keyCode) {
  //     case 37:
  //       $circle.stop().css({
  //         left: '-=100' //---This set the amount of pixels the ball moves---//
  //       }); //left arrow key
  //       break;
  //     case 38:
  //       $circle.stop().css({
  //         top: '-=100' //---This set the amount of pixels the ball moves---//
  //       }); //up arrow key
  //       break;
  //     case 39:
  //       $circle.stop().css({
  //         left: '+=100' //---This sets the amount of pixels the ball moves---//
  //       }); //right arrow key
  //       break;
  //     case 40:
  //       $circle.stop().css({
  //         top: '+=100' //---This set the amount of pixels the ball moves---//
  //       }); //bottom arrow key
  //       break;
  //   }
  //   console.log('Movement Works');
  // });
//---------------------------- The play button -------------------------------//
  $play.on('click', () => {
    console.log('Started');
  });
//---------------------------- The reset button ------------------------------//
  $reset.on('click', () => {
    time = 3;
    $timer.html(time);
    $display.html('Ready?'); // ---reset display to READY again---//
    $result.text(''); // dispays win or lose message INCOMPLETE
    $timer.removeClass('active'); // ---reset timer to 3 seconds---//
    console.log('Restarted');
  });
//------------------------- The BALL function on CLICK -----------------------//
  $ball.on('click', () => {
    console.log('Ball Clicked');
  });
//------------- Block the edge so the player can't go through it -------------//

//----- Create a 'You Won!' message when the player reaches destination ------//

  // $play.on('click', () => {
  // // $ball.addClass('circle');  // ---this is not necessary anymore--- //
  // // if $('.result').text('You Won');
  // // } else {
  // //   $('.result').text('You Lost');
  // // }
  //   console.log('Started');
  // });

//-------------------- Create different difficulties -------------------------/

//------------------------ Hidding buttons and boards ------------------------//
  function toggleBoard() { // not working yet
    $play.toggle(); // not working yet
    // $showBoard.toggle(); // hides the maze board
  }
});

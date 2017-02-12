console.log('JS loaded!');
$(() => {

// Show instructions when the key 'I' is pressed and held /////////////////////

// Reset the board if the player runs into a wall within the board ////////////

// Create the walls within the board function//////////////////////////////////

// OBJECTS ////////////////////////////////////////////////////////////////////
  const $timerScreen = $('.timer');
  const $display = $('.display');
  const $startBtn = $('.play');
  let timeRemaining = 10;
  let timerId = null;

  function startTimer() {
// Toggles the MAZE  board
    toggleBoard();

// Starts the timer
    timerId = setInterval(() => {
      timeRemaining--;
      $timerScreen.text(timeRemaining);
      console.log('Set Interval Working!');

// Stops the timer
      if(timeRemaining === 0) {
        clearInterval(timerId);
        $display.html('Game Over');
        $play.html('Play Again');
        toggleBoard();
        // $timer.addClass('ringing');
        console.log('Clear Interval Working!');
      }
    }, 1000); // Stops the timer after 10 secons
// timerIsRunning = true;
  }
// Runs the PLAY button and timer
  $startBtn.on('click', startTimer);

// Move the BALL //////////////////////////////////////////////////////////////
  const $circle = $('.circle'); //the circle object

  $(document).keydown(function(e) {
    switch (e.which) {
      case 37:
        $circle.stop().css({
          left: '-=10' //change number to set the amount of pixels the ball moves
        }); //left arrow key
        break;
      case 38:
        $circle.stop().css({
          top: '-=10' //change number to set the amount of pixels the ball moves
        }); //up arrow key
        break;
      case 39:
        $circle.stop().css({
          left: '+=10' //change number to set the amount of pixels the ball moves
        }); //right arrow key
        break;
      case 40:
        $circle.stop().css({
          top: '+=10' //change number to set the amount of pixels the ball moves
        }); //bottom arrow key
        break;
    }
    console.log('Movement Works');
  });

// The play button ////////////////////////////////////////////////////////////
  const $play = $('button.play');

  $play.on('click', () => {
    $ball.addClass('circle');
    // if $('.result').text('You win');
    // } else {
    //   $('.result').text('You lose');
    // }
    console.log('Started');
  });

// The reset button ///////////////////////////////////////////////////////////
  const $reset = $('button.reset');

  $reset.on('click', () => {
    $('.result').text(''); // dispays win or lose message INCOMPLETE
    // $startTimer.html(timeRemaining); // FIX THIS PART
    console.log('Restarted');
  });

// The BALL function on CLICK /////////////////////////////////////////////////
  const $ball = $('.circle');

  $ball.on('click', () => {
    console.log('Ball moved');
    // $ball.appendTo('.destination');
  });

// Block the edge so the player can't go through it ///////////////////////////

// Create a 'You Won!' message when the player reaches destination ////////////


// Create different difficulties //////////////////////////////////////////////

// Create hide board function /////////////////////////////////////////////////

// Hidding buttons and boards /////////////////////////////////////////////////
  function toggleBoard() {
    $play.toggle();
  }
});

console.log('JS loaded!');
$(() => {

// Show instructions when the key 'I' is pressed and held

// Reset the board if the player runs into a wall within the board. Or don't do this at all.

// Create the walls within the board function

// add the timer
  const $input = $('input');
  // const $button = $('.submit');
  const $timerScreen = $('.timer');
  const $display = $('.display');
  const $startBtn = $('.play');
  let timeRemaining = 3;
  let timerId = null;

  function startStopTimer() {
// show button input
    showInput();

// starts the timer
    timerId = setInterval(() => {
      timeRemaining--;
      $timerScreen.text(timeRemaining);
      console.log('Set Interval Working!');

      // stops the timer
      if(timeRemaining === 0) {
        clearInterval(timerId);
        $display.html('Game Over');
        $play.html('Play Again');
        // $timer.addClass('ringing');
        console.log('Clear Interval Working!');
      }
    }, 1000);
// timerIsRunning = true;
  }
// hides input box
  function hideInput() {
    $input.hide();
  }
  hideInput();

// shows input box
  function showInput() {
    $input.show();
  }
// runs the GO! button
  $startBtn.on('click', startStopTimer);

// Create the direction key function
  setInterval(moveBall, 50); //50 marks the speed of the ball
  const keys = {};

  $(document).keydown(function(e) {
    keys[e.keyCode] = true;
  });

  $(document).keyup(function(e) {
    delete keys[e.keyCode];
  });

  function moveBall() {
    for (var direction in keys) {
      if (!keys.hasOwnProperty(direction)) continue;
      if (direction == 37) {
        $ball.animate({left: '-=5'}, 0); //left works fine
        console.log('Left');
      }
      if (direction == 38) {
        $ball.animate({top: '-=5'}, 0); //top works fine
        console.log('Top');
      }
      if (direction == 39) {
        $ball.animate({right: '+=5'}, 0); //right still not working
        console.log('Right');
      }
      if (direction == 40) {
        $ball.animate({down: '+=5'}, 0); //down stil not working
        console.log('Down');
      }
    }
  }

// move the ball

// create the play button
  const $play = $('button.play');

  $play.on('click', () => {
    $ball.addClass('circle');
    // $play.html('started');
    console.log('Started');
  });

// Create the reset button
  const $reset = $('button.reset');

  $reset.on('click', () => {
    // $ball.removeClass('circle');
    // $ball.prepend('');
    // $reset.html('started');
    console.log('Restarted');
  });

// Create the 'ball' function
  const $ball = $('.circle');

  $ball.on('click', () => {
    // $ball.appendTo('.destination');
    console.log('Ball moved');
  });

// Block the edge so the player can't go through it.

// Create Player direction function

// Create a 'You Won!' alert/message when the player reaches the finish destination.

// Create different difficulties

// Create hide board function

// CONSOLE LOG EVERYTHING!!! // YES! Console everthing

});

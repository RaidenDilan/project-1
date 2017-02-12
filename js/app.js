console.log('JS loaded!');
$(() => {

// Show instructions when the key 'I' is pressed and held /////////////////////

// Reset the board if the player runs into a wall within the board ////////////

// Create the walls within the board function//////////////////////////////////

// add the timer //////////////////////////////////////////////////////////////
  const $input = $('input');
  // const $button = $('.submit');
  const $timerScreen = $('.timer');
  const $display = $('.display');
  const $startBtn = $('.play');
  let timeRemaining = 3;
  let timerId = null;

  function startStopTimer() {
// Show button input
    showInput();

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
        // $timer.addClass('ringing');
        console.log('Clear Interval Working!');
      }
    }, 1000);
// timerIsRunning = true;
  }
// Hides input box ////////////////////////////////////////////////////////////
  function hideInput() {
    $input.hide();
  }
  hideInput();

// Shows input box
  function showInput() {
    $input.show();
  }
// runs the GO! button
  $startBtn.on('click', startStopTimer);

// Create the direction key function //////////////////////////////////////////

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
  });

  // function moveBall(e) {
  //   switch(e.keyCode) {
  //     case 37:
  //     // animate ball left
  //       break;
  //     case 38:
  //     // animate ball up
  //       break;
  //     case 39:
  //     // animate ball right
  //       break;
  //     case 40:
  //     // animate ball down
  //       break;
  //   }
  //   console.log('ball motion working');
  // }
  // moveBall();

  // setInterval(moveBall, 50); //50 marks the speed of the ball
  // const keys = {};
  //
  // $(document).keydown(function(e) {
  //   keys[e.keyCode] = true;
  // });
  //
  // $(document).keyup(function(e) {
  //   delete keys[e.keyCode];
  // });
  //
  // function moveBall() {
  //   for (var direction in keys) {
  //     if (!keys.hasOwnProperty(direction)) continue;
  //     if (direction == 37) {
  //       $ball.css({left: '-=5'}, 100); //left works fine
  //       console.log('Left');
  //     }
  //     if (direction == 38) {
  //       $ball.css({top: '-=5'}, 100); //top works fine
  //       console.log('Top');
  //     }
  //     if (direction == 39) {
  //       $ball.css({right: '+=5'}, 100); //right still not working
  //       console.log('Right');
  //     }
  //     if (direction == 40) {
  //       $ball.css({down: '+=5'}, 100); //down stil not working
  //       console.log('Down');
  //     }
  //   }
  // }

// Move the ball //////////////////////////////////////////////////////////////


// create the play button /////////////////////////////////////////////////////
  const $play = $('button.play');

  $play.on('click', () => {
    $ball.addClass('circle');
    // $play.html('started');
    console.log('Started');
  });

// Create the reset button ////////////////////////////////////////////////////
  const $reset = $('button.reset');

  $reset.on('click', () => {
    // $reset.html('');
    // $ball.removeClass('circle');
    // $ball.prepend('');
    // $reset.html('started');
    console.log('Restarted');
  });

//Create the 'ball' function///////////////////////////////////////////////////
  const $ball = $('.circle');

  $ball.on('click', () => {
    // $ball.appendTo('.destination');
    console.log('Ball moved');
  });

// Block the edge so the player can't go through it ///////////////////////////

// Create Player direction function ///////////////////////////////////////////

// Create a 'You Won!' message when the player reaches destination ////////////

// Create different difficulties //////////////////////////////////////////////

// Create hide board function /////////////////////////////////////////////////

});

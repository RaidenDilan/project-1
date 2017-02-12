console.log('JS loaded!');
$(() => {

// Show instructions when the key 'I' is pressed and held

// Reset the board if the player runs into a wall within the board. Or don't do this at all.

// Create the walls within the board function

// Create the direction key function
  setInterval(moveBall, 20);
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
      if (direction === 37) {
        $('.circle').animate({left: '-=5'}, 0);
        console.log('left');
      }
      if (direction === 38) {
        $('.circle').animate({top: '-=5'}, 0);
        console.log('top');
      }
      if (direction === 39) {
        $('.circle').animate({right: '+=5'}, 0);
        console.log('right');
      }
      if (direction === 40) {
        $('.circle').animate({down: '+=5'}, 0);
        console.log('down');
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

console.log('JS loaded!');
$(() => {

// Show instructions when the key 'I' is pressed and held

// Reset the board if the player runs into a wall within the board. Or don't do this at all.

// Create the walls within the board function

// Create the direction key function
  const $control = $('control');

  $control.keypress(function() {
    console.log( 'Handler for .keypress() called.' );
  });

// create the play button
  const $play = $('button.play');

  $play.on('click', () => {
    // $play.html('started');
    console.log('Started');
  });

// Create the reset button
  const $reset = $('button.reset');

  $reset.on('click', () => {
    // $ball.prepend('');
    // $reset.html('started');
    console.log('Restarted');
  });

// Create the 'ball' function
  const $ball = $('.circle');

  $ball.on('click', () => {
    $ball.appendTo('.destination');
    console.log('Ball moved');
  });

// Block the edge so the player can't go through it.

// Create Player direction function

// Create a 'You Won!' alert/message when the player reaches the finish destination.

// Cross browser compatibility, if i know how to this.

// Create different difficulties

// Create hide board function

// CONSOLE LOG EVERYTHING!!!
// YES! Console everthing

});

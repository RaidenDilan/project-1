console.log('JS loaded!');
$(() => {

//----------- Show instructions when the key 'I' is pressed and held ---------//

//------ Reset the board if the player runs into a wall within the board -----//

//--------- Create the edges of the board and the arrow key function ---------//
  const $cells = $('li');
  let currentIndex = 0; // ---lets the strt index to be 0--- //
  $cells.eq(currentIndex).addClass('ball'); // ---adds a class of ball--- //

  $(document).keydown(function(e) { //grabs the event listener
    moveBall(e); // ---calls moveBall function--- //
  });

  function moveBall(e) {
    $cells.removeClass('ball'); // ---removes the class of ball--- //
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
    $cells.eq(currentIndex).addClass('ball'); // ---adds a class ball to the arrow key destination--- //
    console.log(currentIndex);
  }
//--------------------------------- OBJECTS ----------------------------------//
  // const $circle = $('.circle');
  // const $hideBoard = $('.hidden'); // hides maze board
  // const $showBoard = $('.show'); // shows maze board
  const $timer = $('.timer');
  const $display = $('.display');
  const $startBtn = $('.play');
  const $result = $('.result');
  const $reset = $('button.reset');
  const $play = $('button.play');
  const $ball = $('.ball');
  const $score = $('.score');
  let time = 3;
  let timerId = null;
  let userScore = 0;

  function startTimer() {
    toggleBoard();  // Toggles the MAZE board -- doesn't work yet
    // $showBoard(); //shows board
    $timer.addClass('active');

    timerId = setInterval(() => {     // --- Starts the timer --- //
      time--;
      $timer.html(time);
      console.log('Set Interval Working!');

      if(time === 0) {      // --- Stops the timer --- //
        clearInterval(timerId);
        $display.html('Game Over');
        $play.html('Play Again');
        toggleBoard();
        // $hideBoard();
        // $timer.addClass('ringing'); //-- this adds a ringing animation --//
        console.log('Clear Interval Working!');
      }
    }, 1000); // --- Stops the timer after 1 seconds --- //
  }
//--------------- Runs the PLAY button and starts the timer ------------------//
  $startBtn.on('click', startTimer);
//---------------------------- The play button -------------------------------//
  $play.on('click', () => {
    $display.html(''); // ---hides the ready display message--- //
    console.log('Started');
  });
//---------------------------- The reset button ------------------------------//
  $reset.on('click', () => {
    userScore = 0; // ---sets user score to 0--- //
    time = 3;
    $score.html(userScore); // ---reset user score--- //
    $timer.html(time);
    $display.html('Ready?'); // ---resets display to READY---//
    $result.text('Result!'); //--- dispays result in the result box ---//
    $timer.removeClass('active'); // ---reset timer to 3 seconds---//
    console.log('Restarted');
  });
//------------------------- The BALL function on CLICK -----------------------//
  // $ball.on('click', () => {
  //   console.log('Ball Clicked');
  // });
//----- Create a 'You Won!' message when the player reaches destination ------//
  // const $winConditions = $('winConditions');
  //
  // function findWinner(ball) {
  //
  //   if (winConditions === currentIndex[8]) return 'You win';
  //   if (winConditions[player2Choice].includes(player1Choice)) return 'You lose';
  //   return 'Tie';
  // }

//-------------------- Create different difficulties -------------------------/

//------------------------ Hidding buttons and boards ------------------------//
  function toggleBoard() { // not working yet
    $play.toggle(); // not working yet
    // $showBoard.toggle(); // hides the maze board
  }
});

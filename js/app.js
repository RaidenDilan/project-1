$(() => {
  const $timer = $('.timer');
  const $display = $('.display');
  const $startBtn = $('.play');
  const $result = $('.result');
  const $reset = $('.reset');
  const $score = $('.score');
  const $scoreboard = $('.score-board');
  const $begin = $('.playgame');
  const $playaudio = $('.playaudio');
  let $cells = null;
  let time = 6;
  let timerId = null;
  let userScore = 0;
  let width = 0;
  let level = null;
  let currentIndex = 0;
  let canMove = false; // when difficulty is chosen you are forbidden to move - false.

  const $grid = $('ul');
//--------------------------- CHOOSE DIFFICULTY------------------------------//
  const $select = $('select');
  const $chosenDifficulty = $('#chosen-difficulty');

  function changeLevel() {
    level = $select.val();
    $chosenDifficulty.html(level); // sets the select value to the chosen difficulty.
    $begin.show(); // shows the play button next to the choose difficulty nav.
  }

  $select.on('change', changeLevel);
  $begin.on('click', buildGrid);
  $begin.hide(); // hides the play button until difficulty is chosen.
  $reset.hide(); // hides the reset button uttil difficulty is chosen.
  $startBtn.hide(); // hides the  button uttil difficulty is chosen.
  $playaudio.hide(); // hides the reset button until difficulty is chosen.
  $result.hide(); // hides the result box until difficulty is chosen.
  $score.hide(); // hides the score box until difficulty is chosen.
  $scoreboard.hide(); // hides the score-board until difficulty is chosen.
  $timer.hide(); // hides the timer until difficulty is chosen.
  $display.hide(); // hides the display until difficulty is chosen.
  $score.html(userScore); //
//----------------------------LEVEL DIFFICULTY------------------------------//
  const level1 = [0,0,0,0,1,0,0,1,0];
  // *                     -----+-----+-----
  // *                    |  0  |  0  |  0  |
  // *                     -----+-----+-----
  // *                    |  0  |  1  |  0  |
  // *                     -----+-----+-----
  // *                    |  0  |  1  |  0  |
  // *                     -----+-----+-----
  const level2 = [0,1,1,0,0,0,0,1,0,1,0,0];
  // *                     -----+-----+-----+-----
  // *                    |  0  |  1  |  1  |  0  |
  // *                     -----+-----+-----+-----
  // *                    |  0  |  0  |  0  |  1  |
  // *                     -----+-----+-----+-----
  // *                    |  0  |  1  |  0  |  0  |
  // *                     -----+-----+-----+-----
  const level3 = [0,1,0,1,0,0,0,0,0,1,1,0,1,1,1,0];
  // *                     -----+-----+-----+-----
  // *                    |  0  |  1  |  0  |  1  |
  // *                     -----+-----+-----+-----
  // *                    |  0  |  0  |  0  |  0  |
  // *                     -----+-----+-----+-----
  // *                    |  0  |  1  |  1  |  0  |
  // *                     -----+-----+-----+-----
  // *                    |  1  |  1  |  1  |  0  |
  // *                     -----+-----+-----+-----
  function buildGrid() {
    let levelArray = []; // levelArray equals to whatever the array will be when the level is selected.
    currentIndex = 0; // currentIndex is set to 0 by default.
    $grid.empty(); // the grid is emptied until the level is chosen.

    switch(level) {
      case 'Level 1':
        levelArray = level1;
        width = 3; // width of the board is 3x3
        break;
      case 'Level 2':
        levelArray = level2;
        width = 4; // width of the board is 4x3
        break;
      case 'Level 3':
        levelArray = level3;
        width = 4; // width of the board is 4x4
        break;
    }
    $begin.hide(); // hides the play button when the grid appears.
    $timer.show(); // shows the timer when the buildGrid function is activated
    $audio0.play(); // pays the audio when the play button is clicked.
    $startBtn.show(); // start button is made visisble after the level is selected and confirmed.
    $reset.show(); // reset button is made visisble after the level is selected and confirmed.
    $playaudio.show(); // play audio button is made vissible after the level is selected and confirmed.
    $result.show(); // shows the result box after the buildGrid function is activated
    $result.html('Result:'); // sets the result bo back to default after it says game over and a different level is played
    $score.show(); // shows the score ->0 after the buildGrid function
    $scoreboard.show(); // shows the score-board after the buildGrid function is activated
    $display.show(); // shows the display after the buildGrid function is activated


    $grid.attr('data-width', width);

    levelArray.forEach((cell) => {
      const $cell = $('<li>'); //
      if (cell === 1) {
        $cell.addClass('wall'); // add a class of wall to the selected cells.
      }
      $cell.appendTo($grid); // appends a class of wall to the selected cells and appends it to the grid.
    });

    $cells = $('li'); // $cells variable equals to the the string of 'li'.
    $cells.eq(currentIndex).addClass('ball'); // add a class of 'ball' to the currentIndex where the player moves it to.
  }
  //----------------------------------TIMER-----------------------------------//
  $startBtn.on('click', startTimer);

  function reset() {
    $startBtn
      .show('Start') // when the reset button is clicked it displays the start button again.
      .html('Play Again'); // when the reset button is clicked it displays the start button again and sets the inerHTML to 'Play Again'.
    $display.html('Try again or try another level'); // changes the display message to the string.
    $playaudio.html(); // after pressing to play again it sets the audio button html back to PAUSE AUDIO as the music will still be playing.
    $score.html(userScore); // changes the userScore innerHTML to Score.
    $reset.hide(); // hides the reset button
    $begin.show(); //shows the play button is the level choice nav.
    $grid.empty(); // empties the grid when the reset button is clicked.
    // $audio1.play();
    canMove = false; // when difficulty is chosen you are able to move - hence true.
  }

  function countDown() {
    time--;
    $timer.html(time);
    $playaudio.html();

    if(time === 0) {
      clearInterval(timerId);
      reset();
      $result.html('Game Over!'); // display the result to the player when the the timer runs out whether the player completes the maze or not
    }
    if(time === 0) {
      time = 6; // if play again is clicked this sets the timer back to defult.
    }
  }

  function startTimer() {
    $display.html('GO!'); // displays the message 'GO!' when the start button is cliked.
    $score.html(userScore); //-----------------
    $timer.addClass('active');
    $begin.hide(); // hides the play button when startimer begins to countdown.
    $reset.show(); // shows the reset button when the startTimer begins to countdown.
    buildGrid(); // builds the grid when the start button is clicked.
    $startBtn.hide(); // hides the start button when the startTimer begins to countdown.
    // $playaudio.html('PAUSE AUDIO');
    canMove = true; // after the level choice is chosen and the start/startimer button is clicked to play you are able to move - hence true.

    timerId = setInterval(countDown, 1000);
  }
//----------------------BALL, ARROW KEYS & WIN CONDITION----------------------//
  $(document).keydown(function(e) {
    moveBall(e);
  });

  function moveBall(e) {
    if(!e.metaKey) e.preventDefault(); //while preventing the scroll navigation of the page, refreshing the page is allowed.
    if(!$cells) return false; // -------------
    $cells.removeClass('ball');
    $audio1.play();
    if (canMove) {
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
          break;
      }
      // $audio1.play();
    }
    if($cells.eq(currentIndex).hasClass('wall')) { // if the cells has a class of wall.
      $cells.eq(currentIndex).addClass('hit'); // this adds the class of hit to the cell.
      removeHitClass(currentIndex); // this removes the hit class after the player goes back to the begining of the maze - to currentIndex.
      currentIndex = 0; //puts player back to the begining of the maze when a wall is hit.
      $display.html('Oops, you ran into a wall!'); //displays message in the display when you've git a wall.
    }
    $cells.eq(currentIndex).addClass('ball'); // adds a class of wall to the chosen cells.

    if (currentIndex === $cells.length-1) { // sets the cells.length-1 to ever level 1, 2, 3.
      $result.html('You Won!'); // display a message in the result box when the player completes the maze until the timer runs out.
      // $display.html('Try again or try another level');
      canMove = false; //after the player reaches the final destination the player is forbidden to move freely around the maze until the the play again button is clicked.
      userScore = time; // adds the remaining time to the scoreboard.
    }
  }

  function removeHitClass(currentIndex) {
    setTimeout(() => {
      $cells.eq(currentIndex).removeClass('hit'); // removes the class of hit to take away the animation.
    }, 100); // animation time is 100 milliseconds.
  }
//-------------------------------RESET BUTTON---------------------------------//
  $reset.on('click', () => {
    userScore = 0; // sets the scoreboard to 0.
    time = 7; // sets the timer back to 5 seconds.
    clearInterval(timerId); // clears the timerId
    $score.html(userScore); //sets score numbrr back to 0.
    $display.html('Ready?'); // displays a message in the display bar.
    $timer.removeClass('active');
    $startBtn.show(); // shows the start button again after the reset button is clicked.
    $begin.show(); // shows the play button in the choose difficulty nav.
    // $audio1.play();
    currentIndex = 0;
  });
// -----------------------------------AUDIO----------------------------------//
  const $audio0 = $('audio').get(0); // 0 = track 1
  const $audio1 = $('audio').get(1);
  let hello = 1;
  $playaudio.on('click', () => {
    if( hello%2 === 0) {
      $audio0.play();
      $playaudio.html('PAUSE AUDIO');
      hello+=1;
    } else {
      $audio0.pause();
      $playaudio.html('PLAY AUDIO');
      hello+=1;
    }
  });
});

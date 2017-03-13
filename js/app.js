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
  let time = null;
  let timerId = null;
  let userScore = null;
  let width = 0;
  let level = null;
  let currentIndex = 0;
  let canMove = false; // when difficulty is chosen you are forbidden to move - false.

  const $grid = $('ul');
//-----------------------------CHOOSE DIFFICULTY------------------------------//
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
  $score.html(userScore); // sets userScore back to ---0---???
//-----------------------------LEVEL DIFFICULTY-------------------------------//
  const level1 = [0,0,0,0,1,0,0,1,0];
  // *                    +-----+-----+-----+
  // *                    |  0  |  0  |  0  |
  // *                    +-----+-----+-----+
  // *                    |  0  |  1  |  0  |
  // *                    +-----+-----+-----+
  // *                    |  0  |  1  |  0  |
  // *                    +-----+-----+-----+
  const level2 = [0,1,1,0,0,0,0,1,0,1,0,0];
  // *                    +-----+-----+-----+-----+
  // *                    |  0  |  1  |  1  |  0  |
  // *                    +-----+-----+-----+-----+
  // *                    |  0  |  0  |  0  |  1  |
  // *                    +-----+-----+-----+-----+
  // *                    |  0  |  1  |  0  |  0  |
  // *                    +-----+-----+-----+-----+
  const level3 = [0,1,0,1,0,0,0,0,0,1,1,0,1,1,1,0];
  // *                    +-----+-----+-----+-----+
  // *                    |  0  |  1  |  0  |  1  |
  // *                    +-----+-----+-----+-----+
  // *                    |  0  |  0  |  0  |  0  |
  // *                    +-----+-----+-----+-----+
  // *                    |  0  |  1  |  1  |  0  |
  // *                    +-----+-----+-----+-----+
  // *                    |  1  |  1  |  1  |  0  |
  // *                    +-----+-----+-----+-----+
  const level4 = [0,1,0,0,0,0,1,0,1,0,0,1,0,1,0,0,0,0,1,0];
  // *                    +-----+-----+-----+-----+-----+
  // *                    |  0  |  1  |  0  |  0  |  0  |
  // *                    +-----+-----+-----+-----+-----
  // *                    |  0  |  1  |  0  |  1  |  0  |
  // *                    +-----+-----+-----+-----+-----
  // *                    |  0  |  1  |  0  |  1  |  0  |
  // *                    +-----+-----+-----+-----+-----
  // *                    |  0  |  0  |  0  |  1  |  0  |
  // *                    +-----+-----+-----+-----+-----+
  const level5 = [0,1,0,0,1,0,1,0,0,0,0,1,0,1,0,0,0,0,1,0,1,1,1,1,0];
  // *                    +-----+-----+-----+-----+-----+
  // *                    |  0  |  1  |  0  |  0  |  1  |
  // *                    +-----+-----+-----+-----+-----
  // *                    |  0  |  1  |  0  |  0  |  0  |
  // *                    +-----+-----+-----+-----+-----
  // *                    |  0  |  1  |  0  |  1  |  0  |
  // *                    +-----+-----+-----+-----+-----
  // *                    |  0  |  0  |  0  |  1  |  0  |
  // *                    +-----+-----+-----+-----+-----+
  // *                    |  1  |  1  |  1  |  1  |  0  |
  // *                    +-----+-----+-----+-----+-----+
  const level6 = [0,0,1,1,0,0,1,0,1,0,0,0,0,0,1,0,1,0,0,1,1,0,1,0 ,0,0,0,0,1,0];
  // *                    +-----+-----+-----+-----+-----+-----+
  // *                    |  0  |  0  |  1  |  1  |  0  |  0  |
  // *                    +-----+-----+-----+-----+-----+-----+
  // *                    |  1  |  0  |  1  |  0  |  0  |  0  |
  // *                    +-----+-----+-----+-----+-----+-----+
  // *                    |  0  |  0  |  1  |  0  |  1  |  0  |
  // *                    +-----+-----+-----+-----+-----+-----+
  // *                    |  0  |  1  |  1  |  0  |  1  |  0  |
  // *                    +-----+-----+-----+-----+-----+-----+
  // *                    |  0  |  0  |  0  |  0  |  1  |  0  |
  // *                    +-----+-----+-----+-----+-----+-----+
  const level7 = [0,0,1,0,0,0,1,0,1,0,1,0,0,0,1,0,1,0,0,1,0,0,1,0,0,1,0,1,1,0,0,0,0,1,1,0];
  // *                    +-----+-----+-----+-----+-----+-----+
  // *                    |  0  |  0  |  1  |  0  |  0  |  0  |
  // *                    +-----+-----+-----+-----+-----+-----+
  // *                    |  1  |  0  |  1  |  0  |  1  |  0  |
  // *                    +-----+-----+-----+-----+-----+-----+
  // *                    |  0  |  0  |  1  |  0  |  1  |  0  |
  // *                    +-----+-----+-----+-----+-----+-----+
  // *                    |  0  |  1  |  0  |  0  |  1  |  0  |
  // *                    +-----+-----+-----+-----+-----+-----+
  // *                    |  0  |  1  |  0  |  1  |  1  |  0  |
  // *                    +-----+-----+-----+-----+-----+-----+
  // *                    |  0  |  0  |  0  |  1  |  1  |  0  |
  // *                    +-----+-----+-----+-----+-----+-----+
  function buildGrid() {
    let levelArray = []; // levelArray equals to whatever the array will be when the level is selected.
    currentIndex = 0; // currentIndex is set to 0 by default.
    $grid.empty(); // the grid is emptied until the level is chosen.

    switch(level) {
      case 'Level 1':
        levelArray = level1;
        width = 3; // width of the board is 3x3
        time = 6; // set time of 5 seconds for level 5
        break;
      case 'Level 2':
        levelArray = level2;
        width = 4; // width of the board is 4x3
        time = 6; // set time of 5 seconds for level 5
        break;
      case 'Level 3':
        levelArray = level3;
        width = 4; // width of the board is 4x4
        time = 11; // set time of 10 seconds for level 5
        break;
      case 'Level 4':
        levelArray = level4;
        width = 5; // width of the board is 5x4
        time = 16; // set time of 10 seconds for level 4
        break;
      case 'Level 5':
        levelArray = level5;
        width = 5; // width of the board is 5x5
        time = 21; // set time of 15 secondsfor level 5
        break;
      case 'Level 6':
        levelArray = level6;
        width = 6; // width of the board is 6x5
        time = 26; // set time of 21 secondsfor level 5
        break;
      case 'Level 7':
        levelArray = level7;
        width = 6; // width of the board is 6x6
        time = 31; // set time of 26 secondsfor level 5
        break;
    }
    $begin.hide(); // hides the play button when the grid appears.
    $timer.show(); // shows the timer when the buildGrid function is activated
    $audio0.play(); // plays the audio when the play button is clicked.
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
    $display.html('Try another level'); // changes the display message to the string.
    $playaudio.html('PAUSE AUDIO'); // after pressing to play again it sets the audio button html back to PAUSE AUDIO as the music will still be playing.
    $score.html(userScore); // changes the userScore innerHTML to Score.
    $reset.hide(); // hides the reset button
    $begin.show(); //shows the play button is the level choice nav.
    $grid.empty(); // empties the grid when the reset button is clicked.
    $begin.hide(); // hides the play button when the maze timer has run down.
    canMove = false; // when difficulty is chosen you are able to move - hence true.
    userScore = time;
  }

  function countDown() {
    time--;
    $timer.html(time);
    $playaudio.html();

    if(time === 0) {
      clearInterval(timerId);
      reset(); // runs the reset function
      $result.html(); // display the result to the player when the the timer runs out whether the player completes the maze or not.
      // $result.html('Game Over!');
    }
    if(time === 0) {
      time = 7; // if play again is clicked this sets the timer back to 6 seconds
    }
  }

  function startTimer() {
    $display.html('GO!'); // displays the message 'GO!' when the start button is cliked.
    $score.html(userScore); //
    $timer.addClass('active');
    $begin.hide(); // hides the play button when startimer begins to countdown.
    $reset.show(); // shows the reset button when the startTimer begins to countdown.
    buildGrid(); // builds the grid when the start button is clicked.
    $startBtn.hide(); // hides the start button when the startTimer begins to countdown.
    canMove = true; // after the level choice is chosen and the start/startimer button is clicked to play you are able to move - hence true.
    // userScore = time; //if i want to keep the score to add it to the next maze level.
    $audio0.pause();

    timerId = setInterval(countDown, 1000);
  }
//----------------------BALL, ARROW KEYS & WIN CONDITION----------------------//
  $(document).keydown(function(e) {
    moveBall(e);
  });

  function moveBall(e) {
    // something to disable the command key
    if(!e.metaKey) e.preventDefault(); //while preventing the scroll navigation of the page, refreshing the page is allowed.
    if(!$cells) return false; // -------------
    $cells.removeClass('ball'); // removes the class of ball from the previus cell to the next
    if (canMove) {
      switch (e.keyCode) {
        case 37: //left arrow key
          if (currentIndex%width !== 0) {
            currentIndex--;
          }
          $audio1.play(); // when pressing the right arrow key a sound will be played.
          // console.log('Left');
          break;
        case 38: //up arrow key
          if (currentIndex > width-1) {
            currentIndex -= width;
          }
          $audio1.play(); // when pressing the right arrow key a sound will be played.
          // console.log('Up');
          break;
        case 39: //right arrow key
          if (currentIndex%width !== width-1) {
            currentIndex++;
          }
          $audio1.play(); // when pressing the right arrow key a sound will be played.
          // console.log('Right');
          break;
        case 40: //down arrow key
          if (currentIndex < ($cells.length - width)) {
            currentIndex += width;
          }
          $audio1.play(); // when pressing the down arrow key a sound will be played.
          // console.log('Down');
          break;
      }
    }
    if($cells.eq(currentIndex).hasClass('wall')) { // if the cells has a class of wall.
      $cells.eq(currentIndex).addClass('hit'); // this adds the class of hit to the cell.
      removeHitClass(currentIndex); // this removes the hit class after the player goes back to the begining of the maze - to currentIndex.
      currentIndex = 0; //puts player back to the begining of the maze when a wall is hit.
      $audio2.play();
      $display.html('Oops, you ran into a wall!'); //displays message in the display when you've git a wall.
      // $audio2.play(); // plays a sound that you hit a wall
    }
    $cells.eq(currentIndex).addClass('ball'); // adds a class of wall to the chosen cells.

    if (currentIndex === $cells.length-1) { // sets the cells.length-1 to ever level 1,2,3,4,5,6,7
      $result.html('You Won!'); // display a message in the result box when the player completes the maze until the timer runs out.
      canMove = false; //after the player reaches the final destination the player is forbidden to move freely around the maze until the the play again button is clicked.
      userScore = time; // adds the remaining time to the scoreboard.
      time = true; // Ends the maze level when sonic reaches the destination.
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
    $score.html(userScore); //sets score number back to 0.
    $display.html('Ready?'); // displays a message in the display bar.
    $timer.removeClass('active');
    $result.html('Result:');
    $startBtn.show(); // shows the start button again after the reset button is clicked.
    $begin.show(); // shows the play button in the choose difficulty nav.
    currentIndex = 0; // puts the player back to cell 0 when the reset button is clicked.
  });
// -----------------------------------AUDIO-----------------------------------//
  const $audio0 = $('.ending').get(0); // 0 = track 1 order goes by the first audio tag inside the index.html
  const $audio1 = $('.ring').get(0); // 1 = track 2 order goes by the second audio tag inside the index.html
  const $audio2 = $('.death').get(0); // 2 = track 3 order goes by the second audio tag inside the index.html
  let hello = 1; //---------

  $playaudio.on('click', () => {
    if(hello%2 === 0) {
      $audio0.play();
      $playaudio.html('PAUSE AUDIO');
      hello+=1;
      console.log('Audio Playing');
    } else {
      $audio0.pause();
      $playaudio.html('PLAY AUDIO');
      hello+=1;
      console.log('Audio Paused');
    }
  });
});

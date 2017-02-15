// const $circle = $('.circle');
// const $hideBoard = $('.hidden'); //hides maze board
// const $showBoard = $('.show'); //shows maze board
  // const $ball = $('.ball'); //no longer needed
  //------------------------------BALL & ARROW KEYS-----------------------------//
  // $(document).keydown(function(e) {
  //   moveBall(e);
  // });
  //
  // function moveBall(e) {
  //   // console.log('inside moveBall()');
  //   if(!e.metaKey) e.preventDefault();
  //   $cells.removeClass('ball');
  //   switch (e.keyCode) {
  //     case 37: //left arrow key
  //       if (currentIndex%width !== 0) {
  //         currentIndex--;
  //       }
  //       break;
  //     case 38: //up arrow key
  //       if (currentIndex > width-1) {
  //         currentIndex -= width;
  //       }
  //       // if (currentIndex < width === width) {
  //       //   currentIndex = currentIndex - 3;
  //       // }
  //       break;
  //     case 39: //right arrow key
  //       if (currentIndex%width !== width-1) {
  //         currentIndex++;
  //       }
  //       break;
  //     case 40: //down arrow key
  //       if (currentIndex < ($cells.length - width)) {
  //         currentIndex += width;
  //       }
  //       // if (currentIndex > $cells.length !== (width+1)) {
  //       //   currentIndex = currentIndex + 3;
  //       // }
  //       break;
  //   }
  //
  //   $cells.eq(currentIndex).addClass('ball');
  //   // console.log(currentIndex);
  // }
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

  // $startBtn.on('click', () => {
  //   // $display.html('GO!');
  //   // console.log('Started');
  // });
//----------------------------------------------------------------------------//

// html

// <ul class="board show hidden" id="level1">
//   <!-- <li class="wall edge-top edge-left"> -->
//   <!-- </li> -->
//   <!-- <li class="wall edge-top"></li> -->
//   <!-- <li class="wall edge-top edge-right"></li> -->
// </ul>
//
// <!-- <ul class="board show hidden" id="level2"> -->
//   <!-- <li class="wall edge-left"></li> -->
//   <!-- <li class="wall edge5"></li> -->
//   <!-- <li class="wall edge-right"></li> -->
// <!-- </ul> -->
//
// <!-- <ul class="board show hidden" id="level3"> -->
//   <!-- <li class="wall edge-left edge-down"></li> -->
//   <!-- <li class="wall edge-down"></li> -->
//   <!-- <li class="wall edge-right edge-down destination"></li> -->
// <!-- </ul> -->

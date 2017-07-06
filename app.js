$(init);

let simonSequence = [];
let sallySequence = [];
let levelCount    = 1;
let sequenceCount = 3;
let $buttons      = null;
let counter       = 0;
let $tile         = null;
let tileLightUp   = 1000;
let nextTile      = 1500;
let $circle;
let $frontCircle;



function init() {
  $frontCircle = $('.frontCircle');
  $($frontCircle).html('WELCOME TO ZIMON THE ZEN SIMON GAME ').toggleClass('animated pulse');
  setTimeout(createSequence, 3000);
}

function createSequence() {
  $($frontCircle).hide(); //hides initial start screen
  $circle = $('.circle p');
  $buttons = $('.board');

  for (var i = 0; i < sequenceCount; i++) {
    var $element = $($buttons[Math.floor(Math.random()*$buttons.length)]);
    const elementId = $element.attr('id');
    simonSequence.push(elementId);
  }
  if (levelCount === 1) {
    $($circle).text('Level ' + levelCount).toggleClass('animated zoomInDown');
    setTimeout(function() {
      $($circle).text('Level ' + levelCount).toggleClass('animated zoomInDown');
    }, 1000);
  }
  showSimonSequence();
}

function showSimonSequence() {
  if (levelCount > 1) {
    $($circle).text('Level ' + levelCount).toggleClass('animated zoomInDown');
    setTimeout(function() {
      $($circle).text('Level ' + levelCount).toggleClass('animated zoomInDown');
    }, 1000);
  }
  const lightUpInterval = setInterval(function() {
    $tile = $(`#${simonSequence[counter]}`);
    // $tile.removeClass('lightOff');
    $tile.addClass('lightUp');

    setTimeout(function(){
      $tile.removeClass('lightUp');
      // $tile.addClass('lightOff');
    }, tileLightUp);

    counter++;
    if (counter === simonSequence.length) {
      clearInterval(lightUpInterval);
      $('.board').removeClass('lightOff');
      setTimeout(function(){
        sallyClicks();
      }, 1000);
      counter = 0;
    }
  }, nextTile);
}


function sallyClicks() {
  $circle.text('Now, your turn.');
  $('.board').mousedown(function() {
    $(this).addClass('lightUp');
    $circle.text('');
  });

  $('.board').mouseup(function() {
      $(this).removeClass('lightUp');
      sallySequence.push($(this).attr('id'));

    if (sallySequence.length === sequenceCount) {
      $('.board').off();
      setTimeout(function(){
        compareSequences();
      }, 500);
    }
  });
}

function compareSequences(){
  const result = JSON.stringify(simonSequence)===JSON.stringify(sallySequence);
  if (result) {
    setTimeout(function(){
      $circle.text('Well done! Lets play again.');
      setTimeout(function(){
        levelUp();
      }, 1000);
    },20);
  }else{
    $circle.text('You really need to concentrate better.');
    setTimeout(function(){
      $buttons = $('.board');
      $buttons.addClass('lightUp');

      setTimeout(function(){
        $circle.text('Lets try again.');
        $('.board').removeClass('lightUp');
          setTimeout(function(){
            reset()
          }, 1700);
      }, 1500);
    }, 1000);

  }
}

function levelUp() {
  clearSally();
  tileLightUp *= 0.85;
  nextTile    *= 0.80;
  levelCount = ++levelCount;
  sequenceCount = ++sequenceCount;
  const newLight = $($buttons[Math.floor(Math.random()*$buttons.length)]).attr('id');
  simonSequence.push(newLight);
  showSimonSequence();
}
function clearSally() {
  sallySequence = [];
}

function reset() {
  simonSequence = [];
  sallySequence = [];
  levelCount    = 1;
  sequenceCount = 3;
  $buttons      = null;
  counter       = 0;
  $tile         = null;
  tileLightUp   = 1000;
  nextTile      = 1500;
  createSequence();

}

$(document).ready(function() {
  window.dancers = [];

  $('.addDancerButton').on('click', function(event) {
    /* This function sets up the click handlers for the create-dancer
     * buttons on dancefloor.html. You should only need to make one small change to it.
     * As long as the "data-dancer-maker-function-name" attribute of a
     * class="addDancerButton" DOM node matches one of the names of the
     * maker functions available in the global scope, clicking that node
     * will call the function to make the dancer.
     */

    /* dancerMakerFunctionName is a string which must match
     * one of the dancer maker functions available in global scope.
     * A new object of the given type will be created and added
     * to the stage.
     */
    var dancerMakerFunctionName = $(this).data('dancer-maker-function-name');

    if (dancerMakerFunctionName === 'BouncyDancer') {
      var startHeight = $('body').height() * Math.random();
      var startWidth = $('body').width() * Math.random();
      var bouncyDancer = new BouncyDancer(
        startHeight,
        startWidth,
        Math.round(1000 / 60),
        10 * Math.random() + 3,
        10 * Math.random() + 3,
        148,
        100
      );
      bouncyDancer.setPosition(startHeight, startWidth);
      $('body').append(bouncyDancer.$node);
    } else if (dancerMakerFunctionName === 'CasualDancer') {
      var range = 500 * Math.random() + 500;
      var startHeight = ($('body').height() - 150) * Math.random();
      var startWidth = ($('body').width() - 150 - range) * Math.random();

      var casualDancer = new CasualDancer(
        startHeight,
        startWidth,
        Math.round(1000 / 60),
        range
      );
      casualDancer.setPosition(startHeight, startWidth);
      $('body').append(casualDancer.$node);
    } else {
      var dancerMakerFunction = window[dancerMakerFunctionName];

      // make a dancer with a random position
      var dancer = new dancerMakerFunction(
        $('body').height() * Math.random(),
        $('body').width() * Math.random(),
        Math.random() * 1000
      );
      $('body').append(dancer.$node);
    }
  });
});

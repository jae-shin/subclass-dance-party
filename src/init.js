$(document).ready(function() {
  window.dancers = [];
  window.currentId = 0;

  $('body').on('click', '.casual-dancer', function(event) {
    var thisDancer = window.dancers.find(function(dancer) {
      return dancer.id === +$(this).attr('data-id');
    }, this);
    if (thisDancer.mode !== 'casualDance') {
      thisDancer.mode = 'casualDance';
      thisDancer.$node.removeClass('conga-line');
      thisDancer.$node.css({cursor: 'default'});
      var range = 500 * Math.random() + 500;
      var startHeight = ($('body').height() - 150) * Math.random();
      var startWidth = ($('body').width() - 150 - range) * Math.random();
      thisDancer.setPosition(startHeight, startWidth);
    }
  });

  $('body').on('click', '.bouncy-dancer', function(event) {
    var thisDancer = window.dancers.find(function(dancer) {
      return dancer.id === +$(this).attr('data-id');
    }, this);
    if (thisDancer.mode !== 'bouncyDance') {
      thisDancer.mode = 'bouncyDance';
      thisDancer.$node.css({transition: ''});
      thisDancer.$node.css({cursor: 'default'});
      thisDancer.$node.removeClass('conga-line');
      var startHeight = ($('body').height() - 300) * Math.random();
      var startWidth = ($('body').width() - 300) * Math.random();
      thisDancer.setPosition(startHeight, startWidth);
    }
  });

  $('#congaLineButton').on('click', function(event) {
    var interval = 10000 / window.dancers.length;
    window.dancers.forEach(function(dancer, index) {
      setTimeout(function() {
        dancer.mode = 'congaLine';
        dancer.$node.css({transition: 'top 2s, left 2s'});
        dancer.$node.css({cursor: 'pointer'});
        dancer.setPosition($('body').height() / 2 - 98, $('body').width() / 2 - 115);
        dancer.$node.addClass('conga-line');

      }, interval * index);
    });
  });

  $('#lineUpButton').on('click', function(event) {

    window.dancers.forEach(function(dancer, index) {
      dancer.$node.removeClass('conga-line');
      dancer.$node.css({transition: 'top 2s, left 2s'});
      dancer.$node.css({cursor: 'pointer'});
      var position = (index + 1) * $('body').width() / (window.dancers.length + 1);
      dancer.lineUp(position);
      dancer.mode = 'lineUp';
    });

  });

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
        window.currentId,
        10 * Math.random() + 3,
        10 * Math.random() + 3,
        148,
        100
      );
      window.currentId++;
      bouncyDancer.setPosition(startHeight, startWidth);
      $('body').append(bouncyDancer.$node);
      window.dancers.push(bouncyDancer);
    } else if (dancerMakerFunctionName === 'CasualDancer') {
      var range = 500 * Math.random() + 500;
      var startHeight = ($('body').height() - 150) * Math.random();
      var startWidth = ($('body').width() - 150 - range) * Math.random();

      var casualDancer = new CasualDancer(
        startHeight,
        startWidth,
        Math.round(1000 / 60),
        window.currentId,
        range
      );
      window.currentId++;
      casualDancer.setPosition(startHeight, startWidth);
      $('body').append(casualDancer.$node);
      window.dancers.push(casualDancer);
    } else {
      var dancerMakerFunction = window[dancerMakerFunctionName];

      // make a dancer with a random position
      var dancer = new dancerMakerFunction(
        $('body').height() * Math.random(),
        $('body').width() * Math.random(),
        Math.random() * 1000,
        window.currentId
      );
      window.currentId++;
      $('body').append(dancer.$node);
      window.dancers.push(dancer);
    }
  });
});

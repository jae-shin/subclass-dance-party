var CasualDancer = function(top, left, timeBetweenSteps, range) {
  this.range = range || 750;
  this.d = 200;
  this.progress = 0;
  this.increment = -1;

  Dancer.call(this, top, left, timeBetweenSteps);
  this.$node = $('<img src="images/casualpenguin-transparent.gif" class="casual-dancer"></img>');
  this.mode = 'casualDance';
};

CasualDancer.prototype = Object.create(Dancer.prototype);
CasualDancer.prototype.constructor = CasualDancer;

CasualDancer.prototype.step = function() {
  Dancer.prototype.step.call(this);

  if (this.mode === 'casualDance') {
    this[this.mode]();
  }
};

CasualDancer.prototype.casualDance = function() {
  var easeInOutCubic = function (t, b, c, d) {
    if ((t /= d / 2) < 1) {
      return c / 2 * t * t * t + b;
    }
    return c / 2 * ((t -= 2) * t * t + 2) + b;
  };

  if (this.progress === this.d || this.progress === 0) {
    this.increment = -this.increment;
  }


  this.progress += this.increment;
  var xOffset = easeInOutCubic(this.progress, this.left, this.range, this.d);

  this.setPosition(this.top, xOffset);
};





// t: current time, b: begInnIng value, c: change In value, d: duration

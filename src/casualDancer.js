var CasualDancer = function(top, left, timeBetweenSteps, speed, range) {
  this.xOffset = 0;
  this.speed = speed || 2;
  this.range = range || 300;
  Dancer.call(this, top, left, timeBetweenSteps);
  this.$node = $('<img src="images/casualpenguin.gif" class="casual-dancer"></img>');
};

CasualDancer.prototype = Object.create(Dancer.prototype);
CasualDancer.prototype.constructor = CasualDancer;

CasualDancer.prototype.step = function() {
  Dancer.prototype.step.call(this);

  if (this.xOffset + this.speed > this.range || this.xOffset + this.speed < -this.range) {
    this.speed = -this.speed;
  }
  this.xOffset += this.speed;

  this.setPosition(this.top, this.left + this.xOffset);
};
var LeaderDancer = function(top, left, timeBetweenSteps) {
  Dancer.call(this, top, left, timeBetweenSteps);
  this.$node = $('<img src="images/polarbear.gif" class="leader-dancer"></img>');
  this.mode = 'leadDance';
};

LeaderDancer.prototype = Object.create(Dancer.prototype);
LeaderDancer.prototype.constructor = LeaderDancer;

LeaderDancer.prototype.step = function() {
  // call the old version of step at the beginning of any call to this new version of step
  Dancer.prototype.step.call(this);

  if (this.mode === 'leadDance') {
    this[this.mode]();
  }
};

LeaderDancer.prototype.leadDance = function() {
  // if we're outside the max radius of the mouse,
  // move maxSpeed units toward the mouse's position
  var dist = distance(mouseX, mouseY, this.left, this.top);
  if (dist > this.maxRadius) {
    var deltaX = (mouseX - this.left) * this.maxSpeed / dist;
    var deltaY = (mouseY - this.top) * this.maxSpeed / dist;

    this.left = this.left + deltaX;
    this.top = this.top + deltaY;
    this.setPosition(this.top, this.left);
  }
};

LeaderDancer.prototype.disappearDance = function() {
  this.$node.css({transition: 'top 5s, left 5s'});
  this.left = -400;
  this.top = 700;
  this.setPosition(this.top, this.left);
};

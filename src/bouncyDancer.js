var BouncyDancer = function(top, left, timeBetweenSteps, id, speedX, speedY, height, width) {
  this.speedX = speedX || 4;
  this.speedY = speedY || 4;
  this.height = height || 0;
  this.width = width || 0;
  Dancer.call(this, top, left, timeBetweenSteps, id);
  this.$node = $('<img src="images/owl.png" class="bouncy-dancer" data-id="' + this.id + '"></img>');
  this.mode = 'bouncyDance';
};

BouncyDancer.prototype = Object.create(Dancer.prototype);
BouncyDancer.prototype.constructor = BouncyDancer;

BouncyDancer.prototype.step = function() {
  // call the old version of step at the beginning of any call to this new version of step
  Dancer.prototype.step.call(this);

  if (this.mode === 'bouncyDance' || this.mode === 'leadDance') {
    this[this.mode]();
  }
};

BouncyDancer.prototype.bouncyDance = function() {
  var maxY = $('body').height();
  var maxX = $('body').width();
  // calculate the current position of the bouncyDancer
  // update its position on the page
  var newY = this.top + this.speedY;
  var newX = this.left + this.speedX;

  if (newX - this.width / 2 < 0) {
    this.speedX = 0 - this.speedX;
    this.left = 0 + this.width / 2;
  } else if (newX + this.width / 2 > maxX) {
    this.speedX = 0 - this.speedX;
    this.left = maxX - this.width / 2;
  } else {
    this.left = newX;
  }

  if (newY - this.height / 2 < 0) {
    this.speedY = 0 - this.speedY;
    this.top = 0 + this.height / 2;
  } else if (newY + this.height / 2 > maxY) {
    this.speedY = 0 - this.speedY;
    this.top = maxY - this.height / 2;
  } else {
    this.top = newY;
  }

  this.setPosition(this.top, this.left);
};
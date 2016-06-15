// Creates and returns a new dancer object that can step
var Dancer = function(top, left, timeBetweenSteps, id) {
  // use jQuery to create an HTML <span> tag
  this.top = top;
  this.left = left;
  this.timeBetweenSteps = timeBetweenSteps;
  this.id = id;
  this.$node = $('<span class="dancer" data-id="' + this.id + '"></span>');
  this.step();
  this.mode = 'default'; // string of method name
  this.maxRadius = 100;
  this.maxSpeed = 20;

  // now that we have defined the dancer object, we can start setting up important parts of it by calling the methods we wrote
  // this one sets the position to some random default point within the body
  this.setPosition(this.top, this.left);
};

Dancer.prototype.step = function() {
  // the basic dancer doesn't do anything interesting at all on each step,
  // it just schedules the next step

  setTimeout(this.step.bind(this), this.timeBetweenSteps);
};

Dancer.prototype.setPosition = function(top, left) {
  // Use css top and left properties to position our <span> tag
  // where it belongs on the page. See http://api.jquery.com/css/

  var styleSettings = {
    top: top,
    left: left
  };
  this.$node.css(styleSettings);
};

Dancer.prototype.lineUp = function(xPosition) {
  this.setPosition($('body').height() / 2, xPosition);
};

Dancer.prototype.leadDance = function() {
  // if we're outside the max radius of the mouse,
  // move maxSpeed units toward the mouse's position
  var dist = distance(this.leader.left, this.leader.top, this.left, this.top);
  if (dist > this.maxRadius) {
    var deltaX = (this.leader.left - this.left) * this.maxSpeed / dist;
    var deltaY = (this.leader.top - this.top) * this.maxSpeed / dist;

    this.left = this.left + deltaX;
    this.top = this.top + deltaY;
    this.setPosition(this.top, this.left);
  }
};
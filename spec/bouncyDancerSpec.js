describe('BouncyDancer', function() {
  var bouncyDancer, clock;
  var timeBetweenSteps = 100;

  beforeEach(function() {
    clock = sinon.useFakeTimers();
    bouncyDancer = new BouncyDancer(10, 10, 17, 4, 6, 4, 4);
  });

  it('should have a jQuery $node object', function() {
    expect(bouncyDancer.$node).to.be.an.instanceof(jQuery);
  });

  it('should have a step function that calculates its new position', function() {

    sinon.spy(bouncyDancer.$node, 'toggle');
    bouncyDancer.step();
    expect(bouncyDancer.$node.toggle.called).to.be.true;
  });

  it('should have a step function that make the dancer bounce off the boundaries', function() {
    sinon.spy(bouncyDancer.$node, 'toggle');
    bouncyDancer.step();
    expect(bouncyDancer.$node.toggle.called).to.be.true;
  });


});

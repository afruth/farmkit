Meteor.publish('lightingCycles', function() {
  return LightingCycles.find();
});
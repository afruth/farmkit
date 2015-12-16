Meteor.publish('nurientMixes', function() {
  return NurientMixes.find();
});
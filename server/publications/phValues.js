Meteor.publish('phValues', function() {
  return PHValues.find();
});
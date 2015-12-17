Meteor.publish('pollination', function() {
  return Pollination.find();
});
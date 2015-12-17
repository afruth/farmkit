Meteor.publish('waterings', function() {
  return Waterings.find();
});
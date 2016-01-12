
Meteor.publish('growingMedia', function() {
  return GrowingMedia.find();
});
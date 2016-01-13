
Meteor.publish('growingmedia', function() {
  return GrowingMedia.find();
});
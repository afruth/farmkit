Meteor.publish('fertilizers', function() {
  return Fertilizers.find();
});
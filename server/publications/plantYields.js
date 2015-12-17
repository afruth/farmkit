Meteor.publish('plantYields', function() {
  return PlantYields.find();
});
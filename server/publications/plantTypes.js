Meteor.publish('plantTypes', function() {
  return PlantFamilies.find();
});
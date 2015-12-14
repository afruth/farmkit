Meteor.publish('plantAreas', function() {
  return PlantAreas.find();
});
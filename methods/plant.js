Meteor.methods({
  "/plant/add": function(plant) {
    console.log(plant)
    if (plant.validate()) {
      plant.save();
      return plant;
    }
    console.log(plant)
    plant.throwValidationException();
  }
});
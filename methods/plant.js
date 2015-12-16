Meteor.methods({
  "/plant/add": function(plant) {
    console.log(plant)
    if (plant.validate()) {
      plant.save();
      return plant;
    }
    console.log(plant)
    plant.throwValidationException();
  },
	"/plant/remove": function(plantId) {
		check(plantId, String);

		var plant = Plant.findOne(plantId);

		if(plant)
			plant.remove()
		//if(plant.remove()) {
		//	return (null, true);
		//}
	}
});
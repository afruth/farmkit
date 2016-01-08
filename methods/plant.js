Meteor.methods({
  "/inventory/add": function(plant) {
    if (plant.validate()) {
      plant.save();
      return plant;
    }
    plant.throwValidationException();
  },
	"/inventory/delete": function(plantId) {
		check(plantId, String);

		var plant = Inventory.findOne(plantId);

		if(plant)
			plant.remove()

	}
});
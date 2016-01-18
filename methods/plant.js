Meteor.methods({
  "/inventory/add": function(plant) {
    if (plant.validate()) {
      plant.save();
      return plant;
    }
    plant.throwValidationException();
  },
  "/system/add": function(system) {
    if (system.validate()) {
      system.save();
      return system;
    }
    system.throwValidationException();
  },
  "/inventory/delete": function(plantId) {
    check(plantId, String);

    var plant = Inventory.findOne(plantId);

    if(plant)
      plant.remove()
  },
	"/system/delete": function(systemId) {
		check(systemId, String);

		var system = Systems.findOne(systemId);

		if(system)
			system.remove()
	}
});
Meteor.methods({
  "/inventory/add": function(plant) {
    if (plant.validate()) {
      plant.save();

      // Save new plant to it's parent System
      let system = Systems.findOne( plant.systemId )

      // returns a string if it finds a match, otherwise undefined
      let familyMatch = _.find( system.activePlantFamilies, function(x) {
        return x.familyId === plant.plantType;
      });
      // if the plant type is in the system, add it to the array
      if( familyMatch ){
        Systems.update( { 
          _id: plant.systemId, 
          "activePlantFamilies.familyId": plant.plantType // sets wildcard '$'
        }, {
          $push: {
            "activePlantFamilies.$.plants": plant._id
          }
        });
      } else { // otherwise add the plant family
        Systems.update( plant.systemId, {
          $push: {
            activePlantFamilies: {
              name: plant.plantTypeName,
              familyId: plant.plantType,
              plants: [ plant._id ]
            }
          }
        });
      }

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
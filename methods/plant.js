Meteor.methods({
  "/inventory/add": function(plant) {
    if (plant.validate()) {
      plant.save();

      console.log("plant method")
      console.log(plant)

      let system = Systems.findOne( plant.systemId )
      console.log(system)

      // if the plant type is in the system, add it to the array
      if( system.activePlantFamilies.familyId === plant.plantType ){
        // system.activePlantFamilies.plants.push( plant._id );

        Systems.update( { _id: plant.systemId, familyId: plant.plantType }, {
          $push: {
            activePlantFamilies: {
              plants: plant._id
            }
          }
        });
      } else { // otherwise add the plant family
        // system.activePlantFamilies.push({
        //   name: plant.plantTypeName,
        //   familyId: plant.plantType,
        //   plants: [ plant._id ]
        // });

        Systems.update( plant.systemId, {
          $set: {
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
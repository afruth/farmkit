Meteor.publishComposite('plantList', function(context) {
	return {
		find: function() {
			context.transform = null;
			Counts.publish(this, 'totalPlants', Plants.find());
			return Plants.find({},context);
		},
		children: [
			{
				find: function(plant)  {
					return PlantAreas.find({
						_id: plant.areaId
					},{
						transform: null
					});
				}
			},
			{
				find: function(plant)  {
					return PlantFamilies.find({
						_id: plant.plantType
					},{
						transform: null
					});
				}
			}
		]
	}
});
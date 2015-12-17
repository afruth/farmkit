Meteor.publishComposite('plantList', function(context) {
	return {
		find: function() {
			context.transform = null;
			Counts.publish(this, 'totalPlants', Plants.find());
			var query = {};

			if (context.searchTerm) {
				let parsedSearchTerm = new RegExp(context.searchTerm.split(' ').join('|'));

				query['plantName'] =
					{
						$regex: parsedSearchTerm, $options: 'i'
					}
			}
			delete context.searchTerm;
			return Plants.find(query,context);
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
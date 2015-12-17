Meteor.publishComposite('plantList', function(context) {
	return {
		find: function() {
			context.transform = null;
			Counts.publish(this, 'totalPlants', Plants.find());
			var query = {};

			if (context.searchTerm && !_.isEmpty(context.searchTerm)) {
				query['$and'] = [];
				for (key in context.searchTerm) {
					if (!_.isEmpty(context.searchTerm[key])) {
						let regex = new RegExp(context.searchTerm[key].split(' ').join('|'));
						let tempObj = {};
						tempObj[key] = {
							$regex: regex, $options: 'i'
						};
						query['$and'].push(tempObj);
					}
				}
			}
			delete context.searchTerm;
			console.log(query);
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
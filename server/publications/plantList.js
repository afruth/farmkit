Meteor.publish('plantList', function(context) {
	check(context, Object);

	return Plants.find({},context);
})
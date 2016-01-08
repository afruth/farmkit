Meteor.publish('plant', function(docId) {
	check(docId, String);

	return Inventory.find({
		_id: docId
	});
})
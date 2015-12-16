Meteor.publish('plant', function(docId) {
	check(docId, String);

	return Plants.find({
		_id: docId
	});
})
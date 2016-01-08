Meteor.publish('systems', function() {
  return Systems.find();
});
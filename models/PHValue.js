PHValues = new Mongo.Collection('phValues');

PHValue = new Astro.Class({
  name: 'PHValue',
  fields: {
    name: 'string',
    phId: 'string'
  },
  relations: {
    plants: {
      type: 'many',
      class: 'Plant',
      local: '_id',
      foreign: 'phId'
    }
  },
  behaviours: {
    timestamp: {}
  }
});

if (Meteor.isServer) PHValues.permit(['insert', 'update', 'remove']).apply();
// Tracks ph readings of a plant

PHValues = new Mongo.Collection('phValues');

PhHistory = Astro.Class({
  name: 'PhHistory',
  fields: {
    reading: 'number',
    date: 'date'
  }
});

PHValue = new Astro.Class({
  name: 'PHValue',
  collection: PHValues,
  fields: {
    phId: 'string',
    phReadings: {
      type: 'array',
      nested: 'PhHistory',
      default: function () {
        return [];
      }
    }
  },
  // Need to know which plant these readings go to
  relations: {
    inventories: {
      type: 'many',
      class: 'Inventory',
      local: '_id',
      foreign: 'phId'
    }
  },
  behaviours: {
    timestamp: {}
  }
});

if (Meteor.isServer) PHValues.permit(['insert', 'update', 'remove']).apply();
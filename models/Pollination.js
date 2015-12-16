// Tracks number of times a plant has been pollinated

Pollination = new Mongo.Collection('pollination');

PollinationHistory = Astro.Class({
  name: 'PollinationHistory',
  fields: {
    pollinationDate: 'date',
    method: 'string'
  }
});

Pollinate = new Astro.Class({
  name: 'Pollinate',
  fields: {
    name: 'string',
    pollenId: 'string',
    pollinationHistory: {
      type: 'array',
      nested: 'PollinationHistory',
      default: function () {
        return [];
      }
    }
  },
  relations: {
    plants: {
      type: 'many',
      class: 'Plant',
      local: '_id',
      foreign: 'pollenId'
    },
    plantFamily: {
      type: 'one',
      class: 'PlantFamily',
      foreign: 'plantType',
      local: '_id'
    }
  },
  behaviours: {
    timestamp: {}
  }
});

if (Meteor.isServer) Pollination.permit(['insert', 'update', 'remove']).apply();
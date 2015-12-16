// Tracks when a plant has been watered. 

Waterings = new Mongo.Collection('media');

WateringHistory = Astro.Class({
  name: 'WateringHistory',
  fields: {
    wateringDate: 'date'
  }
});

Watering = new Astro.Class({
  name: 'Watering',
  fields: {
    name: 'string',
    wateringId: 'string',
    WateringHistory: {
      type: 'array',
      nested: 'WateringHistory',
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
      foreign: 'wateringId'
    }
  },
  behaviours: {
    timestamp: {}
  }
});

if (Meteor.isServer) Waterings.permit(['insert', 'update', 'remove']).apply();
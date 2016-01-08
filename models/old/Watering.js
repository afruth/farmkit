// Tracks when a plant has been watered. 

Waterings = new Mongo.Collection('waterings');

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
    inventories: {
      type: 'many',
      class: 'Inventory',
      local: '_id',
      foreign: 'wateringId'
    }
  },
  behaviours: {
    timestamp: {}
  }
});

if (Meteor.isServer) Waterings.permit(['insert', 'update', 'remove']).apply();
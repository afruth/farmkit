Waterings = new Mongo.Collection('media');

Watering = new Astro.Class({
  name: 'Watering',
  fields: {
    name: 'string',
    wateringId: 'string'
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
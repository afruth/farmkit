LightingCycles = new Mongo.Collection('lightingCycles');

LightingCycle = new Astro.Class({
  name: 'LightingCycle',
  fields: {
    name: 'string',
    lightingId: 'string'
  },
  relations: {
    plants: {
      type: 'many',
      class: 'Plant',
      local: '_id',
      foreign: 'lightingId'
    }
  },
  behaviours: {
    timestamp: {}
  }
});

if (Meteor.isServer) LightingCycles.permit(['insert', 'update', 'remove']).apply();
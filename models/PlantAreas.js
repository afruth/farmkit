PlantAreas = new Mongo.Collection('areas');

PlantArea = new Astro.Class({
  name: 'PlantArea',
  collection: PlantAreas,
  fields: {
    name: 'string'
  },
  relations: {
    plants: {
      type: 'many',
      class: 'Plant',
      local: '_id',
      foreign: 'areaId'
    }
  },
  behaviours: {
    timestamp: {}
  }
});

if (Meteor.isServer) PlantAreas.permit(['insert', 'update', 'remove']).apply();
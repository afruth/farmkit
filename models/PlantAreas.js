PlantAreas = new Mongo.Collection('areas');

PlantArea = new Astro.Class({
  name: 'PlantArea',
  collection: PlantAreas,
  fields: {
    name: 'string',
    areaId: 'string'
  },
  relations: {
    inventories: {
      type: 'many',
      class: 'Inventory',
      local: '_id',
      foreign: 'areaId'
    }
  },
  behaviours: {
    timestamp: {}
  }
});

if (Meteor.isServer) PlantAreas.permit(['insert', 'update', 'remove']).apply();
PlantFamilies = new Mongo.Collection('plantfamilies');

PlantFamily = new Astro.Class({
  name: 'PlantFamily',
  collection: PlantFamilies,
  fields: {
    name: 'string',
    plantFamilyImages: {
      type: 'array'
    },
    description: {
      type: 'string',
      optional: true
    },
    avgGerminationTime: {
      type: 'number',
      optional: true
    },
    avgDaysToHarvest: {
      type: 'number',
      optional: true
    },
    avgPlantYield: { 
      type: 'number', 
      optional: true
    },
    plantYieldUnit: 'string',
    requiresPollination: {
      type: 'boolean',
      optional: true
    },
    desiredLight: {
      type: 'string',
      optional: true
    },
    growingZone: {
      type: 'string',
      optional: true
    },
    preferredConditions: {
      type: 'string',
      optional: true
    },
  },
  relations: {
    inventories: {
      type: 'many',
      class: 'Inventory',
      local: '_id',
      foreign: 'plantType'
    }
  },
  behaviours: {
    timestamp: {}
  }
});

if (Meteor.isServer) PlantFamilies.permit(['insert', 'update', 'remove']).apply();
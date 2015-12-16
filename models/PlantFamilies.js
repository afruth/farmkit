PlantFamilies = new Mongo.Collection('plantfamilies');

PlantFamily = new Astro.Class({
  name: 'PlantFamily',
  collection: PlantFamilies,
  fields: {
    name: 'string',
    plantType: 'string',
    description: {
      type: 'string',
      optional: true
    },
    daysToHarvest: {
      type: 'number',
      optional: true
    },
    avgPlantYield: { // Needs a unit of measurement, or change type to string
      type: 'number', 
      optional: true
    }
  },
  relations: {
    plants: {
      type: 'many',
      class: 'Plant',
      local: '_id',
      foreign: 'plantType'
    }
  },
  behaviours: {
    timestamp: {}
  }
});

if (Meteor.isServer) PlantFamilies.permit(['insert', 'update', 'remove']).apply();
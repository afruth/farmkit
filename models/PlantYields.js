// PlantYields could be an attribute of PlantFamilies, but we need a way to track 
//    this based on different growing systems, conditions, and fertilizer schedules. 

PlantYields = new Mongo.Collection('plantYields');

Harvest = Astro.Class({
  name: 'Harvest',
  fields: {
    amount: 'number',
    unit: {
      type: 'string',
      default: 'fruits'
    },
    harvestDate: 'date'
  }
});

PlantYield = new Astro.Class({
  name: 'PlantYield',
  collection: PlantYields,
  fields: {
    yieldId: 'string',
    harvests: {
      type: 'array',
      nested: 'Harvest',
      default: function () {
        return [];
      }
    }
  },
  // Need to track the individual plant and plantFamily 
  relations: {
    plants: {
      type: 'many',
      class: 'Plant',
      local: '_id',
      foreign: 'yieldId'
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

if (Meteor.isServer) PlantYields.permit(['insert', 'update', 'remove']).apply();
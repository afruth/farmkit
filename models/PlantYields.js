// PlantYields could be an attribute of PlantFamilies, but we need a way to track 
//    this based on different growing systems, conditions, and fertilizer schedules. 

PlantYields = new Mongo.Collection('plantYields');

PlantYield = new Astro.Class({
  name: 'PlantYield',
  fields: {
    yieldId: 'string',
    amount: 'number',
    unit: {
      type: 'string',
      default: 'fruits'
    }
  },
  relations: {
    plants: {
      type: 'many',
      class: 'Plant',
      local: '_id',
      foreign: 'yieldId'
    }
  },
  behaviours: {
    timestamp: {}
  }
});

if (Meteor.isServer) PlantYields.permit(['insert', 'update', 'remove']).apply();
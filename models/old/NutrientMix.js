// This collection keeps track of the nutrient mix for hydroponic setups

NutrientMixes = new Mongo.Collection('nutrientMixes');

NutrientMix = new Astro.Class({
  name: 'NutrientMix',
  collection: NutrientMixes,
  fields: {
    nutrientId: 'string',
    name: 'string',
    manufacturer: 'string',
    state: 'string', // solid, liquid, etc... 
    mix: {
      nitrogen: 'number',
      phosophorus: 'number',
      potassium: 'number',
      dilution: 'string'
    }
  },
  // It's useful to know how many plant you have on the same nutrient mix
  relations: {
    inventories: {
      type: 'many',
      class: 'Inventory',
      local: '_id',
      foreign: 'nutrientId'
    }
  },
  behaviours: {
    timestamp: {}
  }
});

if (Meteor.isServer) NutrientMixes.permit(['insert', 'update', 'remove']).apply();
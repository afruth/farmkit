NutrientMixes = new Mongo.Collection('nutrientMixes');

NutrientMix = new Astro.Class({
  name: 'NutrientMix',
  fields: {
    name: 'string',
    nutrientId: 'string'
  },
  relations: {
    plants: {
      type: 'many',
      class: 'Plant',
      local: '_id',
      foreign: 'nutrientId'
    }
  },
  behaviours: {
    timestamp: {}
  }
});

if (Meteor.isServer) NutrientMixes.permit(['insert', 'update', 'remove']).apply();
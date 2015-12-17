// Keeps track of the fertilizing schedule and fertilizer type. 
//    Not to be confused with Nutrients. Likely only used/useful with dirt medium


Fertilizers = new Mongo.Collection('fertilizers');

FertilizerHistory = Astro.Class({
  name: 'FertilizerHistory',
  fields: {
    applicationDate: 'date',
    mix: {
      nitrogen: 'number',
      phosophorus: 'number',
      potassium: 'number'
    }
  }
});

Fertilizer = new Astro.Class({
  name: 'Fertilizer',
  collection: Fertilizers,
  fields: {
    name: 'string',
    applications: { 
      type: 'array',
      nested: 'FertilizerHistory',
      default: function () {
        return [];
      }
    },
    fertilizerId: 'string'
  },
  behaviours: {
    timestamp: {}
  }
});

if (Meteor.isServer) Fertilizers.permit(['insert', 'update', 'remove']).apply();
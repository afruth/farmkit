// Keeps track of the fertilizing schedule and fertilizer type. 
//    Not to be confused with Nutrients. Likely only used/useful with dirt medium


Fertilizers = new Mongo.Collection('fertilizers');

Fertilizer = new Astro.Class({
  name: 'Fertilizer',
  fields: {
    name: 'string',
    mix: {
      nitrogen: 'number',
      phosophorus: 'number',
      potassium: 'number'
    },
    applications: { // TODO: need to force the array to contain dates only
      type: 'array'
    },
    fertilizerId: 'string'
  },
  behaviours: {
    timestamp: {}
  }
});

if (Meteor.isServer) Fertilizers.permit(['insert', 'update', 'remove']).apply();
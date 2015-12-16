Pollination = new Mongo.Collection('pollination');

Pollinate = new Astro.Class({
  name: 'Pollinate',
  fields: {
    name: 'string',
    pollenId: 'string'
  },
  relations: {
    plants: {
      type: 'many',
      class: 'Plant',
      local: '_id',
      foreign: 'pollenId'
    }
  },
  behaviours: {
    timestamp: {}
  }
});

if (Meteor.isServer) Pollination.permit(['insert', 'update', 'remove']).apply();
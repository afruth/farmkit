GrowingMedia = new Mongo.Collection('growingMedia');

GrowingMedium = new Astro.Class({
  name: 'GrowingMedium',
  fields: {
    name: 'string'
  },
  relations: {
    plants: {
      type: 'many',
      class: 'Plant',
      local: '_id',
      foreign: 'growingMedium'
    }
  },
  behaviours: {
    timestamp: {}
  }
});

if (Meteor.isServer) GrowingMedia.permit(['insert', 'update', 'remove']).apply();
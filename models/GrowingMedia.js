GrowingMedia = new Mongo.Collection('growingMedia');

GrowingMedium = new Astro.Class({
  name: 'GrowingMedium',
  fields: {
    name: 'string',
    growingMediumId: 'string'
  },
  relations: {
    plants: {
      type: 'many',
      class: 'Plant',
      local: '_id',
      foreign: 'growingMediumId'
    }
  },
  behaviours: {
    timestamp: {}
  }
});

if (Meteor.isServer) GrowingMedia.permit(['insert', 'update', 'remove']).apply();
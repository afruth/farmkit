GrowingMedia = new Mongo.Collection('media');

GrowingMedium = new Astro.Class({
  name: 'GrowingMedium',
  fields: {
    name: 'string'
  },
  relations: {
    media: {
      type: 'many',
      class: 'Medium',
      local: '_id',
      foreign: 'areaId'
    }
  },
  behaviours: {
    timestamp: {}
  }
});

if (Meteor.isServer) GrowingMedia.permit(['insert', 'update', 'remove']).apply();
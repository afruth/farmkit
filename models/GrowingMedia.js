// A collection of different growing media (dirt, clay pellets, NTF, etc..)


GrowingMedia = new Mongo.Collection('growingMedia');

GrowingMedium = new Astro.Class({
  name: 'GrowingMedium',
  collection: GrowingMedia,
  fields: {
    name: 'string',
    mediumType: 'string',
    growingMediumId: 'string',
    description: 'string'
  },
  // May want to know which plants have been grown in which medium
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
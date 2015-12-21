// A collection of different growing media (dirt, clay pellets, NTF, etc..)


GrowingMedia = new Mongo.Collection('growingmedia');

GrowingMedium = new Astro.Class({
  name: 'GrowingMedium',
  collection: GrowingMedia,
  fields: {
    name: 'string',
    mediumType: 'string',
    growingMediumId: 'string',
    description: {
      type: 'string',
      optional: true
    }
  },
  // May want to know which plants have been grown in which medium
  relations: {
    inventories: {
      type: 'many',
      class: 'Inventory',
      local: '_id',
      foreign: 'growingMediumId'
    }
  },
  behaviours: {
    timestamp: {}
  }
});

if (Meteor.isServer) GrowingMedia.permit(['insert', 'update', 'remove']).apply();
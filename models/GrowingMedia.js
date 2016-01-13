// A collection of different growing media (dirt, clay pellets, NTF, etc..)


GrowingSubstance = new Mongo.Collection('growingsubstance');

GrowingMedium = new Astro.Class({
  name: 'GrowingMedium',
  collection: GrowingSubstance,
  fields: {
    name: 'string',
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

if (Meteor.isServer) GrowingSubstance.permit(['insert', 'update', 'remove']).apply();

Systems = new Mongo.Collection('systems');

System = new Astro.Class({
  name: 'System',
  collection: Systems,
  fields: {
    name: 'string',
    areaId: 'string'
  },
  relations: {
    inventories: {
      type: 'many',
      class: 'Inventory',
      local: '_id',
      foreign: 'areaId'
    }
  },
  behaviours: {
    timestamp: {}
  }
});

if (Meteor.isServer) Systems.permit(['insert', 'update', 'remove']).apply();
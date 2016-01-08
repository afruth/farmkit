Systems = new Mongo.Collection('systems');

System = new Astro.Class({
  name: 'System',
  collection: Systems,
  fields: {
    name: 'string',
    systemId: 'string'
  },
  relations: {
    inventories: {
      type: 'many',
      class: 'Inventory',
      local: '_id',
      foreign: 'systemId'
    }
  },
  behaviours: {
    timestamp: {}
  }
});

if (Meteor.isServer) Systems.permit(['insert', 'update', 'remove']).apply();
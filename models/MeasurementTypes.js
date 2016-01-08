MeasurementTypes = new Mongo.Collection('measurement-types');

MeasurementType = new Astro.Class({
  name: 'MeasurementType',
  collection: MeasurementTypes,
  fields: {
    plantId: 'string',
    measurementType: 'string',
    measurementValue: 'string'
  },
  relations: {
    inventory: {
      type: 'one',
      class: 'Inventory',
      local: 'plantId',
      foreign: '_id'
    },
    measurement: {
      type: 'one',
      class: 'MeasurementType',
      local: 'measurementType',
      foreign: '_id'
    }
  },
  behaviours: {
    timestamp: {}
  }
});

if (Meteor.isServer) MeasurementTypes.permit(['insert', 'update', 'remove']).apply();
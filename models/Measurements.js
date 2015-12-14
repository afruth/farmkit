Measurements = new Mongo.Collection('measurements');

Measurement = new Astro.Class({
  name: 'Measurement',
  collection: Measurements,
  fields: {
    plantId: 'string',
    measurementType: 'string',
    measurementValue: 'string'
  },
  relations: {
    plant: {
      type: 'one',
      class: 'Plant',
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
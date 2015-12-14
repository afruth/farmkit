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
  }
});
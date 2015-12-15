Plants = new Mongo.Collection('plants');

var reqStr = Validators.and([
  Validators.required('Plant type is required'),
  Validators.string('Plant type is wrong')
]);

Plant = Astro.Class({
  name: 'Plant',
  collection: Plants,
  transform: null,
  fields: {
    plantType: 'string',
    plantName: {
      type: 'string',
      default: function() {
        return 'Plant ' + Random.id()
      }
    },
    datePlanted: {
      type: 'date'
    },
    areaId: 'string',
    tags: {
      type: 'array',
      nested: 'string',
      default: function() {
        return []
      },
      optional: true
    }
  },
  relations: {
    plantFamily: {
      type: 'one',
      class: 'PlantFamily',
      local: 'plantType',
      foreign: '_id'
    },
    plantArea: {
      type: 'one',
      class: 'PlantArea',
      local: 'areaId',
      foreign: '_id'
    },
    medium: {
      type: 'one',
      class: 'GrowingMedium',
      local: 'medium',
      foreign: '_id'
    },
    watering: {
      type: 'one',
      class: 'Watering',
      local: 'watering',
      foreign: '_id'
    }
  },
  validators: {
    plantType: reqStr,
    datePlanted: Validators.required('Date of plantation is required'),
    areaId: reqStr
  },
  behaviours: {
    timestamp: {}
  }
});

if (Meteor.isServer) Plants.permit(['insert', 'update', 'remove']).apply();
Inventories = new Mongo.Collection('inventory');

var reqStr = Validators.and([
  Validators.required('Plant type is required'),
  Validators.string('Plant type is wrong')
]);

Inventory = Astro.Class({
  name: 'Inventory',
  collection: Inventories,
  transform: null,
  fields: {
    plantType: 'string',
    plantTypeName: 'string',
    plantName: {
      type: 'string',
      default: function() {
        return 'Plant ' + Random.id()
      }
    },
		plantImage: {
			type: 'array'
		},
    datePlanted: {
      type: 'date'
    },
    areaId: 'string',
    areaName: 'string',
    growingMediumId: 'string',
    nutrientId: 'string',
    phId: 'string',
    wateringId: 'string',
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
      foreign: '_id',
      local: 'plantType'
    },
    plantArea: {
      type: 'one',
      class: 'PlantArea',
      foreign: '_id',
      local: 'areaId'
    },
    fertilizer: {
      type: 'one',
      class: 'Fertilizer',
      foreign: 'fertilizerId',
      local: '_id'
    },
    growingMedium: {
      type: 'one',
      class: 'GrowingMedium',
      foreign: 'growingMediumId',
      local: '_id'
    },
    lightingCycle: {
      type: 'one',
      class: 'LightingCycle',
      foreign: 'lightingId',
      local: '_id'
    },
    nutrientMix: {
      type: 'one',
      class: 'NutrientMix',
      foreign: 'nutrientId',
      local: '_id'
    },
    phValue: {
      type: 'one',
      class: 'PHValue',
      foreign: 'phId',
      local: '_id'
    },
    plantYield: {
      type: 'one',
      class: 'plantYield',
      foreign: 'yieldId',
      local: '_id'
    },
    pollinate: {
      type: 'one',
      class: 'Pollinate',
      foreign: 'pollenId',
      local: '_id'
    },
    watering: {
      type: 'one',
      class: 'Watering',
      foreign: 'wateringId',
      local: '_id'
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

if (Meteor.isServer) Inventories.permit(['insert', 'update', 'remove']).apply();
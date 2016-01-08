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
    systemId: 'string',
    systemName: 'string',
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
    system: {
      type: 'one',
      class: 'System',
      foreign: '_id',
      local: 'systemId'
    }
  },
  validators: {
    plantType: reqStr,
    datePlanted: Validators.required('Date of plantation is required'),
    systemId: reqStr
  },
  behaviours: {
    timestamp: {}
  }
});

if (Meteor.isServer) Inventories.permit(['insert', 'update', 'remove']).apply();
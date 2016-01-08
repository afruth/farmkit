Inventories = new Mongo.Collection('inventory');

var reqStr = Validators.and([
  Validators.required('Plant type is required'),
  Validators.string('Plant type is wrong')
]);

// Nested Classes:
PollinationHistory = Astro.Class({
  name: 'PollinationHistory',
  fields: {
    pollinationDate: 'date',
    method: 'string'
  }
});

HeightHistory = Astro.Class({
  name: 'HeightHistory',
  fields: {
    measurementDate: 'date',
    unit: 'string',
    height: 'number'
  }
});

SystemHistory = Astro.Class({
  name: 'SystemHistory',
  fields: {
    systemId: 'string',
    systemName: 'string',
    enteredSystem: 'date',
    exitedSystem: 'date'
  }
});

Inventory = Astro.Class({
  name: 'Inventory',
  collection: Inventories,
  transform: null,
  fields: {
    harvestDate: 'date',
    heightHistory: {
      type: 'array',
      nested: 'HeightHistory',
      default: function () {
        return [];
      }
    },
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
    pollinationHistory: {
      type: 'array',
      nested: 'PollinationHistory',
      default: function () {
        return [];
      }
    },
    datePlanted: {
      type: 'date'
    },
    siblings: 'array', // array of sibling id's
    systemHistory: {
      type: 'array',
      nested: 'SystemHistory',
      default: function () {
        return [];
      }
    },
    systemId: 'string', // current system
    systemName: 'string',
    tags: {
      type: 'array',
      nested: 'string',
      default: function() {
        return []
      },
      optional: true
    },
    yeild: {
      type: 'object',
      fields: {
        amount: 'number',
        unit: 'string'
      }
    },
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
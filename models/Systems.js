Systems = new Mongo.Collection('systems');

// Nested Classes
ActivePlantFamilies = Astro.Class({
  // array of on/off times for artificial lights
  name: 'ActivePlantFamilies',
  fields: {
    name: 'string',
    familyId: 'string',
    requiresPollination: 'boolean',
    plants: 'array' // will be an array of active plants' IDs
  }
});

DailyLightingSchedule = Astro.Class({
  // array of on/off times for artificial lights
  name: 'DailyLightingSchedule',
  fields: {
    start: 'date',
    end: 'date'
  }
});

LightHistory = Astro.Class({
  // Record of amount of light each day, in hours
  name: 'LightHistory',
  fields: {
    date: 'date',
    hours: 'number'
  }
});

DailyWateringSchedule = Astro.Class({
  // array of on/off times for watering (automated pump)
  name: 'DailyWateringSchedule',
  fields: {
    start: 'date',
    end: 'date'
  }
});

WateringHistory = Astro.Class({
  // Record whether a system was watered or not
  name: 'WateringHistory',
  fields: {
    date: 'date',
    watered: 'boolean'
  }
});

PhHistory = Astro.Class({
  // PH record
  name: 'PhHistory',
  fields: {
    date: 'date',
    phValue: 'number'
  }
});

FertilizerHistory = Astro.Class({
  name: 'FertilizerHistory',
  fields: {
    applicationDate: 'date',
    mix: {
      nitrogen: 'number',
      phosphorus: 'number',
      potassium: 'number'
    }  
  }
});

NutrientMix = Astro.Class({
  name: 'NutrientMix',
  fields: {
    nutrientId: 'string',
    name: 'string',
    manufacturer: 'string',
    state: 'string', // solid, liquid, etc... 
    mix: {
      nitrogen: 'number',
      phosphorus: 'number',
      potassium: 'number',
      dilution: 'string'
    }
  }
});

GrowingMedia = Astro.Class({
  name: 'GrowingMedia',
  fields: {
    name: 'string',
    mediumType: 'string',
    growingMediumId: 'string',
    description: {
      type: 'string',
      optional: true
    }
  }
});

CleaningSchedule = Astro.Class({
  name: 'CleaningSchedule',
  fields: {
    frequency: 'number', // in days
    remind: 'boolean',
    lastDone: 'date'
  }
});

NutrientsSchedule = Astro.Class({
  name: 'NutrientsSchedule',
  fields: {
    frequency: 'number', // in days
    remind: 'boolean',
    lastDone: 'date'
  }
});

WaterLevelSchedule = Astro.Class({
  name: 'WaterLevelSchedule',
  fields: {
    frequency: 'number', // in days
    remind: 'boolean',
    lastDone: 'date'
  }
});

PHSchedule = Astro.Class({
  name: 'PHSchedule',
  fields: {
    frequency: 'number', // in days
    remind: 'boolean',
    lastDone: 'date'
  }
});


System = new Astro.Class({
  name: 'System',
  collection: Systems,
  fields: {
    name: 'string',
    systemId: 'string', 
    historicPlants: 'array', // historic plants' IDs
    description: 'string',
    hydroponic: 'boolean',  // false is for soil systems
    sunlight: 'boolean', 
    systemImage: {
      type: 'array'
    },
    activePlantFamilies: { 
      type: 'array',
      nested: 'ActivePlantFamilies',
      default: function () {
        return [];
      }
    },
    dailyLightingSchedule: { 
      type: 'array',
      nested: 'DailyLightingSchedule',
      default: function () {
        return [];
      }
    },
    lightHistory: {
      type: 'array',
      nested: 'LightHistory',
      default: function () {
        return [];
      }
    },
    dailyWateringSchedule: { 
      type: 'array',
      nested: 'DailyWateringSchedule',
      default: function () {
        return [];
      }
    },
    wateringHistory: {
      type: 'array',
      nested: 'WateringHistory',
      default: function () {
        return [];
      }
    },
    phHistory: {
      type: 'array',
      nested: 'PhHistory',
      default: function () {
        return [];
      }
    },
    fertilizerHistory: {
      type: 'array',
      nested: 'FertilizerHistory',
      default: function () {
        return [];
      }
    },
    nutrientMix: {
      type: 'array',
      nested: 'NutrientMix',
      default: function () {
        return [];
      }
    },
    growingMedia: {
      type: 'array',
      nested: 'GrowingMedia',
      default: function () {
        return [];
      }
    },
    cleaningSchedule: {
      type: 'object',
      nested: 'CleaningSchedule',
      default: function () {
        return {};
      }
    },
    nutrientsSchedule: {
      type: 'object',
      nested: 'NutrientsSchedule',
      default: function () {
        return {};
      }
    },
    waterLevelSchedule: {
      type: 'object',
      nested: 'WaterLevelSchedule',
      default: function () {
        return {};
      }
    },
    phSchedule: {
      type: 'object',
      nested: 'PHSchedule',
      default: function () {
        return {};
      }
    }
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
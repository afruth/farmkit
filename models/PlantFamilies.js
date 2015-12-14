PlantFamilies = new Mongo.Collection('plantfamilies');

PlantFamily = new Astro.Class({
  name: 'PlantFamily',
  collection: PlantFamilies,
  fields: {
    name: 'string',
    description: {
      type: 'string',
      optional: true
    },
    daysToHarvest: {
      type: 'number',
      optional: true
    }
  },
  relations: {
    plants: {
      type: 'many',
      class: 'Plant',
      local: '_id',
      foreign: 'plantType'
    }
  }
});
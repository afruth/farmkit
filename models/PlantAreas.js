PlantAreas = new Mongo.Collection('areas');

PlantArea = new Astro.Class({
  name: 'PlantArea',
  fields: {
    name: 'string'
  },
  relations: {
    plants: {
      type: 'many',
      class: 'Plant',
      local: '_id',
      foreign: 'areaId'
    }
  },
  behaviours: {
    timestamp: {}
  }
})
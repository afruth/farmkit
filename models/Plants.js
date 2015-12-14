Plants = new Mongo.Collection('plants');

var reqStr = Validators.and([
  Validators.required(),
  Validators.string()
]);

Plant = Astro.Class({
  name: 'Plant',
  collection: Plants,
  fields: {
    plantType: 'string',
    plantName: {
      type: 'string',
      default: function() {
        return 'Plant ' + Random.id()
      }
    },
    datePlanted: 'date',
    age: {
      type: 'number',
      transient: true
    },
    dateOfHarvest: {
      type: 'number',
      transient: true
    },
    areaId: 'string',
    tags: {
      type: 'array',
      nested: 'string',
      default: function() {
        return []
      }
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
    }
  },
  validators: {
    plantType: reqStr
  },
  events: {
    afterInit: function() {
      var plantDate = this.datePlanted;
      var plantFam = this.plantFamily();

      if(plantDate) {
        var diff = Date.now() - plantDate.getTime();

        this.set('age', Math.abs((new Date(diff)).getUTCFullYear() - 1970));

        if(plantFam && plantFam.daysToHarvest) {
          let msToHarvest = plantFam.daysToHarvest * 24 * 60 * 60 * 1000;
          let msAtPlant = plantDate.getTime();
          this.set('dateOfHarvest', new Date().setTime(msAtPlant + msToHarvest));
        }
      }
    }

  },
  behaviours: {
    timestamp: {}
  }
});

if (Meteor.isServer) Plants.permit(['insert', 'update', 'remove']).apply();
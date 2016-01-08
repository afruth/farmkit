// Tracks lighting cycle. 
//    Light schedule (on) - array of dates (begin and end)
//    Light type is kept in system info

LightingCycles = new Mongo.Collection('lightingCycles');

LightingSchedule = Astro.Class({
  name: 'LightingSchedule',
  fields: {
    start: 'date',
    end: 'date'
  }
});

LightingCycle = new Astro.Class({
  name: 'LightingCycle',
  collection: LightingCycles,
  fields: {
    name: 'string',
    lightingId: 'string',
    onSchedule: {  // will hold all the times the lights have been on (probably within a range)
      type: 'array',
      nested: 'LightingSchedule',
      default: function() {
        return [];
      }
    }
  },
  behaviours: {
    timestamp: {}
  }
});

if (Meteor.isServer) LightingCycles.permit(['insert', 'update', 'remove']).apply();
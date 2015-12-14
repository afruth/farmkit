CC.AddPlantForm = React.createClass ({
  mixins: [ReactMeteorData],
  getMeteorData() {
    var handlePlantTypes = Meteor.subscribe('plantTypes');
    var handlePlantAreas = Meteor.subscribe('plantAreas');

    return {
      plantTypes: PlantFamilies.find().fetch(),
      plantAreas: PlantAreas.find().fetch()
    }
  },
  submitForm(event) {
    event.preventDefault();
    //gathering the data

    var plant = new Plant();
    for(field in this.refs) {
      if (this.refs[field].value) {
        let ref = this.refs[field];
        if(field === 'tags') {
          plant[field] = ref.value.split(' ');
        } else if (field === 'datePlanted') {
          plant[field] = new Date(ref.value)
        } else {
          plant[field] = ref.value;
        }

      }
    }

    if(plant.validate()) {
      Meteor.call('/plant/add', plant, function(e) {
        if (e) {
          console.log('error', plant.catchValidationException(e));
        } else {
          FlowRouter.go('/');
        }
      })
    } else console.log(plant.get())
  },
  render() {
    return <div className="plantFormHolder">
      <form id="plantAdd">
        <h2>Add a new plant</h2>
        <label htmlFor="plantType">Plant type</label>
        <select id="plantType" ref="plantType">
          {this.data.plantTypes.map(function(p) {
            return <option key={p._id} value={p._id}>{p.name}</option>
            })}
        </select>
        <label htmlFor="plantName">Plant name</label>
        <input id="plantName" ref="plantName" type="text" />
        <label htmlFor="areaId">Plant area</label>
        <select id="areaId" ref="areaId">
          {this.data.plantAreas.map(function(p) {
            return <option key={p._id} value={p._id}>{p.name}</option>
            })}
        </select>
        <label htmlFor="datePlanted">Date of plantation</label>
        <input id="datePlanted" ref="datePlanted" type="text" />
        <label htmlFor="tags">Tags</label>
        <input id="tags" ref="tags" type="text" />
        <button onClick={this.submitForm}>Save</button>
      </form>
    </div>
  }
});
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
  getInitialState() {
    return {}
  },
  resetFieldState(event) {
    var curState = this.state;
    console.log(event.target.id)
    if(curState.errors[event.target.id]) {
      delete curState.errors[event.target.id];
    }
    console.log(curState)
    this.setState(curState);
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
    } else {
      this.setState({
        errors: plant.getValidationErrors()
      });
    }
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

        {(this.state.errors && this.state.errors.plantType) ?
            <span className="error">{this.state.errors.plantType}</span> : null}

        <label htmlFor="plantName">Plant name</label>
        <input id="plantName" ref="plantName" type="text" />

        {(this.state.errors && this.state.errors.plantName) ?
        <span className="error">{this.state.errors.plantName}</span> : null}

        <label htmlFor="areaId">Plant area</label>
        <select id="areaId" ref="areaId">
          {this.data.plantAreas.map(function(p) {
            return <option key={p._id} value={p._id}>{p.name}</option>
            })}
        </select>

        {(this.state.errors && this.state.errors.areaId) ?
        <span className="error">{this.state.errors.areaId}</span> : null}

        <label htmlFor="datePlanted">Date of plantation</label>
        <input id="datePlanted" ref="datePlanted" type="text" onChange={this.resetFieldState} />

        {(this.state.errors && this.state.errors.datePlanted) ?
        <span className="error">{this.state.errors.datePlanted}</span> : null}

        <label htmlFor="tags">Tags</label>
        <input id="tags" ref="tags" type="text" />

        {(this.state.errors && this.state.errors.tags) ?
        <span className="error">{this.state.errors.tags}</span> : null}

        <button onClick={this.submitForm}>Save</button>
      </form>
    </div>
  }
});
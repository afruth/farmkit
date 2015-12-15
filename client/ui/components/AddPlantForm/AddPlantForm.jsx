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
    if(curState.errors && curState.errors[event.target.id]) {
      delete curState.errors[event.target.id];
    }
    this.setState(curState);
  },
  submitForm(event) {
    event.preventDefault();
    //gathering the data
    var plant = new Plant();
    for(field in this.refs) {
      let ref = null;
      if(this.refs[field].getValue) {
        ref = this.refs[field].getValue();
      } else {
        ref = this.refs[field].value;
      }
      if (ref) {
        if(field === 'tags') {
          plant[field] = ref.split(' ');
        } else if (field === 'datePlanted') {
          plant[field] = new Date(ref)
        } else {
          plant[field] = ref;
        }

      }
    }

    if(plant.validate(false)) {
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

        <CC.FormElements.SelectInput
          fieldName="plantType"
          ref="plantType"
          label="Plant type"
          onChangedEvent={this.resetFieldState}
          data={this.data.plantTypes}
          error={this.state.errors} />

        <CC.FormElements.TextInput
          fieldName="plantName"
          ref="plantName"
          label="Plant name"
          onChangedEvent={this.resetFieldState}
          error={this.state.errors} />

        <CC.FormElements.SelectInput
          fieldName="areaId"
          ref="areaId"
          label="Plant area"
          onChangedEvent={this.resetFieldState}
          data={this.data.plantAreas}
          error={this.state.errors} />

        <CC.FormElements.TextInput
          fieldName="datePlanted"
          ref="datePlanted"
          label="Date planted"
          onChangedEvent={this.resetFieldState}
          error={this.state.errors} />

        <CC.FormElements.TextInput
          fieldName="tags"
          ref="tags"
          label="Tags"
          onChangedEvent={this.resetFieldState}
          error={this.state.errors} />

        <button onClick={this.submitForm}>Save</button>
      </form>
    </div>
  }
});

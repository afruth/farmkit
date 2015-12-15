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
    if(curState.errors[event.target.id]) {
      delete curState.errors[event.target.id];
    }
    this.setState(curState);
  },
  submitForm(event) {
    event.preventDefault();
    //gathering the data
    console.log(this.refs)
    var plant = new Plant();
    for(field in this.refs) {
      let ref = null;
      if(this.refs[field].getValue) {
        ref = this.refs[field].getValue();
      } else {
        ref = this.refs[field].value;
      }
      console.log(ref)
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

CC.FormElements = {};

CC.FormElements.TextInput = React.createClass({
  getValue() {
    return this.refs[this.props.fieldName].value;
  },
  render() {
    return <div className="fieldHolder">
      <label htmlFor={this.props.fieldName}>
        {this.props.label}
      </label>
      <input
        id={this.props.fieldName}
        ref={this.props.fieldName}
        onChange={this.props.onChangedEvent}
        type="text" />

      {(this.props.error && this.props.error[this.props.fieldName]) ?
        <span className="error">
          {this.props.error[this.props.fieldName]}
        </span> : null}
      </div>
  }
});

CC.FormElements.SelectInput = React.createClass({
  getValue() {
    return this.refs[this.props.fieldName].value;
  },
  render() {
    return <div className="fieldHolder">
      <label htmlFor={this.props.fieldName}>
        {this.props.label}
      </label>
      <select
        id={this.props.fieldName}
        ref={this.props.fieldName}
        onChange={this.props.onChangedEvent}>
        <option value="">Choose an option</option>
        {this.props.data.map(function(p) {
          return <option
                  key={p._id}
                  value={p._id}>{p.name}
                </option>
          })}
      </select>

      {(this.props.error && this.props.error[this.props.fieldName]) ?
      <span className="error">
        {this.props.error[this.props.fieldName]}
      </span> : null}
    </div>
  }
});
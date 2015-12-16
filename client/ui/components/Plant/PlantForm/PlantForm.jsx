CC.PlantForm = React.createClass ({
	mixins: [ReactMeteorData],
	getMeteorData() {
		var handlePlantTypes = Meteor.subscribe('plantTypes');
		var handlePlantAreas = Meteor.subscribe('plantAreas');
		var handleGrowingMedia = Meteor.subscribe('growingMedia');

		if(this.props.docId)
			var handlePlant = Meteor.subscribe('plant', this.props.docId);


		return {
			plantTypes: PlantFamilies.find().fetch(),
			plantAreas: PlantAreas.find().fetch(),
			plant: this.props.docId && Plant.findOne(this.props.docId),
			growingMedia: GrowingMedia.find().fetch()
		}
	},
	getInitialState() {
		return {}
	},
	resetFieldState(event) {
		var curState = this.state;
		if(curState.errors && curState.errors[event.target.id]) {
			delete curState.errors[event.target.id];
			this.setState(curState);
		}

	},
	submitForm(event) {
		event.preventDefault();
		//gathering the data
		if(this.props.docId) {
			var plant = this.data.plant;
		} else {
			var plant = new Plant();
		}

		for(field in this.refs) {
			let ref = null;
			if(this.refs[field].getValue) {
				ref = this.refs[field].getValue();
			} else {
				ref = this.refs[field].value;
			}
			if (ref) {
				if(field === 'tags') {
					plant.set(field,ref.split(' '));
				} else if (field === 'datePlanted') {
					plant.set(field,new Date(ref));
				} else {
					plant.set(field,ref);
				}

			}
		}

		if(plant.validate(false)) {
			Meteor.call('/plant/add', plant, function(e) {
				if (e) {
					console.log('error', plant.catchValidationException(e));
				} else {
					FlowRouter.go('/plant/list');
				}
			})
		} else {
			this.setState({
				errors: plant.getValidationErrors()
			});
		}
	},
	render() {
		if(this.data.plant || !this.props.docId) {
			const plant = this.data.plant || {};
			return <div className="plantFormHolder">
				<form className="ui form" id="plantAdd">
					<h2>Edit plant</h2>

					<CC.FormElements.SelectInput
						fieldName="plantType"
						ref="plantType"
						label="Plant type"
						onChangedEvent={this.resetFieldState}
						defValue={plant.plantType}
						data={this.data.plantTypes}
						error={this.state.errors}/>

					<CC.FormElements.TextInput
						fieldName="plantName"
						ref="plantName"
						label="Plant name"
						defValue={plant.plantName}
						onChangedEvent={this.resetFieldState}
						error={this.state.errors}/>

					<CC.FormElements.SelectInput
						fieldName="areaId"
						ref="areaId"
						label="Plant area"
						defValue={plant.areaId}
						onChangedEvent={this.resetFieldState}
						data={this.data.plantAreas}
						error={this.state.errors}/>

					<CC.FormElements.TextInput
						fieldName="datePlanted"
						ref="datePlanted"
						label="Date planted"
						defValue={plant.datePlanted}
						onChangedEvent={this.resetFieldState}
						error={this.state.errors}/>

					<CC.FormElements.SelectInput
						fieldName="growingMedium"
						ref="growingMedium"
						label="Growing medium"
						onChangedEvent={this.resetFieldState}
						data={this.data.growingMedia}
						error={this.state.errors} />

					<CC.FormElements.TextInput
						fieldName="tags"
						ref="tags"
						label="Tags"
						defValue={plant.tags && plant.tags.join(' ')}
						onChangedEvent={this.resetFieldState}
						error={this.state.errors}/>

					<button className="ui primary large button" onClick={this.submitForm}>Save</button>
				</form>
			</div>
		} else {
			return <div>Loading</div>
		}
	}
});

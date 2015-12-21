CC.PlantForm = React.createClass ({
	mixins: [ReactMeteorData],
	getMeteorData() {
		var handlePlantTypes = Meteor.subscribe('plantTypes');
		var handlePlantAreas = Meteor.subscribe('plantAreas');
		var handleGrowingMedia = Meteor.subscribe('growingMedia');

		if(this.props.docId)
			var handlePlant = Meteor.subscribe('plant', this.props.docId);


		return {
			plantTypes: PlantFamilies.find().fetch().map((i) => {
				return {
					value: i._id,
					label: i.name
				}
			}),
			plantAreas: PlantAreas.find().fetch().map((i) => {
				return {
					value: i._id,
					label: i.name
				}
			}),
			plant: this.props.docId && Inventory.findOne(this.props.docId),
			growingMedia: GrowingMedia.find().fetch().map((i) => {
				return {
					value: i._id,
					label: i.name
				}
			}),
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
			var plant = new Inventory();
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
			Meteor.call('/inventory/add', plant, function(e) {
				if (e) {
					console.log('error', plant.catchValidationException(e));
				} else {
					FlowRouter.go('/inventory/list');
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
			return <div className="plantFormHolder plant-single">
				<form className="ui grid container form" id="plantAdd">
					<div className="eight wide column">
						<div className="plant-single__image-box">
							<CC.FormElements.FileUpload
								fieldName="plantImage"
								ref="plantImage"
								label="Plant image"
								defValue={plant.plantImage}
								onChangedEvent={this.resetFieldState}
								error={this.state.errors}/>
						</div>
						{/* {(images && images.length > 0) ? images.map(function (item) {
							return <img key={item} src={self.getImage(item)}/>
							}) : null} */}
					</div>
					<div className="eight wide column">
						<div className="plant-single__name">
							<h3 className="ui header">
								<CC.FormElements.TextInput
									fieldName="plantName"
									ref="plantName"
									label="Plant name"
									defValue={plant.plantName}
									onChangedEvent={this.resetFieldState}
									error={this.state.errors}/>
							</h3>
						</div>
						<div className="plant-single__family">
							<CC.FormElements.SelectInput
								fieldName="plantType"
								ref="plantType"
								label="Plant type"
								onChangedEvent={this.resetFieldState}
								defValue={plant.plantType}
								data={this.data.plantTypes}
								error={this.state.errors}/>
						</div>
						<div className="plant-single__area">
							<CC.FormElements.SelectInput
								fieldName="areaId"
								ref="areaId"
								label="Plant area"
								defValue={plant.areaId}
								onChangedEvent={this.resetFieldState}
								data={this.data.plantAreas}
								error={this.state.errors}/>
						</div>
						<div className="plant-single__date-planted">
							<CC.FormElements.DateInput
								fieldName="datePlanted"
								ref="datePlanted"
								label="Date planted"
								defValue={plant.datePlanted}
								onChangedEvent={this.resetFieldState}
								error={this.state.errors}/>
						</div>
					</div>
					<div className="sixteen wide column">
						<div className="plant-single__growing-medium" >
							<CC.FormElements.SelectInput
								fieldName="growingMedium"
								ref="growingMedium"
								label="Growing medium"
								onChangedEvent={this.resetFieldState}
								data={this.data.growingMedia}
								error={this.state.errors} />
						</div>
						<div className="plant-single__tags">
							<CC.FormElements.TextInput
								fieldName="tags"
								ref="tags"
								label="Tags"
								defValue={plant.tags && plant.tags.join(' ')}
								onChangedEvent={this.resetFieldState}
								error={this.state.errors}/>
						</div>
						<div className="plant-single__nutrient"></div>
						<div className="plant-single__ph"></div>
					</div>
					<div className="ui buttons">
						<button className="ui primary large button" onClick={this.submitForm}>Save</button>
						<div className="or"></div>
						<a className="ui large button" href="/inventory/list">Cancel</a>
					</div>
				</form>
			</div>		
		} else {
			return <div>Loading</div>
		}
	}
});

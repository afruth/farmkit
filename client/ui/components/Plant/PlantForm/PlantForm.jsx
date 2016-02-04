CC.PlantForm = React.createClass ({
	mixins: [ReactMeteorData],
	getMeteorData() {
		var handlePlantTypes = Meteor.subscribe('plantTypes');
		var handleSystems = Meteor.subscribe('systems');

		if(this.props.docId)
			var handlePlant = Meteor.subscribe('plant', this.props.docId);


		return {
			plantTypes: PlantFamilies.find().fetch().map((i) => {
				return {
					value: i._id,
					label: i.name
				}
			}),
			systems: Systems.find().fetch().map((i) => {
				return {
					value: i._id,
					label: i.name
				}
			}),
			plant: this.props.docId && Inventory.findOne(this.props.docId)
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
			// Creates base plant, with supplied data
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
				} else if (field === 'plantType') {
					// Set plantTypeName while setting plantType
					let family = PlantFamilies.findOne( ref );
					plant.set( 'plantTypeName', family.name );
					plant.set(field,ref);
				} else if (field === 'systemId') {
					// Set systemName while setting systemId
					let system = Systems.findOne( ref );
					plant.set( 'systemName', system.name );
					plant.set(field,ref);
				} else {
					plant.set(field,ref);
				}

			}
		}
		console.log(plant)

		if(plant.validate(false)) { 
			Meteor.call('/inventory/add', plant, function(e) {
				if (e) {
					console.log('error', plant.catchValidationException(e));
				} else {
					if( CC.previousPath ){
						FlowRouter.go( CC.previousPath );
					} else {
						FlowRouter.go( '/plants' );
					}
				}
			})
		} else { // if it fails validation
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
				{/*
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
					*/}
						{/* {(images && images.length > 0) ? images.map(function (item) {
							return <img key={item} src={self.getImage(item)}/>
							}) : null} */}
					{/*
					</div>
					*/}
					<div className="sixteen wide column">
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
								fieldName="systemId"
								ref="systemId"
								label="System"
								defValue={plant.systemId}
								onChangedEvent={this.resetFieldState}
								data={this.data.systems}
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
						<a className="ui large button" href={ CC.previousPath } >Cancel</a>
					</div>
				</form>
			</div>		
		} else {
			return <div>Loading</div>
		}
	}
});

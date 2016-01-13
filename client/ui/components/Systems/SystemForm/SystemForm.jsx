CC.SystemForm = React.createClass ({
	mixins: [ReactMeteorData],
	getMeteorData() {
		var handleSystems = Meteor.subscribe('systems');

		return {
			allSystems: Systems.find().fetch().map((i) => {
				return {
					value: i._id,
					label: i.name
				}
			}),
			growingMedia: GrowingMedia.find().fetch(),
			system: this.props.docId && Systems.findOne(this.props.docId)
		}
	},
	getInitialState() {
		return {}
	},
	componentDidMount() {
		$('.ui.radio.checkbox.hydro').checkbox({
			onChange: () => {
				this.state.systemType = 'hydro';
			}
		});
		$('.ui.radio.checkbox.soil').checkbox({
			onChange: () => {
				this.state.systemType = 'soil';
			}
		});
	},
	componentDidUpdate() {
		$('.ui.radio.checkbox').checkbox('refresh');
	},
	resetFieldState(event) {
		var curState = this.state;
		if(curState.errors && curState.errors[event.target.id]) {
			delete curState.errors[event.target.id];
			this.setState(curState);
		}

	},
	hydroToggle(event) {
		console.log( this )
		console.log( event )
	},
	submitForm(event) {
		event.preventDefault();
		//gathering the data
		if(this.props.docId) {
			var system = this.data.system;
		} else {
			// Creates base system, with supplied data
			var system = new System(); // 'System' is not a reserved keywork
		}

		for(field in this.refs) {
			let ref = null;
			if(this.refs[field].getValue) {
				ref = this.refs[field].getValue();
			} else {
				ref = this.refs[field].value;
			}
			// // For specific fields
			// if (ref) {
			// 	if(field === 'tags') {
			// 		plant.set(field,ref.split(' '));
			// 	} else if (field === 'datePlanted') {
			// 		plant.set(field,new Date(ref));
			// 	} else if (field === 'plantType') {
			// 		// Set plantTypeName while setting plantType
			// 		let family = PlantFamilies.findOne( ref );
			// 		plant.set( 'plantTypeName', family.name );
			// 		plant.set(field,ref);
			// 	} else if (field === 'systemId') {
			// 		// Set systemName while setting systemId
			// 		let system = Systems.findOne( ref );
			// 		plant.set( 'systemName', system.name );
			// 		plant.set(field,ref);
			// 	} else {
			// 		plant.set(field,ref);
			// 	}

			// }
		}

		if(system.validate(false)) { 
			Meteor.call('/system/add', system, function(e) {
				if (e) {
					console.log('error', system.catchValidationException(e));
				} else {
					if( CC.previousPath ){
						FlowRouter.go( CC.previousPath );
					}
				}
			})
		} else { // if it fails validation
			this.setState({
				errors: system.getValidationErrors()
			});
		}
	},
	render() {
		console.log(this.props.docId )
		if(this.data.systems || !this.props.docId) {
			const allSystems = this.data.allSystems || {};
			const system = this.data.system || {};

			return <div className="system-add">
				<form className="ui grid container form" id="systemAdd">
					<div className="eight wide column">
						<div className="system-add__image-box">
							<CC.FormElements.FileUpload
								fieldName="systemImage"
								ref="systemImage"
								label="System Image"
								defValue={system.systemImage}
								onChangedEvent={this.resetFieldState}
								error={this.state.errors}/>
						</div>
						{/* {(images && images.length > 0) ? images.map(function (item) {
							return <img key={item} src={self.getImage(item)}/>
							}) : null} */}
					</div>
					<div className="eight wide column">
						<div className="system-add__name field">
							<h3 className="ui header">
								<CC.FormElements.TextInput
									fieldName="systemName"
									ref="systemName"
									label="System Name"
									defValue={system.systemName}
									onChangedEvent={this.resetFieldState}
									error={this.state.errors}/>
							</h3>
						</div>

						<div className="system-add__type inline fields">
							<label htmlFor='type'>
			          System Type
			        </label>
			        <div className="field">
			        	<div className="ui radio checkbox hydro">
					        <input
					          name='systemType'
					          ref='systemType'
					          className="hidden"
					          value="hydroponic"
					          // checked="true"
					          // onChecked={this.hydroToggle}
					          // onChange={this.resetFieldState}
					          type="radio" />
					        <label>Hydroponic</label>
			        	</div>
			        </div>
			        <div className="field">
			        	<div className="ui radio checkbox soil">
					        <input
					          name='systemType'
					          ref='systemType'
					          className="hidden"
					          value="soil"
					          // onChecked={this.hydroToggle}
					          // onChange={this.resetFieldState}
					          type="radio" />
					        <label>Soil</label>
			        	</div>
			        </div>
						</div>

						<div className="system-add__description">
							<CC.FormElements.TextInput
								fieldName="description"
								ref="description"
								label="Description"
								defValue={system.description}
								onChangedEvent={this.resetFieldState}
								error={this.state.errors}/>
						</div>
						<div className="system-add__growing-media">
							<CC.FormElements.SelectInput
								fieldName="growingMedium"
								ref="growingMedium"
								label="Growing Medium"
								defValue={system.media}
								onChangedEvent={this.resetFieldState}
								data={this.data.growingMedia}
								error={this.state.errors}/>
						</div>

					</div>
{/*
						<div className="system-add__date-planted">
							<CC.FormElements.DateInput
								fieldName="datePlanted"
								ref="datePlanted"
								label="Date planted"
								defValue={plant.datePlanted}
								onChangedEvent={this.resetFieldState}
								error={this.state.errors}/>
						</div>
					</div> !!!!!
					<div className="sixteen wide column">
						<div className="system-add__tags">
							<CC.FormElements.TextInput
								fieldName="tags"
								ref="tags"
								label="Tags"
								defValue={plant.tags && plant.tags.join(' ')}
								onChangedEvent={this.resetFieldState}
								error={this.state.errors}/>
						</div>
						<div className="system-add__nutrient"></div>
						<div className="system-add__ph"></div>
					</div>
*/}
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

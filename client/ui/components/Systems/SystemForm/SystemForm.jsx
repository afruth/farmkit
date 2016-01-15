CC.SystemForm = React.createClass ({
	mixins: [ReactMeteorData],
	getMeteorData() {
		var handleSystems = Meteor.subscribe('systems');
		var handleGrowingMedia = Meteor.subscribe('growingsubstance');

		return {
			allSystems: Systems.find().fetch().map((i) => {
				return {
					value: i._id,
					label: i.name
				}
			}),
			growingMedia: GrowingSubstance.find().fetch().map( (i) => {
				return {
					value: i._id,
					label: i.name
				}
			}),
			system: this.props.docId && Systems.findOne(this.props.docId)
		}
	},
	getInitialState() {
		return { systemType: 'hydro' }
	},
	componentDidMount() {
		// systemType radio boxes
		$('.ui.radio.checkbox.hydro').checkbox({
			onChange: () => {
				this.setState({ systemType: 'hydro' });
				console.log(this.state)
			}
		});
		$('.ui.radio.checkbox.soil').checkbox({
			onChange: () => {
				this.setState({ systemType: 'soil' });
				console.log(this.state)
			}
		});
		// Lighting radio boxes
		$('.ui.radio.checkbox.sunlight').checkbox({
			onChange: () => {
				this.setState({ lightType: 'sunlight' });
				console.log(this.state)
			}
		});
		$('.ui.radio.checkbox.artificial').checkbox({
			onChange: () => {
				this.setState({ lightType: 'artificial' });
				console.log(this.state)
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
	submitForm(event) {
		event.preventDefault();
		console.log('submitForm')
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
			// For specific fields
			if (ref) {
				// if(field === 'tags') {
				// 	plant.set(field,ref.split(' '));
				// } else if (field === 'datePlanted') {
				// 	plant.set(field,new Date(ref));
				// } else if (field === 'plantType') {
				// 	// Set plantTypeName while setting plantType
				// 	let family = PlantFamilies.findOne( ref );
				// 	plant.set( 'plantTypeName', family.name );
				// 	plant.set(field,ref);
				// } else if (field === 'systemId') {
				// 	// Set systemName while setting systemId
				// 	let system = Systems.findOne( ref );
				// 	plant.set( 'systemName', system.name );
				// 	plant.set(field,ref);

				if( field === 'phHistory' ){
					system.set(field, ref, new Date() )
				} else {
					system.set(field,ref);
				}

			}
		}

		if(system.validate(false)) { 
			console.log(system)
			Meteor.call('/system/add', system, function(e) {
				if (e) {
					console.log('error', system.catchValidationException(e));
				} else {
					if( CC.previousPath ){
						FlowRouter.go( CC.previousPath );
					} else {
						FlowRouter.go( '/systems' );
					}
				}
			})
		} else { // if it fails validation
			console.log('system failed')
			console.log(system)
			this.setState({
				errors: system.getValidationErrors()
			});
		}
	},
	render() {
		console.log(this.data )

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
									fieldName="name"
									ref="name"
									label="System Name"
									defValue={system.name}
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
					          name='hydroponic'
					          ref='hydroponic'
					          className="hidden"
					          value="true"
					          defaultChecked="true"
					          type="radio" />
					        <label>Hydroponic</label>
			        	</div>
			        </div>
			        <div className="field">
			        	<div className="ui radio checkbox soil">
					        <input
					          name='hydroponic'
					          ref='hydroponic'
					          className="hidden"
					          value="false"
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

						<div className="system-add__lighting inline fields">
							<label htmlFor='type'>
			          Lighting Type
			        </label>
			        <div className="field">
			        	<div className="ui radio checkbox sunlight">
					        <input
					          name='sunlight'
					          ref='sunlight'
					          className="hidden"
					          value="true"
					          defaultChecked="true"
					          type="radio" />
					        <label>Sunlight</label>
			        	</div>
			        </div>
			        <div className="field">
			        	<div className="ui radio checkbox artificial">
					        <input
					          name='sunlight'
					          ref='sunlight'
					          className="hidden"
					          value="false"
					          type="radio" />
					        <label>Artificial</label>
			        	</div>
			        </div>
						</div>

						<CC.SystemFormToggleLight 
							system = {system}
							onChangedEvent = {this.onChangedEvent}
							lightType = {this.state.lightType}
							error = {this.state.errors} />

					</div>

					<div className="sixteen wide column">

						<CC.SystemFormToggleSystemType 
							system = {system}
							onChangedEvent = {this.onChangedEvent}
							systemType = {this.state.systemType}
							growingMedia = {this.data.growingMedia}
							error = {this.state.errors} />
						

						<div className="system-add__ph">
							<CC.FormElements.NumberInput
								fieldName="phHistory"
								ref="phHistory"
								label="Current PH"
								onChangedEvent={this.resetFieldState}
								step="0.1"
								min="0"
								max="14"
								error={this.state.errors}/>
						</div>

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

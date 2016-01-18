CC.SystemFormToggleSystemType = React.createClass({
	getInitialState() {
		return { waterSystem: 'automated' }
	},
	componentDidMount() {
		// Watering System radio boxes
		$('.ui.radio.checkbox.automated').checkbox({
			onChange: () => {
				this.setState({ waterSystem: 'automated' });
				console.log(this.state)
			}
		});
		$('.ui.radio.checkbox.reminder').checkbox({
			onChange: () => {
				this.setState({ waterSystem: 'reminder' });
				console.log(this.state)
			}
		});
	},
	render() {
		console.log(this)
		if( this.props.systemType === 'hydro' ) {
			return (
				<div>
					<div className="system-add__growing-media">
						<CC.FormElements.SelectInput
							fieldName="growingMedium"
							ref="growingMedium"
							label="Growing Medium"
							defValue={this.props.system.media}
							onChangedEvent={this.props.resetFieldState}
							data={this.props.growingMedia}
							error={this.props.errors}/>
					</div>

					<div className="system-add__nutrient-mix">
						<div className="system-add__nutrient-mix__title">Nutrient Mix</div>
						<CC.FormElements.NumberInput
							fieldName="nitrogen"
							ref="nitrogen"
							label="Nitrogen"
							defValue={this.props.system.nitrogen}
							onChangedEvent={this.props.resetFieldState}
							step="1"
							min="0"
							error={this.props.errors}/>
						<CC.FormElements.NumberInput
							fieldName="phosphorus"
							ref="phosphorus"
							label="Phosphorus"
							defValue={this.props.system.phosphorus}
							onChangedEvent={this.props.resetFieldState}
							step="1"
							min="0"
							error={this.props.errors}/>
						<CC.FormElements.NumberInput
							fieldName="potassium"
							ref="potassium"
							label="Potassium"
							defValue={this.props.system.potassium}
							onChangedEvent={this.props.resetFieldState}
							step="1"
							min="0"
							error={this.props.errors}/>
						<CC.FormElements.TextInput
							fieldName="dilution"
							ref="dilution"
							label="Dilution"
							defValue={this.props.system.dilution}
							onChangedEvent={this.props.resetFieldState}
							error={this.props.errors}/>
					</div>

					<div className="system-add__maintenance">
						<div className="system-add__maintenance__title">Mainenance</div>
						<CC.FormElements.NumberInput
							fieldName="cleanSystem"
							ref="cleanSystem"
							label="Days Before System Needs Cleaning"
							defValue={this.props.system.cleanSystem}
							onChangedEvent={this.props.resetFieldState}
							step="1"
							min="1"
							error={this.props.errors}/>
						<CC.FormElements.NumberInput
							fieldName="replaceNutrients"
							ref="replaceNutrients"
							label="Days Before System Needs Nutrients Replaced"
							defValue={this.props.system.replaceNutrients}
							onChangedEvent={this.props.resetFieldState}
							step="1"
							min="1"
							error={this.props.errors}/>
						<CC.FormElements.NumberInput
							fieldName="checkWater"
							ref="checkWater"
							label="Days Before System Needs Water Level Checked"
							defValue={this.props.system.checkWater}
							onChangedEvent={this.props.resetFieldState}
							step="1"
							min="1"
							error={this.props.errors}/>
						<CC.FormElements.NumberInput
							fieldName="checkPH"
							ref="checkPH"
							label="Days Before System Needs PH Checked"
							defValue={this.props.system.checkPH}
							onChangedEvent={this.props.resetFieldState}
							step="1"
							min="1"
							error={this.props.errors}/>
					</div>

				</div>
			)
		} else {
			return ( 
				<div>
					<div className="system-add__water inline fields">
						<label htmlFor='type'>
		          Watering System
		        </label>
		        <div className="field">
		        	<div className="ui radio checkbox automated">
				        <input
				          name='watering'
				          ref='watering'
				          className="hidden"
				          value="automated"
				          defaultChecked="true"
				          type="radio" />
				        <label>Automated</label>
		        	</div>
		        </div>
		        <div className="field">
		        	<div className="ui radio checkbox reminder">
				        <input
				          name='watering'
				          ref='watering'
				          className="hidden"
				          value="reminder"
				          type="radio" />
				        <label>Reminder</label>
		        	</div>
		        </div>
					</div>

					<CC.SystemFormToggleWatering
						onChangedEvent = {this.props.onChangedEvent}
						reminder={this.props.system.reminder}
						waterSystem = {this.state.waterSystem}
						error = {this.props.error} />

				</div>
			);
		}
	}
});


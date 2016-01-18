CC.SystemFormToggleLight = React.createClass({

	render () {
		if( this.props.lightType === 'artificial' ){
			return (
				<div className="system-add__light-hours">
					<CC.FormElements.NumberInput
						fieldName="lightHours"
						ref="lightHours"
						label="Hours of light per day"
						defValue={this.props.system.lighthours}
						onChangedEvent={this.props.resetFieldState}
						step="0.5"
						min="0"
						max="24"
						error={this.props.errors}/>
				</div>
			)
		} else { // default is 'sunlight'
			return (
				<div>
					<div className="system-add__light-latitude">
						<CC.FormElements.TextInput
							fieldName="lightLatitude"
							ref="lightLatitude"
							label="Latitude"
							defValue={this.props.system.latitude}
							onChangedEvent={this.props.resetFieldState}
							error={this.props.errors}/>
					</div>
					<div className="system-add__sun-exposure">
						<CC.FormElements.SelectInput
							fieldName="sunExposure"
							ref="sunExposure"
							label="Sun Exposure"
							defValue={this.props.system.exposure}
							onChangedEvent={this.props.resetFieldState}
							data={[ 
									{ value: 'Full Sun', label: 'Full Sun' },
									{ value: 'Partial Sun', label: 'Partial Sun' },
									{ value: 'Shade', label: 'Shade' } 
								]}
							error={this.props.errors}/>
					</div>
				</div>
			)
		}
	}
});

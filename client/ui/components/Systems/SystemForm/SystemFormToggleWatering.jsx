CC.SystemFormToggleWatering = React.createClass({
	render () {
		console.log( this )
		if( this.props.waterSystem === 'reminder' ){
			return (
				<div className="system-add__watering-reminder">
					<CC.FormElements.NumberInput
						fieldName="reminder"
						ref="reminder"
						label="Days Between Reminders"
						defValue={this.props.reminder}
						onChangedEvent={this.resetFieldState}
						step="1"
						min="0"
						error={this.props.error}/>
				</div>
			)
		} else {
			return (
				<div></div>
			)
		}
	}
});
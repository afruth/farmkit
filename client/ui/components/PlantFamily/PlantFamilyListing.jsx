CC.PlantFamilyListing = React.createClass({
	toggleOptions () {
		CC.store.dispatch({ type: 'toggleOption', id: this.props.data.key })
	},
	render () {
		console.log(this.props)
		const systemTypeClasses = classNames( 'listing__system-type', {
			'hydro': this.props.data.systemType
		});

		// Set listing-sleeve classes (opening animation)
		let openOption = false;
		if( this.props.data.key === this.props.reduxState.openOption ){
			openOption = true;
		}
		const optionClasses = classNames( 'listing-sleeve', {
			'open': openOption
		});
		return (
			<div className="listing" onClick={ this.toggleOptions } >
				<div className={ optionClasses }>
					<div className={ systemTypeClasses }></div>

					<div className="listing__name">{this.props.data.plantType}</div>
					<div className="listing__sub-heading">{this.props.data.system}</div>

					<div className="listing__plant-count">
						<span>{this.props.data.plantNumber}</span>
						<i className="fk-plant"></i>
					</div>

				</div>
				<div className="listing__bottom-line"></div>
			</div>
		)
	}
});
CC.SystemListing = React.createClass({
	plantNum () {
		const families = this.props.data.activePlantFamilies;
		let plantNum = 0;
		for( let i = 0; i < families.length; i++ ){
			plantNum = plantNum + families[i].plants.length;
		}
		return plantNum;
	},
	lightType () {
		if( this.props.data.sunlight ){
			return (
				<div className="listing__light-type">
					<i className="fk-partly-sunny"></i>
					<span>Sunlight</span>
				</div>
			) 
		} else {
			return (
				<div className="listing__light-type">
					<i className="fk-bulb"></i>
					<span>Artificial Light</span>
				</div>
			) 
		}
	},
	toggleOptions () {
		CC.store.dispatch({ type: 'toggleOption', id: this.props.data._id })
	},
	render () {
		console.log(this.props)
		const systemTypeClasses = classNames( 'listing__system-type', {
			'hydro': this.props.data.hydroponic
		});

		// Set listing-sleeve classes (opening animation)
		let openOption = false;
		if( this.props.data._id === this.props.reduxState.openOption ){
			openOption = true;
		}
		const optionClasses = classNames( 'listing-sleeve', {
			'open': openOption
		});

		return (
			<div className="listing" onClick={ this.toggleOptions } >
				<div className={ optionClasses } >
					<div className={ systemTypeClasses } ></div>

					<div className="listing__name">{this.props.data.name}</div>
					<div className="listing__sub-heading">{ this.lightType() }</div>

					<div className="listing__plant-count">
						<span>{ this.plantNum() }</span>
						<i className="fk-plant"></i>
					</div>

					<div className="listing__bottom-line"></div>
				</div>

				<div className="listing__option-box">
					<div className="listing__option nutrients">
						<div className="listing__option__icon">
							<i className="fk-nutrients"></i>
						</div>
						<p className="listing__option__title">nutrients</p>
					</div>
					<div className="listing__option ph">
						<div className="listing__option__icon">
							<i className="fk-ph"></i>
						</div>
						<p className="listing__option__title">check PH</p>
					</div>
					<div className="listing__option clean">
						<div className="listing__option__icon">
							<i className="fk-clean"></i>
						</div>
						<p className="listing__option__title">clean</p>
					</div>
					<div className="listing__option water-level">
						<div className="listing__option__icon">
							<i className="fk-water-level"></i>
						</div>
						<p className="listing__option__title">water level</p>
					</div>
				</div>

			</div>
		)
	}
});
CC.PlantFamilyListing = React.createClass({
	toggleOptions () {
		// Opens the options, unless their already open
		if( this.props.reduxState.openOption === this.props.data.key ){ // close if it's open
			CC.store.dispatch({ type: 'closeOptions' })
		} else {
			CC.store.dispatch({ type: 'toggleOption', id: this.props.data.key }) 
		}
	},
	render () {
		// console.log(this.props)
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

					<div className="listing__bottom-line"></div>
				</div>

				<div className="listing__option-box">
					<div className="listing__option pollinate">
						<div className="listing__option__icon">
							<i className="fk-pollinate"></i>
						</div>
						<p className="listing__option__title">pollinate</p>
					</div>
					<div className="listing__option harvest">
						<div className="listing__option__icon">
							<i className="fk-harvest"></i>
						</div>
						<p className="listing__option__title">harvest</p>
					</div>
					<div className="listing__option fertilize">
						<div className="listing__option__icon">
							<i className="fk-fertilize"></i>
						</div>
						<p className="listing__option__title">fertilize</p>
					</div>
					<div className="listing__option water">
						<div className="listing__option__icon">
							<i className="fk-water"></i>
						</div>
						<p className="listing__option__title">water</p>
					</div>
				</div>

			</div>
		)
	}
});
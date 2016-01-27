CC.PlantFamilyListing = React.createClass({
	render () {
		console.log(this.props)
		const systemTypeClasses = classNames( 'listing__system-type', {
			'hydro': this.props.data.systemType
		});
		return (
			<div className="listing">
				<div className={systemTypeClasses}></div>

				<div className="listing__name">{this.props.data.plantType}</div>
				<div className="listing__sub-heading">{this.props.data.system}</div>

				<div className="listing__plant-count">
					<span>{this.props.data.plantNumber}</span>
					<i className="fk-plant"></i>
				</div>

				<div className="listing__bottom-line"></div>
			</div>
		)
	}
});
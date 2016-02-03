// Display component for listing Option
//   props.title = 			option type for display
//   props.class = 			option type for styling class and icon font class
//   props.dispatch = 	Redux Reducer type
CC.ListingOption = React.createClass({
	optionClick () {
		const dispatch = this.props.class;
		CC.store.dispatch({ type: dispatch }); 
	},
	render () {
		const wrapperClasses = "listing__option " + this.props.class;
		const iconClass = "fk-" + this.props.class;
		return (
			<div className={ wrapperClasses } onClick={ this.optionClick } >
				<div className="listing__option__icon">
					<i className={ iconClass }></i>
				</div>
				<p className="listing__option__title">{ this.props.title }</p>
			</div>
		)
	}
});
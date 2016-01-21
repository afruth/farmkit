CC.SortControl = React.createClass({
	setAll(){
		CC.store.dispatch({ type: 'all' });
	},
	setHydro(){
		CC.store.dispatch({ type: 'hydro' });
	},
	setSoil(){
		CC.store.dispatch({ type: 'soil' });
	},
	render () {
		let state = CC.store.getState();
		const allClass = classNames({
			'active': state.sortAll
		});
		const hydroClass = classNames({
			'active': state.sortHydro
		});
		const soilClass = classNames({
			'active': state.sortSoil
		});
		return (
			<div className="sort-control">
				<div className='sort-control_all' onClick={ this.setAll }>
					<CC.ToggleActiveDiv text="All" active={allClass} class="test" />
				</div>
				<div className='sort-control__hydro' onClick={ this.setHydro }>
					<CC.ToggleActiveDiv text="Hydroponics" active={hydroClass} class="test" />
				</div>
				<div className='sort-control_soil' onClick={ this.setSoil }>
					<CC.ToggleActiveDiv text="Soil" active={soilClass} class="test" />
				</div>
			</div>
		)
	}
});


// Renders div with passed text, and classes, combined with 'active' 
// 		if prop.active is true
// Props:
//		text: 	 String
// 		active:  boolean
// 		classes: string of classnames
CC.ToggleActiveDiv = React.createClass ({
	render () {
		console.log(this.props)
		// const passedClasses = this.props.class;
		const classes = classNames({
			// passedClasses, 
			// { 'active': this.props.active }
			'active': this.props.active
		});

		return (
			<div className={classes}>
				{this.props.text}
			</div>
		)
	}
});
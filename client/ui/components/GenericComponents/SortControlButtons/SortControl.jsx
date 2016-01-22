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
		return (
			<div className="sort-control">
				<div className='sort-control_all' onClick={ this.setAll }>
					<CC.ToggleActiveDiv text="All" active={this.props.state.sortAll} />
				</div>
				<div className='sort-control__hydro' onClick={ this.setHydro }>
					<CC.ToggleActiveDiv text="Hydroponics" active={this.props.state.sortHydro} />
				</div>
				<div className='sort-control_soil' onClick={ this.setSoil }>
					<CC.ToggleActiveDiv text="Soil" active={this.props.state.sortSoil} />
				</div>
			</div>
		)
	}
});



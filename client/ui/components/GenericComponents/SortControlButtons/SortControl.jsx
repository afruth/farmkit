CC.SortControl = React.createClass({
	setAll(){
		if( this.props.type === 'plants') {
			CC.store.dispatch({ type: 'plantsAll' });
		} else {
			CC.store.dispatch({ type: 'systemsAll' });
		}
	},
	setHydro(){
		if( this.props.type === 'plants') {
			CC.store.dispatch({ type: 'plantsHydro' });
		} else {
			CC.store.dispatch({ type: 'systemsHydro' });
		}
	},
	setSoil(){
		if( this.props.type === 'plants') {
			CC.store.dispatch({ type: 'plantsSoil' });
		} else {
			CC.store.dispatch({ type: 'systemsSoil' });
		}
	},
	activeAll () {
		if( this.props.type === 'plants') {
			return this.props.state.sortPlantsAll;
		} else {
			return this.props.state.sortSystemsAll;
		}
	},
	activeHydro () {
		if( this.props.type === 'plants') {
			return this.props.state.sortPlantsHydro;
		} else {
			return this.props.state.sortSystemsHydro;
		}
	},
	activeSoil () {
		if( this.props.type === 'plants') {
			return this.props.state.sortPlantsSoil;
		} else {
			return this.props.state.sortSystemsSoil;
		}
	},
	render () {
		return (
			<div className="sort-control">
				<div className='sort-control_all' onClick={ this.setAll }>
					<CC.ToggleActiveDiv text="All" active={ this.activeAll() } />
					<div className="sort-control__underline"></div>
				</div>
				<div className='sort-control__hydro' onClick={ this.setHydro }>
					<CC.ToggleActiveDiv text="Hydroponics" active={ this.activeHydro() } />
					<div className="sort-control__underline"></div>
				</div>
				<div className='sort-control_soil' onClick={ this.setSoil }>
					<CC.ToggleActiveDiv text="Soil" active={ this.activeSoil() } />
					<div className="sort-control__underline"></div>
				</div>
			</div>
		)
	}
});



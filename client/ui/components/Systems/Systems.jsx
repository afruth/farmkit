CC.Systems = React.createClass ({
	render () {
		let state = this.props.reduxState;
		// organize system data
		let systemMap = _.sortBy( this.props.data.systems, this.props.data.systems.activePlantFamilies );
		systemMap.reverse();

		// Sort by selected System type
		if( this.props.reduxState.sortSystemsHydro ){
			systemMap = _.filter( systemMap, function(item){
				return item.hydroponic;
			});
		} else if( this.props.reduxState.sortSystemsSoil ){
			systemMap = _.reject( systemMap, function(item){
				return item.hydroponic;
			});
		} 

		// Splice state onto systemMap
		for( let i = 0; i < systemMap.length; i++ ) {
			systemMap[i].state = state;
		}

		return <div>
			<div className="fk-header systems">
				<CC.SystemCount data={this.props.data} />
			</div>

			<div className="sort-control-panel">
				<CC.SortControl state={this.props.reduxState} type="systems" />
				<CC.AddButton state={this.props.reduxState} />
				<CC.SortSearch state={this.props.reduxState} placeholder="Find system..." />
			</div>

			{ systemMap.map(function(item) { 
					return <CC.SystemListing 
										key={item._id} 
										data={item} 
										reduxState={item.state} />
				})
			}

		</div>
	}
});


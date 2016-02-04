CC.PlantFamilies = React.createClass ({
	render () {
		console.log( this.props )
		let plantMap = [];
		const systems = this.props.data.systems
		const state = this.props.reduxState
		// Pull plant data from Systems
		for( let i = 0; i < systems.length; i++ ){
			let activePlants = systems[i].activePlantFamilies;
			if( systems[i].activePlantFamilies.length > 0 ) { // Only if system has active plants
				for( let o = 0; o < activePlants.length; o++ ){
					let family = {};
					family.key = systems[i]._id + '-' + activePlants[o].familyId;
					family.plantType = _.find( this.props.data.plants, function ( plantFamily ){
						return plantFamily._id === activePlants[o].familyId;
					});
					// family.plantType = activePlants[o].name;
					family.plantNumber = activePlants[o].plants.length;
					family.system = systems[i].name;
					family.systemType = systems[i].hydroponic;
					plantMap.push( family );
				}
			}
		}

		// Sort by selected System type
		if( this.props.reduxState.sortPlantsHydro ){
			plantMap = _.filter( plantMap, function(item){
				return item.systemType;
			});
		} else if( this.props.reduxState.sortPlantsSoil ){
			plantMap = _.reject( plantMap, function(item){
				return item.systemType;
			});
		} 

		// Splice state onto plantMap
		for( let i = 0; i < plantMap.length; i++ ) {
			plantMap[i].state = state;
		}
		console.log( plantMap )

		return <div>
			<div className="fk-header plants">
				<CC.PlantCount data={this.props.data} />
			</div>

			<div className="sort-control-panel">
				<CC.SortControl state={this.props.reduxState} type="plants" />
				<CC.AddButton state={this.props.reduxState} />
				<CC.SortSearch state={this.props.reduxState} placeholder="Find a plant..." />
			</div>

			{ plantMap.map(function(item) { 
					return <CC.PlantFamilyListing 
										key={item.key} 
										data={item}  
										reduxState={item.state} />
				})
			}

		</div>
	}
});




















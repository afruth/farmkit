CC.PlantFamilies = React.createClass ({
	render () {
		let plantMap = [];
		const systems = this.props.data.systems
		// Pull plant data from Systems
		for( let i = 0; i < systems.length; i++ ){
			let activePlants = systems[i].activePlantFamilies;
			if( systems[i].activePlantFamilies.length > 0 ) { // Only if system has active plants
				for( let o = 0; o < activePlants.length; o++ ){
					let family = {};
					family.key = systems[i]._id + '-' + activePlants[o].familyId;
					family.plantType = activePlants[o].name;
					family.plantNumber = activePlants[o].plants.length;
					family.system = systems[i].name;
					family.systemType = systems[i].hydroponic;
					plantMap.push( family );
				}
			}
		}

		// Sort by selected System type
		if( this.props.reduxState.sortHydro ){
			plantMap = _.filter( plantMap, function(item){
				return item.systemType;
			});
		} else if( this.props.reduxState.sortSoil ){
			plantMap = _.reject( plantMap, function(item){
				return item.systemType;
			});
		} 

		return <div>
			<div className="fk-header plants">
				<CC.PlantCount data={this.props.data} />
			</div>

			<div className="sort-control-panel">
				<CC.SortControl state={this.props.reduxState} />
				<CC.AddButton state={this.props.reduxState} />
				<CC.SortSearch state={this.props.reduxState} placeholder="Find a plant..." />
			</div>

			{ plantMap.map(function(item) { 
					return <CC.PlantFamilyListing key={item.key} data={item}  />
				})
			}

		</div>
	}
});




















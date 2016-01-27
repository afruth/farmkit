CC.PlantFamilies = React.createClass ({
	componentDidMount() {
		$('#gridSel').dropdown();
	},
	componentDidUpdate() {
		$('#gridSel').dropdown('refresh');
	},
	componentWillUnmount() {
		Session.set('plantFamiliesState', this.state);
	},
	getInitialState() {
		let state = Session.get('plantFamiliesState') || {
				// limit: 10,
				// skip: 0,
				// page: 1,
				searchTerm: null,
				sort: null,
				order: null,
				reverse: false
			}
		return state
	},
	orderData( order ) {
		// Change order state
		// Toggle reverse if same order is passed again
		let self = this;
		CC.toggleOrder( order, self );
	},
	setSearchTerm (event) {

		let query = this.state.searchTerm || {};


		query[event.target.dataset.fieldname] = event.target.value;

		if(_.isEmpty(event.target.value)) {
			delete query[event.target.dataset.fieldname]
		}

		this.setState({
			searchTerm: query
		});
	},
	emptySearchTerm (event) {
		event.preventDefault();
		let query = this.state.searchTerm || {};

		let fieldName = event.target.dataset.field;
		delete query[fieldName];

		this.setState({
			searchTerm: query
		});
	},
	render () {
		const plantMap = [];
		const systems = this.props.data.systems
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

		return <div>
			<div className="fk-header plants">
				<CC.PlantCount data={this.props.data} />
			</div>

			<div className="sort-control-panel">
				<CC.SortControl state={this.props.reduxState} />
				<CC.AddButton state={this.props.reduxState} />
				<CC.SortSearch state={this.props.reduxState} placeholder="Find a system..." />
			</div>

			{ plantMap.map(function(item, x) { 
					return <CC.PlantFamilyListing key={item.key} data={item}  />
				})
			}

			<table className="ui celled fixed table unstackable">
				<thead>
					<tr>
						<th onClick={this.orderData.bind( this, "name" )}>Plant Type
							<CC.SearchForm
								field="name"
								setSearchTerm={this.setSearchTerm}
								emptySearchTerm={this.emptySearchTerm}
								defVal={this.state.searchTerm && this.state.searchTerm.plantName}
							/>
						</th>
						<th onClick={this.orderData.bind( this, "daysToHarvest" )}>Days to Harvest</th>
						<th onClick={this.orderData.bind( this, "avgPlantYield" )}>Average Yield</th>
						<th onClick={this.orderData.bind( this, "requiresPollination" )}>Requires Pollination</th>
						<th>Actions</th>
					</tr>
				</thead>

				<CC.TableBody 
					items = {this.props.data.plants} 
					order = {this.state.order} 
					reverse = {this.state.reverse} 
					childComponent = {CC.PlantFamilyListItem}
				/>

			</table>
		</div>
	}
});




















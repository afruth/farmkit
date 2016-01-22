CC.Systems = React.createClass ({
	componentDidMount() {
		$('#gridSel').dropdown();
	},
	componentDidUpdate() {
		$('#gridSel').dropdown('refresh');
	},
	componentWillUnmount() {
		Session.set('systemListState', this.state);
	},
	getInitialState() {
		let state = Session.get('systemListState') || {
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
	// changeLimit(event) {
	// 	this.state.limit = parseInt(event.target.value);
	// 	this.setState(this.state);
	// 	Session.set("pageState", this.state);
	// },
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
	// changePage(event) {
	// 	let page = parseInt(event.target.dataset.page);
	// 	this.state.skip = this.state.limit * (page - 1);
	// 	this.state.page = page;
	// 	this.setState(this.state);
	// },
	// pageUp(event) {
	// 	let page = this.state.page + 1;
	// 	this.state.skip = this.state.limit * (page - 1);
	// 	this.state.page = page;
	// 	this.setState(this.state);
	// },
	// pageDown(event) {
	// 	let page = this.state.page - 1;
	// 	this.state.skip = this.state.limit * (page - 1);
	// 	this.state.page = page;
	// 	this.setState(this.state);
	// },

	render () {
		return <div>
			<div className="fk-header systems">
				<CC.SystemCount data={this.props.data} />
			</div>

			<div className="sort-control-panel">
				<CC.SortControl state={this.props.reduxState} />
				<CC.AddButton state={this.props.reduxState} />
				<CC.SortSearch state={this.props.reduxState} placeholder="Find plant..." />
			</div>

			<h2>Systems  <a href="/system/add" className="ui green button"><i className="add icon"></i> Add a system</a></h2>
			<table className="ui celled fixed table unstackable">
				<thead>
					<tr>
						<th onClick={this.orderData.bind( this, "name" )}>System
							<CC.SearchForm
								field="name"
								setSearchTerm={this.setSearchTerm}
								emptySearchTerm={this.emptySearchTerm}
								defVal={this.state.searchTerm && this.state.searchTerm.plantName}
							/>
						</th>
						<th onClick={this.orderData.bind( this, "daysToHarvest" )}>Active Plants</th>
						<th onClick={this.orderData.bind( this, "avgPlantYield" )}>Automatic Watering</th>
						<th onClick={this.orderData.bind( this, "requiresPollination" )}>Lighting Type</th>
						<th>Actions</th>
					</tr>
				</thead>

				<CC.TableBody 
					items = {this.props.data.systems} 
					order = {this.state.order} 
					reverse = {this.state.reverse} 
					childComponent = {CC.SystemListItem}
				/>

			</table>
		</div>
	}
});


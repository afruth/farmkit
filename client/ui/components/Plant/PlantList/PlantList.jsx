CC.PlantList = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData() {
		let context = {
			limit: this.state.limit,
			skip: this.state.skip
		}
		if(this.state.searchTerm)
			context.searchTerm = this.state.searchTerm;

		if(this.state.sort)
			context.sort = this.state.sort;

		console.log(context)

		let handle = Meteor.subscribe('plantList', context);
		let pages = [];
		let totalPlants = Counts.get('totalPlants');
		let noOfPages = Math.ceil(totalPlants / this.state.limit);
		for (let a = 1; a <= noOfPages; a++) {
			pages.push({
				pageNo: a
			});
		}
		return {
			plants: Inventory.find({}, {
				limit: this.state.limit
			}).fetch(),
			pages: pages,
			loading: !handle.ready(),
			noOfPages: noOfPages
		}
	},
	componentDidMount() {
		$('#gridSel').dropdown();
	},
	componentDidUpdate() {
		$('#gridSel').dropdown('refresh');
	},
	componentWillUnmount() {
		Session.set('plantListState', this.state);
	},
	getInitialState() {
		let state = Session.get('plantListState') || {
				limit: 10,
				skip: 0,
				page: 1,
				searchTerm: null,
				sort: null,
				order: null
			}
		return state
	},
	orderData( order ) {
		// Set order to default if there isn't one
		console.log(order)
		if( order ){
			this.setState({ order: order });
		}
	},
	changeLimit(event) {
		this.state.limit = parseInt(event.target.value);
		this.setState(this.state);
		Session.set("pageState", this.state);
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
	changePage(event) {
		let page = parseInt(event.target.dataset.page);
		this.state.skip = this.state.limit * (page - 1);
		this.state.page = page;
		this.setState(this.state);
	},
	pageUp(event) {
		let page = this.state.page + 1;
		this.state.skip = this.state.limit * (page - 1);
		this.state.page = page;
		this.setState(this.state);
	},
	pageDown(event) {
		let page = this.state.page - 1;
		this.state.skip = this.state.limit * (page - 1);
		this.state.page = page;
		this.setState(this.state);
	},
	render() {
		return <div>
			<h2>Your inventory <a href="/inventory/add" className="ui green button"><i className="add icon"></i> Add a plant</a></h2>
			<table className="ui celled fixed table unstackable">
				<thead>
					<tr>
						<th onClick={this.orderData.bind( this, "plantName" )}>Plant name
							<CC.SearchForm
								field="plantName"
								setSearchTerm={this.setSearchTerm}
								emptySearchTerm={this.emptySearchTerm}
								defVal={this.state.searchTerm && this.state.searchTerm.plantName}
							/>
						</th>
						<th onClick={this.orderData.bind( this, "plantType" )}>Plant type</th>
						<th onClick={this.orderData.bind( this, "areaId" )}>Plant area</th>
						<th onClick={this.orderData.bind( this, "datePlanted" )}>Date planted</th>
						<th>Actions</th>
					</tr>
				</thead>
				{/* 
				<tbody>
				{(!this.data.loading) ? this.data.plants.map(function(item) { 
						return <CC.PlantListItem key={item._id} rowData={item} />
					}) : (() => {
						let arr = [];
						for (a=0; a < this.state.limit; a++) {
							arr.push(<tr key={a}><td></td><td></td><td></td><td></td></tr>)
							}
						return arr;
					})()
					}
				</tbody>
					*/}
						<CC.PlantListTable plants={this.data.plants} order={this.state.order} />
					
				<tfoot>
					<tr>
						<th colSpan="5">
							<div className="ui right floated pagination menu">
								<span className="pagin-label">page</span>
								{(this.state.page > 1) ?
								<a
									data-page={this.state.page - 1}
									className="icon item"
									onClick={this.pageDown}>
										<i className="left chevron icon"></i>
									</a> :
								null}

								{this.data.pages.map((item) => {
									return <a data-page={item.pageNo}
														key={item.pageNo}
														className="item"
														onClick={this.changePage}>
														{item.pageNo}
												</a>
									})}

								{(this.state.page < this.data.noOfPages) ?
									<a
										data-page={this.state.page + 1}
										className="icon item"
										onClick={this.pageUp}>
											<i className="right chevron icon"></i>
									</a> :
									null }

								<select defaultValue={this.state.limit} id="gridSel" className="ui dropdown" onChange={this.changeLimit}>
									<option value="10">10</option>
									<option value="25">25</option>
									<option value="50">50</option>
								</select>
							</div>
						</th>
					</tr>
				</tfoot>
			</table>
		</div>
	}
});

CC.PlantListTable = React.createClass({

	render(){
		console.log(this.props)
		let plantList = this.props.plants;
		if(this.props.order){
			plantList = _.sortBy( plantList, this.props.order );
		}
		console.log(plantList)
		return (
			<tbody>
				{ plantList.map(function(item) { 
					return <CC.PlantListItem key={item._id} rowData={item} />
				}) }
			</tbody>
		)
	}
});
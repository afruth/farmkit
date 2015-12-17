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
			plants: Plant.find({}, {
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
				limit: 5,
				skip: 0,
				page: 1,
				searchTerm: null,
				sort: null
			}
		return state
	},
	changeLimit(event) {
		this.state.limit = parseInt(event.target.value);
		this.setState(this.state);
		Session.set("pageState", this.state);
	},
	setSearchTerm (event) {
		this.setState({
			searchTerm: event.target.value
		})
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
			<h2>Your inventory <a href="/plant/add" className="ui green button">+ Add a plant</a></h2>
			<table className="ui celled fixed table unstackable">
				<thead>
					<tr>
						<th>Plant name
							<CC.SearchForm
								field="plantName"
								setSearchTerm={this.setSearchTerm}
								value={this.state.searchTerm}
							/>
						</th>
						<th>Plant type</th>
						<th>Plant area</th>
						<th>Date planted</th>
						<th>Actions</th>
					</tr>
				</thead>
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
									<option value="5">5</option>
									<option value="10">10</option>
									<option value="15">15</option>
								</select>
							</div>
						</th>
					</tr>
				</tfoot>
			</table>
		</div>
	}
});

CC.PlantListItem = React.createClass({

	render() {
		console.log(this.props.rowData);
		return (this.props.rowData) ? <tr>
			<td>
				<a href={"/plant/edit/" + this.props.rowData._id} >
					{this.props.rowData.plantName}
				</a>
			</td>
			<td>
				{(this.props.rowData.plantFamily()) ? this.props.rowData.plantFamily().name : null}
			</td>
			<td>
				{(this.props.rowData.plantArea()) ? this.props.rowData.plantArea().name : null}
			</td>
			<td>
				{(this.props.rowData.datePlanted) ? this.props.rowData.datePlanted.getTime() : null}
			</td>
			<td>
				<a href={'/plant/edit/' + this.props.rowData._id} className="ui green button">X</a>
				<a href={'/plant/remove/' + this.props.rowData._id} className="ui red button">X</a>
			</td>
		</tr>
			: null;
	}
});


CC.SearchForm = React.createClass({
	render () {
		return <input
							type="text"
							onChange={this.props.setSearchTerm}
							value={this.props.value}
							/>
	}
});
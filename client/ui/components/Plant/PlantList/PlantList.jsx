CC.PlantList = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData() {
		let handle = Meteor.subscribe('plantList', {
			limit: this.state.limit,
			skip: this.state.skip
		});
		let pages = [];
		let totalPlants = Counts.get('totalPlants');
		let noOfPages = Math.ceil(totalPlants / this.state.limit);
		for (let a = 1; a <= noOfPages; a++) {
			pages.push({
				pageNo: a
			});
		}
		return {
			plants: Plant.find({}).fetch(),
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
	getInitialState() {
		let state = {
			limit: 5,
			skip: 0,
			page: 1
		};
		return state
	},
	changeLimit(event) {
		this.state.limit = parseInt(event.target.value);
		this.setState(this.state);
		Session.set("pageState", this.state);
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
			<table className="ui celled table">
				<thead>
					<tr>
						<th>Plant name</th>
						<th>Plant type</th>
						<th>Plant area</th>
						<th>Date planted</th>
					</tr>
				</thead>
				<tbody>
				{(!this.data.loading) ? this.data.plants.map(function(item) {
						return <CC.PlantListItem key={item._id} rowData={item} />
					}) : <tr><td>Loading</td></tr>
					}
				</tbody>
				<tfoot>
					<tr>
						<th colSpan="4">
							<div className="ui right floated pagination menu">

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

								<select id="gridSel" className="ui dropdown" onChange={this.changeLimit}>
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
		</tr>
			: null;
	}
})
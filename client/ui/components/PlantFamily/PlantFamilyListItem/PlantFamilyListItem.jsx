CC.PlantFamilyListItem = React.createClass({

	render() {
		console.log(this.props)
		return (this.props.rowData) ? <tr>
			<td>
				<a href={"/inventory/view/" + this.props.rowData._id} >
					{this.props.rowData.name}
				</a>
			</td>
			<td>
				{this.props.rowData.daysToHarvest}
			</td>
			<td>
				{this.props.rowData.avgPlantYield}
			</td>
			<td>
				{this.props.rowData.requiresPollination}
			</td>
			<td>
				<a href={'/inventory/edit/' + this.props.rowData._id} className="ui green icon button"><i className="edit icon"></i></a>
				<a href={'/inventory/remove/' + this.props.rowData._id} className="ui red icon button"><i className="remove icon"></i></a>
			</td>
		</tr>
			: null;
	}
});
CC.PlantListItem = React.createClass({

	render() {
		console.log(this.props.rowData);
		return (this.props.rowData) ? <tr>
			<td>
				<a href={"/plant/single/" + this.props.rowData._id} >
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
				{(this.props.rowData.datePlanted) ? moment(this.props.rowData.datePlanted).format('MM/DD/YYYY') : null}
			</td>
			<td>
				<a href={'/plant/edit/' + this.props.rowData._id} className="ui green button">X</a>
				<a href={'/plant/remove/' + this.props.rowData._id} className="ui red button">X</a>
			</td>
		</tr>
			: null;
	}
});
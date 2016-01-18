CC.SystemListItem = React.createClass({
	findPlants( idArray ){
		if( idArray ){
			let plants = [];
			for( let i = 0; i < idArray.length; i++ ){
				plants.push( Inventories.findOne( idArray[i] ) );
			}
			return plants;
		}
	},
	hydroponic(){
		if( this.props.rowData.hydroponic ){
			return 'Hydroponic';
		} else {
			return 'Soil';
		}
	},
	sunlight(){
		if( this.props.rowData.sunlight ){
			return 'Sunlight';
		} else {
			return 'Artificial';
		}
	},
	render() {
		console.log(this.props)
		return (this.props.rowData) ? <tr>
			<td>
				<a href={"/system/view/" + this.props.rowData._id} >
					{this.props.rowData.name}
				</a>
			</td>
				{ this.findPlants( this.props.rowData.activePlants ) }
			<td>
			</td>
			<td>
				{ this.hydroponic() }
			</td>
			<td>
				{ this.sunlight() }
			</td>
			<td>
				<a href={'/system/edit/' + this.props.rowData._id} className="ui green icon button"><i className="edit icon"></i></a>
				<a href={'/system/remove/' + this.props.rowData._id} className="ui red icon button"><i className="remove icon"></i></a>
			</td>
		</tr>
			: null;
	}
});
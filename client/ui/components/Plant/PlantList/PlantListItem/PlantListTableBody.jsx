// This component orders the plant list items
CC.PlantListTableBody = React.createClass({
	render(){
		let plantList = this.props.plants;
		if(this.props.order){
			plantList = _.sortBy( plantList, this.props.order );
			if( this.props.reverse ){ // reverse if required
				plantList.reverse();
			}
		}
		return (
			<tbody>
				{ plantList.map(function(item) { 
					return <CC.PlantListItem key={item._id} rowData={item} />
				}) }
			</tbody>
		)
	}
});
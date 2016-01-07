// This component orders the plant list items
		// props plants and component are required
		// props order and reverse are optional 
CC.PlantTableBody = React.createClass({
	render(){
		let plantList = this.props.plants;
		if(this.props.order){
			plantList = _.sortBy( plantList, this.props.order );
			if( this.props.reverse ){ // reverse if required
				plantList.reverse();
			}
		}
		console.log( this.props )
		let ListComponent = this.props.childComponent;
		return (
			<tbody>
				{ plantList.map(function(item) { 
					return <ListComponent key={item._id} rowData={item} />
				}) }
			</tbody>
		)
	}
});
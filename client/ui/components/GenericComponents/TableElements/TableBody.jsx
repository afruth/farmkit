// This component orders the plant list items
		// props items and childComponent are required
		// props order and reverse are optional 
CC.TableBody = React.createClass({
	render(){
		let itemList = this.props.items;
		if(this.props.order){
			itemList = _.sortBy( itemList, this.props.order );
			if( this.props.reverse ){ // reverse if required
				itemList.reverse();
			}
		}
		let ListComponent = this.props.childComponent;
		return (
			<tbody>
				{ itemList.map(function(item) { 
					return <ListComponent key={item._id} rowData={item} />
				}) }
			</tbody>
		)
	}
});
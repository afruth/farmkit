// This is the main data layer. 
// Should be called for each route, and pass data to each sub route

CC.DataLayer = React.createClass ({
	mixins: [ReactMeteorData],
	getMeteorData() {

		let handlePlantTypes = Meteor.subscribe( 'plantTypes' );
		let handleSystems = Meteor.subscribe( 'systems' );
		// let handlePlantList = Meteor.subscribe( 'plantList' );  // Inventory
console.log( '*******|||||||||||||||||||| finding all data |||||||||||||||||||||||||********')
		return {
			plants: PlantFamily.find().fetch(),
			systems: System.find().fetch(),
		  plantInventory: Inventory.find().fetch(),
			loading: !handleSystems.ready(),
		}
	},
	render () {
		return (
			<div>
				<CC.ReduxState data={this.data} route={this.props.route} />
			</div>
		)
	}
});
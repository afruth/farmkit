CC.SystemRemove = React.createClass({
	removeDoc(event) {
		event.preventDefault();
		Meteor.call('/system/delete', this.props.docId, function(e,r) {

			if(!e){
				FlowRouter.go('/systems');
			} else {
				console.log(e)
			}
		});
	},
	render() {
		return <div>
			<h2>Are you sure you want to remove this entry?</h2>
			<a onClick={this.removeDoc} className="ui red button">Yes</a>
			<a href="/systems" className="ui green button">No</a>
			<CC.PlantSingle docId={this.props.docId} />
		</div>
	}
});
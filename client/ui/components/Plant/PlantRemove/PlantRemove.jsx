CC.PlantRemove = React.createClass({
	removeDoc(event) {
		event.preventDefault();
		Meteor.call('/inventory/delete', this.props.docId, function(e,r) {
			if(!e) FlowRouter.go('/inventory/list');
		});
	},
	render() {
		return <div>
			<h2>Are you sure you want to remove this entry?</h2>
			<a onClick={this.removeDoc} className="ui red button">Yes</a><a href="/inventory/list" className="ui green button">No</a>
		</div>
	}
});
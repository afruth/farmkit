CC.PlantRemove = React.createClass({
	removeDoc(event) {
		event.preventDefault();
		Meteor.call('/plant/remove', this.props.docId, function(e,r) {
			if(!e) FlowRouter.go('/plant/list');
		});
	},
	render() {
		return <div>
			<h2>Are you sure you want to remove this entry?</h2>
			<a onClick={this.removeDoc} className="ui red button">Yes</a><a href="/plant/list" className="ui green button">No</a>
		</div>
	}
});
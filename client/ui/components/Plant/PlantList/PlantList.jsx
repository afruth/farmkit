CC.PlantList = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData() {
		var handle = Meteor.subscribe('plantList',{
			limit: this.state.limit,
			skip: this.state.skip
		});

		return Plant.find({},{
			limit: this.state.limit,
			skip: this.state.skip
		}).fetch();
	},
	getInitialState() {
		return {
			limit: 5,
			skip: 0
		}
	},
	changeLimit(newLimit) {
		check(newLimit, Number);
		this.state.limit = newLimit;
		this.setState(this.state);
	},
	changePage(pageNo) {
		check(pageNo, Number);
		this.state.skip = this.state.limit * (pageNo - 1);
		this.setState(this.state);
	},
	render() {
		return <div>The plan list</div>
	}
})
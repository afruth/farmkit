CC.Systems = React.createClass ({
	render () {
		console.log(this.props)
		let systemMap = _.sortBy( this.props.data.systems, this.props.data.systems.activePlantFamilies );
		systemMap.reverse();
		return <div>
			<div className="fk-header systems">
				<CC.SystemCount data={this.props.data} />
			</div>

			<div className="sort-control-panel">
				<CC.SortControl state={this.props.reduxState} />
				<CC.AddButton state={this.props.reduxState} />
				<CC.SortSearch state={this.props.reduxState} placeholder="Find system..." />
			</div>

			{ systemMap.map(function(item) { 
					return <CC.SystemListing key={item._id} data={item}  />
				})
			}

		</div>
	}
});


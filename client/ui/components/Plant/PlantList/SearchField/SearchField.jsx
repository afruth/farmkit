CC.SearchForm = React.createClass({
	render () {
		return <input
			type="text"
			onChange={this.props.setSearchTerm}
			data-fieldname={this.props.field}
		/>
	}
});
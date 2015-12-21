CC.SearchForm = React.createClass({
	render () {
		return <div className="ui fluid icon input">
						<input
							ref="inp"
							type="text"
							onChange={this.props.setSearchTerm}
							data-fieldname={this.props.field}
							value={this.props.defVal}
						/>
						<i data-field={this.props.field} className="inverted circular remove link icon" onClick={this.props.emptySearchTerm}></i>
			</div>
	}
});
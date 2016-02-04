CC.SortSearch = React.createClass({
	getInitialState () {
		return { value: null };
	},
	handleChange ( event ) {
		console.log(event.target.value)
		this.setState({ value: event.target.value });
	},
	submit ( event ) {
		event.preventDefault();
		console.log('submitted')
		console.log(this.state.value)
		CC.store.dispatch({ type: 'search', term: this.state.value });
	},
	render () {
		return (
			<form onSubmit={this.submit} className="sort-search">
				<i className="fk-search"></i>
				<input
					id={this.props.id}
					placeholder={this.props.placeholder}
          ref='sortSearch'
          type="text" 
          className="sort-search-input"
          value={this.state.value}
          onChange={this.handleChange}
				/>
			</form>
		)
	}
});
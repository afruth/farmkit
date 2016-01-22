CC.SortSearch = React.createClass({
	submit () {
		console.log('submitted')
		console.log(this)
		CC.store.dispatch({ type: 'search', term: this.term });
	},
	render () {
		return (
			<form onSubmit={this.submit} className="sort-search">
				<i className="fk-search"></i>
				<input
					placeholder={this.props.placeholder}
          ref='sortSearch'
          type="text" />
				/>
			</form>
		)
	}
});
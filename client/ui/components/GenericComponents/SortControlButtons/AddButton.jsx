CC.AddButton = React.createClass({
	addClick(){
		console.log( 'addClick')
		CC.store.dispatch({ type: 'toggleAddBtn' });
	},
	render () {
		const classes = classNames( 'add-button', {
			'open': this.props.state.addBtn
		});

		return (
			<div className={classes} onClick={this.addClick} >
				<div id="sort-control__add-btn" className="add-button-add">
					<i className="fk-plus"></i>
				</div>
				<a href="/system/add" className="add-button-system">
					<i className="fk-systems"></i>
				</a>
				<a href="/inventory/add" className="add-button-plant">
					<i className="fk-plant"></i>
				</a>
			</div>
		)
	}
});
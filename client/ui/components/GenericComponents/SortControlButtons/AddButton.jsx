CC.AddButton = React.createClass({
	addClick(){
		CC.store.dispatch({ type: 'toggleAddBtn' });
	},
	render () {
		console.log( 'AddButton Rendered')

		const classes = classNames( 'add-button', {
			'open': this.props.state.addBtn
		});

		return (
			<div className={classes} onClick={this.addClick} >
				<div className="add-button-add">
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
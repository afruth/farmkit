// Needs a Redux dispatch to run on click
CC.ShadowClick = React.createClass({
	clearState () {
		CC.store.dispatch({ type: 'shadowClear' });
	},
	render () {
		const classes = classNames( 'shadow-click', {
			'shadow-clear': this.props.reduxState.addBtn
		});
		return (
			<div className={classes} onClick={this.clearState} ></div>
		)
	}
});
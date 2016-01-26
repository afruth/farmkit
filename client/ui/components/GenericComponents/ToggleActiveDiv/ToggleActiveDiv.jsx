// Renders div with passed text, and classes, combined with 'active' 
// 		if prop.active is true
// Props:
//		text: 	 	String
// 		active:  	boolean
// 		class: 		string of classnames
CC.ToggleActiveDiv = React.createClass ({
	render () {
		const classes = classNames( this.props.class, {
			'active': this.props.active
		});

		return (
			<div className={classes}>
				{this.props.text}
			</div>
		)
	}
});
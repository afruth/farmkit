
// Handles top navigation. Sets target based on props
CC.Header = React.createClass ({
	headerLink (){
		// Default is 'plants' (because it's the homepage)
		if(this.props.route === 'systems'){
			return "plants";
		} else {
			return "systems";
		}
	},
	render () {
  	return (
			<div className="header__nav">
  			<a href="/settings" className="header__settings">
  				<i className="fk-gear"></i>
  			</a>
  			<div className="header h3">{ this.props.route }</div>
  			<a href={"/" + this.headerLink()} className="header__link">
  				{ this.headerLink() }
  			</a>
			</div>
	  )
	}
});






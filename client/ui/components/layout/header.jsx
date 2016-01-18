
CC.Header = React.createClass ({
	headerClasses (){
		if(this.props.route === 'plants'){
			return "fk-header plants";
		} else if(this.props.route === 'systems'){
			return "fk-header systems";
		} else {
			return "fk-header";
		}
	},
	headerLink (){
		// Default is 'plants' (because it's the homepage)
		if(this.props.route === 'systems'){
			return "plants";
		} else {
			return "systems";
		}
	},
	render () {
		console.log(this.props)
  	return (
  		<div className={this.headerClasses()}>
  			<div className="header__nav">
	  			<a href="/settings" className="header__settings">
	  				<i className="fk-gear"></i>
	  			</a>
	  			<div className="header h3">{ this.props.route }</div>
	  			<a href={"/" + this.headerLink()} className="header__link">
	  				{ this.headerLink() }
	  			</a>
  			</div>

	  	</div>
	  )
	}
});




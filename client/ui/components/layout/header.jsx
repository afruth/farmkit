
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

  			<div className="header__count__box">
  				<div className="header__count left">
  					<div className="header__count__number">12</div>
  					<div className="header__count__title">
  						<div className="header__count__icon">
  							<i className="fk-varieties"></i>
  						</div>
  						<div className="header__count__title-text">
  							<span>varieties</span>
  						</div>
  					</div>
  				</div>
  				<div className="header__count center">
  					<div className="header__count__number">38</div>
  					<div className="header__count__title">
  						<div className="header__count__icon">
  							<i className="fk-plant"></i>
  						</div>
  						<div className="header__count__title-text">
  							<span>total</span>
  						</div>
  					</div>
  				</div>
  				<div className="header__count right">
  					<div className="header__count__number">6</div>
  					<div className="header__count__title">
  						<div className="header__count__icon">
  							<i className="fk-systems"></i>
  						</div>
  						<div className="header__count__title-text">
  							<span>systems</span>
  						</div>
  					</div>
  				</div>
  			</div>

	  	</div>
	  )
	}
});




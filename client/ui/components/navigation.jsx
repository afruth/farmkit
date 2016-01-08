



// Displays the top nav
//		changes the UI depending on the route displayed
CC.Navbar = React.createClass ({
  	render () {
      let self = this;
	    let routes = _.filter( FlowRouter._routes, function (x) {
	      	return x.options.navbar[self.props.navId] === true;
	    });
	    return (
	    	<div className="ui secondary menu">
	    		{routes.map( ( route ) => {
	    			return <CC.NavbarLinks key={Random.id()} route={route} uiStyle={this.props.uiStyle}/>
	    		})}
			</div>
	    );
  	}
});


// Displays the actual nav link
CC.NavbarLinks = React.createClass ({
  	render () {
  		return (
			<a href={this.props.route.path} className={this.props.uiStyle} >{this.props.route.name}</a>
  		);
  	}
});


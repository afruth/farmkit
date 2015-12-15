



// Displays the top nav
//		changes the UI depending on the route displayed
CC.Navbar = React.createClass ({
  	render () {
	    let routes = _.filter( FlowRouter._routes, function (x) {
	      	return x.options.navbar.topnav === true;
	    });
	    console.log( routes )
	    return (
	    	<div className="ui secondary  menu">
	    		{routes.map( function( route ){
	    			return <CC.NavbarLinks route={route} />
	    		})}
			</div>
	    );
  	}
});


// Displays the footer Navigation
//		changes the UI depending on the route displayed
CC.FooterNav = React.createClass ({
  	render () {
	    let routes = _.filter( FlowRouter._routes, function (x) {
	      	return x.options.navbar.footer === true;
	    });
	    console.log( routes )
	    return (
	    	<div className="ui secondary  menu">
	    		{routes.map( function( route ){
	    			return <CC.NavbarLinks route={route} />
	    		})}
			</div>
	    );
  	}
});

// Displays the actual nav link
CC.NavbarLinks = React.createClass ({
  	render () {
  		return (
			<a href={this.props.route.path} className="item">{this.props.route.name}</a>
  		);
  	}
});


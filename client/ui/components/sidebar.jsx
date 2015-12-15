



// Displays the sidebar
//		changes the UI depending on the route displayed
CC.Navbar = React.createClass ({
  	render () {
	    let routes = _.filter( FlowRouter._routes, function (x) {
	      	return x.options.navbar === true;
	    });
	    // let paths = _.pluck( routes, 'path' );
	    console.log( routes )
	    // console.log( paths )
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



// Standard Layout
CC.MainLayout = React.createClass ({
	// Boolean to render sidebar framework
  	render() {
		let sidebar = true;
	    return <div>
	    	{ sidebar ?
	    		<div className="ui sidebar">
	    			{/* <CC.Sidebar /> */}
    				<h1>sidebar</h1>
	    		</div>
	    	: null }

	    	<div className="pusher"> 
	    		
		      	<header>
		        	{this.props.header}
		      	</header>
		      	<main>
		        	{this.props.content}
		      	</main>
		      	<footer>
		        	{this.props.footer}
		      	</footer>

	    	</div>
	    </div>
  	}
});



// Standard Layout
CC.MainLayout = React.createClass ({
  	render() {
	    return <div>
	      	<header>
	        	{this.props.header}
	      	</header>
	      	<main className="main">
	        	{this.props.content}
	      	</main>
	      	<footer className="footer">
	        	{this.props.footer}
	      	</footer>

	    </div>
  	}
});

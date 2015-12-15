
// Standard Layout
CC.MainLayout = React.createClass ({
	styles: {
		footer: {
			position: 'absolute',
			width: '100%',
			bottom: 0
		}
	},
  	render() {
	    return <div>
	      	<header>
	        	{this.props.header}
	      	</header>
	      	<main>
	        	{this.props.content}
	      	</main>
	      	<footer style={this.styles.footer}>
	        	{this.props.footer}
	      	</footer>

	    </div>
  	}
});

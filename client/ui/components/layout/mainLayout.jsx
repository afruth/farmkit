
// Standard Layout
CC.MainLayout = React.createClass ({
	render() {
    return (
    	<div>
      	<header className="main-header">
        	{this.props.header} 
      	</header>
      	<main className="main">
        	{this.props.content}
      	</main>
    	</div>
		)
	}
});



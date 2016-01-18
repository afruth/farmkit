
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
	render () {
		console.log(this.props)
  	return <div className={this.headerClasses()}>
  		<CC.Navbar navId="topnav" uiStyle="item" />
  	</div>
	}
});




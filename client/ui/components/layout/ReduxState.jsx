// Loads in the redux state as a props, via Session.var
// Have to determine the component to render via this.props.route
// Exists "under" the DataLayer, so that the data isn't reloaded with each state change
// Holds app wide clickout handler
CC.ReduxState = React.createClass ({
	mixins: [ReactMeteorData],
  getMeteorData() {

    const reduxState = Session.get( 'reduxState' ) || CC.defaultState;
    return {
      reduxState: reduxState
    }
  },
  clickoutHandler ( event ) {
  	console.log('clickoutHandler')
  	console.log(event)
  },
  render () {
  	// Render different component based on props
  	let Component;
		if( this.props.route === 'PlantFamilies' ){
			Component = <CC.PlantFamilies data={this.props.data} reduxState={this.data.reduxState} />;
		}else if ( this.props.route === 'Systems' ) {
			Component = <CC.Systems data={this.props.data} reduxState={this.data.reduxState} />;
		} else {
			Component = <CC.Loading />;
		}

		// Render ShadowClick conditionally 
		let ShadowClick;
		if( this.data.reduxState.addBtn ){
			ShadowClick =	<CC.ShadowClick reduxState={this.data.reduxState} />
		}

		return (
			<div onClick={this.clickoutHandler.bind( this, event )}>
				{ Component }
				{ ShadowClick }
			</div>
		)
  }
});


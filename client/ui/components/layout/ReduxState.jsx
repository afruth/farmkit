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
  componentDidMount () {
  	// This is bound to the DOM, so state must be accessed through Session var
  	document.getElementById( "react-root" ).addEventListener( "click", function (event) {
  		let state = Session.get( 'reduxState' ); 		
  		const clickedElementID = event.target.id; // Clicked object's ID
  		// console.log('click ID - ', clickedElementID )

  		// Check state. Some states trigger an action no matter what
  		if( state.addBtn === true ) { // Add button is open
  			if( clickedElementID !== 'sort-control__add-btn' ){
	  			CC.store.dispatch({ type: 'closeAddBtn' });
	  			return;
  			}
  		}
  	});
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

		// // Render ShadowClick conditionally 
		// let ShadowClick;
		// if( this.data.reduxState.addBtn ){
		// 	ShadowClick =	<CC.ShadowClick reduxState={this.data.reduxState} />
		// }


		return (
			<div>
				{ Component }
				{ /* ShadowClick */ }
			</div>
		)
  }
});


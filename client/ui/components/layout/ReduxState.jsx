// Loads in the redux state as a props, via Session.var
// Have to determine the component to render via this.props.route
CC.ReduxState = React.createClass ({
	mixins: [ReactMeteorData],
  getMeteorData() {

    const reduxState = Session.get( 'reduxState' ) || CC.defaultState;
    return {
      reduxState: reduxState
    }
  },
  render () {
		if( this.props.route === 'PlantFamilies' ){
			return (
				<CC.PlantFamilies data={this.props.data} reduxState={this.data.reduxState} />
			)
		}else if ( this.props.route === 'Systems' ) {
			return (
				<CC.Systems data={this.props.data} reduxState={this.data.reduxState} />
			)
		} else {
			return (
				<CC.Loading />
			)
		}
  }
});


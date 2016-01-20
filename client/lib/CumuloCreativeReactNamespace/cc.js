CC = {
	toggleOrder: function( order, self ) {

		// Change order state
		// Toggle reverse if same order is passed again
		let currentOrder = self.state.order; 
		let currentReverse = self.state.reverse; 
		if( order ){ // guarding
			if( currentOrder === order ){ // if passing the same order, toggle direction
				if( currentReverse ){
					self.setState({ reverse: false });
				} else {
					self.setState({ reverse: true });
				}
			} else { // if order is different, set that. Should never start reversed
				self.setState({ 
					order: order,
					reverse: false 
				});
			}
		}
	}, 


};

CC.FormElements = {};

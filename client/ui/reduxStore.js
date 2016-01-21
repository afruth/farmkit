
CC.sortControlReducer = function sortControlReducer(state = 'all', action) {
  switch (action.type) {
	  case 'all':
	  	return Object.assign({}, state, { 
	  		'sortAll': true,
	  		'sortHydro': false,
	  		'sortSoil': false
	  	});
	  case 'hydro':
	    return Object.assign({}, state, { 
	  		'sortAll': false,
	  		'sortHydro': true,
	  		'sortSoil': false
	  	});
	  case 'soil':
	  	return Object.assign({}, state, { 
	  		'sortAll': false,
	  		'sortHydro': false,
	  		'sortSoil': true
	  	});
	  default:
	    return state;
  }
}

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
CC.store = Redux.createStore( CC.sortControlReducer );

// You can subscribe to the updates manually, or use bindings to your view layer.
CC.store.subscribe(() =>
    console.log(CC.store.getState())
);

// store.dispatch({ type: 'INCREMENT' })
// store.dispatch({ type: 'INCREMENT' })
// store.dispatch({ type: 'DECREMENT' })
// How to use:
// Redux.createStore()
// Redux.combineReducers()
// Redux.applyMiddleware()
// Redux.bindActionCreators()
// Redux.compose()


CC.defaultState = { 
	  		'sortPlantsAll': true,
	  		'sortPlantsHydro': false,
	  		'sortPlantsSoil': false,
	  		'sortSystemsAll': true,
	  		'sortSystemsHydro': false,
	  		'sortSystemsSoil': false,
	  		'search': null,
	  		'addBtn': false
	  	};


CC.reduxReducer = function sortControlReducer(state = CC.defaultState, action) {
  switch (action.type) {
	  case 'plantsAll':
	  	return Object.assign({}, state, { 
	  		'sortPlantsAll': true,
	  		'sortPlantsHydro': false,
	  		'sortPlantsSoil': false
	  	});
	  case 'plantsHydro':
	    return Object.assign({}, state, { 
	  		'sortPlantsAll': false,
	  		'sortPlantsHydro': true,
	  		'sortPlantsSoil': false
	  	});
	  case 'plantsSoil':
	  	return Object.assign({}, state, { 
	  		'sortPlantsAll': false,
	  		'sortPlantsHydro': false,
	  		'sortPlantsSoil': true
	  	});
	  case 'systemsAll':
	  	return Object.assign({}, state, { 
	  		'sortSystemsAll': true,
	  		'sortSystemsHydro': false,
	  		'sortSystemsSoil': false
	  	});
	  case 'systemsHydro':
	    return Object.assign({}, state, { 
	  		'sortSystemsAll': false,
	  		'sortSystemsHydro': true,
	  		'sortSystemsSoil': false
	  	});
	  case 'systemsSoil':
	  	return Object.assign({}, state, { 
	  		'sortSystemsAll': false,
	  		'sortSystemsHydro': false,
	  		'sortSystemsSoil': true
	  	});
	  case 'search':
	  	return Object.assign({}, state, { 
	  		'search': action.term
	  	});
	  // Toggles Add button open state 
	  case 'toggleAddBtn':
	  	if( !state.addBtn ){
		  	return Object.assign({}, state, { 
		  		'addBtn': true
		  	});	  		
	  	} else {
	  		return Object.assign({}, state, { 
		  		'addBtn': false
		  	});	  
	  	}
	  // Closes Add button open state 
	  case 'closeAddBtn':
  		return Object.assign({}, state, { 
	  		'addBtn': false
	  	});	  
  	// Shadow element click to clear. Resets multiple states. 
  	case 'shadowClear':
  		return Object.assign({}, state, {
  			'addBtn': false
  		});
	  default:
	    return state;
  }
}

// // Sort Search Reducer. From SortSearch Component
// CC.sortSearchReducer = function sortControlReducer(state = CC.defaultState, action, term) {
// 	console.log(state)
// 	console.log(term)
// 	console.log(action)
//   switch (action.type) {
// 	  case 'search':
// 	  	return Object.assign({}, state, { 
// 	  		'search': term
// 	  	});
// 	  default:
// 	    return state;
//   }
// }

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
CC.store = Redux.createStore( CC.reduxReducer );
// CC.store = Redux.createStore( CC.sortSearchReducer );

// You can subscribe to the updates manually, or use bindings to your view layer.
CC.store.subscribe(() => {
	Session.set( 'reduxState', CC.store.getState() );
  // console.log(CC.store.getState())
});

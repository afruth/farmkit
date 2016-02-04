CC.SystemListing = React.createClass({
	plantNum () {
		const families = this.props.data.activePlantFamilies;
		let plantNum = 0;
		for( let i = 0; i < families.length; i++ ){
			plantNum = plantNum + families[i].plants.length;
		}
		return plantNum;
	},
	lightType () {
		if( this.props.data.sunlight ){
			return (
				<div className="listing__light-type">
					<i className="fk-partly-sunny"></i>
					<span>Sunlight</span>
				</div>
			) 
		} else {
			return (
				<div className="listing__light-type">
					<i className="fk-bulb"></i>
					<span>Artificial Light</span>
				</div>
			) 
		}
	},
	individualView  () {
		// Opens the options, unless their already open
		console.log( 'change this to open individual view, once that exists')
		if( this.props.reduxState.openOption === this.props.data._id ){ // close if it's open
			CC.store.dispatch({ type: 'closeOptions' })
		} else {
			CC.store.dispatch({ type: 'toggleOption', id: this.props.data._id })
		}
	},
	touchStart (event) {
		// track touch start position for swipe direction
		this.touchX = event.nativeEvent.changedTouches[0].screenX;
	},
	touchEnd (event) {
		// toggle or close options, based on swipe direction
		const currentX = event.nativeEvent.changedTouches[0].screenX;
		if( this.touchX > currentX ){ // swipe left
			CC.store.dispatch({ type: 'toggleOption', id: this.props.data._id });
		} else { // swipe right
			CC.store.dispatch({ type: 'closeOptions' })
		}
	},
	render () {
		// console.log(this.props)
		const systemTypeClasses = classNames( 'listing__system-type', {
			'hydro': this.props.data.hydroponic
		});

		// Set listing-sleeve classes (opening animation)
		let openOption = false;
		if( this.props.data._id === this.props.reduxState.openOption ){
			openOption = true;
		}
		const optionClasses = classNames( 'listing-sleeve', {
			'open': openOption
		});

		// compile an array of options
		let optionsArray = [];
		// PH is available for all systems
		if( this.props.data.phSchedule.remind ){
			let phSchedule = this.props.data.phSchedule;
			phSchedule.key = "ph" + this.props._id;
			phSchedule.name = "check PH";
			phSchedule.class = "ph";
			optionsArray.push( phSchedule );
		}
		if( this.props.data.hydroponic ){ // Hydroponic only options
			if( this.props.data.cleaningSchedule.remind ){
				let cleaningSchedule = this.props.data.cleaningSchedule;
				cleaningSchedule.key = "clean" + this.props._id;
				cleaningSchedule.name = "clean";
				cleaningSchedule.class = "clean";
				optionsArray.push( cleaningSchedule );
			}
			if( this.props.data.nutrientsSchedule.remind ){
				let nutrientsSchedule = this.props.data.nutrientsSchedule;
				nutrientsSchedule.key = "nutrients" + this.props._id;
				nutrientsSchedule.name = "nutrients";
				nutrientsSchedule.class = "nutrients";
				optionsArray.push( nutrientsSchedule );
			}
			if( this.props.data.waterLevelSchedule.remind ){
				let waterLevelSchedule = this.props.data.waterLevelSchedule;
				waterLevelSchedule.key = "water-level" + this.props._id;
				waterLevelSchedule.name = "water level";
				waterLevelSchedule.class = "water-level";
				optionsArray.push( waterLevelSchedule );
			}
		} else { // Soil only options
			// All soil systems can be fertilized
			let fertilize = {};
			fertilize.key = "fertilize" + this.props._id;
			fertilize.name = "fertilize";
			fertilize.class = "fertilize";
			optionsArray.push( fertilize );
		}

		const listingClasses = "listing listing-options-" + optionsArray.length;

		// fake options
		let fakeOptions;
		if( optionsArray.length === 0 ){
			fakeOptions = ( 
				<div>
					<div className="listing__option nutrients">
						<div className="listing__option__icon">
							<i className="fk-nutrients"></i>
						</div>
						<p className="listing__option__title">nutrients</p>
					</div>
					<div className="listing__option ph">
						<div className="listing__option__icon">
							<i className="fk-ph"></i>
						</div>
						<p className="listing__option__title">check PH</p>
					</div>
					<div className="listing__option clean">
						<div className="listing__option__icon">
							<i className="fk-clean"></i>
						</div>
						<p className="listing__option__title">clean</p>
					</div>
					<div className="listing__option water-level">
						<div className="listing__option__icon">
							<i className="fk-water-level"></i>
						</div>
						<p className="listing__option__title">water level</p>
					</div>
				</div>
			);
		}

		return (
			<div 	className={ listingClasses } 
						onClick={ this.individualView } 
						onTouchStart={ this.touchStart }
						onTouchEnd={ this.touchEnd } >
				<div className={ optionClasses } >
					<div className={ systemTypeClasses } ></div>

					<div className="listing__name">{this.props.data.name}</div>
					<div className="listing__sub-heading">{ this.lightType() }</div>

					<div className="listing__plant-count">
						<span>{ this.plantNum() }</span>
						<i className="fk-plant"></i>
					</div>

					<div className="listing__bottom-line"></div>
				</div>

				<div className="listing__option-box">

					{ optionsArray.map( function( item ){
							return <CC.ListingOption 
								key={ item.key }
								title={ item.name } 
								class={ item.class } />
						})
					}

					{ fakeOptions }
				</div>

			</div>
		)
	}
});
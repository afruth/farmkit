CC.PlantFamilyListing = React.createClass({
	toggleOptions () {
		// Opens the options, unless their already open
		if( this.props.reduxState.openOption === this.props.data.key ){ // close if it's open
			CC.store.dispatch({ type: 'closeOptions' })
		} else {
			CC.store.dispatch({ type: 'toggleOption', id: this.props.data.key }) 
		}
	},
	render () {
		// console.log(this.props)
		const systemTypeClasses = classNames( 'listing__system-type', {
			'hydro': this.props.data.systemType
		});

		// Set listing-sleeve classes (opening animation)
		let openOption = false;
		if( this.props.data.key === this.props.reduxState.openOption ){
			openOption = true;
		}
		const optionClasses = classNames( 'listing-sleeve', {
			'open': openOption
		});

		// compile an array of options
		let optionsArray = [];
		// Pollinate based on plant family options
		if( this.props.data.plantType.requiresPollination ){
			let pollinate = {};
			pollinate.key = "pollinate" + this.props.key;
			pollinate.name = "pollinate";
			pollinate.class = "pollinate";
			optionsArray.push( pollinate );
		}
		// Group harvesting and system moving are always options
		let harvest = {};
		harvest.key = "harvest" + this.props._id;
		harvest.name = "harvest";
		harvest.class = "harvest";
		optionsArray.push( harvest );
		let move = {};
		move.key = "move" + this.props._id;
		move.name = "move";
		move.class = "systems";
		optionsArray.push( move );

		const listingClasses = "listing listing-options-" + optionsArray.length;

		// fake options - remove after EXPO
		let fakeOptions;
		if( optionsArray.length === 0 ){
			fakeOptions = (
				<div>
					<div className="listing__option pollinate">
						<div className="listing__option__icon">
							<i className="fk-pollinate"></i>
						</div>
						<p className="listing__option__title">pollinate</p>
					</div>
					<div className="listing__option harvest">
						<div className="listing__option__icon">
							<i className="fk-harvest"></i>
						</div>
						<p className="listing__option__title">harvest</p>
					</div>
					<div className="listing__option fertilize">
						<div className="listing__option__icon">
							<i className="fk-fertilize"></i>
						</div>
						<p className="listing__option__title">fertilize</p>
					</div>
					<div className="listing__option water">
						<div className="listing__option__icon">
							<i className="fk-water"></i>
						</div>
						<p className="listing__option__title">water</p>
					</div>
				</div>
			)
		}

		return (
			<div className={ listingClasses } onClick={ this.toggleOptions } >
				<div className={ optionClasses }>
					<div className={ systemTypeClasses }></div>

					<div className="listing__name">{ this.props.data.plantType.name }</div>
					<div className="listing__sub-heading">{ this.props.data.system }</div>

					<div className="listing__plant-count">
						<span>{ this.props.data.plantNumber }</span>
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
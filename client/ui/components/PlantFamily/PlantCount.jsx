// Plant Count div. Shared CSS in count.less
CC.PlantCount = React.createClass ({
	render () {
		const plantFamilies = this.props.data.plants;
		const systems = this.props.data.systems;
		let plantCount = 0;
		let familyArr = [];
		// Pull plant data from Systems
		for( let i = 0; i < systems.length; i++ ){
			let activePlants = systems[i].activePlantFamilies;
			if( systems[i].activePlantFamilies.length > 0 ) { // Only if system has active plants
				for( let o = 0; o < activePlants.length; o++ ){
					plantCount = plantCount + activePlants[o].plants.length;
					familyArr.push( activePlants[o].familyId );
				}
			}
		}
		familyArr = _.uniq( familyArr ); // Clean it up

		return (
			<div className="header__count__box">
				<div className="header__count left">
					<div className="header__count__number">{ familyArr.length }</div>
					<div className="header__count__title">
						<i className="fk-varieties"></i>
						<span>Varieties</span>
					</div>
				</div>
				<div className="header__count center">
					<div className="header__count__number">{ plantCount }</div>
					<div className="header__count__title">
						<i className="fk-plant"></i>
						<span>Total</span>
					</div>
				</div>
				<div className="header__count right">
					<div className="header__count__number">{ this.props.data.systems.length }</div>
					<div className="header__count__title">
						<i className="fk-systems"></i>
						<span>Systems</span>
					</div>
				</div>
			</div>
		)
	}
});
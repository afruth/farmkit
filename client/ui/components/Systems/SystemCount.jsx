// System Count. Shared CSS in count.less

CC.SystemCount = React.createClass ({
	render () {
		const systems = this.props.data.systems;
		let plantCount = 0;
		// Pull plant data from Systems
		for( let i = 0; i < systems.length; i++ ){
			let activePlants = systems[i].activePlantFamilies;
			if( systems[i].activePlantFamilies.length > 0 ) { // Only if system has active plants
				for( let o = 0; o < activePlants.length; o++ ){
					plantCount = plantCount + activePlants[o].plants.length;
				}
			}
		}

		return (
			<div className="header__count__box">
				<div className="header__count left">
					<div className="header__count__number">{ plantCount }</div>
					<div className="header__count__title">
						<i className="fk-plant"></i>
						<span>total</span>
					</div>
				</div>
				<div className="header__count center">
					<div className="header__count__number">{ systems.length }</div>
					<div className="header__count__title">
						<i className="fk-systems"></i>
						<span>systems</span>
					</div>
				</div>
				<div className="header__count right">
					<div className="header__count__number">0</div>
					<div className="header__count__title">
						<i className="fk-water"></i>
						<span>alerts</span>
					</div>
				</div>
			</div>
		)
	}
});
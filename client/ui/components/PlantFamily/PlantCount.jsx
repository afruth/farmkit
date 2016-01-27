// Plant Count div. Shared CSS in count.less
CC.PlantCount = React.createClass ({
	render () {
		console.log(this.props)
		const plantFamilies = this.props.data.plants;
		return (
			<div className="header__count__box">
				<div className="header__count left">
					<div className="header__count__number">12</div>
					<div className="header__count__title">
						<i className="fk-varieties"></i>
						<span>Varieties</span>
					</div>
				</div>
				<div className="header__count center">
					{/*
					<div className="header__count__number">{this.props.data.plantInventory.length}</div>
					*/}
					<div className="header__count__number">Nope</div>
					<div className="header__count__title">
						<i className="fk-plant"></i>
						<span>Total</span>
					</div>
				</div>
				<div className="header__count right">
					<div className="header__count__number">{this.props.data.systems.length}</div>
					<div className="header__count__title">
						<i className="fk-systems"></i>
						<span>Systems</span>
					</div>
				</div>
			</div>
		)
	}
});
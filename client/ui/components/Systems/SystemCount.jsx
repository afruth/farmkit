// System Count. Shared CSS in count.less

CC.SystemCount = React.createClass ({
	render () {
		return (
			<div className="header__count__box">
				<div className="header__count left">
					<div className="header__count__number">38</div>
					<div className="header__count__title">
						<div className="header__count__icon">
							<i className="fk-plant"></i>
						</div>
						<div className="header__count__title-text">
							<span>total</span>
						</div>
					</div>
				</div>
				<div className="header__count center">
					<div className="header__count__number">6</div>
					<div className="header__count__title">
						<div className="header__count__icon">
							<i className="fk-systems"></i>
						</div>
						<div className="header__count__title-text">
							<span>systems</span>
						</div>
					</div>
				</div>
				<div className="header__count right">
					<div className="header__count__number">0</div>
					<div className="header__count__title">
						<div className="header__count__icon">
							<i className="fk-water"></i>
						</div>
						<div className="header__count__title-text">
							<span>alerts</span>
						</div>
					</div>
				</div>
			</div>
		)
	}
});
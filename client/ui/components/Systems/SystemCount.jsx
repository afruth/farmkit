// System Count. Shared CSS in count.less

CC.SystemCount = React.createClass ({
	render () {
		return (
			<div className="header__count__box">
				<div className="header__count left">
					<div className="header__count__number">38</div>
					<div className="header__count__title">
						<i className="fk-plant"></i>
						<span>total</span>
					</div>
				</div>
				<div className="header__count center">
					<div className="header__count__number">6</div>
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
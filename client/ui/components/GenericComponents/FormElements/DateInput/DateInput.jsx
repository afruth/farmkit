CC.FormElements.DateInput = React.createClass({
	getValue() {
		return this.refs[this.props.fieldName].value;
	},
	componentDidMount() {
		$('.datetimepicker').datetimepicker({
			format: 'MM/DD/YYYY'
		});
	},
	componentDidUpdate() {
	},
	render() {
		return <div className="fieldWrap">
			<div className={(this.props.error && this.props.error[this.props.fieldName]) ? "field error" : "field" }>
				<label htmlFor={this.props.fieldName}>
					{this.props.label}
				</label>
				<input
					id={this.props.fieldName}
					ref={this.props.fieldName}
					defaultValue={moment(this.props.defValue).format('MM/DD/YYYY')}
					onChange={this.props.onChangedEvent}
					className="datetimepicker"
					type="text" />
			</div>
			{(this.props.error && this.props.error[this.props.fieldName]) ?
			<span className="error">
          {this.props.error[this.props.fieldName]}
        </span> : null}
		</div>
	}
});
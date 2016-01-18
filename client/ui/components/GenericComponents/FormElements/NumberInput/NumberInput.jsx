CC.FormElements.NumberInput = React.createClass({
  getValue() {
    return this.refs[this.props.fieldName].value;
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
					defaultValue={this.props.defValue}
          onChange={this.props.onChangedEvent}
          type="number"
          step={this.props.step}
          min={this.props.min}
          max={this.props.max} />
      </div>
        {(this.props.error && this.props.error[this.props.fieldName]) ?
      <span className="error">
          {this.props.error[this.props.fieldName]}
        </span> : null}
    </div>
  }
});
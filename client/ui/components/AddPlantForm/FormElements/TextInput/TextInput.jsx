CC.FormElements.TextInput = React.createClass({
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
          onChange={this.props.onChangedEvent}
          type="text" />
      </div>
        {(this.props.error && this.props.error[this.props.fieldName]) ?
      <span className="error">
          {this.props.error[this.props.fieldName]}
        </span> : null}
    </div>
  }
});
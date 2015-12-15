CC.FormElements.SelectInput = React.createClass({
  getValue() {
    return this.refs[this.props.fieldName].value;
  },
  render() {
    return <div className="fieldHolder">
      <label htmlFor={this.props.fieldName}>
        {this.props.label}
      </label>
      <select
        id={this.props.fieldName}
        ref={this.props.fieldName}
        onChange={this.props.onChangedEvent}>
        <option value="">Choose an option</option>
        {this.props.data.map(function(p) {
          return <option
            key={p._id}
            value={p._id}>{p.name}
          </option>
          })}
      </select>

      {(this.props.error && this.props.error[this.props.fieldName]) ?
      <span className="error">
        {this.props.error[this.props.fieldName]}
      </span> : null}
    </div>
  }
});
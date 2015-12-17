CC.FormElements.SelectInput = React.createClass({
  getValue() {
    return this.refs[this.props.fieldName].value;
  },
  componentDidMount() {
    $('.ui.dropdown').dropdown();
  },
  componentDidUpdate() {
    $('.ui.dropdown').dropdown('refresh');
  },
  render() {
    console.log(this)
    return <div className="fieldWrap">
      <div className={(this.props.error && this.props.error[this.props.fieldName]) ? "field error" : "field" }>
        <label htmlFor={this.props.fieldName}>
          {this.props.label}
        </label>
        <select
					defaultValue={this.props.defValue}
          className="ui dropdown"
          id={this.props.fieldName}
          ref={this.props.fieldName}
          onChange={this.props.onChangedEvent}>
          <option value="">Choose an option</option>
          {this.props.data.map(function(p) {
            return <option
              key={p.value}
              value={p.value}>{p.label}
            </option>
            })}
        </select>
      </div>
      {(this.props.error && this.props.error[this.props.fieldName]) ?
        <div className="error">
          {this.props.error[this.props.fieldName]}
        </div> : null}
    </div>
  }
});
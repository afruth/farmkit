CC.Grid = React.createClass ({
  //it should
  mixins: [ReactMeteorData],
  getMeteorData() {
    var collection = this.props.collection;

    var query = (this.props.query) ? this.props.query : {};


  },
  //accept a collection and optional a query in props
  getInitialState () {
    return {
      collection: this.props.collection,
      query: this.props.query,
      totalRows: this.props.cursor.length,
      shownRows: (this.props.noRows) ? this.props.noRows : 20,
    }
  },
  setTopRow (topRow) {

  },
  //build a table from the mask or from the cursor in render

  //have infinite loading by virtualization or paging -

  //have totals - from props

  //have defaults (no. of rows)

  //have a default action on row click

  //have some way to filter the result set

  //build a ScrollBar
  render () {
    return <div>
      this is a grid
      <CC.ScrollBar noRows={this.state.totalRows} shownRows={this.state.shownRows} />
    </div>
  }
});


CC.ScrollBar = React.createClass ({
  //it should

  //accept a react component as target
  componentWillMount () {
    check(this.props.noRows, Number);
  },
  //expose an interface to the component
  setRows (noRows) {
    check(noRows, Number);
    this.state.noRows = noRows;
  },
  //to set total number of rows

  //to accept a function from the target to be called on row change

  render () {
    return <div className="cc--scrollbar__wrapper">
      <div className="cc--scrollbar__inside"></div>
    </div>
  }
});

CC.Dummy = React.createClass({
  render () {
    return <div>Le Dummy</div>
  }
});
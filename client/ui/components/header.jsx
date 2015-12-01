CC.Header = React.createClass ({
  render () {
    return <div>This is the header</div>
  }
});


CC.Navbar = React.createClass ({
  render () {
    let routes = _.filter( FlowRouter._routes, function (x) {
      return x.options.navbar === true;
    });
    let paths = _.pluck( routes, 'path' );
    console.log( routes )
    console.log( paths )
    return <div>

    </div>
  }
});
CC.Admin = React.createClass ({
  render () {
    return <div>
        <header>{this.props.header}</header>
        <main>{this.props.content}</main>
        <footer>{this.props.footer}</footer>
      </div>
  }
});

CC.AdminContent = React.createClass ({
  render () {
    return <div>
        This is the Admin content.
      </div>
  }
});
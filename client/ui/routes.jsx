FlowRouter.route('/', {
  action: function(params, queryParams) {
    ReactLayout.render(MainLayout,{
      header: 'this is the header',
      content: <Content />,
      footer: 'this is the footer'
    });
  }
});
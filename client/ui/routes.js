FlowRouter.route('/', {
  action: function(params, queryParams) {
    ReactLayout.render(MainLayout,{
      header: 'this is the header',
      content: 'this is the content',
      footer: 'this is the footer'
    });
  }
});
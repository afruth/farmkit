var Content = CC.Content;

FlowRouter.route('/', {
  action: function(params, queryParams) {
    ReactLayout.render(CC.MainLayout,{
      header: 'this is the header',
      content: <Content />,
      footer: 'this is the footer'
    });
  }
});

FlowRouter.route('/plant/add', {
  action: function(params, queryParams) {
    ReactLayout.render(CC.MainLayout,{
      header: 'this is the header',
      content: <AddPlantForm />,
      footer: 'this is the footer'
    });
  }
});
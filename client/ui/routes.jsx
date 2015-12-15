
FlowRouter.route('/', {
  navbar: false,
  name: 'home',
  action: function(params, queryParams) {
    ReactLayout.render(CC.MainLayout,{
      header: <CC.Header />,
      content: <CC.Content />,
      footer: <CC.Footer />
    });
  }
});

FlowRouter.route('/plant-inventory', {
  navbar: true,
  name: 'inventory',
  action: function(params, queryParams) {
    ReactLayout.render(CC.MainLayout,{
      header: <CC.Header />,
      content: <CC.PlantInventory />,
      footer: <CC.Footer />
    });
  }
});

FlowRouter.route('/plant-list', {
  navbar: true,
  name: 'plants',
  action: function(params, queryParams) {
    ReactLayout.render(CC.MainLayout,{
      header: <CC.Header />,
      content: <CC.PlantList />,
      footer: <CC.Footer />
    });
  }
});

FlowRouter.route('/systems', {
  navbar: true,
  name: 'systems',
  action: function(params, queryParams) {
    ReactLayout.render(CC.MainLayout,{
      header: <CC.Header />,
      content: <CC.Systems />,
      footer: <CC.Footer />
    });
  }
});

FlowRouter.route('/tasks', {
  navbar: true,
  name: 'tasks',
  action: function(params, queryParams) {
    ReactLayout.render(CC.MainLayout,{
      header: <CC.Header />,
      content: <CC.Tasks />,
      footer: <CC.Footer />
    });
  }
});

FlowRouter.route('/plant/add', {
  navbar: false,
  name: 'addPlant',
  action: function(params, queryParams) {
    ReactLayout.render(CC.MainLayout,{
      header: 'this is the header',
      content: <CC.AddPlantForm />,
      footer: 'this is the footer'
    });
  }
});
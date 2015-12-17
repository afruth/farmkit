
FlowRouter.route('/', {
  navbar: { 
    topnav: true,
    footer: false 
  },
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
  navbar: { 
    topnav: false, 
    footer: true 
  },
  name: 'my plants',
  action: function(params, queryParams) {
    ReactLayout.render(CC.MainLayout,{
      header: <CC.Header />,
      content: <CC.PlantList />,
      footer: <CC.Footer />
    });
  }
});

FlowRouter.route('/plant-list', {
  navbar: { 
    topnav: false, 
    footer: true 
  },
  name: 'plants',
  action: function(params, queryParams) {
    ReactLayout.render(CC.MainLayout,{
      header: <CC.Header />,
      content: <CC.PossiblePlants />,
      footer: <CC.Footer />
    });
  }
});

FlowRouter.route('/systems', {
  navbar: { 
    topnav: false, 
    footer: true 
  },
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
  navbar: { 
    topnav: false, 
    footer: true 
  },
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
  navbar: { 
    topnav: false,
    footer: false 
  },
  name: 'addPlant',
  action: function(params, queryParams) {
    ReactLayout.render(CC.MainLayout,{
      header: <CC.Header />,
      content: <CC.PlantForm />,
      footer: <CC.Footer />
    });
  }
});

FlowRouter.route('/plant/edit/:docId', {
	navbar: {
		topnav: false,
		footer: false
	},
	name: 'editPlant',
	action: function(params, queryParams) {
		ReactLayout.render(CC.MainLayout,{
			header: <CC.Header />,
			content: <CC.PlantForm docId={params.docId} />,
			footer: <CC.Footer />
		});
	}
});

FlowRouter.route('/plant/list/', {
	navbar: {
		topnav: true,
		footer: false
	},
	name: 'listPlants',
	action: function(params, queryParams) {
		ReactLayout.render(CC.MainLayout,{
			header: <CC.Header />,
			content: <CC.PlantList />,
			footer: <CC.Footer />
		});
	}
});

FlowRouter.route('/plant/remove/:docId', {
	navbar: {
		topnav: false,
		footer: false
	},
	name: 'removePlant',
	action: function(params, queryParams) {
		ReactLayout.render(CC.MainLayout,{
			header: <CC.Header />,
			content: <CC.PlantRemove docId={params.docId} />,
			footer: <CC.Footer />
		});
	}
});
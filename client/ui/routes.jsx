
FlowRouter.triggers.exit([({path}) => {
  CC.previousPath = path;
}]);



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

FlowRouter.route('/inventory/add', {
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

FlowRouter.route('/inventory/edit/:docId', {
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

FlowRouter.route('/inventory/view/:docId', {
	navbar: {
		topnav: false,
		footer: false
	},
	name: 'singlePlant',
	action: function(params, queryParams) {
		ReactLayout.render(CC.MainLayout,{
			header: <CC.Header />,
			content: <CC.PlantSingle docId={params.docId} />,
			footer: <CC.Footer />
		});
	}
});

FlowRouter.route('/inventory/list/', {
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

FlowRouter.route('/inventory/remove/:docId', {
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
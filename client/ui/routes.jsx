
FlowRouter.triggers.exit([({path}) => {
  CC.previousPath = path;
}]);



FlowRouter.route('/', {
  navbar: { 
    topnav: true,
    footer: false 
  },
  name: 'plants',
  action: function(params, queryParams) {
    ReactLayout.render(CC.MainLayout,{
      header: <CC.Header />,
      content: <CC.PlantFamilies />
    });
  }
});

// FlowRouter.route('/plant-inventory', {
//   navbar: { 
//     topnav: false, 
//     footer: false 
//   },
//   name: 'my plants',
//   action: function(params, queryParams) {
//     ReactLayout.render(CC.MainLayout,{
//       header: <CC.Header />,
//       content: <CC.PlantList />
//     });
//   }
// });

FlowRouter.route('/systems', {
  navbar: { 
    topnav: true, 
    footer: true 
  },
  name: 'systems',
  action: function(params, queryParams) {
    ReactLayout.render(CC.MainLayout,{
      header: <CC.Header />,
      content: <CC.Systems />
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
      content: <CC.PlantForm />
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
      content: <CC.PlantForm docId={params.docId} />
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
			content: <CC.PlantSingle docId={params.docId} />
		});
	}
});

FlowRouter.route('/inventory/list/', {
	navbar: {
		topnav: false,
		footer: false
	},
	name: 'listPlants',
	action: function(params, queryParams) {
		ReactLayout.render(CC.MainLayout,{
			header: <CC.Header />,
			content: <CC.PlantList />
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
			content: <CC.PlantRemove docId={params.docId} />
		});
	}
});



FlowRouter.route('/system/add', {
  navbar: { 
    topnav: false,
    footer: false 
  },
  name: 'addSystem',
  action: function(params, queryParams) {
    ReactLayout.render(CC.MainLayout,{
      header: <CC.Header />,
      content: <CC.SystemForm />
    });
  }
});

FlowRouter.route('/system/edit/:docId', {
  navbar: {
    topnav: false,
    footer: false
  },
  name: 'editPlant',
  action: function(params, queryParams) {
    ReactLayout.render(CC.MainLayout,{
      header: <CC.Header />,
      content: <CC.SystemForm docId={params.docId} />
    });
  }
});

FlowRouter.route('/system/remove/:docId', {
  navbar: {
    topnav: false,
    footer: false
  },
  name: 'removePlant',
  action: function(params, queryParams) {
    ReactLayout.render(CC.MainLayout,{
      header: <CC.Header />,
      content: <CC.SystemRemove docId={params.docId} />
    });
  }
});



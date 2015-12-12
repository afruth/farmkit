
FlowRouter.route('/', {
  	navbar: true,
  	name: 'home',
  	action: function(params, queryParams) {
	    ReactLayout.render(CC.MainLayout,{
	      	header: <CC.Header />,
	      	content: <CC.Content />,
	      	footer: <CC.Footer />
	    });
  	}
});

FlowRouter.route('/admin', {
  	navbar: true,
  	name: 'admin',
  	action: function(params, queryParams) {
	    ReactLayout.render(CC.Admin,{
	      	header: <CC.Header />,
	      	content: <CC.AdminContent />,
	      	footer: <CC.Footer />
	    });
  	}
});

FlowRouter.route('/private', {
  	navbar: false,
  	name: "I'm the captain of a Pirate ship!!!",
  	action: function(params, queryParams) {
	    ReactLayout.render(CC.Admin,{
	      	header: <CC.Header />,
	      	content: 'This is private',
	      	footer: <CC.Footer />
	    });
  	}
});
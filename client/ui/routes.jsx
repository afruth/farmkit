var Content = CC.Content;
var Header = CC.Header;
var Footer = CC.Footer;
var AdminContent = CC.AdminContent;

FlowRouter.route('/', {
  navbar: true,
  action: function(params, queryParams) {
    ReactLayout.render(CC.MainLayout,{
      header: <Header />,
      content: <Content />,
      footer: <Footer />
    });
  }
});

FlowRouter.route('/admin', {
  navbar: true,
  action: function(params, queryParams) {
    ReactLayout.render(CC.Admin,{
      header: <Header />,
      content: <AdminContent />,
      footer: <Footer />
    });
  }
});

FlowRouter.route('/private', {
  navbar: false,
  action: function(params, queryParams) {
    ReactLayout.render(CC.Admin,{
      header: <Header />,
      content: 'This is private',
      footer: <Footer />
    });
  }
});
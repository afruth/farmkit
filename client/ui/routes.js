FlowRouter.route('/', {
  action: function(params, queryParams) {
    console.log("Yeah! We are on the front:", params.postId);
  }
});
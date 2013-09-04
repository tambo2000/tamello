window.T = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function($rootEl, boards) {
    new T.Routers.BoardsRouter($rootEl, boards);
   	Backbone.history.start();
  }
};

$(document).ready(function(){
	var boards = new T.Collections.Boards();
	boards.fetch( { success: function() {
  	T.initialize($("body"), boards);
  }});
});

window.T = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function($rootEl, boards) {
    $(window).on('resize', function(){ setCSS(); });

    new T.Routers.BoardsRouter($rootEl, boards);
   	Backbone.history.start();
  }
};

function setCSS() {
  $(".connectedListSortable").css("max-height", ($(window).height()-240) + "px");
  $(".list").css("min-width", (Math.floor(($(window).width() / 5))) + "px");
  $(".list").css("max-width", (Math.floor(($(window).width() / 3))) + "px");
  $("td").css("width", (Math.floor(($(window).width() / 5))) + "px");
}

$(document).ready(function(){
	var boards = new T.Collections.Boards();
	boards.fetch( { success: function() {
  	T.initialize($("body"), boards);
  }});
});

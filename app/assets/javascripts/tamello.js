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

$(document).ready(function(){
	var boards = new T.Collections.Boards();
	boards.fetch( { success: function() {
  	T.initialize($("body"), boards);
  }});
});


var listMaxHeight = function() { return ($(window).height()-250) + "px" };
var listMinWidth = function() { return (Math.floor(($(window).width() / 5))) + "px" };
var listMaxWidth = function() { return (Math.floor(($(window).width() / 2))) + "px" };

function setCSS() {
  $(".connectedListSortable").css("max-height", listMaxHeight());
  $(".list").css("min-width", listMinWidth());
  $(".list").css("max-width", listMaxWidth());
  $(".boardTitleDiv").css("width", listMaxWidth());
};

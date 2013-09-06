T.Views.BoardRowView = Backbone.View.extend({

	className: "boardRow",

	initialize: function() {
		this.listenTo(this.model, 'change', this.render());
	},

	events: {
	},

	render: function() {
		var that = this;

		var renderedContent = JST["boards/boardRow"]({
			board: that.model
		});

    that.$el.html(renderedContent);
    return that;
	}
});


T.Views.BoardsIndexView = Backbone.View.extend({

	events: {
		"submit form#new_board_form": "createBoard"
	},

	render: function() {
		var that = this;

		var renderedContent = JST["boards/boardsIndex"]();

		that.$el.html(renderedContent);

		that.collection.each(function (board) {
			var boardRowView = new T.Views.BoardRowView({
      	model: board
    	});
			that.$("div.boardList").append(boardRowView.render().$el);
    });

		return that
	},

	createBoard: function (event) {
    var that = this;

    var formData = $(event.currentTarget).serializeJSON();
    
    var board = new T.Models.Board(formData.board);
    that.collection.add(board);
    board.save();
  }

});

T.Views.BoardView = Backbone.View.extend({

	initialize: function() {
		//this.listenTo(this.model, 'change', this.render());
		//$( ".listTable" ).on( "sortupdate", function( event, ui ) {

		//} );
	},

	events: {
		"submit form#new_list_form": "createList"
	},

	createList: function (event) {
    var that = this;

    var formData = $(event.currentTarget).serializeJSON();
    
    var list = new T.Models.List(formData.list);
    //that.collection.add(list);
    list.save();
  },

	render: function(id) {
		var that = this;

		var renderedContent = JST["boards/boardShow"]({
			board: that.model
		});

		that.$el.html(renderedContent);

		var lists = new T.Collections.Lists();
		lists.board_id = id;
	
		lists.fetch( { 
			success: function(resp) {

				lists.each(function (list) {
					var listView = new T.Views.List({
		      	model: list
		    	});
					that.$("div.list_container").append(listView.render().$el);
		    });

				// need to add a table to allow the div to expand horizontally only
				that.$("div.list_container").wrapInner("<table><tr>");

				that.$("tr").addClass("listTable");

				that.$(".listTable").sortable({
					opacity: 0.8,
					tolerance: "pointer",
					revert: 100,
					update: function(event, ui) {
						
			    	var sortedIDsArr = $( ".listTable" ).sortable( "toArray" );
			    	sortedIDsArr = _.map(sortedIDsArr, function(ID) {
			    		return parseInt(ID);
			    	});
			    	
			    	lists.each( function(list) {
			    		list.set("position", _.indexOf(sortedIDsArr, list.id) );
			    		list.save();
			    	});
			  
			    }
				});
			},

			error: function(resp) {
				console.log(resp);
		}});

    return that;
	}

});
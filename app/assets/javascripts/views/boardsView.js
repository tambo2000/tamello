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
    board.save();
  }

});

T.Views.BoardView = Backbone.View.extend({

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
				var listsView = new T.Views.Lists({
					collection: lists
				});

				that.$("div.list_container").append(listsView.render().$el);
			},
			error: function(resp) {
				console.log(resp);
		}});

    return that;
	}

});